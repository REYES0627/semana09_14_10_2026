export interface DigimonListResponse {
  content: Digimon[];
  pageable: {
    currentPage: number;
    totalPages: number;
    totalElements: number;
  };
}

export interface Digimon {
  id: number;
  name: string;
  href: string;
  image: string;
}

export interface DigimonDetail {
  id: number;
  name: string;
  images: { href: string }[];
  levels: { level: string }[];
  types: { type: string }[];
  attributes: { attribute: string }[];
  fields: { field: string; image: string }[];
  descriptions: { origin: string; language: string; description: string }[];
  priorEvolutions: { digimon: string; href: string; image: string }[];
  nextEvolutions: { digimon: string; href: string; image: string }[];
  skills: { skill: string; translation: string; description: string }[];
}
