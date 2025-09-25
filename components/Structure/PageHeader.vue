<script lang="ts" setup>
interface BreadcrumbItem {
  path: string;
  title: string;
}
const props = defineProps<{
  breadcrumbs?: BreadcrumbItem[];
  title: string;
}>();
const onBack = () => {
  if (props.breadcrumbs && props.breadcrumbs?.length > 1)
    navigateTo(props.breadcrumbs?.at(-2)?.path);
};
</script>

<template>
  <el-page-header @back="onBack">
    <template #title><span>retour</span></template>
    <template #breadcrumb v-if="props.breadcrumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="breadcrumb in breadcrumbs" :to="breadcrumb.path">{{
          breadcrumb.title
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </template>
    <template #content>
      <div class="flex items-center">
        <span class="text-large font-600 mr-3">{{ title }}</span>
      </div>
    </template>
    <template #extra>
      <div class="flex items-center">
        <slot name="options"> </slot>
      </div>
    </template>
    <slot />
  </el-page-header>
</template>

<style scoped></style>
