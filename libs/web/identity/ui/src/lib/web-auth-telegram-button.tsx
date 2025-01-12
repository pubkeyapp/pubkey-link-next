import { useEffect, useRef } from 'react'
import { useAppConfig } from '@pubkey-link/web-core-data-access'
import { createTelegramScriptElement } from './create-telegram-script-element'

declare global {
  interface Window {
    TelegramLoginWidget: any;
    onTelegramAuth?: (user: TelegramUser) => void;
  }
}

interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
  auth_date: number
  hash: string
}

export function TelegramLoginButton({ onSuccess }: { onSuccess: (data: any) => void }) {
  const { authTelegramBotName } = useAppConfig()
  const telegramWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!authTelegramBotName) {
      console.error('Telegram bot name not configured')
      return
    }

    window.onTelegramAuth = async (user: TelegramUser) => {
      try {
        const response = await fetch('/api/auth/telegram/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
          redirect: 'follow',
        })

        if (response.redirected) {
          window.location.href = response.url
        } else if (response.ok) {
          const data = await response.json()
          onSuccess(data)
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
  }, [onSuccess, authTelegramBotName])

  if (!authTelegramBotName) {
    return null
  }

  return <div ref={telegramWrapperRef}></div>
}
