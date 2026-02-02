<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useDepenseStore } from "~/store/depense";
import { useCurrency } from "~/composables/numeral";

useHead({ title: "Depenses" });
definePageMeta({
  middleware: ["auth", "nuxt-permissions"],
  roles: [rolesNames.financial, rolesNames.admin],
});
const { user } = useAuth();
const roles = useRoles();
roles.value = user.roles;
const hasAdminRole = computed(() => roles.value.includes(rolesNames.admin));
const links = [
  { path: "/", title: "Acceuil" },
  { path: "#", title: "Dépenses" },
];
const { getPaginate, getSearch, trash, fetchStats } = useDepenseStore();
const { liste, loading, stats } = storeToRefs(useDepenseStore());
getPaginate();
if (hasAdminRole.value) fetchStats();
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
const { handleDelete, handleEdit, handleShow, modal } = useHandleCrudButtons(trash);
const statusClass = (status: string) => {
  return status === statusValidable.wait ? "warning" : "success";
};
const statsSafe = computed(() => {
  if (stats.value) return stats.value;
  return {
    depenses: { title: "Dépenses", amount: 0, percentage: 0, text: "" },
    recettes: { title: "Recettes", amount: 0, percentage: 0, text: "" },
    solde: { title: "Solde", amount: 0, percentage: 0, text: "" },
  };
});
</script>

<template>
  <div class="page-content">
    <div class="container-fluid">
      <!-- start page title -->
      <div class="row">
        <template v-for="(item, key) in statsSafe" :key="key">
          <div class="col-sm-4">
            <LazyDashboardStatCard v-if="hasAdminRole" :stat="item" :loading="loading.stats">
              <template #icon>
                <el-icon class="text-white" size="18" v-if="key === 'depenses'">
                  <ElIconCreditCard />
                </el-icon>
                <el-icon class="text-white" size="18" v-else-if="key === 'recettes'">
                  <ElIconMoney />
                </el-icon>
                <el-icon class="text-white" size="18" v-else>
                  <ElIconWallet />
                </el-icon>
              </template>
            </LazyDashboardStatCard>
          </div>
        </template>
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <StructurePageHeader :breadcrumbs="links" title="Dépenses">
                <template #options>
                  <el-button @click="modal.create = true" plain type="primary">Ajouter</el-button>
                </template>
                <StructureSearchServer :loaded-search="loadedSearch" :search-exists="searchExists" @on-search="search"
                  @on-refresh="setRefresh">
                  <template #searching>
                    <el-input v-model="toSearch" placeholder="titre, type, statut, date" />
                  </template>
                </StructureSearchServer>
                <el-table v-loading="loading.index" :data="liste?.data" style="width: 100%" empty-text="aucune dépense">
                  <el-table-column prop="titre" label="Titre" sortable>
                    <template #default="scope">
                      {{ scope.row.titre }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="type" label="Type" width="200">
                    <template #default="scope">
                      <el-tooltip :content="scope.row.type" placement="right">
                        <el-text type="primary" truncated>{{ scope.row.type }}</el-text>
                      </el-tooltip>
                    </template>
                  </el-table-column>
                  <el-table-column prop="montant" label="Montant" width="200">
                    <template #default="scope"> {{ useCurrency(scope.row.montant) }} </template>
                  </el-table-column>
                  <el-table-column prop="status" label="Statut" width="150">
                    <template #default="scope">
                      <el-tag :type="statusClass(scope.row.status)">{{ scope.row.status }}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="created_at" label="Date" width="150" sortable />
                  <el-table-column align="right" width="150">
                    <template #header>
                      <span>Option</span>
                    </template>
                    <template #default="scope">
                      <el-button type="info" @click="handleShow(scope.row)" plain circle><i
                          class="bx bx-show" /></el-button>
                      <el-button type="primary" v-if="scope.row.status === statusValidable.wait"
                        @click="handleEdit(scope.row)" plain circle><i class="bx bx-edit" /></el-button>
                      <el-button v-show="hasAdminRole" type="danger" @click="
                        handleDelete(
                          scope.row,
                          `Voulez vous réelement supprimer ${scope.row.titre}`
                        )
                        " plain circle><i class="bx bx-trash" /></el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination small background layout="prev, pager, next" :total="total" class="mt-4" justify="center"
                  v-model:page-size="pageSize" v-model:current-page="currentPage" @current-change="setPage"
                  hide-on-single-page />
              </StructurePageHeader>
              <DepenseCreateModal v-model="modal.create" />
              <LazyDepenseEditModal :id="modal.edit.id" v-if="modal.edit.dialog" v-model="modal.edit.dialog" />
              <LazyDepenseShowModal :id="modal.show.id" v-if="modal.show.dialog" v-model="modal.show.dialog" />
            </div>
          </div>
        </div>
      </div>
      <!-- end page title -->
    </div>
    <!-- container-fluid -->
  </div>
</template>

<style scoped></style>
