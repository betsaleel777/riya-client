<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { usePaiementStore } from "~/store/paiement";

const props = defineProps<{ modelValue: boolean; id: number }>();
const emit = defineEmits<{ (event: "update:modelValue", payload: boolean): void }>();
const { dialog } = useDialogModelValue(props, emit);

const { paiement, loading } = storeToRefs(usePaiementStore());
const { getOne, validerPaiement, getAll } = usePaiementStore();
await getOne(props.id);

let contratForm = reactive({ modal: false, paiement: 0 });

const handleValidate = () => {
  ElMessageBox.confirm(
    `Voulez vous valider le paiement du ${paiement?.value?.code}`,
    "Confirmation de validation",
    {
      confirmButtonText: "confirmer",
      cancelButtonText: "abandonner",
      type: "warning",
    }
  ).then(async () => {
    if (paiement?.value?.payable?.contractible) {
      contratForm.modal = true;
      contratForm.paiement = paiement.value?.id || 0;
    } else {
      const message = await validerPaiement(paiement?.value!);
      ElNotification.success({ title: "succès", message });
    }
  });
};
const onContratCreated = async () => {
  await getOne(props.id);
  await getAll();
};
</script>

<template>
  <el-dialog v-model="dialog" title="Détails de paiement" width="40%" destroy-on-close center>
    <div v-loading="loading.edit">
      <div class="d-flex flex-row-reverse">
        <el-button
          v-if="paiement?.status === statusValidable.wait"
          @click="handleValidate"
          type="primary"
          text
          >valider ce paiement
        </el-button>
      </div>
      <PaiementDescriptionComponent :paiement="paiement" />
    </div>
    <ContratCreateModal
      v-model="contratForm.modal"
      :operation-id="paiement?.payable_id"
      :paiement-id="contratForm.paiement"
      :type="typePaiement.purchase"
      @contrat-created="onContratCreated()"
    />
  </el-dialog>
</template>

<style scoped></style>
