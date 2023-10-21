<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useAchatStore } from "~/store/achat";

const props = defineProps<{ modelValue: boolean; id: number }>();
const emit = defineEmits<{ (event: "update:modelValue", payload: boolean): void }>();
const { dialog } = useDialogModelValue(props, emit);

const { getOne } = useAchatStore();
const { achat, loading } = storeToRefs(useAchatStore());
getOne(props.id);
</script>

<template>
  <el-dialog
    v-model="dialog"
    :title="`Détails de l'achat ${achat?.code}`"
    width="45%"
    destroy-on-close
    center
  >
    <div v-loading="loading.edit">
      <AchatDescriptionComponent :achat="achat" />
      <AchatPaiementTimelineComponent :paiements="achat?.paiements" />
    </div>
  </el-dialog>
</template>

<style scoped></style>
