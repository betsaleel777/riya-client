<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useDetteStore } from "~/store/dette";
import { statusPayable, rolesNames, operation } from "~/utils/constante";
import type { Dette } from "~/types/dette";
import type { Variant } from "~/types/global";
import { useCurrency } from "~/composables/numeral";

useHead({ title: "Dette" });
definePageMeta({
  middleware: ["auth", "nuxt-permissions"],
  roles: [rolesNames.financial, rolesNames.admin],
});
const links = [
  { path: "/", title: "Acceuil" },
  { path: "#", title: "Dettes" },
];
const detteStore = useDetteStore();
const { getPaginate, getSearch, repay, fetchStats } = detteStore;
const { liste, loading, stats } = storeToRefs(detteStore);
getPaginate();
fetchStats();
const {
  setPage,
  setRefresh,
  search,
  currentPage,
  searchExists,
  loadedSearch,
  total,
  pageSize,
  toSearch,
} = useServerPagination(liste, getPaginate, getSearch);
const classStatus = (status: string) => {
  const classes = {
    [statusPayable.pending as string]: "warning",
    [statusPayable.paid as string]: "success",
    [statusPayable.unpaid as string]: "danger",
  };
  return classes[status];
};
const handleRepay = (dette: Dette) => {
  ElMessageBox.confirm(
    `Voulez vous confirmer le remboursement de la dette: ${dette.code}`,
    "Confirmation du versement",
    {
      confirmButtonText: "confirmer",
      cancelButtonText: "abandonner",
      type: "warning",
    }
  ).then(async () => {
    const message = await repay(dette.id!);
    ElNotification.success({ title: "succès", message });
  });
};
const { runShowModal, show } = useShowModal();
const { runOperationShowModal, details } = useOperationShowModal();
const statsSafe = computed(() => {
  if (stats.value) return stats.value;
  return {
    [operation.purchase]: { paid: { amount: 0, percentage: 0 }, unpaid: { amount: 0, percentage: 0 }, pending: { amount: 0, percentage: 0 } },
    [operation.rent]: { paid: { amount: 0, percentage: 0 }, unpaid: { amount: 0, percentage: 0 }, pending: { amount: 0, percentage: 0 } },
    [operation.visit]: { paid: { amount: 0, percentage: 0 }, unpaid: { amount: 0, percentage: 0 }, pending: { amount: 0, percentage: 0 } },
  }
});
const roles = useRoles();
const hasRequiredRoles = computed(() => {
  const userRoles = roles.value || [];
  return userRoles.includes(rolesNames.admin) || userRoles.includes(rolesNames.financial);
});
</script>

<template>
  <div class="page-content">
    <div class="container-fluid">
      <!-- start page title -->
      <div class="row">
        <template v-for="key in Object.keys(statsSafe)" :key="key">
          <div class="col-sm-4">
            <LazyDetteStatCard v-if="hasRequiredRoles" :stats="statsSafe[key as keyof typeof statsSafe]"
              :loading="loading.stats" :operation="key">
              <template #unpaid-text>
                <span>Reste à rembourser sur {{ key }}</span>
              </template>
              <template #pending-text>
                <span>Remboursement en attente sur {{ key }}</span>
              </template>
              <template #paid-text>
                <span>Remboursement effectué sur {{ key }}</span>
              </template>
              <template #icon>
                <el-icon class="text-white" size="18" v-if="key === operation.purchase">
                  <ElIconMoney />
                </el-icon>
                <el-icon class="text-white" size="18" v-else-if="key === operation.rent">
                  <ElIconWallet />
                </el-icon>
                <el-icon class="text-white" size="18" v-else-if="key === operation.visit">
                  <ElIconClock />
                </el-icon>
              </template>
            </LazyDetteStatCard>
          </div>
        </template>
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <StructurePageHeader :breadcrumbs="links" title="Dettes">
                <StructureSearchServer :loaded-search="loadedSearch" :search-exists="searchExists" @on-search="search"
                  @on-refresh="setRefresh">
                  <template #searching>
                    <el-input v-model="toSearch" placeholder="Code, Contrat, Date et statut" />
                  </template>
                </StructureSearchServer>
                <el-table v-loading="loading.index" :data="liste?.data as Dette[]" style="width: 100%"
                  empty-text="Aucune dette">
                  <el-table-column prop="code" label="Code" width="100" />
                  <el-table-column prop="origine_code" label="Contrat">
                    <template #default="{ row }">
                      <el-link @click="
                        runOperationShowModal(
                          parseInt(row.origine_id),
                          row.origine_type.toLowerCase()
                        )
                        " type="primary">{{ row.origine_code }}</el-link>
                    </template>
                  </el-table-column>
                  <el-table-column prop="origine_type" label="Dette sur">
                    <template #default="scope">
                      <el-tag type="info">{{ scope.row.origine_type }}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="montant" label="Montant" align="center" sortable>
                    <template #default="scope">
                      {{ useCurrency(scope.row.montant) }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="status" label="Statut">
                    <template #default="scope">
                      <el-tag :type="classStatus(scope.row.status) as Variant">{{
                        scope.row.status
                      }}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="created_at" label="Date" sortable />
                  <el-table-column width="100" align="right">
                    <template #header>
                      <span>Option</span>
                    </template>
                    <template #default="scope">
                      <el-button type="info" plain circle @click="runShowModal(scope.row.id)"><i
                          class="bx bx-show" /></el-button>
                      <el-button v-if="scope.row.status === statusPayable.unpaid" type="primary"
                        @click="handleRepay(scope.row)" plain circle><i class="bx bx-dollar" /></el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination small background layout="prev, pager, next" :total="total" class="mt-4" justify="center"
                  v-model:page-size="pageSize" v-model:current-page="currentPage" @current-change="setPage"
                  hide-on-single-page />
              </StructurePageHeader>
              <LazyDetteShowModal :id="show.id" v-model="show.enable" v-if="show.enable" />
              <LazyLoyerShowModal :id="details.loyer.id" v-if="details.loyer.dialog" v-model="details.loyer.dialog" />
              <LazyAchatShowModal :id="details.achat.id" v-if="details.achat.dialog" v-model="details.achat.dialog"
                :from-validation-page="false" />
              <LazyVisiteShowModal :id="details.visite.id" v-if="details.visite.dialog" v-model="details.visite.dialog"
                :from-validation-page="true" />
            </div>
          </div>
        </div>
      </div>
      <!-- end page title -->
    </div>
    <!-- container-fluid -->
  </div>
</template>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 2.3em;
}
</style>
