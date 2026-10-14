import { Injectable, signal } from '@angular/core';
import { Character, CharacterListResponse } from './interfaces/rick-morty';

@Injectable({ providedIn: 'root' })
export class RickMortyService {
  private readonly baseUrl = 'https://rickandmortyapi.com/api';

  characters = signal<Character[]>([]);
  currentPage = signal(1);
  totalPages = signal(1);
  loading = signal(false);

  async loadCharacters(page: number = 1) {
    this.loading.set(true);
    try {
      const res = await fetch(`${this.baseUrl}/character?page=${page}`);
      const data: CharacterListResponse = await res.json();
      this.characters.set(data.results);
      this.currentPage.set(page);
      this.totalPages.set(data.info.pages);
    } finally {
      this.loading.set(false);
    }
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.loadCharacters(this.currentPage() + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.loadCharacters(this.currentPage() - 1);
    }
  }
}
