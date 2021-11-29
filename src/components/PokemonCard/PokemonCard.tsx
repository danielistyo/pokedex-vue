import { getPokemonImage } from "@/helpers/image";
import { PokemonItem } from "@/typings";
import { defineComponent, PropType } from "vue";
import "./PokemonCard.scss";

export default defineComponent({
  name: "PokemonCard",
  props: {
    pokemon: {
      type: Object as PropType<PokemonItem>,
      required: true,
    },
    onClick: {
      type: Function as PropType<(payload: MouseEvent) => void>,
      required: true,
    },
  },
  render() {
    const type = this.pokemon.types[0]?.type;
    return (
      <div class={`pokemon-card bg-light${type ? `--${type.name}` : ""}`} onClick={this.onClick}>
        <img class="pokemon-card__image" src={getPokemonImage(this.pokemon.id)} />
        <div class="pokemon-card__types">
          {this.pokemon.types.map((t) => (
            <div class={`pokemon-card__type bg${`--${t.type.name}`}`}>{t.type.name}</div>
          ))}
        </div>
        <div class="pokemon-card__name">{this.pokemon.name}</div>
      </div>
    );
  },
});
