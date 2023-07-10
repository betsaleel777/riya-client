<script lang="ts" setup>
import { Paiements } from "~/types/paiements";
import { statusValidable } from "~/utils/constante";

const props = defineProps<{
  paiements?: Paiements;
}>();
const classType = (status: string) => {
  return status === statusValidable.wait ? "warning" : "success";
};
</script>

<template>
  <el-timeline>
    <el-timeline-item
      v-for="(paiement, index) in props.paiements"
      :key="index"
      :type="classType(paiement.status)"
      :hollow="true"
      :timestamp="paiement.created_at"
      placement="top"
    >
      <span class="mr-5"
        ><b>{{ paiement.code }}</b> -- {{ paiement.montant }} FCFA</span
      >
      <el-tag :type="classType(paiement.status)">{{ paiement.status }}</el-tag>
    </el-timeline-item>
  </el-timeline>
</template>

<style scoped></style>
