<script lang="ts" setup>
const props = defineProps<{ montant: number; icon: string; titre: string }>();
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="d-flex flex-wrap align-items-start">
        <h5 class="card-title mb-3 me-2">{{ props.titre }}</h5>
        <slot name="options" />
      </div>
      <div class="d-flex flex-wrap">
        <div>
          <p class="text-muted mb-1">montant</p>
          <h4 class="mb-3">{{ useCurrency(props.montant) }}</h4>
        </div>
        <div class="ms-auto align-self-end">
          <i class="display-4 text-light" :class="props.icon"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
