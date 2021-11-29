import PokemonCard from "@/components/PokemonCard";
import { StoreState } from "@/store";
import { onMounted, defineComponent, onUnmounted, computed, ref } from "vue";
import { useStore } from "vuex";
import "./List.scss";

export default defineComponent({
  name: "ListPage",
  setup() {
    const store = useStore<StoreState>();
    const pokemons = computed(() => store.state.pokemons);
    const isLoading = ref<boolean>(false);

    const dispatchGetPokemon = () => {
      isLoading.value = true;
      store.dispatch("getPokemons").then(() => {
        isLoading.value = false;
      });
    };
    dispatchGetPokemon();

    const handleScroll = (e: Event) => {
      const { documentElement } = e.target as Document;
      if (documentElement) {
        const scrollTop = documentElement.scrollTop ? documentElement.scrollTop : document.body.scrollTop;
        const { scrollHeight } = documentElement;
        const diff = scrollHeight - window.innerHeight;
        if (scrollTop + 50 >= diff && !isLoading.value) {
          dispatchGetPokemon();
        }
      }
    };
    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return { pokemons, isLoading };
  },
  render() {
    return (
      <>
        <div class="pokemon-list">
          {this.pokemons.map((pokemon) => (
            <PokemonCard
              {...{
                pokemon,
                onClick: () => {
                  this.$router.push({ name: "Detail", params: { name: pokemon.name } });
                },
              }}
            />
          ))}
        </div>
        {this.isLoading && <div class="pokemon-list__loader loader-dual-ring"></div>}
      </>
    );
  },
});
