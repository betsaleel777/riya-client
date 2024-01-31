<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useLoyerStore } from "~/store/loyer";
import { usePaiementStore } from "~/store/paiement";
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
    `Cette action est irréversible, voulez réelement valider cette ${loyer.value?.code}?`,
    "Attention",
    { confirmButtonText: "Confirmer", cancelButtonText: "Abandonner", type: "warning" }
  ).then(() => {
    valider(loyer.value?.id!, props.fromValidationPage).then((message) => {
      ElNotification.success({ title: "succès", message });
      dialog.value = false;
    });
  });
};
const { loading: paiementLoading, paiements } = storeToRefs(usePaiementStore());
const { getByPayable: getPaiements } = usePaiementStore();
const paiementsLoaded = ref<boolean>(false);
const loadPaiements = async () => {
  await getPaiements(loyer.value?.id!);
  paiementsLoaded.value = true;
};
</script>

<template>
  <el-dialog v-model="dialog" title="Détails du loyer" width="40%" destroy-on-close center>
    <div v-loading="loading.edit">
      <div class="d-flex flex-row-reverse">
        <el-button
          v-if="loyer?.status === statusPayable.pending"
          @click="handleValidate"
          type="primary"
          text
          >valider ce loyer</el-button
        >
      </div>
      <el-divider class="mt-0" />
      <el-collapse accordion class="my-1">
        <el-collapse-item title="Informations du loyer" name="loyer">
          <LoyerDescriptionComponent :loyer="loyer" />
        </el-collapse-item>
        <el-collapse-item :disabled="!paiementsLoaded" name="paiements">
          <template #title>
            <el-button
              v-if="!paiementsLoaded"
              @click="loadPaiements()"
              :loading="paiementLoading.edit"
              type="primary"
              text
              >Charger les paiements</el-button
            >
            <span v-else>Paiements</span>
          </template>
          <AchatPaiementTimelineComponent :paiements="paiements" />
        </el-collapse-item>
      </el-collapse>
    </div>
  </el-dialog>
</template>

<style scoped></style>
