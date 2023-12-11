import { defineStore } from 'pinia';
import { Keyboard, type KeyboardInfo } from '@capacitor/keyboard';
import { useWhatPlatform } from './isPlatform';

interface KeyboardComposition {
  isVisible: boolean;
  keyboardHeight: number;
  hideKeyboard(): void;
  showKeyboard(): void;
}

export const useKeyboards = defineStore('keyboard', (): KeyboardComposition => {
  const isVisible = ref(false);
  const keyboardHeight = ref(0);
  const { isApp } = useWhatPlatform()
  const handleVisibilityChange = (info: KeyboardInfo) => {
    isVisible.value = info.keyboardHeight > 0;
    keyboardHeight.value = info.keyboardHeight;
    console.log(JSON.stringify(info.keyboardHeight));
    //document.activeElement.scrollIntoView({behavior: 'smooth'});
  };
  const handleVisibilityGone = () => {
    isVisible.value = false;
    keyboardHeight.value = 0;
    //document.body.scrollTop = 0; // For Safari
    //document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  
  };
  onMounted(() => {
    if (isApp) {
      //Keyboard.shrinkView(true)
      window.addEventListener('keyboardDidShow', function () {
        document.activeElement.scrollIntoView()
      })
      Keyboard.addListener('keyboardWillShow', handleVisibilityChange);
      Keyboard.addListener('keyboardDidShow', handleVisibilityChange);
      Keyboard.addListener('keyboardWillHide', handleVisibilityChange);
      Keyboard.addListener('keyboardDidHide', handleVisibilityChange);
    }
  });

  onUnmounted(() => {
    if (isApp) Keyboard.removeAllListeners();
  });

  const hideKeyboard = () => {
    if (isApp && isVisible.value)  {
      window.scrollTo({ top: 0, behavior: "smooth" });

      Keyboard.hide()
    }
  };
  
  const showKeyboard = () => Keyboard.show();

  return {
    isVisible: isVisible.value,
    keyboardHeight: keyboardHeight.value,
    hideKeyboard,showKeyboard

  };
},{  persist: { enabled: true },
});