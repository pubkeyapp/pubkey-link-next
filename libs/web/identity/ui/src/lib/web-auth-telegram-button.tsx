import { useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

declare global {
  interface Window {
    TelegramLoginWidget: any;
    onTelegramAuth?: (user: any) => void;
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
  const navigate = useNavigate()
  const telegramWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    console.log(window.onTelegramAuth);

    if(telegramWrapperRef.current) {
      const btn = document.querySelector('.tgme_widget_login_button') as HTMLElement;
      if (btn) {
        telegramWrapperRef.current.style.width ="100% !important";
        btn.style.borderRadius = '0px !important';
        btn.style.backgroundColor  = 'rgb(88, 101, 242) !important';
      }
    }

    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://telegram.org/js/telegram-widget.js?22';
    scriptElement.setAttribute('data-telegram-login', 'PubkeyLinkBot');
    scriptElement.setAttribute('data-size', 'large');
    scriptElement.setAttribute('data-onauth', 'onTelegramAuth(user)');
    scriptElement.setAttribute('data-request-access', 'write');
    scriptElement.async = true;

    telegramWrapperRef.current?.appendChild(scriptElement)
  }, [onSuccess])

  return <div ref={telegramWrapperRef}></div>
}
