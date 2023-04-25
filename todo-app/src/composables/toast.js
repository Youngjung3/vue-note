// 컴포넌트를 합성하는 기술 -> composition
// composables 뷰에서 customHook 처럼 재사용되는 컴포넌트를 저장해놓고 쓰는 기술

import { ref, onUnmounted } from "vue";

export const useToast=()=>{
    const showToast = ref(false);
    const toastMessage =ref('');
    const toastAlertType = ref('');
    const timeout=ref(null);

    onUnmounted(()=>{
        clearTimeout(timeout.value);
      })

    const triggerToast = (msg,type='info') => {
      toastMessage.value = msg;
      toastAlertType.value=type;
      showToast.value = true;
      timeout.value = setTimeout(()=>{
        toastMessage.value = '';
        toastAlertType.value='';
        showToast.value = false;
      },5000)
    };
    return {
        showToast,
        toastMessage,
        toastAlertType,
        triggerToast,
        timeout,
    }
}