import { Anchor, Code, Group, Text, Tooltip } from '@mantine/core'
import { getNetworkTokenUrl, RoleCondition } from '@pubkey-link/sdk'
import { NetworkTokenUiTypeBadge } from '@pubkey-link/web-network-token-ui'

export function RoleConditionUiSummary({ condition }: { condition: RoleCondition }) {
  if (!condition.token) {
    return null
  }
  return (
    <Group gap="xs">
      <NetworkTokenUiTypeBadge type={condition.token.type} />
      <Text c="dimmed" fw="bold" span>
        {condition.amount}
      </Text>
      <Anchor href={getNetworkTokenUrl(condition.token)} target="_blank" fw="bold">
        {condition.token.symbol}
      </Anchor>
      <Text c="dimmed" span>
        {condition.token.name}
      </Text>
      {Object.keys(condition.filters ?? {}).length ? (
        <Tooltip label="Filters">
          <Code>
            {`{ ${Object.keys(condition.filters ?? {})
              .map((key) => `${key}: ${condition.filters[key]}`)
              .join(', ')} }`}
          </Code>
        </Tooltip>
      ) : null}
    </Group>
  )
}
