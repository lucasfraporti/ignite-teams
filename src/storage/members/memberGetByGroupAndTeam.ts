import { membersGetByGroup } from './membersGetByGroup'

export async function membersGetByGroupAndTeam(group: string, team: string) {
  try {
    const storage = await membersGetByGroup(group)
    const members = storage.filter((member) => member.team === team)
    return members
  } catch (error) {
    throw error
  }
}
