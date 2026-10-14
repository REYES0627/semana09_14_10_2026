export interface SimpsonsCharacter {
  id: string;
  name: string;
  normalizedName: string;
  gender: string;
  image: string;
  description?: string;
  occupation?: string;
}

export interface SimpsonsQuote {
  quote: string;
  character: string;
  image: string;
  characterDirection: string;
}
