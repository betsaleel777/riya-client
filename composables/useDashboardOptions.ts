import type { Dashboard } from "~/types/dashboard";

export const useDashboardOptions = (dashboard: Ref<Dashboard | undefined>) => {
  const locatairesOptions = computed(() => [
    {
      name: "locataires",
      type: "pie",
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 14,
          fontWeight: "bold",
        },
      },
      labelLine: { show: false },
      data: [
        { value: dashboard.value?.contrats.uptodate ?? 0, name: "à jours" },
        { value: dashboard.value?.contrats.notuptodate ?? 0, name: "non à jours" },
      ],
    },
  ]);
  const proprietesOptions = computed(() => [
    {
      name: "propriétés de type",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 14,
          fontWeight: "bold",
        },
      },
      labelLine: { show: false },
      data: [
        { value: dashboard.value?.appartements, name: "appartements" },
        { value: dashboard.value?.terrains, name: "terrains" },
      ],
    },
  ]);
  const statistiquesPaiementsOptions = computed(() => ({
    dates: dashboard.value?.paiements.dates,
    series: [
      {
        type: "bar",
        name: "achats",
        data: dashboard.value?.paiements.achats,
        emphasis: {
          focus: "series",
        },
        barWidth: 10,
      },
      {
        type: "bar",
        name: "loyers",
        data: dashboard.value?.paiements.loyers,
        emphasis: {
          focus: "series",
        },
        barWidth: 10,
      },
    ],
  }));
  const statistiquesLocationsOptions = computed(() => ({
    dates: dashboard.value?.locations.dates,
    series: [
      {
        type: "bar",
        name: "frais de dossier",
        data: dashboard.value?.locations.frais,
        emphasis: {
          focus: "series",
        },
        barWidth: 10,
      },
      {
        type: "bar",
        name: "cautions",
        data: dashboard.value?.locations.cautions,
        emphasis: {
          focus: "series",
        },
        barWidth: 10,
      },
      {
        type: "bar",
        name: "avances de loyer",
        data: dashboard.value?.locations.avances,
        emphasis: {
          focus: "series",
        },
        barWidth: 10,
      },
    ],
  }));
  return {
    locatairesOptions,
    proprietesOptions,
    statistiquesLocationsOptions,
    statistiquesPaiementsOptions,
  };
};
