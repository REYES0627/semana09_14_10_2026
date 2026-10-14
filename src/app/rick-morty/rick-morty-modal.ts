import { Component, input, output, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgIf } from '@angular/common';
import { Character } from '../interfaces/rick-morty';

@Component({
  selector: 'app-rick-morty-modal',
  templateUrl: './rick-morty-modal.html',
  styleUrl: './rick-morty-modal.css',
  imports: [NgIf],
})
export class RickMortyModal implements OnInit, OnDestroy {
  character = input.required<Character>();
  visible = input.required<boolean>();
  close = output<void>();

  currentTime = '';
  private timer: ReturnType<typeof setInterval> | null = null;
  private synth: SpeechSynthesis | null = null;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.updateTime();
    this.timer = setInterval(() => this.updateTime(), 1000);
    if (this.isBrowser) {
      this.synth = window.speechSynthesis;
      this.speakCharacter();
    }
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
    if (this.synth) this.synth.cancel();
  }

  private updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('en-US', { hour12: false });
  }

  private speakCharacter() {
    if (!this.synth) return;
    const utterance = new SpeechSynthesisUtterance(this.character().name);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    this.synth.speak(utterance);
  }

  get statusColor(): string {
    const status = this.character().status;
    if (status === 'Alive') return '#97ce4c';
    if (status === 'Dead') return '#ff4757';
    return '#ffa502';
  }

  get episodeCount(): number {
    return this.character().episode?.length ?? 0;
  }

  onClose() {
    if (this.synth) this.synth.cancel();
    this.close.emit();
  }
}
