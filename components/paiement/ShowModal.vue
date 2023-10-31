<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { usePaiementStore } from "~/store/paiement";

const props = defineProps<{ modelValue: boolean; id: number }>();
const emit = defineEmits<{ (event: "update:modelValue", payload: boolean): void }>();
const { dialog } = useDialogModelValue(props, emit);

const { paiement, loading } = storeToRefs(usePaiementStore());
const { getOne } = usePaiementStore();
await getOne(props.id);
</script>

<template>
  <el-dialog v-model="dialog" title="Détails de paiement" width="40%" destroy-on-close center>
    <div v-loading="loading.edit">
      <PaiementDescriptionComponent :paiement="paiement" />
    </div>
  </el-dialog>
</template>

<style scoped></style>
