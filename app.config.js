import 'dotenv/config';

export default {
    name: "Restaurant Menu QR Scanner",
    slug: "restaurant-menu-qr-scanner",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
        image: "./assets/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
        "**/*"
    ],
    ios: {
        supportsTablet: true,
        bundleIdentifier: "com.naoisegolden.restaurantmenuqrscanner"
    },
    android: {
        adaptiveIcon: {
            foregroundImage: "./assets/adaptive-icon.png",
            backgroundColor: "#ffffff"
        },
        package: "com.naoisegolden.restaurantmenuqrscanner"
    },
    web: {
        favicon: "./assets/favicon.png"
    },
    plugins: [
        [
            "expo-barcode-scanner",
            {
                cameraPermission: "Allow $(PRODUCT_NAME) to access camera."
            }
        ]
    ],
    extra: {
        supabaseUrl: process.env.SUPABASE_URL,
        supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
        eas: {
            projectId: "restaurant-app"
        }
    },
    runtimeVersion: {
        policy: "appVersion"
    },
    updates: {
        url: "https://u.expo.dev/restaurant-app"
    }
}; 