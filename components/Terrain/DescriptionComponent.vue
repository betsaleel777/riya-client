<script lang="ts" setup>
import { Terrain } from "~/types/terrain";

const props = defineProps<{ terrain: Terrain }>();
</script>

<template>
  <BienDescriptionComponent :bien="props.terrain" class="mb-0" />
  <el-descriptions direction="horizontal" :column="2" size="large">
    <el-descriptions-item v-if="props.terrain?.type" label="Type de terrain:"
      >{{ props.terrain?.type }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<style scoped></style>
