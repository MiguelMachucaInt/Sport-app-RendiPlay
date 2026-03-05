/* eslint-disable @typescript-eslint/no-require-imports */
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import '@/global.css'
import TamaguiProvider from '@/libs/tamagui.config'
import queryClientConfig from '@/libs/tanstackQuery.config'
import AuthProvider from '@/state/auth'
import LoadingProvider from '@/state/loading'
import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import crashlytics from '@react-native-firebase/crashlytics'

function logLarge(message: string) {
  const chunkSize = 900
  for (let i = 0; i < message.length; i += chunkSize) {
    crashlytics().log(message.slice(i, i + chunkSize))
  }
}

function setupCrashlyticsJsHandlersOnce() {
  if ((globalThis as any).__CRASHLYTICS_JS_HANDLER_SET__) return
  ;(globalThis as any).__CRASHLYTICS_JS_HANDLER_SET__ = true

  crashlytics().setCrashlyticsCollectionEnabled(true)

  const ErrorUtilsAny = (globalThis as any).ErrorUtils
  if (!ErrorUtilsAny?.setGlobalHandler || !ErrorUtilsAny?.getGlobalHandler) return

  const defaultHandler = ErrorUtilsAny.getGlobalHandler()

  ErrorUtilsAny.setGlobalHandler((error: any, isFatal?: boolean) => {
    try {
      const msg = error?.message ? String(error.message) : String(error)
      const jsStack = error?.stack ? String(error.stack) : ''

      crashlytics().log(`JS Error (fatal=${Boolean(isFatal)}): ${msg}`)
      if (jsStack) logLarge(jsStack)

      const errObj = error instanceof Error ? error : new Error(msg)
      if (!errObj.stack && jsStack) (errObj as any).stack = jsStack

      crashlytics().recordError(errObj)
    } catch {
    }

    defaultHandler?.(error, isFatal)
  })


  try {
    const tracking = require('promise/setimmediate/rejection-tracking')
    tracking.enable({
      allRejections: true,
      onUnhandled: (_id: any, error: any) => {
        try {
          const msg = error?.message ? String(error.message) : String(error)
          const jsStack = error?.stack ? String(error.stack) : ''

          crashlytics().log(`Unhandled Promise Rejection: ${msg}`)
          if (jsStack) logLarge(jsStack)

          const errObj = error instanceof Error ? error : new Error(msg)
          if (!errObj.stack && jsStack) (errObj as any).stack = jsStack

          crashlytics().recordError(errObj)
        } catch {
        }
      },
      onHandled: () => {},
    })
  } catch {
  }
}

export default function RootLayout() {
  useEffect(() => {
    if (!__DEV__) setupCrashlyticsJsHandlersOnce()
  }, [])

  return (
    <GluestackUIProvider mode="light">
      <ThemeProvider value={DefaultTheme}>
        <TamaguiProvider>
          <QueryClientProvider client={queryClientConfig}>
            <LoadingProvider>
              <AuthProvider>
                <Stack screenOptions={{ headerShown: false }} />
              </AuthProvider>
            </LoadingProvider>
          </QueryClientProvider>
          <StatusBar style="auto" />
        </TamaguiProvider>
      </ThemeProvider>
    </GluestackUIProvider>
  )
}