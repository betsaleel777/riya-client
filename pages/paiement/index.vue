<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePaiementStore } from "~/store/paiement";
import { Paiement } from "~/types/paiements";
import { useAchatStore } from "~/store/achat";

useHead({ title: "Paiements" });
definePageMeta({ middleware: "auth" });
const links = [
  { path: "/", title: "Acceuil" },
  { path: "#", title: "Paiements" },
];
let contratForm = reactive({ modal: false, paiement: 0 });
const { getAll, validerPaiement, trash } = usePaiementStore();
const { paiements, loading } = storeToRefs(usePaiementStore());
getAll();
const { filterTableData, setPage, search, total, pageSize } =
  usePaiementRefFilterPagination(paiements);
const { onPrint } = usePaiementRefPrinter(paiements);
const { handleDelete, handleEdit, handleShow, modal } = useHandleCrudButtons(trash);
const existOnePaiement = (paiement: Paiement): boolean => {
  const payableIds = paiements.value.map((paiement) => paiement.payable_id);
  return !payableIds.includes(paiement.payable_id);
};
const handleValidate = (paiement: Paiement) => {
  ElMessageBox.confirm(
    `Voulez vous valider le paiement du ${paiement.code}`,
    "Confirmation de validation",
    {
      confirmButtonText: "confirmer",
      cancelButtonText: "abandonner",
      type: "warning",
    }
  ).then(async () => {
    if (existOnePaiement(paiement)) {
      contratForm.modal = true;
      contratForm.paiement = paiement.id || 0;
    } else {
      const message = await validerPaiement(paiement);
      ElNotification.success({ title: "succès", message });
    }
  });
};
const classStatus = (state: string) => {
  return state === statusValidable.wait ? "warning" : "success";
};
const printReceipt = async (paiement: Paiement) => {
  const { getOne } = useAchatStore();
  const { achat } = storeToRefs(useAchatStore());
  await getOne(paiement.payable_id);
  await usePaiementReceipt(paiement, achat.value!);
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
                title="Paiements"
                :extra="{ exist: true, create: true, print: true }"
                @print="onPrint"
                @create="modal.create = true"
              >
                <el-row class="my-1" justify="end">
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
                          <el-dropdown-item>validées</el-dropdown-item>
                          <el-dropdown-item>en attente</el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </el-col>
                </el-row>
                <el-table
                  v-loading="loading.index"
                  :data="filterTableData"
                  style="width: 100%"
                  empty-text="aucun paiement"
                >
                  <el-table-column prop="code" label="Code" width="100" />
                  <el-table-column prop="montant" label="Montant" sortable />
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
                        v-if="scope.row.status === statusValidable.wait"
                        type="success"
                        @click="handleValidate(scope.row)"
                        plain
                        circle
                        ><i class="bx bx-check-shield"
                      /></el-button>
                      <el-button v-else type="warning" @click="printReceipt(scope.row)" plain circle
                        ><i class="bx bx-printer"
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
              <ContratCreateModal
                v-model="contratForm.modal"
                :paiement-id="contratForm.paiement"
                type="Achat"
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

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  /* color: var(--el-color-primary); */
  display: flex;
  align-items: center;
  font-size: 2.3em;
}
</style>
