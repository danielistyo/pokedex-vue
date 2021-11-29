import { PokemonDetail, PokemonList } from "@/typings";
import { queryPokemons } from "./queries";

const BASE_URL = "https://pokeapi.co/api/v2";

function request<R>(url: string, params?: any, isQuery?: boolean): Promise<R> {
  const options = isQuery ? { body: JSON.stringify(params), method: "POST" } : params || "";
  let res: Promise<Response> | null = null;

  if (isQuery) res = fetch(url, options);
  else res = fetch(url + options);

  return res
    .then((res) => res.json())
    .catch(() => {
      alert("Error, please reload");
    });
}

export default {
  getPokemons(limit: number, offset: number): Promise<PokemonList> {
    return request<PokemonList>(
      `https://beta.pokeapi.co/graphql/v1beta`,
      { query: queryPokemons(limit, offset) },
      true,
    );
  },
  getPokemon(name: string): Promise<PokemonDetail> {
    return request<PokemonDetail>(`${BASE_URL}/pokemon/${name}`);
  },
};
