import { Component, input, output } from '@angular/core';
import { NgIf } from '@angular/common';
// NgIf used in template
import { SimpsonsCharacter } from '../interfaces/simpsons';

@Component({
  selector: 'app-simpsons-modal',
  templateUrl: './simpsons-modal.html',
  styleUrl: './simpsons-modal.css',
  imports: [NgIf],
})
export class SimpsonsModal {
  character = input<SimpsonsCharacter | null>(null);
  visible = input.required<boolean>();
  close = output<void>();

  onClose() {
    this.close.emit();
  }
}
