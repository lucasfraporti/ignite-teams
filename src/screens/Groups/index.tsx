import { GroupCard } from '@components/GroupCard'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { useState } from 'react'
import { FlatList } from 'react-native'

import { Container } from './styles'

export function Groups() {
  const [groups, setGroups] = useState<string[]>(['Galera da Rocket', 'Amigos'])

  return (
    <Container>
      <Header />

      <Highlight title="Turmas" subtitle="divirta-se com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} />}
      />
    </Container>
  )
}
