<script lang="ts" setup>
import { Paiement } from "~/types/paiements";

const props = defineProps<{ paiement: Paiement }>();
</script>

<template>
  <div>Component: paiement/DescriptionComponent</div>
  <pre>{{ paiement }}</pre>
</template>

<style scoped></style>
