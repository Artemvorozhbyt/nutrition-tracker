export type RefreshAccessToken = () => Promise<string | null>

export type ApiAuthConfig = {
  getAccessToken: () => string | null
  onUnauthorized: (() => void) | null
  refreshAccessToken: RefreshAccessToken | null
}

const defaultAuthConfig: ApiAuthConfig = {
  getAccessToken: () => null,
  onUnauthorized: null,
  refreshAccessToken: null,
}

let currentAuthConfig = defaultAuthConfig

export function configureApiAuth(config: ApiAuthConfig) {
  currentAuthConfig = config

  return () => {
    currentAuthConfig = defaultAuthConfig
  }
}

export function getApiAuthConfig() {
  return currentAuthConfig
}
