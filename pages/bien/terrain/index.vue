<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useTerrainStore } from "~/store/terrain";

useHead({ title: "Terrain" });
definePageMeta({ middleware: "auth" });
const links = [
  { path: "/", title: "Acceuil" },
  { path: "#", title: "Terrains" },
];
const { getAll, trash } = useTerrainStore();
const { terrains, loading } = storeToRefs(useTerrainStore());
getAll();
const { filterTableData, setPage, search, total, pageSize } = useTerrainFilterPagination(terrains);
const { onPrint } = useTerrainPrinter(terrains);
const { handleDelete, handleEdit, handleShow, modal } = useHandleCrudButtons(trash);
const classType = (status: string) => {
  return status === statusBien.busy ? "danger" : "success";
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
                title="Terrains"
                :extra="{ exist: true, create: true, print: true }"
                @print="onPrint"
                @create="modal.create = true"
              >
                <el-input v-model="search" class="w-50 mt-1" placeholder="Rechercher" />
                <el-table v-loading="loading.index" :data="filterTableData" style="width: 100%">
                  <el-table-column prop="nom" label="Nom" sortable>
                    <template #default="scope">
                      {{ scope.row.nom.toUpperCase() }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="quartier" label="Quartier" width="200" sortable />
                  <el-table-column prop="type" label="Type" sortable width="200">
                    <template #default="scope">
                      <span v-if="scope.row.type">{{ scope.row.type }}</span>
                      <el-tag v-else type="info">Aucun type</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="proprietaire" label="proprietaire" />
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
              <TerrainCreateModal v-model="modal.create" />
              <LazyTerrainEditModal
                :id="modal.edit.id"
                v-if="modal.edit.dialog"
                v-model="modal.edit.dialog"
              />
              <LazyTerrainShowModal
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
