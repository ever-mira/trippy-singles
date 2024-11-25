const state = reactive({
  visible: false,
  text: "",
  yesNo: false,
  callback: ref<(() => void) | undefined>(undefined),
})

export function useModal() {
  const showModal = async (text: string, yesNo: boolean = false, callback?: () => void) => {
    state.text = text
    state.visible = true
    state.yesNo = yesNo
    state.callback = callback
  }

  const hideModal = async () => {
    state.text = ""
    state.visible = false
  }

  return {
    ...toRefs(state),
    showModal,
    hideModal,
  }
}
