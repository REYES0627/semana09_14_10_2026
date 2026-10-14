import { Component, input, output } from '@angular/core';
import { NgFor, TitleCasePipe } from '@angular/common';
import { Pokemon } from '../interfaces/pokemon';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.css',
  imports: [TitleCasePipe, NgFor],
})
export class PokemonCard {
  pokemon = input.required<Pokemon>();
  select = output<Pokemon>();

  get sprite(): string | null {
    return (
      this.pokemon().sprites?.other['official-artwork']?.front_default ??
      this.pokemon().sprites?.front_default
    );
  }

  get types(): string[] {
    return this.pokemon().types?.map((t) => t.type.name) ?? [];
  }

  onClick() {
    this.select.emit(this.pokemon());
  }
}
