<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { Form } from 'vee-validate'
import { useProprietaireStore } from '~/store/proprietaire'
const props = defineProps<{
  modelValue: boolean
  id: number
}>()
const emit = defineEmits<{
  (event: 'update:modelValue', payload: boolean): void
}>()
const dialog = computed({
  get() {
    return props.modelValue
  },
  set(newValue: boolean): void {
    emit('update:modelValue', newValue)
  },
})

const { update, getOne } = useProprietaireStore()
const { proprietaire, loading } = storeToRefs(useProprietaireStore())
onMounted(async () => {
  await getOne(props.id)
})
const { onSubmit } = useSubmitForm(update, dialog)
</script>

<template>
  <Form class="form-horizontal" @submit="onSubmit" :initial-values="proprietaire" v-slot="{ isSubmitting, errors }">
    <el-dialog v-model="dialog" title="Modifier proprietaire" width="35%" destroy-on-close center>
      <div v-loading="loading.edit">
        <ProprietaireDialogForm :errors="errors" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="danger" @click="dialog = false" plain>Annuler</el-button>
          <el-button type="primary" :disabled="isSubmitting" native-type="submit"> modifier </el-button>
        </span>
      </template>
    </el-dialog>
  </Form>
</template>

<style scoped></style>
