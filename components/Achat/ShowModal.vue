<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useAchatStore } from "~/store/achat";
import { Paiement } from "~/types/paiements";

const props = withDefaults(
  defineProps<{ modelValue: boolean; id: number; fromValidationPage?: boolean }>(),
  { fromValidationPage: false }
);
const emit = defineEmits<{ (event: "update:modelValue", payload: boolean): void }>();
const { dialog } = useDialogModelValue(props, emit);

const contratForm = reactive({ modal: false, paiement: 0 });
const { getOne, valider, getPending } = useAchatStore();
const { achat, loading } = storeToRefs(useAchatStore());
getOne(props.id);
const pendingPaiement = computed(
  () =>
    achat.value?.paiements
      ?.filter((paiement: Paiement) => paiement.status === statusValidable.wait)
      .at(0) as Paiement
);
const handleValidate = () => {
  ElMessageBox.confirm(
    `Cette action est irréversible, voulez réelement valider le paiement en attente: ${pendingPaiement.value.code}?`,
    "Attention",
    { confirmButtonText: "Confirmer", cancelButtonText: "Abandonner", type: "warning" }
  ).then(() => {
    if (achat.value?.contractible) {
      contratForm.modal = true;
      contratForm.paiement = pendingPaiement.value?.id || 0;
    } else {
      valider(achat.value?.id!).then((message) => {
        ElNotification.success({ title: "succès", message });
        dialog.value = false;
      });
    }
  });
};
const onContratCreated = async () => {
  if (props.fromValidationPage) await getPending();
  await getOne(props.id);
};
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
      <div class="d-flex justify-content-between align-items-center">
        <span class="text-truncate">créer par {{ achat?.audit.user.name }}</span>
        <div class="d-flex flex-row-reverse">
          <el-button
            v-role="rolesNames.admin"
            v-if="pendingPaiement"
            @click="handleValidate"
            type="primary"
            text
          >
            valider le paiement en attente
          </el-button>
          <el-button @click="useAchatReceipt(achat!)" type="warning" text plain>
            imprimer reçu
          </el-button>
        </div>
      </div>
      <el-divider class="mt-0" />
      <AchatDescriptionComponent :achat="achat" />
      <el-scrollbar :max-height="170">
        <AchatPaiementTimelineComponent :paiements="achat?.paiements" />
      </el-scrollbar>
    </div>
    <ContratCreateModal
      :operation-id="achat?.id || 0"
      v-model="contratForm.modal"
      :paiement-id="contratForm.paiement"
      :type="typeContrat.achat"
      @contrat-created="onContratCreated()"
    />
  </el-dialog>
</template>

<style scoped></style>
