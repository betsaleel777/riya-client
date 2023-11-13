<script lang="ts" setup>
const props = defineProps<{ titre: string; nombre: number; icon: string }>();
</script>

<template>
  <div class="card mini-stats-wid">
    <div class="card-body">
      <div class="d-flex flex-wrap">
        <div class="me-3">
          <p class="text-muted mb-2">{{ props.titre }}</p>
          <h5 class="mb-0">{{ props.nombre }}</h5>
        </div>

        <div class="avatar-sm ms-auto">
          <div class="avatar-title bg-light rounded-circle text-primary font-size-20">
            <i :class="props.icon"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
