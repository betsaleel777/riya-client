const useShowModal = () => {
  const show = reactive({ enable: false, id: 0 });
  const runShowModal = (id: number) => {
    show.id = id;
    show.enable = true;
  };
  return { runShowModal, show }
}

export { useShowModal }

