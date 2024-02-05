<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUtilisateurStore } from "~/store/utilisateur";

useHead({ title: "Utilisateurs" });
definePageMeta({ middleware: "auth" });
const links = [
  { path: "/", title: "Acceuil" },
  { path: "#", title: "Utilisateurs" },
];
const { getAll, trash } = useUtilisateurStore();
const { utilisateurs, loading } = storeToRefs(useUtilisateurStore());
getAll();
const { filterTableData, setPage, search, total, pageSize } = useUserFilterPagination(utilisateurs);
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
              <StructurePageHeader :breadcrumbs="links" title="Utilisateurs">
                <template #options>
                  <el-button @click="modal.create = true" plain type="primary">Ajouter</el-button>
                </template>
                <el-input v-model="search" class="w-50 mt-1 mb-2" placeholder="Rechercher" />
                <el-table
                  v-loading="loading.index"
                  :data="filterTableData"
                  style="width: 100%"
                  empty-text="aucun utilisateur"
                >
                  <el-table-column prop="photo" width="75">
                    <template #default="scope">
                      <el-image
                        class="bg-transparent rounded-circle"
                        style="width: 30px; height: 30px"
                        fit="fill"
                        :src="scope.row.photo"
                        :preview-src-list="[scope.row.photo]"
                        lazy
                        preview-teleported
                      ></el-image>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="Nom" sortable>
                    <template #default="scope">
                      {{ scope.row.name.toUpperCase() }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="email" label="Email" sortable />
                  <el-table-column prop="created_at" label="Date" width="110" sortable />
                  <el-table-column width="150" align="right">
                    <template #header>
                      <span>Option</span>
                    </template>
                    <template #default="scope">
                      <el-button type="info" plain circle><i class="bx bx-show" /></el-button>
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
              <UtilisateurCreateModal v-model="modal.create" />
              <UtilisateurEditModal
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
