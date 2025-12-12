<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useVisiteStore } from "~/store/visite";
import { rolesNames, statusValidable, typeContrat } from "~/utils/constante";

const props = withDefaults(
  defineProps<{ modelValue: boolean; id: number; fromValidationPage?: boolean }>(),
  { fromValidationPage: false }
);
const emit = defineEmits<{ (event: "update:modelValue", payload: boolean): void }>();
const { dialog } = useDialogModelValue(props, emit);

const activeName = ref("visite");
const contratDialog = ref(false);
const { getOne, validerDirectement, getPending, getAll } = useVisiteStore();
const { visite, loading } = storeToRefs(useVisiteStore());
getOne(props.id);
const validated = computed(() => visite?.value?.status === statusValidable.valid);
const validatedProvisoire = computed(() => {
  const first = visite?.value?.status === statusValidable.wait;
  const second =
    visite?.value?.frais !== 0 ||
    visite?.value?.caution !== 0 ||
    visite?.value?.avance !== 0 ||
    visite?.value?.frais_dossier !== 0;
  return first && second;
});
const validable = computed(() => {
  const first =
    visite?.value?.frais === 0 &&
    visite?.value?.caution === 0 &&
    visite?.value.avance === 0 &&
    visite?.value?.frais_dossier === 0;
  const second =
    visite?.value?.frais !== 0 &&
    visite?.value?.caution !== 0 &&
    visite?.value?.avance !== 0 &&
    visite?.value?.frais_dossier !== 0;
  if (validated.value) return false;
  else return first || second;
});
const handleValidate = () => {
  if (visite?.value?.frais === 0 && visite?.value?.caution === 0 && visite?.value.avance === 0) {
    validerDirectement(visite?.value.id!, props.fromValidationPage)
      .then((message) => {
        ElNotification.success({ title: "succès", message });
        dialog.value = false;
      })
      .catch((err) => {
        if (err.response.status === 419) navigateTo("/login");
      });
  } else {
    contratDialog.value = true;
  }
};
const imprimer = () => {
  useVisiteInvoice(visite);
};
const imprimerProvisoire = () => {
  useVisiteInvoiceProvisoire(visite);
};
const onContratCreated = async () => {
  if (props.fromValidationPage) await getPending();
  await getOne(visite?.value?.id!);
  await getAll();
};
</script>

<template>
  <el-dialog v-model="dialog" :title="`Détails de la visite ${visite?.code}`" width="45%" destroy-on-close center>
    <div v-loading="loading.edit">
      <div v-if="!loading.edit" class="d-flex flex-row-reverse align-items-baseline">
        <el-button v-role="rolesNames.admin" @click="handleValidate" v-if="validable" type="success" text>Valider la
          visite</el-button>
        <el-button @click="imprimer" v-if="validated" type="warning" text>Imprimer reçu de visite</el-button>
        <el-button @click="imprimerProvisoire" v-if="validatedProvisoire" type="warning" text>Imprimer reçu
          provisoire</el-button>
        <span class="text-muted me-auto">créer par {{ visite?.audit?.user.name }}</span>
      </div>
      <div>
        <el-collapse v-model="activeName" accordion class="my-1">
          <el-collapse-item title="Informations de la visite" name="visite">
            <VisiteDescriptionComponent :visite="visite!" />
          </el-collapse-item>
          <el-collapse-item title="Informations sur le bien" name="bien">
            <BienDescriptionComponent :bien="visite?.appartement!" />
          </el-collapse-item>
          <el-collapse-item title="Informations sur le client" name="client">
            <PersonneDescriptionComponent :personne="visite?.personne!" />
          </el-collapse-item>
        </el-collapse>
        <LazyVisiteTabOperation v-if="!loading.edit && !validated" />
        <ContratCreateModal :operation-id="visite?.id || 0" v-model="contratDialog" :type="typeContrat.visite"
          @contrat-created="onContratCreated()" />
      </div>
    </div>
  </el-dialog>
</template>

<style scoped></style>
