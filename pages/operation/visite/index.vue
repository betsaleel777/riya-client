<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useVisiteStore } from "~/store/visite";
import { statusValidable, statusAvance } from "~/utils/constante";

useHead({ title: "Location" });
definePageMeta({
  middleware: ["auth", "nuxt-permissions"],
  roles: [rolesNames.employee, rolesNames.admin],
});
const links = [
  { path: "/", title: "Acceuil" },
  { path: "#", title: "Location" },
];
const { getAll, trash } = useVisiteStore();
const { visites, loading } = storeToRefs(useVisiteStore());
getAll();
const { filterTableData, setPage, search, total, pageSize } = useVisiteFilterPagination(visites);
const { handleDelete, handleEdit, handleShow, modal } = useHandleCrudButtons(trash);
const classType = (status: string) => {
  return status === statusValidable.wait ? "warning" : "success";
};
const classStatus = (status: string) => {
  const classes = {
    [statusAvance.contratWithout as string]: "info",
    [statusAvance.inuse as string]: "",
    [statusAvance.exhausted as string]: "danger",
  };
  return classes[status];
};
</script>

<template>
  <div class="page-content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <StructurePageHeader :breadcrumbs="links" title="Locations">
                <template #options>
                  <el-button @click="modal.create = true" plain type="primary">Ajouter</el-button>
                </template>
                <el-row class="mt-1 mb-2" justify="end">
                  <el-col :span="12">
                    <el-input v-model="search" placeholder="Rechercher" />
                  </el-col>
                  <el-col :span="11"></el-col>
                  <el-col :span="1">
                    <el-dropdown>
                      <span class="el-dropdown-link">
                        <i class="bx bx-filter"></i>
                      </span>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item>validée</el-dropdown-item>
                          <el-dropdown-item>avance en cours</el-dropdown-item>
                          <el-dropdown-item>simple visite</el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </el-col>
                </el-row>
                <el-table
                  v-loading="loading.index"
                  :data="filterTableData"
                  style="width: 100%"
                  empty-text="aucune Location"
                >
                  <el-table-column prop="code" label="Code" width="100" />
                  <el-table-column prop="personne" label="Client" sortable>
                    <template #default="scope">
                      <el-text truncated>{{ scope.row.personne }}</el-text>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="frais"
                    label="Frais agence"
                    align="center"
                    width="150"
                    sortable
                  >
                    <template #default="scope">
                      {{ useCurrency(scope.row.frais * scope.row.loyer) }}
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
                      {{ useCurrency(scope.row.caution * scope.row.loyer) }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="avance" label="Avance" align="center" width="150" sortable>
                    <template #default="scope">
                      {{ useCurrency(scope.row.avance * scope.row.loyer) }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="status" label="Statut" width="150">
                    <template #default="scope">
                      <el-tag class="text-truncated" :type="classType(scope.row.status)">{{
                        scope.row.status
                      }}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="avanceStatus" label="Status avance" width="150"
                    ><template #default="scope">
                      <el-tag class="text-truncated" :type="classStatus(scope.row.avanceStatus)">{{
                        scope.row.avanceStatus
                      }}</el-tag>
                    </template>
                  </el-table-column>
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
                        v-role="rolesNames.admin"
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
