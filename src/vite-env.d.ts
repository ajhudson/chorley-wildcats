interface ImportMetaEnv {
  readonly VITE_POSTHOG_PROJECT_TOKEN: string
  readonly VITE_POSTHOG_HOST: string
  readonly VITE_SITE_LAUNCH_OVERRIDE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}