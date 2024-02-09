<script lang="ts" setup>
import { useVisiteStore } from "~/store/visite";
import { usePaiementStore } from "~/store/paiement";
import { storeToRefs } from "pinia";
import { useLoyerStore } from "~/store/loyer";
import { useDetteStore } from "~/store/dette";

const props = defineProps<{ origine: number; type: string }>();
const { getOne: getVisite } = useVisiteStore();
const { visite, loading: visiteLoading } = storeToRefs(useVisiteStore());
const { getOne: getPaiement } = usePaiementStore();
const { paiement, loading: paiementLoading } = storeToRefs(usePaiementStore());
const { loyer, loading: loyerLoading } = storeToRefs(useLoyerStore());
const { getOne: getLoyer } = useLoyerStore();
const { dette } = useDetteStore();
if (props.type === "Visite") {
  getVisite(props.origine);
} else if (props.type === "Loyer") {
  getLoyer(props.origine);
} else {
  getPaiement(props.origine);
}
</script>

<template>
  <div v-if="props.type === 'Visite'" v-loading="visiteLoading.edit">
    <el-collapse accordion class="my-4">
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
  </div>
  <div v-else-if="props.type === 'Loyer'" v-loading="loyerLoading.edit">
    <LoyerDescriptionComponent :loyer="loyer" />
    <el-alert v-if="loyer?.status === statusPayable.unpaid" type="error"
      >La validation du paiement de cette dette se fera sur vos fonds propres à hauteur de
      {{ useCurrency(dette?.montant! - loyer.paid) }} car ce loyer n'a pas été entièrement
      payé</el-alert
    >
  </div>
  <div v-else v-loading="paiementLoading.edit">
    <PaiementDescriptionComponent :paiement="paiement" />
  </div>
</template>

<style scoped></style>
