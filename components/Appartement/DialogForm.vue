<script setup lang="ts">
import { storeToRefs } from "pinia";
import { Field } from "vee-validate";
import { useTypeAppartementStore } from "~/store/appartement";
import { useProprietaireStore } from "~/store/proprietaire";
interface Countrie {
  name: string;
  code: string;
}
interface Result {
  COMMUNE: string;
  _score: null | number;
}
interface Villes {
  total: number;
  next: string;
  results: Result[];
}
const props = defineProps<{ errors: any }>();
let loading = ref(true);
let pays = ref<Countrie[] | null>([]);
let villes = ref<Result[] | undefined>([]);
let dialog = reactive({ proprietaire: false, type: false });
const { types } = storeToRefs(useTypeAppartementStore());
const { proprietaires } = storeToRefs(useProprietaireStore());
onMounted(async () => {
  const { data: countries } = await useFetch<Countrie[]>("/json/countries.json");
  const { data: towns } = await useFetch<Villes>(
    "https://data.gouv.ci/data-fair/api/v1/datasets/liste-des-circonscriptions-administratives-et-des-communes/lines?select=COMMUNE&size=252"
  );
  pays = countries;
  villes.value = towns.value?.results.filter((town) => town.COMMUNE);
  const { getAll } = useTypeAppartementStore();
  const { getAll: getProprietaires } = useProprietaireStore();
  getAll();
  getProprietaires();
  loading.value = false;
});
</script>

