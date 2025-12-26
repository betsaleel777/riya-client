<template>
  <div class="card">
    <div class="card-body">
      <el-skeleton :loading="props.loading" animated>
        <template #template>
          <div class="d-flex align-items-center mb-3">
            <div class="avatar-xs me-3">
              <span
                class="avatar-title rounded-circle bg-primary-subtle font-size-18 d-flex align-items-center justify-content-center">
                <el-skeleton-item variant="circle" style="width: 32px; height: 32px" />
              </span>
            </div>
            <el-skeleton-item variant="text" style="width: 120px" />
          </div>
          <div class="text-muted mt-4">
            <el-skeleton-item variant="h3" style="width: 80px" />
            <div class="d-flex mt-2">
              <el-skeleton-item variant="text" style="width: 50px" />
              <el-skeleton-item variant="text" style="width: 120px" class="ms-2" />
            </div>
          </div>
        </template>
        <template #default>
          <div class="d-flex align-items-center mb-3">
            <div class="avatar-xs me-3">
              <span class="avatar-title rounded-circle bg-primary-subtle text-primary font-size-18">
                <slot name="icon" />
              </span>
            </div>
            <h5 class="font-size-14 mb-0">{{ props.stat.title }}</h5>
          </div>
          <div class="text-muted mt-4">
            <h4>{{ useCurrency(props.stat.amount) }}</h4>
            <div class="d-flex">
              <span class="badge badge-soft-success font-size-12"> {{ props.stat.percentage }}% </span>
              <span class="ms-2 text-truncate">{{ props.stat.text }}</span>
            </div>
          </div>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { StatContent } from "~/types/loyer";
import { useCurrency } from "~/composables/numeral";

const props = defineProps<{ stat: StatContent; loading: boolean }>();
</script>

<style scoped></style>