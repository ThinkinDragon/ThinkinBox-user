import { StatusBar, Style , AnimationOptions ,StatusBarInfo  } from '@capacitor/status-bar';

export function useStatusBar() {
  const isStatusBarVisible = ref<boolean>(true);
  const statusBarColor = ref<string|undefined>('');

  const setStatusBarVisibility = (visible:boolean) => {
    isStatusBarVisible.value = visible;
    StatusBar.show({animation: AnimationOptions.None});
  };

  const setStatusBarColor = (color:string) => {
    statusBarColor.value = color;
    StatusBar.setBackgroundColor({ color });
  };

  onMounted(() => {
    StatusBar.getInfo().then((result:StatusBarInfo) => {
      isStatusBarVisible.value = result.visible;
      statusBarColor.value = result.color;
    });
  });

  onBeforeUnmount(() => {
    // Clean up any event listeners or subscriptions here
  });

  return {
    isStatusBarVisible,
    statusBarColor,
    setStatusBarVisibility,
    setStatusBarColor,
  };
}