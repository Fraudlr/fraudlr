/**
 * @fileoverview Tawk.to Live Chat Widget
 * 
 * This component integrates the Tawk.to live chat widget into the application.
 * It only appears on public pages (before login), not on the dashboard.
 * 
 * The widget allows visitors to chat with support directly from the website.
 */

'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import TawkMessengerReact from '@tawk.to/tawk-messenger-react'

/**
 * Tawk Messenger Component
 * 
 * Conditionally renders the Tawk.to chat widget based on the current route.
 * The widget will NOT appear on:
 * - Dashboard pages (/dashboard/*)
 * - Login page (/login)
 * - Signup page (/signup)
 */
export function TawkMessenger() {
  const pathname = usePathname()
  const tawkMessengerRef = useRef<any>()
  const [shouldRender, setShouldRender] = useState(false)

  // Check if we should show the widget on the current page
  useEffect(() => {
    const isPublicPage = !pathname.startsWith('/dashboard') && 
                         pathname !== '/login' && 
                         pathname !== '/signup'
    
    setShouldRender(isPublicPage)

    // Hide widget when navigating away from public pages
    if (!isPublicPage && tawkMessengerRef.current) {
      try {
        tawkMessengerRef.current.hideWidget()
      } catch (error) {
        // Widget might not be loaded yet
      }
    }
  }, [pathname])

  const propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID
  const widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID

  // Make sure environment variables are set
  if (!propertyId || !widgetId) {
    console.error('Tawk.to environment variables are not set')
    return null
  }

  // Don't render the widget on dashboard or auth pages
  if (!shouldRender) {
    return null
  }

  const onLoad = () => {
    console.log('Tawk.to widget loaded successfully')
  }

  const onBeforeLoad = () => {
    // This callback is required by the component
    return true
  }

  const onChatHidden = () => {
    console.log('Tawk.to widget hidden')
  }

  return (
    <TawkMessengerReact
      propertyId={propertyId}
      widgetId={widgetId}
      ref={tawkMessengerRef}
      onLoad={onLoad}
      onBeforeLoad={onBeforeLoad}
      onChatHidden={onChatHidden}
    />
  )
}
