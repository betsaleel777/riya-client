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

export { statusBien, statusValidable, stateContrat, statusContrat, typeContrat };
