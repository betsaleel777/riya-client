<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useLoyerStore } from "~/store/loyer";
import { Loyer } from "~/types/loyer";

useHead({ title: "Loyer" });
definePageMeta({
  middleware: ["auth", "nuxt-permissions"],
  roles: [rolesNames.employee, rolesNames.admin],
});
const links = [
  { path: "/", title: "Acceuil" },
  { path: "#", title: "Loyers" },
];
const { getPaginate, getSearch, trash } = useLoyerStore();
const { liste, loading } = storeToRefs(useLoyerStore());
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
const { handleDelete, handleShow, modal } = useHandleCrudButtons(trash);
const cashing = reactive({ active: false, id: 0 });
const classStatus = (status: string) => {
  const classes = {
    [statusPayable.pending as string]: "warning",
    [statusPayable.paid as string]: "success",
    [statusPayable.unpaid as string]: "danger",
  };
  return classes[status];
};
const handleCashed = (loyer: Loyer) => {
  ElMessageBox.confirm(
    `Voulez vous confirmer l'encaissement du loyer ${loyer.code}`,
    "Confirmation d'encaissement",
    {
      confirmButtonText: "confirmer",
      cancelButtonText: "abandonner",
      type: "warning",
    }
  ).then(() => {
    cashing.id = loyer.id!;
    cashing.active = true;
  });
};
const openAvanceModal = ref(false);
</script>

<template>
  <div class="page-content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <StructurePageHeader :breadcrumbs="links" title="Loyers">
                <template #options>
                  <el-button @click="openAvanceModal = true" plain type="primary"
                    >Avance sur loyer</el-button
                  >
                </template>
                <StructureSearchServer
                  :loaded-search="loadedSearch"
                  :search-exists="searchExists"
                  @on-search="search"
                  @on-refresh="setRefresh"
                >
                  <template #searching>
                    <el-input v-model="toSearch" placeholder="Code, Client, Bien, Date et statut" />
                  </template>
                </StructureSearchServer>
                <el-table
                  v-loading="loading.index"
                  :data="liste?.data"
                  class="w-100"
                  empty-text="aucun Loyer"
                >
                  <el-table-column prop="code" label="Code" width="100" />
                  <el-table-column show-overflow-tooltip prop="client" label="Client" />
                  <el-table-column show-overflow-tooltip prop="bien" label="Bien" />
                  <el-table-column
                    prop="montant"
                    label="Montant"
                    align="center"
                    width="150"
                    sortable
                  >
                    <template #default="scope"> {{ useCurrency(scope.row.montant) }} </template>
                  </el-table-column>
                  <el-table-column prop="paid" label="Versé" align="center" width="150" sortable>
                    <template #default="scope"> {{ useCurrency(scope.row.paid) }} </template>
                  </el-table-column>
                  <el-table-column prop="status" label="Statut" width="150">
                    <template #default="scope">
                      <el-tag
                        :type="classStatus(scope.row.status) as '' | 'warning' | 'success' | 'danger' | 'info'"
                      >
                        {{ scope.row.status }}
                      </el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="created_at" label="Date" width="150" />
                  <el-table-column align="right">
                    <template #header>
                      <span>Option</span>
                    </template>
                    <template #default="scope">
                      <el-button type="info" @click="handleShow(scope.row)" plain circle
                        ><i class="bx bx-show"
                      /></el-button>
                      <el-button
                        v-if="!scope.row.pending && scope.row.status === statusPayable.unpaid"
                        type="primary"
                        @click="handleCashed(scope.row)"
                        plain
                        circle
                        ><i class="bx bx-dollar"
                      /></el-button>
                      <el-button
                        v-role="rolesNames.admin"
                        type="danger"
                        @click="
                          handleDelete(
                            scope.row,
                            `Voulez vous réelement supprimer le loyer ${scope.row.code}`
                          )
                        "
                        plain
                        circle
                        ><i class="bx bx-trash"
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
              <LazyLoyerShowModal
                :id="modal.show.id"
                v-if="modal.show.dialog"
                v-model="modal.show.dialog"
              />
              <LazyLoyerAmountComponent
                :id="cashing.id"
                v-if="cashing.active"
                v-model="cashing.active"
              />
              <LazyLoyerAvanceCreateModal v-if="openAvanceModal" v-model="openAvanceModal" />
            </div>
          </div>
        </div>
      </div>
    </div>
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
