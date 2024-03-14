import logoImg from '@assets/logo.png'
import { useNavigation } from '@react-navigation/native'

import { BackButton, BackIcon, Container, Logo } from './styles'

type HeaderProps = {
  showBackButton?: boolean
}

export function Header({ showBackButton = false }: HeaderProps) {
  const navigation = useNavigation()

  function handleGoBack() {
    // O código comentado abaixo retorna para a página anterior
    // navigation.goBack()
    navigation.navigate('groups')
  }

  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={handleGoBack}>
          <BackIcon />
        </BackButton>
      )}

      <Logo source={logoImg} />
    </Container>
  )
}
