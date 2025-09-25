export const useSubmitForm = (
  action: (values: any) => Promise<string | undefined>,
  dialog?: Ref<boolean>
) => {
  const onSubmit = async (values: any, actions: any) => {
    return action(values)
      .then((message) => {
        ElNotification.success({ title: "succès", message });
        if (dialog !== undefined) dialog.value = false;
      })
      .catch((err) => {
        if (err?.data?.errors) actions.setErrors(err?.data?.errors);
        if (err.response.status === 419) navigateTo("/login");
      });
  };
  return { onSubmit };
};
