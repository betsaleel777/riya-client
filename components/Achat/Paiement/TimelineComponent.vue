<script lang="ts" setup>
import { Paiements } from "~/types/paiements";

const props = defineProps<{ paiements?: Paiements }>();
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
      <div class="d-flex justify-content-between">
        <span
          ><b>{{ paiement.code }}</b> -- {{ paiement.montant }} FCFA</span
        >
        <el-tag :type="classType(paiement.status)">{{ paiement.status }}</el-tag>
      </div>
    </el-timeline-item>
  </el-timeline>
</template>

<style scoped></style>
