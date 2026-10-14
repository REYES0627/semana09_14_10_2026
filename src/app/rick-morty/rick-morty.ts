import { Component, OnInit, computed, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RickMortyService } from '../rick-morty.service';
import { Character } from '../interfaces/rick-morty';
import { RickMortyModal } from './rick-morty-modal';

@Component({
  selector: 'app-rick-morty',
  templateUrl: './rick-morty.html',
  styleUrl: './rick-morty.css',
  imports: [NgFor, NgIf, RickMortyModal],
})
export class RickMorty implements OnInit {
  statusFilter = signal('');
  speciesFilter = signal('');
  selectedCharacter = signal<Character | null>(null);

  speciesList = computed(() => {
    const chars = this.service.characters();
    const species = new Set(chars.map((c) => c.species));
    return Array.from(species).sort();
  });

  filteredCharacters = computed(() => {
    let chars = this.service.characters();
    const status = this.statusFilter();
    const species = this.speciesFilter();

    if (status) {
      chars = chars.filter((c) => c.status === status);
    }
    if (species) {
      chars = chars.filter((c) => c.species === species);
    }
    return chars;
  });

  constructor(public service: RickMortyService) {}

  ngOnInit() {
    this.service.loadCharacters();
  }

  selectCharacter(character: Character) {
    this.selectedCharacter.set(character);
  }

  closeModal() {
    this.selectedCharacter.set(null);
  }
}
