export interface TelegramUser {
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
    onTelegramAuth?: (user: TelegramUser) => void
  }
}

export function createTelegramScriptElement(botName?: string) {
  if (!botName) {
    throw new Error('Telegram bot name is required')
  }

  const el = document.createElement('script')
  el.src = 'https://telegram.org/js/telegram-widget.js?22'
  el.setAttribute('data-telegram-login', botName)
  el.setAttribute('data-size', 'large')
  el.setAttribute('data-onauth', 'onTelegramAuth(user)')
  el.setAttribute('data-request-access', 'write')
  el.async = true
  return el
}
