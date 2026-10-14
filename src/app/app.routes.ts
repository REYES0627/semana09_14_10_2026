import { Routes } from '@angular/router';
import { Home } from './home/home';
import { PokemonList } from './pokemon-list/pokemon-list';
import { RickMorty } from './rick-morty/rick-morty';
import { DigimonPage } from './digimon/digimon';
import { SimpsonsPage } from './simpsons/simpsons';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'pokemon', component: PokemonList },
  { path: 'rick-morty', component: RickMorty },
  { path: 'digimon', component: DigimonPage },
  { path: 'simpsons', component: SimpsonsPage },
];
