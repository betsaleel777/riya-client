import { defineStore } from "pinia";

export const useConfigStore = defineStore("config", () => {
  const collapsed = ref(false);
  const enabledRightBar = ref(false);
  function toggleCollapse() {
    collapsed.value = !collapsed.value;
  }
  function rigthBarEnable() {
    enabledRightBar.value = true;
  }
  function rightBarDisabled() {
    enabledRightBar.value = false;
  }
  return { rigthBarEnable, toggleCollapse, rightBarDisabled, collapsed, enabledRightBar };
});
