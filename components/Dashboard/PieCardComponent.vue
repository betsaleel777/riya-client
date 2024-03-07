<script lang="ts" setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import type { PieSeriesOption } from "echarts/types/dist/shared";
import { TitleComponent, TooltipComponent, LegendComponent } from "echarts/components";
import VChart from "vue-echarts";

const props = defineProps<{ titre: string; seriesOption: PieSeriesOption; size: number }>();
use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent]);
const color = useColorMode();

const option = ref({
  tooltip: {
    trigger: "item",
  },
  legend: {
    left: "center",
  },
  series: props.seriesOption,
});
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="d-sm-flex flex-wrap">
        <h4 class="card-title mb-4">{{ props.titre }}</h4>
        <slot name="options" />
      </div>
      <v-chart
        :style="{ height: props.size + 'px' }"
        :option="option"
        autoresize
        :theme="color.preference"
      />
    </div>
  </div>
</template>

<style scoped></style>
