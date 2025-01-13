import { Group } from '@mantine/core'
import { IdentityProvider } from '@pubkey-link/sdk'
import { useAuth } from '@pubkey-link/web-auth-data-access'
import { useAppConfig } from '@pubkey-link/web-core-data-access'
import { useUserFindManyIdentity } from '@pubkey-link/web-identity-data-access'
import { createTelegramScriptElement, IdentityUiList } from '@pubkey-link/web-identity-ui'
import { UiLoader, UiStack } from '@pubkey-ui/core'
import { useEffect, useRef } from 'react'

export default function UserProfileTabIdentitiesTelegram() {
  const { user } = useAuth()
  const { authTelegramBotName } = useAppConfig()
  const { deleteIdentity, updateIdentity, items, query } = useUserFindManyIdentity({
    username: user?.username as string,
    provider: IdentityProvider.Telegram,
  })
  const identity = items?.length ? items.find((i) => i.provider === IdentityProvider.Telegram) : null

  const telegramWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!authTelegramBotName) {
      console.error('Telegram bot name not configured')
      return
    }

    window.onTelegramAuth = async (user) => {
      try {
        const response = await fetch('/api/auth/telegram/link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        })
        if (response.ok) {
          await query.refetch()
        }
      } catch (error) {
        console.error('Telegram auth error:', error)
      }
    }

    try {
      const scriptElement = createTelegramScriptElement(authTelegramBotName)
      telegramWrapperRef.current?.appendChild(scriptElement)
    } catch (error) {
      console.error('Error creating Telegram script:', error)
    }
  }, [authTelegramBotName, query])

  return (
    <UiStack>
      {query.isLoading ? (
        <UiLoader />
      ) : identity ? (
        <IdentityUiList
          items={[identity]}
          deleteIdentity={deleteIdentity}
          updateIdentity={updateIdentity}
          refresh={() => query.refetch()}
        />
      ) : (
        <Group justify="center">
          <div ref={telegramWrapperRef}></div>
        </Group>
      )}
    </UiStack>
  )
}
