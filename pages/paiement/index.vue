<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePaiementStore } from "~/store/paiement";

useHead({ title: "Paiements" });
definePageMeta({
  middleware: ["auth", "nuxt-permissions"],
  roles: [rolesNames.admin, rolesNames.financial],
});
const links = [
  { path: "/", title: "Acceuil" },
  { path: "#", title: "Paiements" },
];
const { getPaginate, getSearch, trash } = usePaiementStore();
const { liste, loading } = storeToRefs(usePaiementStore());
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
const { handleDelete, handleEdit, handleShow, modal } = useHandleCrudButtons(trash);

const classStatus = (state: string) => {
  return state === statusValidable.wait ? "warning" : "success";
};
</script>

<template>
  <div class="page-content">
    <div class="container-fluid">
      <!-- start page title -->
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <StructurePageHeader :breadcrumbs="links" title="Paiements">
                <template #options>
                  <el-button @click="modal.create = true" plain type="primary">Ajouter</el-button>
                </template>
                <StructureSearchServer
                  :loaded-search="loadedSearch"
                  :search-exists="searchExists"
                  @on-search="search"
                  @on-refresh="setRefresh"
                >
                  <template #searching>
                    <el-input v-model="toSearch" placeholder="code, statut, date" />
                  </template>
                </StructureSearchServer>
                <el-table
                  v-loading="loading.index"
                  :data="liste?.data"
                  style="width: 100%"
                  empty-text="aucun paiement"
                >
                  <el-table-column prop="code" label="Code" width="100" />
                  <el-table-column prop="montant" label="Montant" sortable>
                    <template #default="scope">
                      {{ useCurrency(scope.row.montant) }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="payable_type" label="Type" sortable>
                    <template #default="scope">
                      <el-tag type="info">{{ scope.row.payable_type }}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="status" label="Statut">
                    <template #default="scope">
                      <el-tag :type="classStatus(scope.row.status)">{{ scope.row.status }}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="created_at" label="Date" sortable />
                  <el-table-column align="right">
                    <template #header>
                      <span>Option</span>
                    </template>
                    <template #default="scope">
                      <el-button type="info" @click="handleShow(scope.row)" plain circle
                        ><i class="bx bx-show"
                      /></el-button>
                      <el-button
                        type="primary"
                        v-if="scope.row.status === statusValidable.wait"
                        @click="handleEdit(scope.row)"
                        plain
                        circle
                        ><i class="bx bx-edit"
                      /></el-button>
                      <el-button
                        v-role="rolesNames.admin"
                        type="danger"
                        @click="
                          handleDelete(
                            scope.row,
                            `Voulez vous réelement supprimer le paiement ${scope.row.code}`
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
              <PaiementCreateModal v-model="modal.create" />
              <LazyPaiementEditModal
                :id="modal.edit.id"
                v-if="modal.edit.dialog"
                v-model="modal.edit.dialog"
              />
              <LazyPaiementShowModal
                v-model="modal.show.dialog"
                v-if="modal.show.dialog"
                :id="modal.show.id"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- end page title -->
    </div>
    <!-- container-fluid -->
  </div>
</template>
