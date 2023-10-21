const statusBien = {
  busy: "occupé",
  free: "disponible",
} as const
const statusValidable = {
  wait: "en attente",
  valid: "validée",
} as const
const statusContrat = {
  uptodate: "à jours",
  notuptodate: "non à jours",
} as const
const stateContrat = {
  using: "en cours",
  aborted: "résilié",
} as const
const typeContrat = {
  achat: "Achat",
  visite: "Visite",
} as const
const statusAvance = {
  exhausted: "avance épuisée",
  inuse: "avance en cours",
  contratWithout: "simple visite",
} as const

const statusPayable = {
  paid: "payé",
  unpaid: "impayé",
  pending: "en attente",
} as const

export {
  statusBien,
  statusValidable,
  stateContrat,
  statusContrat,
  statusAvance,
  typeContrat,
  statusPayable,
};
