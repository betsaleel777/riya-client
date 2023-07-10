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
</script>
