import 'dotenv/config'

const PRODUCTION_API_BASE_URL = 'https://api.rendiplay.com'

export default {
  "expo": {
    "name": "RendiPlay",
    "description": "Aplicación para la gestión de eventos deportivos",
    "slug": "sport-app",
    "version": "1.6.0",
    "owner": "integgreteam",
    "orientation": "portrait",
    "icon": "./assets/images/logo.png",
    "scheme": "sportapp",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "appleTeamId": "8J7BWQUYRM",
      "bundleIdentifier": "com.integgre.sportapp",
      "buildNumber": "49",
      "supportsTablet": false,
      googleServicesFile: "./GoogleService-Info.plist",
      "infoPlist": {
        "ITSAppUsesNonExemptEncryption": false
      },
      usesAppleSignIn: true
    },
    "android": {
      "package": "com.integgre.rendiplay",
      "versionCode": 32,
      "googleServicesFile": "./google-services.json",
      "usesCleartextTraffic": false,
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
plugins: [
  "expo-router",
  "expo-font",
  "@react-native-firebase/app",
  "@react-native-firebase/crashlytics",
  [
    "expo-splash-screen",
    {
      image: "./assets/images/logo.png",
      imageWidth: 200,
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
  ],
  "expo-web-browser",
  "expo-apple-authentication",
  [
    "expo-build-properties",
    {
      "android": {
        "compileSdkVersion": 36,
        "targetSdkVersion": 36,
        "buildToolsVersion": "36.1.0",
        "usesCleartextTraffic": false
      },
      "ios": {
        "useFrameworks": "static"
      }
    }
  ],
],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {},
      "eas": {
        "projectId": "fb6d2a94-7559-4413-b4b7-8e44e69a90f4"
      },
      apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL || PRODUCTION_API_BASE_URL,
      apiAuthToken: process.env.EXPO_PUBLIC_API_AUTHORIZATION_TOKEN,
      hostUrl: process.env.EXPO_PUBLIC_HOST_URL,
      scheme: process.env.EXPO_PUBLIC_SCHEME,
      googleWebClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID
    }
  }
}
