<script lang="ts" setup>
import type { Visite } from "~/types/visite";

const props = defineProps<{
  visite: Visite;
}>();
</script>

<template>
  <el-descriptions direction="horizontal" :column="2" size="large">
    <el-descriptions-item v-if="props.visite?.code" label="Code visite:">{{ props.visite?.code }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.visite?.montant" label="Montant de visite:">{{
      useCurrency(props.visite?.montant)
    }}</el-descriptions-item>
    <el-descriptions-item v-if="props.visite?.frais_dossier" label="Frais de dossier:">{{
      useCurrency(props.visite?.frais_dossier!)
    }}</el-descriptions-item>
    <el-descriptions-item v-if="props.visite?.frais" label="Frais agence:">{{
      useCurrency(props.visite?.appartement?.montant_location! * props.visite?.frais!) }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.visite?.caution" label="Caution:">{{
      useCurrency(props.visite?.appartement?.montant_location! * props.visite?.caution!) }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.visite?.avance!" label="Avance:">{{
      useCurrency(props.visite?.appartement?.montant_location! * props.visite?.avance!) }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.visite?.created_at" label="Date de creéation:">{{
      props.visite?.created_at
    }}</el-descriptions-item>
  </el-descriptions>
</template>

<style scoped></style>
