export default defineNuxtRouteMiddleware((to, from) => {
  const { isLoggedIn } = useUser();

  if (process.client) {
    //console.log('guest login',isLoggedIn);
    if (isLoggedIn) {      
      return navigateTo("/");
    }
  }
});
