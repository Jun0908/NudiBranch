'use client'

import { useCallback, useEffect, useRef } from 'react'
import { MessageType } from './types'

// ボトムスクロール
const Scroll = ({ messages }: { messages: MessageType[] }) => {
  const messageEndRef = useRef<HTMLDivElement>(null)

  // messagesを取得したらスクロール
  const scrollToBottom = useCallback(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  // 初回にボトムスクロール
  useEffect(() => {
    scrollToBottom()
  }, [scrollToBottom])

  return (
    <div>
      <div ref={messageEndRef} />
    </div>
  )
}

export default Scroll
