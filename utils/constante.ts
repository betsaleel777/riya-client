const statusBien = Object.freeze({
  busy: "occupé",
  free: "disponible",
});
const statusValidable = Object.freeze({
  wait: "en attente",
  valid: "validée",
});
const statusContrat = Object.freeze({
  uptodate: "à jours",
  notuptodate: "non à jours",
});
const stateContrat = Object.freeze({
  using: "en cours",
  aborted: "résilié",
});
const typeContrat = Object.freeze({
  achat: "Achat",
  visite: "Visite",
});
const statusAvance = Object.freeze({
  exhausted: "avance épuisée",
  inuse: "avance en cours",
  contratWithout: "simple visite",
});

const statusPayable = Object.freeze({
  paid: "payé",
  unpaid: "impayé",
  pending: "en attente",
});

export {
  statusBien,
  statusValidable,
  stateContrat,
  statusContrat,
  statusAvance,
  typeContrat,
  statusPayable,
};
