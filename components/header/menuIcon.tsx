import { colors } from '@/assets/colors/styles'
import { useAuthStore } from '@/state/auth'
import AntDesign from '@expo/vector-icons/AntDesign'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import Ionicons from '@expo/vector-icons/Ionicons'
import { router } from 'expo-router'
import { ReactNode, useState } from 'react'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import IconButton from '../ui/IconButton'

interface MenuOptionProps {
  icon: ReactNode
  label: string
  onPress: () => void
}

function MenuOption({ icon, label, onPress }: Readonly<MenuOptionProps>) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.option, pressed && styles.optionPressed]}
    >
      {icon}
      <Text style={styles.optionLabel}>{label}</Text>
    </Pressable>
  )
}

function UserMenuIcon() {
  const { signOut, user } = useAuthStore()
  const [menuOpen, setMenuOpen] = useState(false)

  const roles = (user?.roles ?? []).map((r: any) => String(r))
  const isManager = roles.includes('Manager')
  const isOwner = roles.includes('Owner') || roles.includes('owner')

  const canSeeTeams = isManager || isOwner

  const goToTeams = () => {
    if (isOwner && !isManager) {
      router.push({
        pathname: '/(main)/(home)/manager',
        params: { scope: 'owner' },
      })
      return
    }

    router.push({
      pathname: '/(main)/(home)/manager',
      params: { scope: 'manager' },
    })
  }

  const closeThen = (action: () => void) => {
    setMenuOpen(false)
    requestAnimationFrame(action)
  }

  if (!user) {
    return (
      <IconButton
        icon={<AntDesign name="user" size={24} color="white" />}
        touchableProps={{
          onPress: () => router.push('/auth'),
          accessibilityRole: 'button',
          accessibilityLabel: 'Iniciar sesión',
        }}
      />
    )
  }

  return (
    <>
      <IconButton
        icon={<AntDesign name="user" size={24} color="white" />}
        touchableProps={{
          onPress: () => setMenuOpen(true),
          accessibilityRole: 'button',
          accessibilityLabel: 'Abrir menú de usuario',
        }}
      />

      <Modal
        animationType="fade"
        onRequestClose={() => setMenuOpen(false)}
        statusBarTranslucent
        transparent
        visible={menuOpen}
      >
        <Pressable style={styles.backdrop} onPress={() => setMenuOpen(false)}>
          <Pressable style={styles.menu} onPress={(event) => event.stopPropagation()}>
            <MenuOption
              icon={<FontAwesome6 name="user-gear" size={20} color={colors.primary.naranja} />}
              label="Perfil"
              onPress={() => closeThen(() => router.push('/perfil'))}
            />
            <MenuOption
              icon={<FontAwesome6 name="trophy" size={20} color={colors.primary.naranja} />}
              label="Mis Torneos"
              onPress={() => closeThen(() => router.push('/(main)/(home)/campeonato'))}
            />

            {canSeeTeams && (
              <MenuOption
                icon={<FontAwesome6 name="people-group" size={20} color={colors.primary.naranja} />}
                label="Mis Equipos"
                onPress={() => closeThen(goToTeams)}
              />
            )}

            <View style={styles.separator} />
            <MenuOption
              icon={<Ionicons name="log-out-outline" size={24} color={colors.primary.naranja} />}
              label="Cerrar Sesión"
              onPress={() => closeThen(() => void signOut())}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    flex: 1,
    paddingRight: 12,
    paddingTop: 58,
  },
  menu: {
    backgroundColor: 'white',
    borderColor: '#E5E7EB',
    borderRadius: 10,
    borderWidth: 1,
    elevation: 8,
    minWidth: 190,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
  },
  option: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    minHeight: 46,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  optionLabel: {
    color: '#374151',
    fontSize: 16,
  },
  optionPressed: {
    backgroundColor: '#F3F4F6',
  },
  separator: {
    backgroundColor: '#E5E7EB',
    height: StyleSheet.hairlineWidth,
    marginVertical: 4,
  },
})

export default UserMenuIcon
