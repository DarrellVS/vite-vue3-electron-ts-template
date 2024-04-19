import { computed } from 'vue';
import router from '../router';

export const useNavigation = () => {
  const currentRoute = computed(() => router.currentRoute.value.path);

  const isRouteActive = (route: string) => {
    return currentRoute.value === route;
  };

  return {
    isRouteActive,
  };
};
