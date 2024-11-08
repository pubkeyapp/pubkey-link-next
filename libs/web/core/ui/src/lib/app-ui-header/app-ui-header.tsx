import { Anchor, Burger, Drawer, DrawerProps, Group, ScrollArea, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { UiLogo, UiLogoType } from '@pubkey-ui/core'
import cx from 'clsx'
import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

import classes from './app-ui-header.module.css'

export interface UiHeaderProps {
  base?: string
  drawerProps?: DrawerProps
  logo?: ReactNode
  logoSmall?: ReactNode
  links?: UiHeaderLink[]
  opened?: boolean
  profile?: ReactNode
  toggle?: () => void
}
export interface UiHeaderLink {
  link: string
  label: string
}

export function AppUiHeader(props: UiHeaderProps) {
  const { pathname } = useLocation()
  const [drawerOpened, { toggle: drawerToggle }] = useDisclosure(false)
  const opened = props.opened ?? drawerOpened
  const toggle = props.toggle ?? drawerToggle
  const burger = props.links?.length ? <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="md" /> : null

  const items = props.links?.map((link) => (
    <Anchor
      component={Link}
      key={link.label}
      to={link.link}
      className={cx(classes.link, { [classes.linkActive]: pathname.startsWith(link.link) })}
      onClick={close}
    >
      {link.label}
    </Anchor>
  ))

  function close() {
    if (!opened || !props.toggle) return
    props.toggle()
  }

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Group>
            {burger}
            <Anchor component={Link} to={props.base ?? '/'} display="flex">
              <Group hiddenFrom="md">{props.logoSmall ?? <UiLogo height={28} />}</Group>
              <Group visibleFrom="md">{props.logo ?? <UiLogoType height={28} />}</Group>
            </Anchor>
          </Group>
          <Group gap={5} className={classes.links} visibleFrom="md">
            {items}
          </Group>
        </Group>

        {props.profile ? <Group>{props.profile}</Group> : null}
      </div>
      <Drawer
        opened={opened}
        onClose={toggle}
        title={
          <Group>
            <Anchor component={Link} to={props.base ?? '/'} display="flex" onClick={close}>
              {props.logo ?? <UiLogoType height={28} />}
            </Anchor>
          </Group>
        }
        hiddenFrom="md"
        scrollAreaComponent={ScrollArea}
        {...props.drawerProps}
      >
        <Stack gap="sm">{items}</Stack>
      </Drawer>
    </header>
  )
}
