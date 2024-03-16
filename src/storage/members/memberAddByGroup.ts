import AsyncStorage from '@react-native-async-storage/async-storage'
import { MEMBER_COLLECTION } from '@storage/storageConfig'
import { AppError } from '@utils/AppError'

import { membersGetByGroup } from './membersGetByGroup'
import { MemberStorageDTO } from './MemberStorageDTO'

export async function memberAddByGroup(
  newMember: MemberStorageDTO,
  group: string,
) {
  try {
    const storedMembers = await membersGetByGroup(group)
    const memberAlreadyExist = storedMembers.filter(
      (member) => member.name.toLowerCase() === newMember.name.toLowerCase(),
    )
    if (memberAlreadyExist.length > 0) {
      throw new AppError('Esta pessoa já foi adicionada no grupo.')
    }
    const storage = JSON.stringify([...storedMembers, newMember])
    await AsyncStorage.setItem(`${MEMBER_COLLECTION}-${group}`, storage)
  } catch (error) {
    throw error
  }
}
