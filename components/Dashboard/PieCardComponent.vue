<script lang="ts" setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import type { PieSeriesOption } from "echarts/types/dist/shared";
import { TitleComponent, TooltipComponent, LegendComponent } from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

const props = defineProps<{ titre: string; seriesOption: PieSeriesOption; size: number }>();
use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent]);
const color = useColorMode();
provide(THEME_KEY, color.preference);

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
        <div class="ms-auto">
          <div class="dropdown ms-auto">
            <a
              class="text-muted font-size-16"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
            >
              <i class="mdi mdi-dots-horizontal"></i>
            </a>

            <div class="dropdown-menu dropdown-menu-end">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Separated link</a>
            </div>
          </div>
        </div>
      </div>
      <v-chart :style="{ height: props.size + 'px' }" :option="option" />
    </div>
  </div>
</template>

<style scoped></style>
