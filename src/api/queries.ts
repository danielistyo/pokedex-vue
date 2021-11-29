export const queryPokemons = (limit: number, offset: number): string => {
  return `
      query getPokemons {
        pokemons: pokemon_v2_pokemon(order_by: {id: asc}, limit: ${limit}, offset: ${offset}) {
          name
          id
          types: pokemon_v2_pokemontypes {
            type: pokemon_v2_type {
              name
            }
          }
        }
      }
    `;
};
