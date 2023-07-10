import { Entity } from "~/types/global";

type TrashFunction = (id: number) => Promise<string | undefined>;

export const useHandleCrudButtons = (trash: TrashFunction) => {
  const modal = reactive({
    create: false,
    edit: { dialog: false, id: 0 },
    show: { dialog: false, id: 0 },
  });

  const handleEdit = (ligne: Entity) => {
    if (ligne.id !== undefined) modal.edit.id = ligne.id;
    modal.edit.dialog = true;
  };
  const handleShow = (ligne: Entity) => {
    if (ligne.id !== undefined) modal.show.id = ligne.id;
    modal.show.dialog = true;
  };
  const handleDelete = (ligne: any, confirmationText: string) => {
    ElMessageBox.confirm(confirmationText, "Confirmation de suppression", {
      confirmButtonText: "confirmer",
      cancelButtonText: "abandonner",
      type: "warning",
    }).then(() => {
      if (ligne.id !== undefined)
        trash(ligne.id)
          .then((message) => {
            ElMessage({ type: "success", message });
          })
          .catch((err) => {
            ElMessage({ type: "error", message: "Une erreur s'est produite" });
          });
    });
  };
  return { handleDelete, handleEdit, modal, handleShow };
};
