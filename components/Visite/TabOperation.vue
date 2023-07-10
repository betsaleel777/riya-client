<script lang="ts" setup>
const activeName = ref("frais");
</script>

<template>
  <el-tabs v-model="activeName" class="demo-tabs" stretch>
    <el-tab-pane label="Frais d'agence" name="frais"><VisiteFraisPaneContent /></el-tab-pane>
    <el-tab-pane label="Caution" name="cautions"><VisiteCautionPaneContent /></el-tab-pane>
    <el-tab-pane label="Avance" name="avances"> <VisiteAvancePaneContent /></el-tab-pane>
  </el-tabs>
</template>

<style scoped></style>
