type Emit = (event: "update:modelValue", payload: boolean) => void
type Props = Readonly<Omit<{ modelValue: boolean; id: number }, "modelValue"> & { modelValue: boolean }>
export const useDialogModelValue = (props: Props, emit: Emit) => {
  const dialog = computed({
    get() {
      return props.modelValue;
    },
    set(newValue: boolean): void {
      emit("update:modelValue", newValue);
    },
  });
  return { dialog }
}
