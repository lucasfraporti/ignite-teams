import AsyncStorage from '@react-native-async-storage/async-storage'
import { MEMBER_COLLECTION } from '@storage/storageConfig'

import { membersGetByGroup } from './membersGetByGroup'

export async function memberRemoveByGroup(memberName: string, group: string) {
  try {
    const storage = await membersGetByGroup(group)
    const filteredMembers = storage.filter(
      (member) => member.name !== memberName,
    )
    const members = JSON.stringify(filteredMembers)
    await AsyncStorage.setItem(`${MEMBER_COLLECTION}-${group}`, members)
  } catch (error) {
    throw error
  }
}
