import { ActionIcon, Popover } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { NetworkTokenType } from '@pubkey-link/sdk'
import { IconInfoCircle } from '@tabler/icons-react'
import { RuleConditionUiInfo } from './rule-condition-ui-info'

export function RuleConditionUiTypePopover({ type }: { type: NetworkTokenType }) {
  const [opened, { close, open }] = useDisclosure(false)
  return (
    <Popover width={200} position="bottom" withArrow shadow="md" opened={opened}>
      <Popover.Target>
        <ActionIcon
          size="sm"
          radius="xl"
          onMouseEnter={open}
          onMouseLeave={close}
          variant="light"
          aria-label="Show condition info"
        >
          <IconInfoCircle />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown style={{ pointerEvents: 'none' }} w={360} p={0}>
        <RuleConditionUiInfo bg="inherit" type={type} />
      </Popover.Dropdown>
    </Popover>
  )
}
