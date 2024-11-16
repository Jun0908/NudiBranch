"use client"

import { ChatCompletionRequestMessage } from "openai"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface ChatMessagesProps {
  messages: ChatCompletionRequestMessage[]
  loading: boolean
}

// チャットメッセージ
const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, loading }) => {
  return (
    <div className="space-y-5 pb-40">
      {messages.map((message, index) => (
        <div
          key={index}
          className={cn(message.role === "user" && "flex justify-end")}
        >
          <div className="flex items-center">
            {message.role !== "user" && (
              <div className="relative h-10 w-10 mr-2">
                <Image src="/robot.png" fill alt="robot" />
              </div>
            )}

            <div
              className={cn(
                "max-w-[500px] p-3 shadow",
                message.role === "user"
                  ? "bg-primary text-white rounded-t-lg rounded-bl-lg"
                  : "bg-muted rounded-t-lg rounded-br-lg"
              )}
            >
              <div className="text-sm">{message.content}</div>
            </div>
          </div>
        </div>
      ))}

      {loading && (
        <div className="flex items-center">
          <div className="relative h-10 w-10 mr-2">
            <Image src="/robot.png" fill alt="robot" />
          </div>
          <Skeleton className="w-[300px] h-[44px] bg-muted rounded-t-lg rounded-br-lg" />
        </div>
      )}
    </div>
  )
}

export default ChatMessages
