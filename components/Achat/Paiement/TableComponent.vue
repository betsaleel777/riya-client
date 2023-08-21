<script lang="ts" setup>
import { Paiements, Paiement } from "~/types/paiements";
import { usePaiementStore } from "~/store/paiement";
import { statusValidable } from "~/utils/constante";
import { useAchatStore } from "~/store/achat";

const props = defineProps<{
  paiements: Paiements;
}>();
let contratForm = reactive({ modal: false, paiement: 0 });
const { achat } = useAchatStore();
const { trash, valider } = usePaiementStore();
const { filterTableData, setPage, search, total, pageSize } = usePaiementFilterPagination(
  props.paiements
);
const { onPrint } = usePaiementPrinter(props.paiements);
const { handleDelete, handleEdit, modal } = useHandleCrudButtons(trash);
const classStatus = (state: string) => {
  return state === statusValidable.wait ? "warning" : "success";
};
const handleValidate = (paiement: Paiement) => {
  ElMessageBox.confirm(
    `Voulez vous réelement valider le paiement ${paiement.code}`,
    "Confirmation de validation",
    {
      confirmButtonText: "confirmer",
      cancelButtonText: "abandonner",
      type: "warning",
    }
  ).then(() => {
    if (props.paiements.length > 1) {
      valider(paiement);
    } else {
      contratForm.modal = true;
      contratForm.paiement = paiement.id || 0;
    }
  });
};
const createPaiement = computed<boolean>(() => achat?.reste !== 0);
const printReceipt = async (paiement: Paiement) => {
  const { getOne } = useAchatStore();
  await getOne(paiement.payable_id);
  await usePaiementReceipt(paiement, achat!);
};
</script>

<template>
  <StructurePageHeader
    title="liste des paiements"
    :extra="{ exist: true, create: createPaiement, print: true }"
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
  <AchatPaiementCreateModal v-model="modal.create" />
  <AchatPaiementEditModal
    :id="modal.edit.id"
    v-if="modal.edit.dialog"
    v-model="modal.edit.dialog"
  />
  <ContratCreateModal
    v-model="contratForm.modal"
    :paiement-id="contratForm.paiement"
    type="Achat"
  />
</template>

<style scoped></style>
