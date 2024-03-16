import { Button } from '@components/Button'
import { GroupCard } from '@components/GroupCard'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { ListEmpty } from '@components/ListEmpty'
import { Loading } from '@components/Loading'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { groupsGetAll } from '@storage/group/groupsGetAll'
import { useCallback, useState } from 'react'
import { Alert, FlatList } from 'react-native'

import { Container } from './styles'

export function Groups() {
  const [isLoading, setIsLoading] = useState(true)
  const [groups, setGroups] = useState<string[]>([])

  const navigation = useNavigation()

  function handleNewGroup() {
    navigation.navigate('new')
  }

  async function fetchGroups() {
    try {
      setIsLoading(true)
      const data = await groupsGetAll()
      setGroups(data)
    } catch (error) {
      Alert.alert('Grupos', 'Não foi possível carregar os grupos.')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('members', { group })
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups()
    }, []),
  )

  return (
    <Container>
      <Header />

      <Highlight
        title="Grupos"
        subtitle={
          groups.length <= 1
            ? 'divirta-se com o seu grupo'
            : 'divirta-se com os seus grupos'
        }
      />

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty message="Cadastre o seu primeiro grupo." />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Button title="Criar um grupo" onPress={handleNewGroup} />
    </Container>
  )
}
