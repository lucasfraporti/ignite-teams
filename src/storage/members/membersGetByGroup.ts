import AsyncStorage from '@react-native-async-storage/async-storage'
import { MEMBER_COLLECTION } from '@storage/storageConfig'

import { MemberStorageDTO } from './MemberStorageDTO'

export async function membersGetByGroup(group: string) {
  try {
    const storage = await AsyncStorage.getItem(`${MEMBER_COLLECTION}-${group}`)
    const members: MemberStorageDTO[] = storage ? JSON.parse(storage) : []
    return members
  } catch (error) {
    throw error
  }
}
