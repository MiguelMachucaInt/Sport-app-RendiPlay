import 'dotenv/config'

export default {
  "expo": {
    "name": "RendiPlay",
    "description": "Aplicación para la gestión de eventos deportivos",
    "slug": "sport-app",
    "version": "1.0.26",
    "owner": "integgreteam",
    "orientation": "portrait",
    "icon": "./assets/images/logo.png",
    "scheme": "sportapp",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": false,
    "ios": {
      "bundleIdentifier": "com.integgre.sportapp",
      "supportsTablet": false,
      "infoPlist": {
        "ITSAppUsesNonExemptEncryption": false,
        "NSAppTransportSecurity": {
          "NSAllowsArbitraryLoads": true
        }
      },
      usesAppleSignIn: true
    },
    "android": {
      "package": "com.integgre.rendiplay",
      "usesCleartextTraffic": true,
      "edgeToEdgeEnabled": true,
      "intentFilters": [
        {
          "action": "VIEW",
          "data": [
            {
              "scheme": "sportapp"
            }
          ],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
    },
    "web": {
      "bundler": "metro",
      "output": "server",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/logo.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff"
        }
      ],
      "expo-web-browser",
      "expo-apple-authentication"
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {},
      "eas": {
        "projectId": "fb6d2a94-7559-4413-b4b7-8e44e69a90f4"
      },
      apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL,
      apiAuthToken: process.env.EXPO_PUBLIC_API_AUTHORIZATION_TOKEN,
      hostUrl: process.env.EXPO_PUBLIC_HOST_URL,
      scheme: process.env.EXPO_PUBLIC_SCHEME,
      googleWebClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
      googleSecret: process.env.GOOGLE_CLIENT_SECRET
    }
  }
}
