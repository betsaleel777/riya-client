<script lang="ts" setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import type { BarSeriesOption } from "echarts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import VChart from "vue-echarts";

const props = defineProps<{
  donnees: { dates: string[]; series: BarSeriesOption };
  titre: string;
}>();

use([CanvasRenderer, BarChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent]);

const color = useColorMode();

const option = ref({
  title: { left: "center" },
  legend: {},
  tooltip: {},
  yAxis: { type: "value" },
  xAxis: { type: "category", data: props.donnees.dates },
  series: props.donnees.series,
});
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="d-sm-flex flex-wrap">
        <h4 class="card-title mb-4">{{ props.titre }}</h4>
      </div>
      <v-chart class="chart" :option="option" :theme="color.preference" autoresize />
    </div>
  </div>
</template>

<style scoped>
.chart {
  height: 350px;
}
</style>
