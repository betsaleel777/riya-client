<template>
    <div class="card">
        <div class="card-body">
            <div class="d-sm-flex flex-wrap justify-content-between">
                <h4 class="card-title mb-4">Rapport</h4>
                <DashboardRapportOptionComponent v-model="date" />
            </div>
            <h5 class="card-title d-flex justify-content-center mb-3">Mois de {{ mois }}</h5>
            <el-table :data="props.rapport" show-summary :summary-method="summary">
                <el-table-column prop="proprietaire" label="Propriétaires" show-overflow-tooltip>
                    <template #default="scope">
                        <span>{{ scope.row.proprietaire }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="biens" label="Biens" :width="70" align="right" />
                <el-table-column prop="total" label="Somme des loyers" align="right">
                    <template #default="scope">
                        {{ useCurrency(scope.row.total) }}
                    </template>
                </el-table-column>
                <el-table-column prop="paye" label="Loyers recouvré" align="right">
                    <template #default="scope">
                        {{ useCurrency(scope.row.paye) }}
                    </template>
                </el-table-column>
                <el-table-column label="Reste à récouvrer" align="right">
                    <template #default="scope">
                        <b>{{ useCurrency(scope.row.total - scope.row.paye) }}</b>
                    </template>
                </el-table-column>
                <el-table-column prop="a_rembourser" label="A rembourser" align="right">
                    <template #default="scope">
                        {{ useCurrency(scope.row.a_rembourser) }}
                    </template>
                </el-table-column>
                <el-table-column prop="rembourse" label="Remboursé" align="right">
                    <template #default="scope">
                        {{ useCurrency(scope.row.rembourse) }}
                    </template>
                </el-table-column>
                <el-table-column label="Reste à rembourser" align="right">
                    <template #default="scope">
                        <b>{{ useCurrency(scope.row.a_rembourser - scope.row.rembourse) }}</b>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Rapport } from '~/types/dashboard';
import { useCurrency } from '~/composables/numeral';
import type { TableColumnCtx } from 'element-plus';
import { useDashboardStore } from '~/store/dashboard';

const props = defineProps<{ rapport: Rapport[] }>();
const mois = computed(() => date.value ? new Date(date.value).toLocaleString('fr-FR', { month: 'long' }) : new Date().toLocaleString('fr-FR', { month: 'long' }));
const date = ref<string | undefined>(undefined);
const { getRapport } = useDashboardStore();
watch(date, (newDate) => newDate ? getRapport(newDate) : getRapport(), { immediate: false });

const summary = ({ columns, data }: { columns: TableColumnCtx<Rapport>[]; data: Rapport[] }) => {
    const sums: string[] = [];

    columns.forEach((column, index) => {
        if (index === 0) {
            sums[index] = 'Total';
            return;
        }

        const prop = column.property as keyof Rapport;

        // Pour les colonnes calculées (Reste à récouvrer et Reste à rembourser)
        if (index === 4) {
            // Reste à récouvrer = total - paye
            const totalSum = data.reduce((sum, item) => sum + (Number(item.total) || 0), 0);
            const payeSum = data.reduce((sum, item) => sum + (Number(item.paye) || 0), 0);
            sums[index] = useCurrency(totalSum - payeSum);
        } else if (index === 7) {
            // Reste à rembourser = a_rembourser - rembourse
            const aRembourserSum = data.reduce((sum, item) => sum + (Number(item.a_rembourser) || 0), 0);
            const rembourseSum = data.reduce((sum, item) => sum + (Number(item.rembourse) || 0), 0);
            sums[index] = useCurrency(aRembourserSum - rembourseSum);
        } else if (prop === 'biens') {
            // Colonne biens : nombre simple, pas de formatage monétaire
            const values = data.map(item => Number(item[prop]) || 0);
            const sum = values.reduce((prev, curr) => prev + curr, 0);
            sums[index] = sum.toString();
        } else if (prop && (prop === 'total' || prop === 'paye' || prop === 'a_rembourser' || prop === 'rembourse')) {
            // Colonnes monétaires : formatage avec useCurrency
            const values = data.map(item => Number(item[prop]) || 0);
            const sum = values.reduce((prev, curr) => prev + curr, 0);
            sums[index] = useCurrency(sum);
        } else {
            sums[index] = '';
        }
    });

    return sums;
};
</script>

<style scoped></style>
