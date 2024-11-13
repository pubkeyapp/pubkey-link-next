import { ActionIcon, ActionIconProps, Tooltip } from '@mantine/core'

import {
  IconBrandDiscordFilled,
  IconBrandGithubFilled,
  IconBrandTelegram,
  IconBrandXFilled,
  IconWorldWww,
} from '@tabler/icons-react'
import { ComponentType } from 'react'

export interface UiSocialProps extends ActionIconProps {
  icon: ComponentType<{ color?: string; size: number }>
  iconSize?: number
  tooltip?: string
  href?: string | null
}
export function UiSocial({ href, icon: Icon, iconSize = 16, tooltip, ...props }: UiSocialProps) {
  if (!href) {
    return null
  }
  const el = (
    <ActionIcon size="sm" variant="light" component="a" href={href} target="_blank" {...props}>
      <Icon size={iconSize} />
    </ActionIcon>
  )

  return tooltip ? <Tooltip label={tooltip}>{el}</Tooltip> : el
}

export function UiSocialX({ ...props }: Omit<UiSocialProps, 'icon'>) {
  return <UiSocial tooltip="Follow on X" icon={IconBrandXFilled} {...props} />
}
export function UiSocialDiscord({ ...props }: Omit<UiSocialProps, 'icon'>) {
  return <UiSocial tooltip="Join Discord" icon={IconBrandDiscordFilled} {...props} />
}
export function UiSocialGithub({ ...props }: Omit<UiSocialProps, 'icon'>) {
  return <UiSocial tooltip="Follow on GitHub" icon={IconBrandGithubFilled} {...props} />
}
export function UiSocialTelegram({ ...props }: Omit<UiSocialProps, 'icon'>) {
  return <UiSocial tooltip="Join Telegram" icon={IconBrandTelegram} {...props} />
}
export function UiSocialWebsite({ ...props }: Omit<UiSocialProps, 'icon'>) {
  return <UiSocial tooltip="Visit website" icon={IconWorldWww} {...props} />
}
