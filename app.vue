<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const color = useColorMode();
import { storeToRefs } from "pinia";
import { useConfigStore } from "~/store";
const { collapsed, enabledRightBar } = storeToRefs(useConfigStore());
useHead({
  bodyAttrs: {
    "data-sidebar": color.preference,
    "data-layout-mode": color.preference,
    class: { "sidebar-enable vertical-collpsed": collapsed, "right-bar-enabled": enabledRightBar },
  },
});
</script>

<style>
html.dark {
  --el-bg-color: #2a3042;
}

html.dark .el-table__body tr:hover>td {
  background-color: #222736 !important;
}
</style>
