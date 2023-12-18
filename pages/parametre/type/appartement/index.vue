<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useTypeAppartementStore } from "@/store/appartement";

useHead({ title: "Types appartements" });
definePageMeta({ middleware: "auth" });
const links = [
  { path: "/", title: "Acceuil" },
  { path: "#", title: "Types d'appartements" },
];
const { getAll, trash } = useTypeAppartementStore();
const { types, loading } = storeToRefs(useTypeAppartementStore());
getAll();
const { filterTableData, setPage, search, total, pageSize } = useTypeFilterPagination(types);
const { onPrint } = useTypePrinter(types);
const { handleDelete, handleEdit, modal } = useHandleCrudButtons(trash);
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
                title="Appartements"
                subtitle="riya-immobiler"
                :extra="{ exist: true, create: true, print: true }"
                @print="onPrint"
                @create="modal.create = true"
              >
                <el-input v-model="search" class="w-50 mt-1 mb-2" placeholder="Rechercher" />
                <el-table
                  v-loading="loading.index"
                  :data="filterTableData"
                  style="width: 100%"
                  empty-text="auncun type d'appartement"
                >
                  <el-table-column prop="nom" label="Nom" sortable />
                  <el-table-column prop="created_at" label="Date" width="300" sortable />
                  <el-table-column align="right" width="280">
                    <template #header>
                      <span>Option</span>
                    </template>
                    <template #default="scope">
                      <el-button type="primary" @click="handleEdit(scope.row)" plain circle
                        ><i class="bx bx-edit"
                      /></el-button>
                      <el-button
                        type="danger"
                        @click="
                          handleDelete(
                            scope.row,
                            `Voulez vous réelement supprimer ${scope.row.nom_complet}`
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
              <AppartementTypeCreateModal v-model="modal.create" />
              <AppartementTypeEditModal
                :id="modal.edit.id"
                v-if="modal.edit.dialog"
                v-model="modal.edit.dialog"
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
