<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useContratStore } from "~/store/contrat";
import { statusContrat, stateContrat, typeContrat } from "~/utils/constante";

useHead({ title: "Contrats" });
definePageMeta({ middleware: "auth" });
const links = [
  { path: "/", title: "Acceuil" },
  { path: "#", title: "Contrats" },
];
const { getAll, trash } = useContratStore();
const { contrats, loading } = storeToRefs(useContratStore());
getAll();
const { filterTableData, setPage, search, total, pageSize } = useContratFilterPagination(contrats);
const { onPrint } = useContratPrinter(contrats);
const { handleDelete, modal } = useHandleCrudButtons(trash);
const classTypeStatus = (status: string) => {
  return status === statusContrat.notuptodate ? "danger" : "success";
};
const classTypeState = (state: string) => {
  return state === stateContrat.using ? "" : "danger";
};
const showDescription = reactive({
  visite: { id: 0, modal: false },
  achat: { id: 0, modal: false },
});
const activateDescriptionModal = (id: number, type: string) => {
  if (type === typeContrat.achat) {
    showDescription.achat.id = id;
    showDescription.achat.modal = true;
  } else {
    showDescription.visite.id = id;
    showDescription.visite.modal = true;
  }
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
                title="Contrats"
                :extra="{ exist: true, create: true, print: true }"
                @print="onPrint"
                @create="modal.create = true"
              >
                <el-input v-model="search" class="w-50 my-1" placeholder="Rechercher" />
                <el-table
                  v-loading="loading.index"
                  :data="filterTableData"
                  style="width: 100%"
                  empty-text="aucun contrat"
                >
                  <el-table-column prop="code" label="Code" width="100" align="left">
                    <template #default="scope">
                      <el-link
                        @click="
                          activateDescriptionModal(scope.row.operation_id, scope.row.operation_type)
                        "
                        type="primary"
                        >{{ scope.row.code }}</el-link
                      >
                    </template>
                  </el-table-column>
                  <el-table-column prop="bien" label="Bien" align="center" sortable />
                  <el-table-column prop="debut" label="Debut" width="150" align="center" sortable />
                  <el-table-column prop="fin" label="Fin" width="150" align="center" sortable />
                  <el-table-column prop="status" label="Statut" width="100">
                    <template #default="scope">
                      <el-tag :type="classTypeStatus(scope.row.status)">{{
                        scope.row.status
                      }}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="etat" label="Etat" width="100">
                    <template #default="scope">
                      <el-tag :type="classTypeState(scope.row.etat)">{{ scope.row.etat }}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="created_at" label="Date" width="110" sortable />
                  <el-table-column width="150" align="right">
                    <template #header>
                      <span>Option</span>
                    </template>
                    <template #default="scope">
                      <!-- <el-button type="info" @click="handleShow(scope.row)" plain circle
                        ><i class="bx bx-show"
                      /></el-button> -->
                      <el-button
                        type="danger"
                        @click="
                          handleDelete(
                            scope.row,
                            `Voulez vous réelement supprimer le contrat ${scope.row.code}`
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
              <ContratCreateModal v-model="modal.create" />
              <VisiteShowModal
                :id="showDescription.visite.id"
                v-if="showDescription.visite.modal"
                v-model="showDescription.visite.modal"
              />
              <AchatShowModal
                :id="showDescription.achat.id"
                v-if="showDescription.achat.modal"
                v-model="showDescription.achat.modal"
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
