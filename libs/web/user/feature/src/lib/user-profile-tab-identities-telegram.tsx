import { Group } from '@mantine/core'
import { IdentityProvider } from '@pubkey-link/sdk'
import { useAuth } from '@pubkey-link/web-auth-data-access'
import { useUserFindManyIdentity } from '@pubkey-link/web-identity-data-access'
import { IdentityUiList } from '@pubkey-link/web-identity-ui'
import { UiLoader, UiStack } from '@pubkey-ui/core'
import { useEffect, useRef } from 'react'
import { Script } from 'vm'

// Define the Telegram user type
interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
  auth_date: number
  hash: string
}


declare global {
  interface Window {
    TelegramLoginWidget: any;
    onTelegramAuth?: (user: any) => void;
  }
}

export default function UserProfileTabIdentitiesTelegram() {
  const { user } = useAuth()
  const { deleteIdentity, updateIdentity, items, query } = useUserFindManyIdentity({
    username: user?.username as string,
    provider: IdentityProvider.Telegram,
  })
  const identity = items?.length ? items.find((i) => i.provider === IdentityProvider.Telegram) : null

const telegramWrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Callback function for Telegram auth
    window.onTelegramAuth = async (user: TelegramUser) => {
      try {
        const response = await fetch('/api/auth/telegram/validate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        })
        if (response.ok) {
          query.refetch()
        }
      } catch (error) {
        console.error('Telegram auth error:', error)
      }
    }

    console.log(window.onTelegramAuth);

    if(telegramWrapperRef.current) {
      console.log('telegramWrapperRef.current', telegramWrapperRef.current)
    }

    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://telegram.org/js/telegram-widget.js?22';
    scriptElement.setAttribute('data-telegram-login', 'PubkeyLinkBot');
    scriptElement.setAttribute('data-size', 'large');
    scriptElement.setAttribute('data-onauth', 'onTelegramAuth(user)');
    scriptElement.setAttribute('data-request-access', 'write');
    scriptElement.async = true;

    telegramWrapperRef.current?.appendChild(scriptElement);
    console.log('scriptElement', scriptElement)
  }, [telegramWrapperRef, query])

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
