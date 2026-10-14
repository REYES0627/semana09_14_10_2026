import { Component, input, output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DigimonDetail } from '../interfaces/digimon';

@Component({
  selector: 'app-digimon-modal',
  templateUrl: './digimon-modal.html',
  styleUrl: './digimon-modal.css',
  imports: [NgFor, NgIf],
})
export class DigimonModal {
  digimon = input<DigimonDetail | null>(null);
  visible = input.required<boolean>();
  close = output<void>();

  get image(): string {
    return this.digimon()?.images?.[0]?.href ?? '';
  }

  get levels(): string[] {
    return this.digimon()?.levels?.map((l) => l.level) ?? [];
  }

  get types(): string[] {
    return this.digimon()?.types?.map((t) => t.type) ?? [];
  }

  get attributes(): string[] {
    return this.digimon()?.attributes?.map((a) => a.attribute) ?? [];
  }

  get description(): string {
    const en = this.digimon()?.descriptions?.find((d) => d.language === 'en_us');
    return en?.description ?? 'No hay descripcion disponible.';
  }

  get skills(): string[] {
    return this.digimon()?.skills?.map((s) => s.skill) ?? [];
  }

  onClose() {
    this.close.emit();
  }
}
