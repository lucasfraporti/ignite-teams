import { Button } from '@components/Button'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'
import { useNavigation } from '@react-navigation/native'

import { Container, Content, Icon } from './styles'

export function NewGroup() {
  const navigation = useNavigation()

  function handleNew() {
    navigation.navigate('members', { group: 'Rocket' })
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subtitle="crie a turma para adicionar os integrantes"
        />

        <Input placeholder="Insira o nome da turma" />

        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </Content>
    </Container>
  )
}
