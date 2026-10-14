export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonNameUrl[];
}

export interface PokemonNameUrl {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
    other: {
      'official-artwork': {
        front_default: string | null;
      };
    };
  };
  types: PokemonTypeSlot[];
  stats: PokemonStat[];
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonTypeSlot {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonTypeListResponse {
  pokemon: {
    pokemon: PokemonNameUrl;
    slot: number;
  }[];
}
