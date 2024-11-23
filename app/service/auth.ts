import Puzzle from "../components/auth/Puzzle.vue";

const state = reactive({
  username: "",
  displayname: "",
});

const stepComponent: Component = shallowRef(Puzzle);

const setStepComponent = (component: Component) => {
  stepComponent.value = component;
};

const reset = () => {
  state.username = "";
};

export default function useAuth() {
  return {
    ...toRefs(state),
    stepComponent,
    setStepComponent,
    reset,
  };
}
