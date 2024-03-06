<template>
  <div class="page-content">
    <div class="container-fluid" v-loading="loading.dashboard">
      <div class="row" v-if="!loading.dashboard">
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
                titre="Biens"
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
          <DashboardStatistiqueComponent
            titre="Statistiques des paiements"
            :donnees="statistiquesPaiementsOptions"
          />
          <DashboardStatistiqueComponent
            titre="Statistiques des locations"
            :donnees="statistiquesLocationsOptions"
          />
          <div class="row">
            <div class="col-lg-6">
              <DashboardPieCardComponent
                :size="200"
                :series-option="proprietesOptions"
                titre="Propriétés"
              ></DashboardPieCardComponent>
            </div>
            <div class="col-lg-6">
              <DashboardPieCardComponent
                :size="200"
                :series-option="locatairesOptions"
                titre="Statut des contrats"
              >
              </DashboardPieCardComponent>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <DashboardAmountCardComponent
            titre="Chiffre d'affaire"
            :montant="dashboard?.chiffres"
            icon="bx bx-money"
            ><template #options>
              <DashboardOptionComponent type="chiffres" />
            </template>
          </DashboardAmountCardComponent>
          <DashboardAmountCardComponent
            titre="Dépenses"
            :montant="dashboard?.depenses"
            icon="bx bx-dollar"
          >
            <template #options>
              <DashboardOptionComponent type="depenses" />
            </template>
          </DashboardAmountCardComponent>
          <DashboardAmountCardComponent
            titre="Dettes"
            :montant="dashboard?.remboursements"
            icon="bx bx-wallet"
          >
            <template #options>
              <DashboardOptionComponent type="dettes" />
            </template>
          </DashboardAmountCardComponent>
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

const { user } = useAuth();
const roles = useRoles();
roles.value = user.roles;

const { getAll } = useDashboardStore();
const { loading, dashboard } = storeToRefs(useDashboardStore());
getAll();
const {
  locatairesOptions,
  proprietesOptions,
  statistiquesLocationsOptions,
  statistiquesPaiementsOptions,
} = useDashboardOptions(dashboard);
</script>

<style scoped></style>
