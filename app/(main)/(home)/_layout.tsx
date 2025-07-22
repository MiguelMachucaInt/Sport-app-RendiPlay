import { colors } from '@/assets/colors/styles'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { Tabs } from 'expo-router'

interface HomeLayoutProps { }
function HomeLayout({ ...props }: Readonly<HomeLayoutProps>) {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                sceneStyle: {
                    backgroundColor: 'transparent'
                },
                tabBarActiveTintColor: colors.primary.naranja,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'INICIO',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="home" size={24} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="perfil"
                options={{
                    title: 'PERFIL',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6 name="user-gear" size={20} color={color} />
                    )
                }}
            />
        </Tabs>
    )
}

export default HomeLayout
