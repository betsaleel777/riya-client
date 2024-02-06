<script lang="ts" setup>
import { Achat } from "~/types/achat";
const props = defineProps<{
  achat?: Achat;
}>();
console.log(props.achat);
</script>

<template>
  <el-descriptions direction="horizontal" :column="2" size="large">
    <el-descriptions-item v-if="props.achat?.code" label="Code:"
      >{{ props.achat?.code }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.achat?.created_at" label="Date:"
      >{{ props.achat?.created_at }}
    </el-descriptions-item>
    <el-descriptions-item v-if="props.achat?.personne" label="Client :">{{
      props.achat?.personne.nom_complet
    }}</el-descriptions-item>
    <el-descriptions-item v-if="props.achat?.bien" label="Bien :">{{
      props.achat?.bien.nom
    }}</el-descriptions-item>
    <el-descriptions-item v-if="props.achat?.total !== undefined" label="Montant Versé :">{{
      useCurrency(props.achat?.total)
    }}</el-descriptions-item>
    <el-descriptions-item v-if="props.achat?.reste !== undefined" label="Reste à Payer :">{{
      useCurrency(props.achat?.reste)
    }}</el-descriptions-item>
  </el-descriptions>
</template>

<style scoped></style>
