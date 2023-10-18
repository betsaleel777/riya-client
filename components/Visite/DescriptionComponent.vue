<script lang="ts" setup>
import { Visite } from "~/types/visite";

const props = defineProps<{
  visite: Visite;
}>();
</script>

<template>
  <el-descriptions direction="horizontal" :column="2" size="large">
    <el-descriptions-item label="Code visite:">{{ props.visite?.code }} </el-descriptions-item>
    <el-descriptions-item label="Montant de visite:"
      >{{ props.visite?.montant }} FCFA</el-descriptions-item
    >
    <el-descriptions-item label="Frais de dossier:"
      >{{ props.visite?.frais_dossier! }} FCFA</el-descriptions-item
    >
    <el-descriptions-item label="Frais agence:"
      >{{
        props.visite?.appartement?.montant_location! * props.visite?.frais!
      }}
      FCFA</el-descriptions-item
    >
    <el-descriptions-item label="Caution:"
      >{{
        props.visite?.appartement?.montant_location! * props.visite?.caution!
      }}
      FCFA</el-descriptions-item
    >
    <el-descriptions-item label="Avance:"
      >{{
        props.visite?.appartement?.montant_location! * props.visite?.avance!
      }}
      FCFA</el-descriptions-item
    >
    <el-descriptions-item label="Date de creéation:">{{
      props.visite?.created_at
    }}</el-descriptions-item>
  </el-descriptions>
</template>

<style scoped></style>
