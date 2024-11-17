import Puzzle from "../components/auth/Puzzle.vue";

const state = reactive({});

const stepComponent: Component = shallowRef(Puzzle);

const setStepComponent = (component: Component) => {
  stepComponent.value = component;
};

export default function useAuth() {
  return {
    ...toRefs(state),
    stepComponent,
    setStepComponent,
  };
}
