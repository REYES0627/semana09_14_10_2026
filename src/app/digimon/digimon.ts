import { Component, OnInit, computed, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DigimonService } from '../digimon.service';
import { Digimon, DigimonDetail } from '../interfaces/digimon';
import { DigimonModal } from './digimon-modal';

@Component({
  selector: 'app-digimon',
  templateUrl: './digimon.html',
  styleUrl: './digimon.css',
  imports: [NgFor, NgIf, DigimonModal],
})
export class DigimonPage implements OnInit {
  levelFilter = signal('');
  selectedDigimon = signal<DigimonDetail | null>(null);

  filteredDigimons = computed(() => {
    let list = this.service.digimons();
    if (this.levelFilter()) {
      list = list.filter((d) =>
        d.name.toLowerCase().includes(this.levelFilter().toLowerCase())
      );
    }
    return list;
  });

  constructor(public service: DigimonService) {}

  ngOnInit() {
    this.service.loadDigimons();
  }

  async selectDigimon(digimon: Digimon) {
    const detail = await this.service.getDigimonDetail(digimon.name);
    this.selectedDigimon.set(detail);
    this.playSound();
  }

  closeModal() {
    this.selectedDigimon.set(null);
  }

  private playSound() {
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'square';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.setValueAtTime(800, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    } catch (e) {}
  }
}
