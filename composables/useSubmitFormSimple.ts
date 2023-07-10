export const useSubmitFormSimple = (action: (values: any) => Promise<string | undefined>) => {
  const onSubmit = (values: any, actions: any) => {
    action(values)
      .then((message) => {
        ElNotification.success({ title: "succès", message });
      })
      .catch((err) => {
        if (err.data.errors) actions.setErrors(err.data.errors);
        if (err.response.status === 419) navigateTo("/login");
      });
  };
  return { onSubmit };
};
