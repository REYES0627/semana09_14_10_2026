import { Component, computed, effect, inject, signal } from '@angular/core';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { PokemonService } from '../pokemon.service';
import { Pokemon, PokemonNameUrl } from '../interfaces/pokemon';
import { PokemonCard } from '../pokemon-card/pokemon-card';
import { PokemonDetail } from '../pokemon-detail/pokemon-detail';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css',
  imports: [PokemonCard, PokemonDetail, TitleCasePipe, NgFor, NgIf],
})
export class PokemonList {
  private readonly service = inject(PokemonService);
  private readonly pageSize = 20;

  search = signal('');
  selectedType = signal('');
  currentPage = signal(1);
  loading = signal(false);
  selectedPokemon = signal<Pokemon | null>(null);

  filteredNames = computed<PokemonNameUrl[]>(() => {
    const all = this.service.allPokemons();
    const searchTerm = this.search().trim().toLowerCase();
    const type = this.selectedType();

    let names = all;

    if (type) {
      const typeSet = new Set(this.service.typePokemons().map((p) => p.name));
      names = names.filter((p) => typeSet.has(p.name));
    }

    if (searchTerm) {
      names = names.filter((p) => p.name.toLowerCase().includes(searchTerm));
    }

    return names;
  });

  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredNames().length / this.pageSize))
  );

  paginatedNames = computed(() => {
    const page = Math.min(this.currentPage(), this.totalPages());
    const start = (page - 1) * this.pageSize;
    return this.filteredNames().slice(start, start + this.pageSize);
  });

  pokemonDetails = signal<Pokemon[]>([]);

  constructor() {
    effect(() => {
      this.paginatedNames();
      this.loadDetails();
    });

    effect(() => {
      this.selectedType();
      this.service.loadType(this.selectedType());
      this.currentPage.set(1);
    });
  }

  private async loadDetails() {
    this.loading.set(true);
    const names = this.paginatedNames();
    const details = await Promise.all(
      names.map((n) => this.service.getPokemonDetails(n.name))
    );
    this.pokemonDetails.set(details);
    this.loading.set(false);
  }

  onSelectPokemon(pokemon: Pokemon) {
    this.selectedPokemon.set(pokemon);
    this.playSound();
  }

  closeModal() {
    this.selectedPokemon.set(null);
  }

  private playSound() {
    try {
      const ctx = new AudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.15);
      oscillator.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.3);

      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.3);
    } catch (e) {
      // Audio no disponible
    }
  }

  goToPage(page: number) {
    const clamped = Math.min(Math.max(1, page), this.totalPages());
    this.currentPage.set(clamped);
  }

  nextPage() {
    this.goToPage(this.currentPage() + 1);
  }

  prevPage() {
    this.goToPage(this.currentPage() - 1);
  }
}
