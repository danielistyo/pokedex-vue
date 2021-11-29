import { defineComponent, PropType } from "vue";
import "./DetailHeader.scss";

export default defineComponent({
  name: "DetailHeader",
  props: {
    onClick: {
      type: Function as PropType<(payload: MouseEvent) => void>,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  render() {
    return (
      <div class="detail-header">
        <svg style="transform:scaleX(-1)" viewBox="0 0 24 24" class="vPAYyf detail-header__back" onClick={this.onClick}>
          <path d="M8.59,16.59L13.17,12L8.59,7.41L10,6l6,6l-6,6L8.59,16.59z"></path>
        </svg>
        <span class="detail-header__name" onClick={this.onClick}>
          BACK
        </span>
      </div>
    );
  },
});
