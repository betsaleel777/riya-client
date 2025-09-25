<script lang="ts" setup>
type PromiseFunction = () => Promise<void>;
const props = defineProps<{
  searchExists: boolean;
  loadedSearch: boolean;
}>();
const emit = defineEmits<{ onSearch: PromiseFunction; onRefresh: PromiseFunction }>();
</script>

<template>
  <el-row :gutter="10" class="mt-1 mb-2">
    <el-col :span="10">
      <slot name="searching" />
    </el-col>
    <el-col :span="3">
      <el-button
        type="default"
        :icon="ElIconSearch"
        @click="$emit('onSearch')"
        :disabled="!props.searchExists"
        plain
      />
    </el-col>
    <el-col :span="10"></el-col>
    <el-col :span="1">
      <el-button
        v-if="props.loadedSearch"
        @click="$emit('onRefresh')"
        class="w-100"
        type="default"
        :icon="ElIconRefresh"
      />
    </el-col>
  </el-row>
</template>

<style scoped></style>
