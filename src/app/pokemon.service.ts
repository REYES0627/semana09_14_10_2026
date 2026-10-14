import { Injectable, signal } from '@angular/core';
import {
  Pokemon,
  PokemonListResponse,
  PokemonNameUrl,
  PokemonTypeListResponse,
} from './interfaces/pokemon';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  allPokemons = signal<PokemonNameUrl[]>([]);
  typePokemons = signal<PokemonNameUrl[]>([]);

  constructor() {
    this.loadAllPokemons();
  }

  private async loadAllPokemons() {
    const res = await fetch(`${this.baseUrl}/pokemon?limit=100000`);
    const data: PokemonListResponse = await res.json();
    this.allPokemons.set(data.results);
  }

  async loadType(typeName: string) {
    if (!typeName) {
      this.typePokemons.set([]);
      return;
    }
    const res = await fetch(`${this.baseUrl}/type/${typeName}`);
    const data: PokemonTypeListResponse = await res.json();
    this.typePokemons.set(data.pokemon.map((p) => p.pokemon));
  }

  async getPokemonDetails(name: string): Promise<Pokemon> {
    const res = await fetch(`${this.baseUrl}/pokemon/${name}`);
    return res.json();
  }

  getTypeList(): string[] {
    return [
      'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting',
      'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost',
      'dragon', 'dark', 'steel', 'fairy',
    ];
  }
}
