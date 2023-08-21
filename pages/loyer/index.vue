<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useLoyerStore } from "~/store/loyer";
import { statusLoyer } from "~/utils/constante";
import { Loyer } from "~/types/Loyer";

useHead({ title: "Loyer" });
definePageMeta({ middleware: "auth" });
const links = [
  { path: "/", title: "Acceuil" },
  { path: "#", title: "Loyers" },
];
const { getAll, cashed, valider, trash } = useLoyerStore();
const { loyers, loading } = storeToRefs(useLoyerStore());
getAll();
const { filterTableData, setPage, search, total, pageSize } = useLoyerFilterPagination(loyers);
const { onPrint } = useLoyerPrinter(loyers);
const { handleDelete, modal } = useHandleCrudButtons(trash);
const classStatus = (status: string) => {
  const classes = {
    [statusLoyer.pending as string]: "warning",
    [statusLoyer.paid as string]: "success",
    [statusLoyer.unpaid as string]: "danger",
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
  ).then(async () => {
    const message = await cashed(loyer.id!);
    ElNotification.success({ title: "succès", message });
  });
};
const handleValidate = (loyer: Loyer) => {
  ElMessageBox.confirm(
    `Voulez vous valider le paiement du ${loyer.code}`,
    "Confirmation de validation",
    {
      confirmButtonText: "confirmer",
      cancelButtonText: "abandonner",
      type: "warning",
    }
  ).then(async () => {
    const message = await valider(loyer.id!);
    ElNotification.success({ title: "succès", message });
  });
};
const printReceipt = async (id: number) => {
  const { getOne } = useLoyerStore();
  const { loyer } = storeToRefs(useLoyerStore());
  await getOne(id);
  await useLoyerReceipt(loyer);
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
                title="Loyers"
                :extra="{ exist: true, create: false, print: true }"
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
                          <el-dropdown-item>payés</el-dropdown-item>
                          <el-dropdown-item>impayés</el-dropdown-item>
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
                  empty-text="aucun Loyer"
                >
                  <el-table-column prop="code" label="Code" width="100" />
                  <el-table-column prop="client" label="Client" sortable>
                    <template #default="scope">
                      <el-text truncated>{{ scope.row.client }}</el-text>
                    </template>
                  </el-table-column>
                  <el-table-column prop="bien" label="Bien" sortable>
                    <template #default="scope">
                      <el-text truncated>{{ scope.row.bien }}</el-text>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="montant"
                    label="Montant"
                    align="center"
                    width="150"
                    sortable
                  >
                    <template #default="scope"> {{ scope.row.montant }} FCFA </template>
                  </el-table-column>
                  <el-table-column prop="status" label="Statut" width="150"
                    ><template #default="scope">
                      <el-tag :type="classStatus(scope.row.status)">{{ scope.row.status }}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="created_at" label="Date" width="150" />
                  <el-table-column width="100" align="right">
                    <template #header>
                      <span>Option</span>
                    </template>
                    <template #default="scope">
                      <el-button
                        v-if="scope.row.status === statusLoyer.unpaid"
                        type="info"
                        @click="handleCashed(scope.row)"
                        plain
                        circle
                        ><i class="bx bx-dollar"
                      /></el-button>
                      <el-button
                        v-else-if="scope.row.status === statusLoyer.pending"
                        type="success"
                        @click="handleValidate(scope.row)"
                        plain
                        circle
                        ><i class="bx bx-check-shield"
                      /></el-button>
                      <el-button
                        v-else
                        type="warning"
                        @click="printReceipt(scope.row.id)"
                        plain
                        circle
                        ><i class="bx bx-printer"
                      /></el-button>
                      <el-button
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
                  @current-change="setPage"
                  hide-on-single-page
                />
              </StructurePageHeader>
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
