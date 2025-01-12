import { useEffect, useRef } from 'react'
import { useAppConfig } from '@pubkey-link/web-core-data-access'
import { createTelegramScriptElement } from './create-telegram-script-element'
import type { TelegramUser } from './create-telegram-script-element'

export function TelegramLoginButton({ onSuccess }: { onSuccess: () => void }) {
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
          onSuccess()
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
