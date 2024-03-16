import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION } from '@storage/storageConfig'
import { AppError } from '@utils/AppError'

import { groupsGetAll } from './groupsGetAll'

export async function groupCreate(newGroupName: string) {
  try {
    const storedGroups = await groupsGetAll()
    const lowerCaseGroups = storedGroups.map((group) => group.toLowerCase())
    const groupAlreadyExist = lowerCaseGroups.includes(
      newGroupName.toLowerCase(),
    )
    if (groupAlreadyExist) {
      throw new AppError('Já existe um grupo cadastrado com este nome.')
    }
    const storage = JSON.stringify([...storedGroups, newGroupName])
    await AsyncStorage.setItem(GROUP_COLLECTION, storage)
  } catch (error) {
    throw error
  }
}
