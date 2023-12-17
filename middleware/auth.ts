export default defineNuxtRouteMiddleware((to, from) => {
  const { isLoggedIn } = useUser();

  if (process.client) {
    //console.log('auth login',isLoggedIn);
    if (!isLoggedIn) {
      return navigateTo("/login");
    }
  }
});
