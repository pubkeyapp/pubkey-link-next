import { Text, TextProps } from '@mantine/core'

function formatBalance(balance: string) {
  return parseFloat(balance).toLocaleString()
}

export function NetworkAssetUiShowBalance({
  balance,
  symbol,
  ...props
}: TextProps & { balance: string; symbol: string }) {
  return (
    <Text size="lg" {...props}>
      {balance ? formatBalance(balance) : '...'} {symbol}
    </Text>
  )
}