<template>
  <div class="row" v-loading="loading">
    <Field name="id" hidden />
    <div class="col-12 mt-4">
      <div class="mb-2">
        <label for="nom" class="form-label">Nom</label>
        <Field name="nom" v-slot="{ handleChange, value }">
          <el-input
            id="nom"
            :model-value="value"
            @update:model-value="handleChange"
            :class="{ 'is-invalid': props.errors.nom }"
          />
        </Field>
        <div class="invalid-feedback" v-if="errors.nom">
          {{ props.errors.nom }}
        </div>
      </div>
    </div>
    <div class="col-6">
      <div class="mb-2">
        <label for="superficie" class="form-label">Superficie</label>
        <Field name="superficie" v-slot="{ handleChange, value }">
          <el-input
            id="superficie"
            :model-value="value"
            @update:model-value="handleChange"
            v-maska
            data-maska="##########"
            :class="{ 'is-invalid': props.errors.superficie }"
          />
        </Field>
        <div class="invalid-feedback" v-if="errors.superficie">{{ props.errors.superficie }}</div>
      </div>
      <div class="mb-2">
        <label for="montant_location" class="form-label">Montant Location</label>
        <Field name="montant_location" v-slot="{ handleChange, value }">
          <el-input
            id="montant_location"
            :model-value="value"
            @update:model-value="handleChange"
            v-maska
            data-maska="##########"
            :class="{ 'is-invalid': props.errors.montant_location }"
          />
        </Field>
        <div class="invalid-feedback" v-if="errors.montant_location">
          {{ props.errors.montant_location }}
        </div>
      </div>
      <div class="mb-2">
        <label for="montant_investit" class="form-label">Montant investit</label>
        <Field name="montant_investit" v-slot="{ handleChange, value }">
          <el-input
            id="montant_investit"
            :model-value="value"
            @update:model-value="handleChange"
            v-maska
            data-maska="##########"
            :class="{ 'is-invalid': props.errors.montant_investit }"
          />
        </Field>
        <div class="invalid-feedback" v-if="errors.montant_investit">
          {{ props.errors.montant_investit }}
        </div>
      </div>
      <div class="mb-2">
        <label for="cout_achat" class="form-label">Coût d'achat</label>
        <Field name="cout_achat" v-slot="{ handleChange, value }">
          <el-input
            id="cout_achat"
            :model-value="value"
            @update:model-value="handleChange"
            v-maska
            data-maska="##########"
            :class="{ 'is-invalid': props.errors.cout_achat }"
          />
        </Field>
        <div class="invalid-feedback" v-if="errors.cout_achat">
          {{ props.errors.cout_achat }}
        </div>
      </div>
      <div class="mb-2">
        <label for="observation" class="form-label">Observation</label>
        <Field name="observation" v-slot="{ handleChange, value }">
          <el-input
            id="observation"
            :model-value="value"
            @update:model-value="handleChange"
            type="textarea"
            :rows="4"
          />
        </Field>
      </div>
      <div class="mb-2">
        <label for="proprietaire" class="form-label">proprietaire</label>
        <Field name="proprietaire_id" v-slot="{ value, handleChange }">
          <el-row :gutter="5">
            <el-col :span="20">
              <el-select
                id="proprietaire"
                filterable
                :model-value="value"
                @update:model-value="handleChange"
                :class="{ 'is-invalid': props.errors.proprietaire_id }"
              >
                <template #append><i class="bx bx-plus" /></template>
                <el-option
                  v-for="(item, key) in proprietaires"
                  :key="key"
                  :label="item.nom_complet"
                  :value="item.id!"
                />
              </el-select>
              <div class="invalid-feedback" v-if="errors.proprietaire_id">
                {{ props.errors.proprietaire_id }}
              </div>
            </el-col>
            <el-col :span="4">
              <el-tooltip content="Créer un propriétaire" placement="bottom">
                <el-button @click="dialog.proprietaire = true" plain
                  ><i class="bx bx-plus"
                /></el-button>
              </el-tooltip>
              <ProprietaireCreateModal v-model="dialog.proprietaire" />
            </el-col>
          </el-row>
        </Field>
      </div>
      <div class="mb-2">
        <label for="type_appartement" class="form-label">Type d'appartement</label>
        <Field name="type_appartement_id" v-slot="{ value, handleChange }">
          <el-row :gutter="5">
            <el-col :span="20">
              <el-select
                id="type_appartement"
                filterable
                :model-value="value"
                @update:model-value="handleChange"
                clearable
              >
                <template #append><i class="bx bx-plus" /></template>
                <el-option
                  v-for="(item, key) in types"
                  :key="key"
                  :label="item.nom"
                  :value="item.id!"
                />
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-tooltip content="Créer un type" placement="bottom">
                <el-button @click="dialog.type = true" plain><i class="bx bx-plus" /></el-button>
              </el-tooltip>
              <AppartementTypeCreateModal v-model="dialog.type" />
            </el-col>
          </el-row>
        </Field>
      </div>
    </div>
    <div class="col-6">
      <div class="mb-2">
        <label for="ville" class="form-label">Ville</label>
        <Field name="ville" v-slot="{ value, handleChange }">
          <el-select
            id="ville"
            filterable
            :model-value="value"
            @update:model-value="handleChange"
            :class="{ 'is-invalid': props.errors.fonctions }"
            style="width: 100%"
          >
            <el-option
              v-for="(item, key) in villes"
              :key="key"
              :label="item.COMMUNE"
              :value="item.COMMUNE"
            />
          </el-select>
        </Field>
        <div class="invalid-feedback" v-if="errors.ville">{{ props.errors.ville }}</div>
      </div>
      <div class="mb-2">
        <label for="pays" class="form-label">Pays de résidence</label>
        <Field name="pays" v-slot="{ value, handleChange }">
          <el-select
            id="pays"
            filterable
            :model-value="value"
            @update:model-value="handleChange"
            :class="{ 'is-invalid': props.errors.pays }"
            style="width: 100%"
          >
            <el-option
              v-for="(item, key) in pays"
              :key="key"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </Field>
        <div class="invalid-feedback" v-if="errors.pays">{{ props.errors.pays }}</div>
      </div>
      <div class="mb-2">
        <label for="quartier" class="form-label">Quartier</label>
        <Field name="quartier" v-slot="{ value, handleChange }">
          <el-input
            id="quartier"
            :model-value="value"
            @update:model-value="handleChange"
            :class="{ 'is-invalid': props.errors.quartier }"
          />
        </Field>
        <div class="invalid-feedback" v-if="errors.quartier">{{ props.errors.quartier }}</div>
      </div>
      <div class="mb-2">
        <Field name="attestation_villageoise" v-slot="{ handleChange, value }">
          <el-checkbox
            id="attestation_villageoise"
            :model-value="value"
            @update:model-value="handleChange"
            class="ml-4"
            label="Attestation villageoise"
          >
          </el-checkbox>
        </Field>
        <Field name="titre_foncier" v-slot="{ handleChange, value }">
          <el-checkbox
            id="titre_foncier"
            :model-value="value"
            @update:model-value="handleChange"
            class="ml-4"
            label="Titre foncier"
          >
          </el-checkbox>
        </Field>
      </div>
      <div class="mb-2">
        <Field name="document_cession" v-slot="{ handleChange, value }">
          <el-checkbox
            id="document_cession"
            :model-value="value"
            @update:model-value="handleChange"
            class="ml-4"
            label="Document cession"
          >
          </el-checkbox>
        </Field>
        <Field name="cours_commune" v-slot="{ handleChange, value }">
          <el-checkbox
            id="cours_commune"
            :model-value="value"
            @update:model-value="handleChange"
            class="ml-4"
            label="Cours commune"
          >
          </el-checkbox>
        </Field>
      </div>
      <div class="mb-2">
        <Field name="placard" v-slot="{ handleChange, value }">
          <el-checkbox
            id="placard"
            :model-value="value"
            @update:model-value="handleChange"
            class="ml-4"
            label="Placard"
          >
          </el-checkbox>
        </Field>
        <Field name="etage" v-slot="{ handleChange, value }">
          <el-checkbox
            id="etage"
            :model-value="value"
            @update:model-value="handleChange"
            class="ml-4"
            label="Etage"
          >
          </el-checkbox>
        </Field>
        <Field name="parking" v-slot="{ handleChange, value }">
          <el-checkbox
            id="parking"
            :model-value="value"
            @update:model-value="handleChange"
            class="ml-4"
            label="Parking"
          >
          </el-checkbox>
        </Field>
      </div>
      <div class="mb-2">
        <Field name="cie" v-slot="{ handleChange, value }">
          <el-checkbox
            id="cie"
            :model-value="value"
            @update:model-value="handleChange"
            class="ml-4"
            label="CIE"
          >
          </el-checkbox>
        </Field>
        <Field name="sodeci" v-slot="{ handleChange, value }">
          <el-checkbox
            id="sodeci"
            :model-value="value"
            @update:model-value="handleChange"
            class="ml-4"
            label="SODECI"
          >
          </el-checkbox>
        </Field>
        <Field name="toilette" v-slot="{ handleChange, value }">
          <el-checkbox
            id="toilette"
            :model-value="value"
            @update:model-value="handleChange"
            class="ml-4"
            label="Toilette"
          >
          </el-checkbox>
        </Field>
      </div>
      <div class="mb-2">
        <Field name="cuisine" v-slot="{ handleChange, value }">
          <el-checkbox
            id="cuisine"
            :model-value="value"
            @update:model-value="handleChange"
            class="ml-4"
            label="Cuisine"
          >
          </el-checkbox>
        </Field>
        <Field name="garage" v-slot="{ handleChange, value }">
          <el-checkbox
            id="garage"
            :model-value="value"
            @update:model-value="handleChange"
            class="ml-4"
            label="Garage"
          >
          </el-checkbox>
        </Field>
        <Field name="cloture" v-slot="{ handleChange, value }">
          <el-checkbox
            id="cloture"
            :model-value="value"
            @update:model-value="handleChange"
            class="ml-4"
            label="Clôture"
          >
          </el-checkbox>
        </Field>
      </div>
      <div class="mb-2">
        <Field name="arreter_approbation" v-slot="{ handleChange, value }">
          <el-checkbox
            id="arreter_approbation"
            :model-value="value"
            @update:model-value="handleChange"
            class="ml-4"
            label="Arrêter d'approbation"
          >
          </el-checkbox>
        </Field>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
