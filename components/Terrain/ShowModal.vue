<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useTerrainStore } from "~/store/terrain";

const props = defineProps<{ modelValue: boolean; id: number }>();
const emit = defineEmits<{ (event: "update:modelValue", payload: boolean): void }>();
const { dialog } = useDialogModelValue(props, emit);

const { terrain, loading } = storeToRefs(useTerrainStore());
const { getOne } = useTerrainStore();
getOne(props.id);
</script>

<template>
  <el-dialog v-model="dialog" title="Détails du terrain" width="50%" destroy-on-close center>
    <div v-loading="loading.edit">
      <TerrainDescriptionComponent :terrain="terrain" />
    </div>
  </el-dialog>
</template>

<style scoped></style>
