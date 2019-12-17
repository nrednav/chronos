<script lang="ts">
import Vue from "vue";
import { Line } from "vue-chartjs";

export default Vue.extend({
  extends: Line,
  props: ["chartdata", "options"],
  mounted() {
    // @ts-ignore
    this.renderChart(this.chartdata, this.options);
  }
});
</script>
