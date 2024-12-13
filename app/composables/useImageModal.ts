const state = reactive({
  visible: false,
  imgUrl: "",
})

export function useImageModal() {
  const showModal = async (url: string) => {
    state.imgUrl = url
    state.visible = true
  }

  const hideModal = async () => {
    state.imgUrl = ""
    state.visible = false
  }

  return {
    ...toRefs(state),
    showModal,
    hideModal,
  }
}
