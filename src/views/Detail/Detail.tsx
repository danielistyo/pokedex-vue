import DetailHeader from "@/components/DetailHeader";
import DetailStat from "@/components/DetailStat";
import { StoreState } from "@/store";
import { PokemonItem } from "@/typings";
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import "./Detail.scss";

export default defineComponent({
  name: "DetailPage",
  setup() {
    const store = useStore<StoreState>();
    const pokemonName = useRoute().params.name;
    const pokemon = ref<PokemonItem | null>(null);
    store.dispatch("getPokemon", pokemonName).then(() => {
      pokemon.value = store.getters.findPokemon(pokemonName);
    });

    return { pokemon };
  },
  render() {
    const type = this.pokemon?.types[0]?.type;
    const backgroundClass = type ? `bg-light--${type.name}` : "bg-light";
    return (
      <div class="detail-page">
        <DetailHeader
          name={this.pokemon?.name || ""}
          onClick={() => {
            this.$router.back();
          }}
          class={`detail-page__header ${backgroundClass}`}
        />
        <img
          src={this.pokemon?.detail?.sprites.other["official-artwork"].front_default || ""}
          class={`detail-page__image ${backgroundClass}`}
        />
        <div class="detail-page__types">
          {this.pokemon?.types.map((t) => (
            <div class={`detail-page__type bg${`--${t.type.name}`}`}>{t.type.name}</div>
          ))}
        </div>
        <h3>
          <span class="detail-page__name">{this.pokemon?.name} </span>
          <span>
            ({this.pokemon?.detail?.height}m, {this.pokemon?.detail?.weight}kg)
          </span>
        </h3>

        <DetailStat stats={this.pokemon?.detail?.stats || []} type={type?.name || ""} />
      </div>
    );
  },
});
