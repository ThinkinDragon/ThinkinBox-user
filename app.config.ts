export default defineAppConfig({
  ui: {
    //strategy: 'override',
    primary: "blue",
    variables: {
      light: {
        background: "255 255 255",
        foreground: "var(--color-gray-700)",
      },
      dark: {
        background: "var(--color-gray-900)",
        foreground: "var(--color-gray-200)",
      },
      header: {
        height: "4rem",
      },
    },
    notifications: {
      // Show toasts at the top right of the screen
      position: "top-0 bottom-auto",
    },

    button: {
      variants: {
        default: {
          size: "lg",
          base: "focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 w-full flex-shrink-0",
        },
      },
    },
    card: {
      background: "bg-white dark:bg-gray-800",
      divide: "divide-y divide-gray-200 divide-dashed dark:divide-gray-600",
      shadow: "shadow-lg",
      body: {
        base: "",
        background: "",
        padding: "px-2 py-1 pb-3 sm:p-6",
      },
      header: {
        base: "",
        background: "",
        padding: "px-2 py-3 sm:px-6",
      },
      footer: {
        base: "",
        background: "",
        padding: "px-4 py-4 sm:px-6",
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
