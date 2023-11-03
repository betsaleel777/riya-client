<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useAchatStore } from "~/store/achat";
import { Paiement } from "~/types/paiements";

const props = defineProps<{ modelValue: boolean; id: number }>();
const emit = defineEmits<{ (event: "update:modelValue", payload: boolean): void }>();
const { dialog } = useDialogModelValue(props, emit);

const { getOne, valider } = useAchatStore();
const { achat, loading } = storeToRefs(useAchatStore());
getOne(props.id);
const handleValidate = () => {
  ElMessageBox.confirm(
    `Cette action est irréversible, voulez réelement valider le paiement en attente: ${pendingPaiement.value.code}?`,
    "Attention",
    { confirmButtonText: "Confirmer", cancelButtonText: "Abandonner", type: "warning" }
  ).then(() => {
    valider(achat.value?.id!).then((message) => {
      ElNotification.success({ title: "succès", message });
      dialog.value = false;
    });
  });
};
const pendingPaiement = computed(
  () =>
    achat.value?.paiements
      ?.filter((paiement: Paiement) => paiement.status === statusValidable.wait)
      .at(0) as Paiement
);
</script>

<template>
  <el-dialog
    v-model="dialog"
    :title="`Détails de l'achat ${achat?.code}`"
    width="45%"
    destroy-on-close
    center
  >
    <div v-loading="loading.edit">
      <div class="d-flex flex-row-reverse">
        <el-button v-if="pendingPaiement" @click="handleValidate" type="primary" text
          >valider le paiement en attente</el-button
        >
      </div>
      <el-divider class="mt-0" />
      <AchatDescriptionComponent :achat="achat" />
      <AchatPaiementTimelineComponent :paiements="achat?.paiements" />
    </div>
  </el-dialog>
</template>

<style scoped></style>
