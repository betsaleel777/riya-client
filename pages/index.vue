<template>
  <div class="page-content">
    <div class="container-fluid">
      <div class="row" v-loading="loading.dashboard">
        <div class="col-lg-12">
          <div class="row">
            <div class="col-lg-2">
              <DashboardCounterCardComponent
                titre="Clients"
                :nombre="dashboard?.clients"
                icon="bx bxs-book-bookmark"
              />
            </div>
            <div class="col-lg-2">
              <DashboardCounterCardComponent
                titre="Locataires"
                :nombre="dashboard?.locataires"
                icon="bx bxs-book-bookmark"
              />
            </div>
            <div class="col-lg-2">
              <DashboardCounterCardComponent
                :nombre="dashboard?.biens"
                icon="bx bxs-book-bookmark"
                titre="biens"
              />
            </div>
            <div class="col-lg-2">
              <DashboardCounterCardComponent
                :nombre="dashboard?.visites"
                icon="bx bxs-book-bookmark"
                titre="Visites"
              />
            </div>
            <div class="col-lg-4">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex">
                    <div class="flex-shrink-0 me-3">
                      <div class="text-muted">
                        <h5 class="mb-1">Taux d'occupation</h5>
                        <p class="mb-1">Terrains & maissons</p>
                      </div>
                    </div>
                    <div class="flex-grow-1 align-self-center">
                      <el-progress :percentage="dashboard?.taux" color="#556ee6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <DashboardStatistiqueComponent />
          <div class="row">
            <div class="col-lg-4">
              <DashboardPieCardComponent
                :size="200"
                :series-option="proprietesOptions"
                titre="Propriétés"
              ></DashboardPieCardComponent>
            </div>
            <div class="col-lg-4">
              <DashboardPieCardComponent
                :size="200"
                :series-option="locatairesOptions"
                titre="Encaissements Locataire"
              ></DashboardPieCardComponent>
            </div>
            <div class="col-lg-4">
              <DashboardSunburstCardComponent
                :colors="sunColorsTwo"
                :series-option="uptodateOption"
                titre="Loyers et Ventes"
              />
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <DashboardAmountCardComponent
            titre="Chiffre d'affaire"
            :montant="10.568"
            icon="bx bx-group"
          />
          <DashboardAmountCardComponent
            titre="Dépenses"
            :montant="dashboard?.depenses"
            icon="bx bx-group"
          />
          <DashboardAmountCardComponent
            titre="Remboursement"
            :montant="dashboard?.remboursements"
            icon="bx bx-group"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useDashboardStore } from "~/store/dashboard";
useHead({ title: "Dashboard" });
definePageMeta({ middleware: "auth" });

const { getAll } = useDashboardStore();
const { loading, dashboard } = storeToRefs(useDashboardStore());

const sunColorsTwo = ["#03071E", "#D00000", "#370617", "#F48C06", "#DC2F02"];
const uptodateOption = ref([
  {
    type: "sunburst",
    data: [
      {
        name: "Loyers",
        value: 600,
        children: [
          { name: "encaissé", value: 400 },
          { name: "à encaissé", value: 200 },
        ],
      },
      {
        name: "Ventes",
        value: 1000,
        children: [
          {
            name: "Terrains",
            value: 700,
            children: [
              { name: "encaissé", value: 250 },
              { name: "à encaissé", value: 450 },
            ],
          },
          {
            name: "Appartements",
            value: 300,
            children: [
              { name: "encaissé", value: 175 },
              { name: "à encaissé", value: 125 },
            ],
          },
        ],
      },
    ],
    levels: [
      {},
      { label: { show: false }, itemStyle: { borderWidth: 3 } },
      { label: { show: false }, itemStyle: { borderWidth: 2 } },
      { label: { show: false } },
    ],
  },
]);
const locatairesOptions = ref([
  {
    name: "locataires",
    type: "pie",
    label: {
      show: false,
      position: "center",
    },
    emphasis: {
      label: {
        show: true,
        fontSize: 14,
        fontWeight: "bold",
      },
    },
    labelLine: { show: false },
    data: [
      { value: 100, name: "à jours" },
      { value: 58, name: "non à jours" },
    ],
  },
]);
const proprietesOptions = computed(() => [
  {
    name: "propriétés de type",
    type: "pie",
    radius: ["40%", "70%"],
    avoidLabelOverlap: false,
    itemStyle: {
      borderRadius: 10,
      borderColor: "#fff",
      borderWidth: 2,
    },
    label: {
      show: false,
      position: "center",
    },
    emphasis: {
      label: {
        show: true,
        fontSize: 14,
        fontWeight: "bold",
      },
    },
    labelLine: { show: false },
    data: [
      { value: dashboard.value?.appartements, name: "appartements" },
      { value: dashboard.value?.terrains, name: "terrains" },
    ],
  },
]);
await getAll();
</script>

<style scoped></style>
