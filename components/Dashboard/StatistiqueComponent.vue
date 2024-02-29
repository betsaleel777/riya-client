<script lang="ts" setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([CanvasRenderer, BarChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent]);

const color = useColorMode();
provide(THEME_KEY, color.preference);

const option = ref({
  title: { left: "center" },
  legend: {},
  tooltip: {},
  yAxis: { type: "value" },
  xAxis: { type: "category", data: ["09-2023", "10-2023", "11-2023", "12-2023"] },
  series: [
    {
      type: "bar",
      name: "ventes",
      data: [89.3, 92.1, 94.4, 85.4],
      emphasis: {
        focus: "series",
      },
      barWidth: 10,
    },
    {
      type: "bar",
      name: "locations",
      data: [97.7, 83.1, 92.5, 78.1],
      emphasis: {
        focus: "series",
      },
      barWidth: 10,
    },
    {
      type: "bar",
      name: "loyers",
      data: [95.8, 89.4, 91.2, 76.9],
      emphasis: {
        focus: "series",
      },
      barWidth: 10,
    },
  ],
});
const openDateModal = reactive({ range: false, date: false });
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="d-sm-flex flex-wrap">
        <h4 class="card-title mb-4">Statistiques d'applications</h4>
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
              <a class="dropdown-item" href="#">Rafraîchir</a>
              <a @click="openDateModal.date = true" class="dropdown-item" href="#"> Par date </a>
              <a @click="openDateModal.range = true" class="dropdown-item" href="#"
                >Par intervale de date</a
              >
            </div>
          </div>
          <DashboardDateRangeSelectorModal v-model="openDateModal.range" />
          <DashboardDateSelectorModal v-model="openDateModal.date" />
        </div>
      </div>
      <v-chart class="chart" :option="option" />
    </div>
  </div>
</template>

<style scoped>
.chart {
  height: 350px;
}
</style>
