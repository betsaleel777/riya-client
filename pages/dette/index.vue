<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useDetteStore } from "~/store/dette";
import { statusPayable } from "~/utils/constante";
import { Dette } from "~/types/dette";
import { useModal } from "element-plus";

useHead({ title: "Dette" });
definePageMeta({ middleware: "auth" });
const links = [
  { path: "/", title: "Acceuil" },
  { path: "#", title: "Dettes" },
];
const { getAll, valider, repay } = useDetteStore();
const { dettes, loading } = storeToRefs(useDetteStore());
getAll();
const { filterTableData, setPage, search, total, pageSize } = useDetteFilterPagination(dettes);
const { onPrint } = useDettePrinter(dettes);
const classStatus = (status: string) => {
  const classes = {
    [statusPayable.pending as string]: "warning",
    [statusPayable.paid as string]: "success",
    [statusPayable.unpaid as string]: "danger",
  };
  return classes[status];
};
const handleRepay = (dette: Dette) => {
  ElMessageBox.confirm(
    `Voulez vous confirmer le remboursement de la dette: ${dette.code}`,
    "Confirmation du versement",
    {
      confirmButtonText: "confirmer",
      cancelButtonText: "abandonner",
      type: "warning",
    }
  ).then(async () => {
    const message = await repay(dette.id!);
    ElNotification.success({ title: "succès", message });
  });
};
const handleValidate = (dette: Dette) => {
  ElMessageBox.confirm(
    `Voulez vous valider le remboursement de la dette: ${dette.code}`,
    "Confirmation de validation",
    {
      confirmButtonText: "confirmer",
      cancelButtonText: "abandonner",
      type: "warning",
    }
  ).then(async () => {
    const message = await valider(dette.id!);
    ElNotification.success({ title: "succès", message });
  });
};
const { runShowModal, show } = useShowModal();
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
                title="Dettes"
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
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </el-col>
                </el-row>
                <el-table
                  v-loading="loading.index"
                  :data="filterTableData"
                  style="width: 100%"
                  empty-text="Aucune dette"
                >
                  <el-table-column prop="code" label="Code" width="100" />
                  <el-table-column prop="origine_code" label="Contrat">
                    <template #default="scope">
                      <el-link type="primary">{{ scope.row.origine_code }}</el-link>
                    </template>
                  </el-table-column>
                  <el-table-column prop="origine_type" label="Dette sur">
                    <template #default="scope">
                      <el-tag type="info">{{ scope.row.origine_type }}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="montant" label="Montant" align="center" sortable>
                    <template #default="scope"> {{ scope.row.montant }} FCFA </template>
                  </el-table-column>
                  <el-table-column prop="status" label="Statut"
                    ><template #default="scope">
                      <el-tag :type="classStatus(scope.row.status)">{{ scope.row.status }}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="created_at" label="Date" sortable />
                  <el-table-column width="100" align="right">
                    <template #header>
                      <span>Option</span>
                    </template>
                    <template #default="scope">
                      <el-button
                        type="info"
                        plain
                        circle
                        @click="runShowModal(scope.row.id)"
                      ></el-button>
                      <el-button
                        v-if="scope.row.status === statusPayable.unpaid"
                        type="primary"
                        @click="handleRepay(scope.row)"
                        plain
                        circle
                        ><i class="bx bx-dollar"
                      /></el-button>
                      <el-button
                        v-else-if="scope.row.status === statusPayable.pending"
                        type="success"
                        @click="handleValidate(scope.row)"
                        plain
                        circle
                        ><i class="bx bx-check-shield"
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
              <LazyDetteShowModal :id="show.id" v-model="show.enable" v-if="show.enable" />
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
