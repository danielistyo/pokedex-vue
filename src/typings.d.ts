export type PokemonDetailSprites = {
  back_default: string;
  back_female: null;
  back_shiny: string;
  back_shiny_female: null;
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
  other: {
    dream_world: {
      front_default: string;
      front_female: null;
    };
    home: {
      front_default: string;
      front_female: null;
      front_shiny: string;
      front_shiny_female: null;
    };
    "official-artwork": {
      front_default: string;
    };
  };
};

export type PokemonDetailStat = {
  base_stat: number;
  effort: number;
  stat: { name: string; url: string };
};

export type PokemonDetailType = {
  type: { name: string; url: string };
};

export type PokemonDetailAbility = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

export type PokemonDetail = {
  sprites: PokemonDetailSprites;
  stats: Array<PokemonDetailStat>;
  types: Array<PokemonDetailType>;
  height: number;
  weight: number;
  name: string;
  id: number;
  abilities: Array<PokemonDetailAbility>;
};

export type PokemonItem = {
  name: string;
  id: number;
  detail?: PokemonDetail;
  types: Array<PokemonDetailType>;
};

export type PokemonList = {
  data: { pokemons: Array<PokemonItem> };
};
