<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useProprietaireStore } from "~/store/proprietaire";

const props = defineProps<{
  modelValue: boolean;
  id: number;
}>();
const emit = defineEmits<{
  (event: "update:modelValue", payload: boolean): void;
}>();
const dialog = computed({
  get() {
    return props.modelValue;
  },
  set(newValue: boolean): void {
    emit("update:modelValue", newValue);
  },
});
const { proprietaire, loading } = storeToRefs(useProprietaireStore());
const { getOne } = useProprietaireStore();
getOne(props.id)
</script>

<template>
  <el-dialog v-model="dialog" title="Détails du propriétaire" width="45%" destroy-on-close center>
    <div v-loading="loading.edit">
      <ProprietaireDescriptionComponent :proprietaire="proprietaire" />
    </div>
  </el-dialog>
</template>

<style scoped></style>
