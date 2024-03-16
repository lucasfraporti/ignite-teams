import { Button } from '@components/Button'
import { ButtonIcon } from '@components/ButtonIcon'
import { Filter } from '@components/Filter'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'
import { ListEmpty } from '@components/ListEmpty'
import { MemberCard } from '@components/MemberCard'
import { useRoute } from '@react-navigation/native'
import { memberAddByGroup } from '@storage/members/memberAddByGroup'
import { membersGetByGroupAndTeam } from '@storage/members/memberGetByGroupAndTeam'
import { MemberStorageDTO } from '@storage/members/MemberStorageDTO'
import { AppError } from '@utils/AppError'
import { useEffect, useRef, useState } from 'react'
import { Alert, FlatList, TextInput } from 'react-native'

import { Container, Form, HeaderList, NumberOfMembers } from './styles'

type RouteParams = {
  group: string
}

export function Members() {
  const [newMemberName, setNewMemberName] = useState('')
  const [team, setTeam] = useState('Time A')
  const [members, setMembers] = useState<MemberStorageDTO[]>([])

  const route = useRoute()
  const { group } = route.params as RouteParams

  const newMemberNameInputRef = useRef<TextInput>(null)

  async function handleAddMember() {
    if (newMemberName.trim().length === 0) {
      return Alert.alert(
        'Novo membro',
        'Insira o nome do membro que será adicionado.',
      )
    }

    const newMember = {
      name: newMemberName,
      team,
    }

    try {
      await memberAddByGroup(newMember, group)

      newMemberNameInputRef.current?.blur()

      setNewMemberName('')
      fetchMembersByTeam(team)
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo membro', error.message)
      } else {
        Alert.alert('Novo membro', 'Não foi possível adicionar um novo membro.')
        console.error(error)
      }
    }
  }

  async function fetchMembersByTeam(team: string) {
    try {
      const membersByTeam = await membersGetByGroupAndTeam(group, team)
      setMembers(membersByTeam)
    } catch (error) {
      Alert.alert(
        'Membros do time',
        'Não foi possível carregar os membros do time selecionado.',
      )
      console.error(error)
    }
  }

  useEffect(() => {
    fetchMembersByTeam(team)
  }, [fetchMembersByTeam, team])

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subtitle="adicione os integrantes e separe os grupos"
      />

      <Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={setNewMemberName}
          value={newMemberName}
          inputRef={newMemberNameInputRef}
          // Abaixo diz qual função é feita quando o usuário clicar no botão de adicionar no próprio teclado do celular
          onSubmitEditing={handleAddMember}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" type="PRIMARY" onPress={handleAddMember} />
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
        <NumberOfMembers>
          {members.length === 0
            ? 'Não possue membro'
            : members.length === 1
              ? '1 membro'
              : `${members.length} membros`}
        </NumberOfMembers>
      </HeaderList>

      <FlatList
        data={members}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <MemberCard name={item.name} onRemoveMember={() => {}} />
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
