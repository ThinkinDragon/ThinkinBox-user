export default defineAppConfig({
  ui: {
    //strategy: 'override',
    primary: "blue",
    ui: {
      notifications: {
        // Show toasts at the top right of the screen
        position: 'top-0 bottom-auto'
      }
    },
    button: {
      variants: {
        default: {
          size: "lg",
          base: "focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 w-full flex-shrink-0",
        },
      },
    },
    slideover: {
      variants: {
        default: {
          background: "bg-white/20 dark:bg-gray-900/20",
        },
      },
    },
  },
});
