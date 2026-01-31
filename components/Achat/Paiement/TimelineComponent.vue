<script lang="ts" setup>
import type { Paiements } from "~/types/paiements";
import { useCurrency } from "~/composables/numeral";

const props = defineProps<{ paiements?: Paiements }>();
const classType = (status: string) => {
  return status === statusValidable.wait ? "warning" : "success";
};
</script>

<template>
  <el-timeline>
    <el-empty v-if="paiements?.length === 0" :image-size="80">
      <template #description>
        <el-text class="headline">aucun paiement à afficher</el-text>
      </template>
    </el-empty>
    <div v-else>
      <el-timeline-item v-for="(paiement, index) in props.paiements" :key="index" :type="classType(paiement.status)"
        :hollow="true" :timestamp="paiement.created_at" placement="top">
        <div class="d-flex justify-content-between align-items-center">
          <span>
            <em v-if="paiement.audit">
              <h6>encaissé par {{ paiement.audit.user.name }}</h6>
            </em>
            <b>{{ paiement.code }}</b> -- {{ useCurrency(paiement.montant) }}</span>
          <el-tag :type="classType(paiement.status)">{{ paiement.status }}</el-tag>
        </div>
      </el-timeline-item>
    </div>
  </el-timeline>
</template>

<style scoped></style>
