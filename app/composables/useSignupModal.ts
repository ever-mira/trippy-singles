import SignupStepUsername from "../components/steps/SignupStepUsername.vue"

const state = reactive({
  visible: false,
})

export function useSignupModal() {
  const { setStepComponent } = useSteps()

  const showModal = async () => {
    setStepComponent(SignupStepUsername)
    state.visible = true
  }

  const hideModal = async () => {
    state.visible = false
  }

  return {
    ...toRefs(state),
    showModal,
    hideModal,
  }
}
