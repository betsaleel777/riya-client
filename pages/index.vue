<template>
  <div class="page-content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12">
          <div class="row">
            <div class="col-lg-2">
              <DashboardCounterCardComponent
                titre="Clients"
                :nombre="150"
                icon="bx bxs-book-bookmark"
              />
            </div>
            <div class="col-lg-2">
              <DashboardCounterCardComponent
                titre="Locataires"
                :nombre="100"
                icon="bx bxs-book-bookmark"
              />
            </div>
            <div class="col-lg-2">
              <DashboardCounterCardComponent
                :nombre="20"
                icon="bx bxs-book-bookmark"
                titre="biens"
              />
            </div>
            <div class="col-lg-2">
              <DashboardCounterCardComponent
                :nombre="10"
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
                      <el-progress :percentage="45" color="#556ee6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <DashboardStatistiqueComponent />
        </div>
        <div class="col-lg-4">
          <DashboardAmountCardComponent
            titre="Chiffre d'affaire"
            :montant="10.568"
            icon="bx bx-group"
          />
          <DashboardAmountCardComponent titre="Dépenses" :montant="5.568" icon="bx bx-group" />
          <DashboardAmountCardComponent titre="Remboursement" :montant="7.568" icon="bx bx-group" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: "Dashboard" });
definePageMeta({ middleware: "auth" });
</script>

<style scoped></style>
