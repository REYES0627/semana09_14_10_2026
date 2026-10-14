import { Component, input, output } from '@angular/core';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Pokemon } from '../interfaces/pokemon';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css',
  imports: [TitleCasePipe, NgFor, NgIf],
})
export class PokemonDetail {
  pokemon = input.required<Pokemon>();
  visible = input.required<boolean>();
  close = output<void>();

  get sprite(): string | null {
    return (
      this.pokemon().sprites?.other['official-artwork']?.front_default ??
      this.pokemon().sprites?.front_default
    );
  }

  get types(): string[] {
    return this.pokemon().types?.map((t) => t.type.name) ?? [];
  }

  get primaryType(): string {
    return this.types[0] ?? 'normal';
  }

  get color(): string {
    const typeColors: Record<string, string> = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC',
    };
    return typeColors[this.primaryType] ?? '#A8A878';
  }

  get stats(): { name: string; value: number }[] {
    const statNames: Record<string, string> = {
      hp: 'HP',
      attack: 'Attack',
      defense: 'Defense',
      'special-attack': 'Sp. Attack',
      'special-defense': 'Sp. Defense',
      speed: 'Speed',
    };
    return (this.pokemon().stats ?? []).map((s) => ({
      name: statNames[s.stat.name] ?? s.stat.name,
      value: s.base_stat,
    }));
  }

  get height(): string {
    return ((this.pokemon().height ?? 0) / 10).toFixed(1);
  }

  get weight(): string {
    return ((this.pokemon().weight ?? 0) / 10).toFixed(1);
  }

  get particleType(): string {
    return this.primaryType;
  }

  get particles(): number[] {
    return Array.from({ length: 12 }, (_, i) => i);
  }

  onClose() {
    this.close.emit();
  }
}
