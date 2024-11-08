import { rem, Switch, SwitchProps, Tooltip, useMantineTheme } from '@mantine/core'
import { useUiColorScheme } from '@pubkey-ui/core'
import { IconMoonStars, IconSun } from '@tabler/icons-react'

export function AppUiThemeSwitch(props: SwitchProps) {
  const theme = useMantineTheme()
  const { toggleColorScheme, colorScheme } = useUiColorScheme()
  const isDark = colorScheme === 'dark'
  const sunIcon = <IconSun style={{ width: rem(16), height: rem(16) }} stroke={2.5} color={theme.colors.yellow[4]} />

  const moonIcon = (
    <IconMoonStars style={{ width: rem(16), height: rem(16) }} stroke={2.5} color={theme.colors['brand'][6]} />
  )

  return (
    <Tooltip label={`Select ${isDark ? 'light' : 'dark'} theme`} withArrow position="top" refProp="rootRef">
      <Switch
        size="lg"
        color="dark.9"
        onLabel={sunIcon}
        offLabel={moonIcon}
        onChange={() => toggleColorScheme()}
        checked={colorScheme === 'dark'}
        {...props}
      />
    </Tooltip>
  )
}
