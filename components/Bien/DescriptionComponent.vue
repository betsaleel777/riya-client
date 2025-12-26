<script lang="ts" setup>
import type { Appartement } from "~/types/appartement";
import type { Terrain } from "~/types/terrain";
import { useCurrency } from "~/composables/numeral";

const props = defineProps<{ bien: Appartement | Terrain | undefined }>();
const classType = (status: string) => {
  return status === statusBien.busy ? "danger" : "success";
};
</script>

<template>
  <el-descriptions direction="horizontal" :column="2" size="large">
    <el-descriptions-item v-if="props.bien?.reference" label="Code:">{{ props.bien?.reference }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.bien?.nom" label="Nom:">{{ props.bien?.nom }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.bien?.pays" label="Pays:">{{
      props.bien?.pays
      }}</el-descriptions-item>
    <el-descriptions-item v-if="props.bien?.ville" label="Ville:">{{
      props.bien?.ville
      }}</el-descriptions-item>
    <el-descriptions-item v-if="props.bien?.quartier" label="Quartier:">{{
      props.bien?.quartier
      }}</el-descriptions-item>
    <el-descriptions-item v-if="props.bien?.proprietaire" label="Propriétaire:">{{
      props.bien?.proprietaire
      }}</el-descriptions-item>
    <el-descriptions-item v-if="props.bien?.cout_achat" label="Coût d'achat:">{{
      useCurrency(props.bien?.cout_achat)
      }}</el-descriptions-item>
    <el-descriptions-item v-if="props.bien?.montant_location" label="Loyer:">{{
      useCurrency(props.bien?.montant_location)
      }}</el-descriptions-item>
    <el-descriptions-item v-if="props.bien?.montant_investit" label="Montant investit:">{{
      useCurrency(props.bien?.montant_investit)
      }}</el-descriptions-item>
    <el-descriptions-item v-if="props.bien?.superficie" label="Superficie:">{{ props.bien?.superficie }}
      m²</el-descriptions-item>
    <el-descriptions-item v-if="props.bien?.created_at" label="Date création:">{{
      props.bien?.created_at
      }}</el-descriptions-item>
    <el-descriptions-item v-if="props.bien?.status" label="Status:"><el-tag :type="classType(props.bien?.status)">{{
      props.bien?.status
        }}</el-tag></el-descriptions-item>
    <el-descriptions-item v-if="props.bien?.attestation_villageoise" label="Attestation villageoise:"><input
        class="form-check-input" type="checkbox" onclick="return false"
        :checked="props.bien?.attestation_villageoise" /></el-descriptions-item>
    <el-descriptions-item v-if="props.bien?.arreter_approbation" label="Arrêter d'approbation:"><input
        class="form-check-input" type="checkbox" onclick="return false"
        :checked="props.bien?.arreter_approbation" /></el-descriptions-item>
    <el-descriptions-item v-if="props.bien?.document_cession" label="Document Cession:"><input class="form-check-input"
        type="checkbox" onclick="return false" :checked="props.bien?.document_cession" /></el-descriptions-item>
    <el-descriptions-item v-if="props.bien?.titre_foncier" label="Titre Foncier:"><input class="form-check-input"
        type="checkbox" onclick="return false" :checked="props.bien?.titre_foncier" /></el-descriptions-item>
  </el-descriptions>
</template>

<style scoped></style>
