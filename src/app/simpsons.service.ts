import { Injectable, signal } from '@angular/core';
import { SimpsonsCharacter, SimpsonsQuote } from './interfaces/simpsons';

@Injectable({ providedIn: 'root' })
export class SimpsonsService {
  private readonly baseUrl = 'https://thesimpsonsapi.com/api';

  characters = signal<SimpsonsCharacter[]>([]);
  currentPage = signal(1);
  totalPages = signal(1);
  loading = signal(false);

  async loadCharacters(page: number = 1) {
    this.loading.set(true);
    try {
      const res = await fetch(`${this.baseUrl}/characters?limit=20&skip=${(page - 1) * 20}`);
      const data = await res.json();
      this.characters.set(data.data ?? data);
      this.currentPage.set(page);
      this.totalPages.set(Math.ceil((data.total ?? 66) / 20));
    } finally {
      this.loading.set(false);
    }
  }

  async getQuotes(): Promise<SimpsonsQuote[]> {
    const res = await fetch(`${this.baseUrl}/quotes?limit=10`);
    const data = await res.json();
    return data.data ?? data;
  }
}
