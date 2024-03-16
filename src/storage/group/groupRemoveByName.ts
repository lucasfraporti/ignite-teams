import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION, MEMBER_COLLECTION } from '@storage/storageConfig'

import { groupsGetAll } from './groupsGetAll'

export async function groupRemoveByName(groupDeleted: string) {
  try {
    const storedGroups = await groupsGetAll()
    const groups = storedGroups.filter((group) => group !== groupDeleted)
    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups))
    await AsyncStorage.removeItem(`${MEMBER_COLLECTION}-${groupDeleted}`)
  } catch (error) {
    throw error
  }
}
