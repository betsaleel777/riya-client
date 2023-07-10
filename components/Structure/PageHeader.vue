<script lang="ts" setup>
interface BreadcrumbItem {
  path: string;
  title: string;
}
interface ExtraOptions {
  exist: boolean;
  create?: boolean;
  print?: boolean;
}
const props = defineProps<{
  breadcrumbs?: BreadcrumbItem[];
  title: string;
  extra: ExtraOptions;
}>();
const emit = defineEmits<{ (event: "print"): void; (event: "create"): void }>();
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
      <div v-if="extra.exist" class="flex items-center">
        <el-button v-show="extra.print" @click="emit('print')">Imprimer</el-button>
        <el-button v-show="extra.create" @click="emit('create')" class="ml-2">Ajouter</el-button>
      </div>
    </template>
    <slot />
  </el-page-header>
</template>

<style scoped></style>
