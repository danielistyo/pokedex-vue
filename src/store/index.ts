import api from "@/api";
import { PokemonDetail, PokemonItem } from "@/typings";
import { createStore } from "vuex";

export type StoreState = {
  pokemons: Array<PokemonItem>;
  limit: number;
  offset: number;
  isReachMax: boolean;
};

export default createStore<StoreState>({
  state: {
    pokemons: [],
    limit: 50,
    offset: 0,
    isReachMax: false,
  },
  getters: {
    findPokemon(state) {
      return (name: string) => state.pokemons.find((pokemon) => pokemon.name === name);
    },
  },
  mutations: {
    addPokemons(state, pokemons: Array<PokemonItem>) {
      const filterredPokemon = pokemons.filter((p) => !state.pokemons.some((cp) => cp.id === p.id));
      state.pokemons = [...state.pokemons, ...filterredPokemon];
    },
    addDetailPokemon(state, pokemonDetail: PokemonDetail) {
      const selectedPokemon = state.pokemons.find((pokemon) => pokemon.name === pokemonDetail.name);
      console.log(selectedPokemon);
      if (selectedPokemon) {
        selectedPokemon.detail = pokemonDetail;
      }
    },
    updateOffset(state, offset: number) {
      state.offset = offset;
    },
    updateReachMax(state) {
      state.isReachMax = !state.isReachMax;
    },
  },
  actions: {
    async getPokemons({ commit, state }) {
      if (state.isReachMax) return;

      const res = await api.getPokemons(state.limit, state.offset);
      if (res.data.pokemons.length) {
        commit("addPokemons", res.data.pokemons);
        commit("updateOffset", state.offset + state.limit);
      } else {
        commit("updateReachMax");
      }
    },
    async getPokemon({ getters, commit }, name: string) {
      const pokemon: PokemonItem | undefined = getters.findPokemon(name);
      const res = await api.getPokemon(name);
      if (pokemon) {
        commit("addDetailPokemon", res);
      } else {
        commit("addPokemons", [{ name: res.name, id: res.id, detail: res, types: res.types }]);
      }
      return pokemon;
    },
  },
});
