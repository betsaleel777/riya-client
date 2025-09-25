<template>
  <el-config-provider :locale="locale">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </el-config-provider>
</template>

<script setup>
import fr from "element-plus/dist/locale/fr.mjs";
const locale = fr;
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
@import "element-plus/theme-chalk/dark/css-vars.css";
html.dark {
  --el-bg-color: #2a3042;
}
</style>
