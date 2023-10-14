<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProprietaireStore } from "~/store/proprietaire";

useHead({ title: "Propriétaires" });
definePageMeta({ middleware: "auth" });
const links = [
  { path: "/", title: "Acceuil" },
  { path: "#", title: "Propriétaire" },
];
const { getAll, trash } = useProprietaireStore();
const { proprietaires, loading } = storeToRefs(useProprietaireStore());
getAll();
const { filterTableData, setPage, search, total, pageSize } =
  useProprietaireFilterPagination(proprietaires);
const { onPrint } = useProprietairePrinter(proprietaires);
const { handleDelete, handleEdit, handleShow, modal } = useHandleCrudButtons(trash);
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
                title="proprietaires"
                :extra="{ exist: true, create: true, print: true }"
                @print="onPrint"
                @create="modal.create = true"
              >
                <el-input v-model="search" class="w-50 mt-1" placeholder="Rechercher" />
                <el-table
                  v-loading="loading.index"
                  :data="filterTableData"
                  style="width: 100%"
                  empty-text="aucun propriétaire"
                >
                  <el-table-column prop="nom_complet" label="Nom" sortable>
                    <template #default="scope">
                      {{ scope.row.nom_complet.toUpperCase() }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="telephone" label="Téléphone" width="150" sortable />
                  <el-table-column prop="email" label="Email" sortable>
                    <template #default="scope">
                      <span v-if="scope.row.email">{{ scope.row.email }}</span>
                      <el-tag v-else type="info">Aucun email</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="cni" label="Numéro CNI" width="160" />
                  <el-table-column prop="created_at" label="Date" width="150" sortable />
                  <el-table-column align="right" width="150">
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
              <ProprietaireCreateModal v-model="modal.create" />
              <ProprietaireEditModal
                :id="modal.edit.id"
                v-if="modal.edit.dialog"
                v-model="modal.edit.dialog"
              />
              <ProprietaireShowModal :id="modal.show.id" v-if="modal.show.dialog" v-model="modal.show.dialog" />
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
