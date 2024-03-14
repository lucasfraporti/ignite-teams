import { Button } from '@components/Button'
import { ButtonIcon } from '@components/ButtonIcon'
import { Filter } from '@components/Filter'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'
import { ListEmpty } from '@components/ListEmpty'
import { MemberCard } from '@components/MemberCard'
import { useRoute } from '@react-navigation/native'
import { useState } from 'react'
import { FlatList } from 'react-native'

import { Container, Form, HeaderList, NumberOfMembers } from './styles'

type RouteParams = {
  group: string
}

export function Members() {
  const [team, setTeam] = useState('Time A')
  const [members, setMembers] = useState([])

  const route = useRoute()
  const { group } = route.params as RouteParams

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subtitle="adicione os integrantes e separe os grupos"
      />

      <Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />
        <ButtonIcon icon="add" type="PRIMARY" />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumberOfMembers>{members.length}</NumberOfMembers>
      </HeaderList>

      <FlatList
        data={members}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <MemberCard name={item} onRemoveMember={() => {}} />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há membros neste grupo." />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 50 },
          members.length === 0 && { flex: 1 },
        ]}
      />

      <Button title="Remover grupo" type="SECONDARY" />
    </Container>
  )
}
