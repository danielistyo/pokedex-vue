import { maxStat } from "@/constants";
import { PokemonDetailStat } from "@/typings";
import "./DetailStat.scss";

type Props = { stats: Array<PokemonDetailStat>; type: string };
export default (props: Props): JSX.Element => {
  return (
    <>
      {props.stats.map((stat) => (
        <figure class="progress">
          <figcaption>
            <span class="progress__label">{stat.stat.name}</span>
            <span class="progress__value">{stat.base_stat}</span>
          </figcaption>
          <span class="progress__bar">
            <span
              class={`progress__bar-value bg${`--${props.type}`}`}
              style={`width: ${(stat.base_stat / maxStat) * 100}%;`}
            ></span>
          </span>
        </figure>
      ))}
    </>
  );
};
