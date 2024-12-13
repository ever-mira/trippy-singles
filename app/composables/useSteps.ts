import Puzzle from "../components/steps/Puzzle.vue"

const state = reactive({
  username: "",
})

const stepComponent: Component = shallowRef(Puzzle)

const setStepComponent = (component: Component) => {
  stepComponent.value = component
}

const reset = () => {
  state.username = ""
}

export default function useSteps() {
  return {
    ...toRefs(state),
    stepComponent,
    setStepComponent,
    reset,
  }
}
