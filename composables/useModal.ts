const useShowModal = () => {
  const show = reactive({ enable: false, id: 0 });
  const runShowModal = (id: number) => {
    show.id = id;
    show.enable = true;
  };
  return { runShowModal, show }
}
const useOperationShowModal = () => {
  const details = reactive({
    loyer: { id: 0, dialog: false },
    achat: { id: 0, dialog: false },
    visite: { id: 0, dialog: false },
  });
  const runOperationShowModal = (id: number, type: "loyer" | "achat" | "visite") => {
    console.log(type);
    details[type].dialog = true;
    details[type].id = id;
  };
  return { runOperationShowModal, details }
};

export { useShowModal, useOperationShowModal }

