import {
  AppConfig,
  AppFeature,
  getNetworkTokenTypeForResolver,
  IdentityProvider,
  NetworkResolver,
  NetworkTokenType,
} from '@pubkey-link/sdk'
import {
  BACKGROUND_COLORS,
  backgroundColorIds,
  BackgroundColors,
  mantineColorIds,
  themeWithBrand,
  UiTheme,
} from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { createContext, ReactNode, useContext, useMemo } from 'react'
import { useSdk } from './sdk-provider'

export interface AppConfigContext {
  appLogoUrlDark?: string | undefined
  appLogoUrlLight?: string | undefined
  appTheme: UiTheme['theme']
  appConfig?: AppConfig | undefined
  appConfigLoading: boolean
  authEnabled: boolean
  authTelegramBotName: string | null | undefined
  enabledProviders: IdentityProvider[]
  enabledTokenTypes: NetworkTokenType[]
  hasFeature: (feature: AppFeature) => boolean
  hasResolver: (resolver: NetworkResolver) => boolean
  features: AppFeature[]
}

const Context = createContext<AppConfigContext>({} as AppConfigContext)

export function AppConfigProvider({ children }: { children: ReactNode }) {
  const sdk = useSdk()
  const configQuery = useQuery({
    queryKey: ['app-config'],
    queryFn: () => sdk.appConfig().then((res) => res.data),
  })
  const appConfig = useMemo(() => configQuery.data?.config, [configQuery.data?.config])

  const authEnabled = useMemo(() => {
    if (!appConfig) return false
    const { authLoginProviders } = appConfig
    return !!authLoginProviders?.length
  }, [appConfig])

  const enabledProviders: IdentityProvider[] = useMemo(
    () => (appConfig ? ((appConfig.authLoginProviders ?? []).filter(Boolean) as IdentityProvider[]) : []),
    [appConfig],
  )

  const features = useMemo(() => appConfig?.features ?? ([] as AppFeature[]), [appConfig])

  const appTheme = useMemo(() => {
    const color =
      appConfig?.appThemeColor && mantineColorIds.includes(appConfig.appThemeColor) ? appConfig.appThemeColor : 'blue'
    const background: BackgroundColors = appConfig?.appThemeBackground as BackgroundColors
    const override =
      background?.length && backgroundColorIds.includes(background)
        ? { colors: { dark: BACKGROUND_COLORS[background] } }
        : {}
    return themeWithBrand(color, override)
  }, [appConfig])

  const enabledTokenTypes: NetworkTokenType[] = useMemo(
    () => (appConfig?.resolvers ?? []).map(getNetworkTokenTypeForResolver),
    [appConfig?.resolvers],
  )

  const value = {
    appConfig: appConfig,
    appConfigLoading: configQuery.isLoading,
    appLogoUrlDark: appConfig?.appLogoUrlDark ?? undefined,
    appLogoUrlLight: appConfig?.appLogoUrlLight ?? undefined,
    appTheme,
    authEnabled,
    authTelegramBotName: appConfig?.authTelegramBotName ?? undefined,
    enabledProviders,
    enabledTokenTypes,
    hasFeature: (feature: AppFeature) => features.includes(feature),
    hasResolver: (resolver: NetworkResolver) => (appConfig?.resolvers ?? [])?.includes(resolver),
    features,
  }
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useAppConfig() {
  return useContext(Context)
}
