<template>
  <div class="page-content" v-loading="loading">
    <div class="container-fluid">
      <div class="row">
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
          <!-- <DashboardPieCardComponent
            :size="350"
            :series-option="locationsOptions"
            titre="Locations"
          ></DashboardPieCardComponent> -->
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
          <DashboardAmountCardComponent titre="Remboursement" :montant="7.568" icon="bx bx-group" />
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
const proprietesOptions = ref([
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
      { value: 500, name: "appartements" },
      { value: 800, name: "terrains" },
    ],
  },
]);
// const locationsOptions = ref([
//   {
//     name: "montant des :",
//     type: "pie",
//     center: ["50%", "50%"],
//     roseType: "radius",
//     itemStyle: { borderRadius: 8 },
//     labelLine: { show: false },
//     data: [
//       { value: 5000, name: "Visites" },
//       { value: 4500, name: "Frais de dossier" },
//       { value: 12000, name: "Frais d'agence" },
//       { value: 15000, name: "Cautions" },
//       { value: 20000, name: "Avances" },
//     ],
//   },
// ]);
const { getAll } = useDashboardStore();
const { loading, dashboard } = storeToRefs(useDashboardStore());
await getAll();
</script>

<style scoped></style>
