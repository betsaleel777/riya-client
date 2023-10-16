import { defineStore } from 'pinia'
import { FetchError } from 'ofetch'
import { Proprietaire, Proprietaires } from '~/types/proprietaire'

export const useProprietaireStore = defineStore('proprietaire', () => {
  const { $apiFetch } = useNuxtApp()

  let proprietaires = ref<Proprietaires>([])
  let proprietaire = ref<Proprietaire>()
  let loading = reactive({ index: false, edit: false })

  const getAll = async () => {
    try {
      loading.index = true
      proprietaires.value = await $apiFetch<Proprietaires>('api/proprietaires')
      loading.index = false
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo('/login')
    }
  }

  const create = async (payload: Proprietaire) => {
    try {
      const response = await $apiFetch<string>('api/proprietaires', { method: 'post', body: payload })
      await getAll()
      return response
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo('/login')
    }
  }

  const update = async (payload: Proprietaire) => {
    try {
      const response = await $apiFetch<string>('api/proprietaires/' + payload.id, { method: 'put', body: payload })
      await getAll()
      return response
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo('/login')
    }
  }

  const trash = async (id: number) => {
    try {
      const response = await $apiFetch<string>('api/proprietaires/' + id, { method: 'delete' })
      await getAll()
      return response
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo('/login')
    }
  }

  const getOne = async (id: number) => {
    try {
      loading.edit = true
      proprietaire.value = await $apiFetch<Proprietaire>('api/proprietaires/' + id, { method: 'get' })
      loading.edit = false
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 401) navigateTo('/login')
    }
  }

  return {
    proprietaire,
    proprietaires,
    loading,
    getAll,
    create,
    update,
    getOne,
    trash,
  }
})
