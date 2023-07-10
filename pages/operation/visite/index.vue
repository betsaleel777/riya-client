<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useVisiteStore } from "~/store/visite";
import { statusValidable } from "~/utils/constante";

useHead({ title: "Visites" });
definePageMeta({ middleware: "auth" });
const links = [
  { path: "/", title: "Acceuil" },
  { path: "#", title: "Visites" },
];
const { getAll, trash } = useVisiteStore();
const { visites, loading } = storeToRefs(useVisiteStore());
getAll();
const { filterTableData, setPage, search, total, pageSize } = useVisiteFilterPagination(visites);
const { onPrint } = useVisitePrinter(visites);
const { handleDelete, handleEdit, handleShow, modal } = useHandleCrudButtons(trash);
const classType = (status: string) => {
  return status === statusValidable.wait ? "warning" : "success";
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
              <StructurePageHeader
                :breadcrumbs="links"
                title="Visites"
                :extra="{ exist: true, create: true, print: true }"
                @print="onPrint"
                @create="modal.create = true"
              >
                <el-input v-model="search" class="w-50 my-1" placeholder="Rechercher" />
                <el-table
                  v-loading="loading.index"
                  :data="filterTableData"
                  style="width: 100%"
                  empty-text="aucune visite"
                >
                  <el-table-column prop="code" label="Code" width="100" />
                  <el-table-column prop="personne" label="Client" sortable />
                  <el-table-column
                    prop="frais"
                    label="Frais agence"
                    align="center"
                    width="150"
                    sortable
                  >
                    <template #default="scope">
                      {{ scope.row.frais * scope.row.loyer }} FCFA
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="caution"
                    label="Caution"
                    align="center"
                    width="150"
                    sortable
                  >
                    <template #default="scope">
                      {{ scope.row.caution * scope.row.loyer }} FCFA
                    </template>
                  </el-table-column>
                  <el-table-column prop="avance" label="Avance" align="center" width="150" sortable>
                    <template #default="scope">
                      {{ scope.row.avance * scope.row.loyer }} FCFA
                    </template>
                  </el-table-column>
                  <el-table-column prop="status" label="Statut" width="150">
                    <template #default="scope">
                      <el-tag :type="classType(scope.row.status)">{{ scope.row.status }}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="created_at" label="Date" width="110" sortable />
                  <el-table-column width="150" align="right">
                    <template #header>
                      <span>Option</span>
                    </template>
                    <template #default="scope">
                      <el-button type="info" @click="handleShow(scope.row)" plain circle
                        ><i class="bx bx-show"
                      /></el-button>
                      <el-button
                        v-if="scope.row.status === statusValidable.wait"
                        type="primary"
                        @click="handleEdit(scope.row)"
                        plain
                        circle
                        ><i class="bx bx-edit"
                      /></el-button>
                      <el-button
                        type="danger"
                        @click="
                          handleDelete(
                            scope.row,
                            `Voulez vous réelement supprimer la visite ${scope.row.code}`
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
                  @current-change="setPage"
                  hide-on-single-page
                />
              </StructurePageHeader>
              <VisiteCreateModal v-model="modal.create" />
              <VisiteEditModal
                :id="modal.edit.id"
                v-if="modal.edit.dialog"
                v-model="modal.edit.dialog"
              />
              <VisiteShowModal
                :id="modal.show.id"
                v-if="modal.show.dialog"
                v-model="modal.show.dialog"
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

<style scoped></style>
