import { Component, OnInit, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { SimpsonsService } from '../simpsons.service';
import { SimpsonsCharacter } from '../interfaces/simpsons';
import { SimpsonsModal } from './simpsons-modal';

@Component({
  selector: 'app-simpsons',
  templateUrl: './simpsons.html',
  styleUrl: './simpsons.css',
  imports: [NgFor, NgIf, SimpsonsModal],
})
export class SimpsonsPage implements OnInit {
  search = signal('');
  selectedCharacter = signal<SimpsonsCharacter | null>(null);

  constructor(public service: SimpsonsService) {}

  ngOnInit() {
    this.service.loadCharacters();
  }

  selectCharacter(character: SimpsonsCharacter) {
    this.selectedCharacter.set(character);
    this.playSound();
  }

  closeModal() {
    this.selectedCharacter.set(null);
  }

  private playSound() {
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    } catch (e) {}
  }
}
