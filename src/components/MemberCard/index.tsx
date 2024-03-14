import { ButtonIcon } from '@components/ButtonIcon'

import { Container, Icon, Name } from './styles'

type MemberCardProps = {
  name: string
  onRemoveMember: () => void
}

export function MemberCard({ name, onRemoveMember }: MemberCardProps) {
  return (
    <Container>
      <Icon name="person" />
      <Name>{name}</Name>

      <ButtonIcon icon="close" type="SECONDARY" onPress={onRemoveMember} />
    </Container>
  )
}
