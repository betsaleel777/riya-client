<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useLoyerStore } from "~/store/loyer";
const props = withDefaults(
  defineProps<{ modelValue: boolean; id: number; fromValidationPage?: boolean }>(),
  { fromValidationPage: false }
);
const emit = defineEmits<{ (event: "update:modelValue", payload: boolean): void }>();
const { dialog } = useDialogModelValue(props, emit);
const { loyer, loading } = storeToRefs(useLoyerStore());
const { getOne, valider } = useLoyerStore();
getOne(props.id);
const handleValidate = () => {
  ElMessageBox.confirm(
    `Cette action est irréversible, voulez-vous réelement valider le paiement du loyer: ${loyer.value?.code}?`,
    "Attention",
    { confirmButtonText: "Confirmer", cancelButtonText: "Abandonner", type: "warning" }
  ).then(() => {
    valider(loyer.value?.id!, props.fromValidationPage).then((message) => {
      ElNotification.success({ title: "succès", message });
      dialog.value = false;
    });
  });
};
const validable = computed(() =>
  loyer.value?.paiements
    ? loyer.value?.paiements.some((paiement) => paiement.status === statusValidable.wait)
    : false
);
const imprimable = computed(
  () => loyer.value?.paiements !== undefined && loyer.value?.paiements.length > 0
);
</script>

<template>
  <el-dialog v-model="dialog" title="Détails du loyer" width="40%" destroy-on-close center>
    <div v-loading="loading.edit">
      <div class="d-flex flex-row-reverse">
        <el-button v-if="validable" @click="handleValidate" type="primary" text plain
          >valider le paiement en attente</el-button
        >
        <el-button v-if="imprimable" @click="useLoyerReceipt(loyer!)" type="warning" text plain
          >imprimer reçu</el-button
        >
      </div>
      <el-divider class="mt-0" />
      <LoyerDescriptionComponent :loyer="loyer" />
      <AchatPaiementTimelineComponent :paiements="loyer?.paiements" />
    </div>
  </el-dialog>
</template>

<style scoped></style>
