<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useDetteStore } from "~/store/dette";
import { statusPayable } from "~/utils/constante";
import { Dette } from "~/types/dette";

useHead({ title: "Dette" });
definePageMeta({
  middleware: ["auth", "nuxt-permissions"],
  roles: [rolesNames.financial, rolesNames.admin],
});
const links = [
  { path: "/", title: "Acceuil" },
  { path: "#", title: "Dettes" },
];
const { getPaginate, getSearch, repay } = useDetteStore();
const { liste, loading } = storeToRefs(useDetteStore());
getPaginate();
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
</script>

<template>
  <div class="page-content">
    <div class="container-fluid">
      <!-- start page title -->
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <StructurePageHeader :breadcrumbs="links" title="Dettes">
                <StructureSearchServer
                  :loaded-search="loadedSearch"
                  :search-exists="searchExists"
                  @on-search="search"
                  @on-refresh="setRefresh"
                >
                  <template #searching>
                    <el-input v-model="toSearch" placeholder="Code, Contrat, Date et statut" />
                  </template>
                </StructureSearchServer>
                <el-table
                  v-loading="loading.index"
                  :data="liste?.data"
                  style="width: 100%"
                  empty-text="Aucune dette"
                >
                  <el-table-column prop="code" label="Code" width="100" />
                  <el-table-column prop="origine_code" label="Contrat">
                    <template #default="scope">
                      <el-link type="primary">{{ scope.row.origine_code }}</el-link>
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
                      <el-tag
                        :type="classStatus(scope.row.status) as '' | 'success' | 'warning' | 'info' | 'danger'"
                        >{{ scope.row.status }}</el-tag
                      >
                    </template>
                  </el-table-column>
                  <el-table-column prop="created_at" label="Date" sortable />
                  <el-table-column width="100" align="right">
                    <template #header>
                      <span>Option</span>
                    </template>
                    <template #default="scope">
                      <el-button type="info" plain circle @click="runShowModal(scope.row.id)"
                        ><i class="bx bx-show"
                      /></el-button>
                      <el-button
                        v-if="scope.row.status === statusPayable.unpaid"
                        type="primary"
                        @click="handleRepay(scope.row)"
                        plain
                        circle
                        ><i class="bx bx-dollar"
                      /></el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-pagination
                  small
                  background
                  layout="prev, pager, next"
                  :total="total"
                  class="mt-4"
                  justify="center"
                  v-model:page-size="pageSize"
                  v-model:current-page="currentPage"
                  @current-change="setPage"
                  hide-on-single-page
                />
              </StructurePageHeader>
              <LazyDetteShowModal :id="show.id" v-model="show.enable" v-if="show.enable" />
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
