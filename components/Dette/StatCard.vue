<template>
  <div class="card">
    <div class="card-body">
      <el-skeleton :loading="props.loading" animated>
        <template #template>
          <div class="row">
            <div class="col-sm-8">
              <el-skeleton-item variant="h3" style="width: 100px; margin-bottom: 8px" />
              <div class="text-muted">
                <div class="mb-1 d-flex align-items-center">
                  <el-skeleton-item variant="circle" style="width: 8px; height: 8px; margin-right: 8px" />
                  <el-skeleton-item variant="text" style="width: 150px" />
                </div>
                <div class="mb-1 d-flex align-items-center">
                  <el-skeleton-item variant="circle" style="width: 8px; height: 8px; margin-right: 8px" />
                  <el-skeleton-item variant="text" style="width: 150px" />
                </div>
                <div class="mb-0 d-flex align-items-center">
                  <el-skeleton-item variant="circle" style="width: 8px; height: 8px; margin-right: 8px" />
                  <el-skeleton-item variant="text" style="width: 150px" />
                </div>
              </div>
            </div>
            <div class="col-sm-4 d-flex align-items-center justify-content-center">
              <el-skeleton-item variant="circle" style="width: 100px; height: 100px" />
            </div>
          </div>
        </template>
        <template #default>
          <div class="row">
            <div class="col-sm-12">
              <h5 class="text-primary">{{ props.operation }}</h5>
              <p>Détails mensuels des dettes sur {{ props.operation }}</p>

              <div class="text-muted">
                <div class="mb-0 d-flex align-items-center justify-content-between">
                  <span>
                    <i class="mdi mdi-circle-medium align-middle text-danger me-1"></i>
                    <slot name="unpaid-text" />
                    <b class="ms-1">{{ useCurrency(props.stats.unpaid.amount) }}</b>
                  </span>
                  <div class="d-flex align-items-center">
                    <span class="progress progress-sm me-1" style="flex: 1; min-width: 150px;">
                      <div class="progress-bar bg-danger" role="progressbar"
                        :style="`width: ${props.stats.unpaid.percentage}%`"
                        :aria-valuenow="props.stats.unpaid.percentage" aria-valuemin="0" aria-valuemax="100">
                      </div>
                    </span>
                    {{ props.stats.unpaid.percentage }}%
                  </div>
                </div>
                <div class="mb-0 d-flex align-items-center justify-content-between">
                  <span>
                    <i class="mdi mdi-circle-medium align-middle text-warning me-1"></i>
                    <slot name="pending-text" />
                    <b class="ms-1">{{ useCurrency(props.stats.pending.amount) }}</b>
                  </span>
                  <div class="d-flex align-items-center">
                    <span class="progress progress-sm me-1" style="flex: 1; min-width: 150px;">
                      <div class="progress-bar bg-warning" role="progressbar"
                        :style="`width: ${props.stats.pending.percentage}%`"
                        :aria-valuenow="props.stats.pending.percentage" aria-valuemin="0" aria-valuemax="100">
                      </div>
                    </span>
                    {{ props.stats.pending.percentage }}%
                  </div>
                </div>
                <div class="mb-0 d-flex align-items-center justify-content-between">
                  <span>
                    <i class="mdi mdi-circle-medium align-middle text-success me-1"></i>
                    <slot name="paid-text" />
                    <b class="ms-1">{{ useCurrency(props.stats.paid.amount) }}</b>
                  </span>
                  <div class="d-flex align-items-center">
                    <span class="progress progress-sm me-1" style="flex: 1; min-width: 150px;">
                      <div class="progress-bar bg-success" role="progressbar"
                        :style="`width: ${props.stats.paid.percentage}%`" :aria-valuenow="props.stats.paid.percentage"
                        aria-valuemin="0" aria-valuemax="100">
                      </div>
                    </span>
                    {{ props.stats.paid.percentage }}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { StatContent } from '~/types/dette';
import { useCurrency } from '~/composables/numeral';
const props = defineProps<{ operation: string; stats: StatContent; loading: boolean }>();
</script>

<style scoped></style>