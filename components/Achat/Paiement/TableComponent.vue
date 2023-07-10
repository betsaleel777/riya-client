<script lang="ts" setup>
import { Paiements } from "~/types/paiements";
import { usePaiementStore } from "~/store/paiement";
import { statusValidable } from "~/utils/constante";

const props = defineProps<{
  paiements: Paiements;
}>();
const { trash } = usePaiementStore();
const { filterTableData, setPage, search, total, pageSize } = usePaiementFilterPagination(
  props.paiements
);
const { onPrint } = usePaiementPrinter(props.paiements);
const { handleDelete, handleEdit, modal } = useHandleCrudButtons(trash);
const classStatus = (state: string) => {
  return state === statusValidable.wait ? "warning" : "success";
};
</script>

<template>
  <StructurePageHeader
    title="liste des paiements"
    :extra="{ exist: true, create: true, print: true }"
    @print="onPrint"
    @create="modal.create = true"
  >
    <el-input v-model="search" class="w-50 my-1" placeholder="Rechercher" />
    <el-table :data="filterTableData" style="width: 100%" empty-text="aucun paiement">
      <el-table-column prop="code" label="Code" width="100" />
      <el-table-column prop="montant" label="Montant" sortable />
      <el-table-column prop="status" label="Statut" width="150">
        <template #default="scope">
          <el-tag :type="classStatus(scope.row.status)">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="Date" width="110" sortable />
      <el-table-column width="150" align="right">
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
  <AchatPaiementCreateModal v-model="modal.create" />
  <AchatPaiementEditModal
    :id="modal.edit.id"
    v-if="modal.edit.dialog"
    v-model="modal.edit.dialog"
  />
</template>

<style scoped></style>
