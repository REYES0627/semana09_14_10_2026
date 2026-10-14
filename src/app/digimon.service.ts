import { Injectable, signal } from '@angular/core';
import { Digimon, DigimonDetail, DigimonListResponse } from './interfaces/digimon';

@Injectable({ providedIn: 'root' })
export class DigimonService {
  private readonly baseUrl = 'https://digi-api.com/api/v1';

  digimons = signal<Digimon[]>([]);
  currentPage = signal(1);
  totalPages = signal(1);
  loading = signal(false);

  async loadDigimons(page: number = 1) {
    this.loading.set(true);
    try {
      const res = await fetch(`${this.baseUrl}/digimon?page=${page - 1}&pageSize=20`);
      const data: DigimonListResponse = await res.json();
      this.digimons.set(data.content);
      this.currentPage.set(page);
      this.totalPages.set(data.pageable.totalPages);
    } finally {
      this.loading.set(false);
    }
  }

  async getDigimonDetail(name: string): Promise<DigimonDetail> {
    const res = await fetch(`${this.baseUrl}/digimon/${encodeURIComponent(name)}`);
    return res.json();
  }

  getLevelList(): string[] {
    return ['Baby', 'In-Training', 'Rookie', 'Champion', 'Ultimate', 'Mega'];
  }

  getAttributeList(): string[] {
    return ['Vaccine', 'Virus', 'Data', 'Free', 'Variable', 'Unknown'];
  }
}
