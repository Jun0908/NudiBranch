"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ChatCompletionRequestMessage } from "openai"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

import ChatMessages from "@/components/chat/ChatMessages"
import ChatForm from "@/components/chat/ChatForm"
import ChatScroll from "@/components/chat/ChatScroll"

import SendMosaicComponent from "@/components/chat/sendMosaicComponent"; 
import TransactionComponent from "@/components/chat/transactionComponent"; 

import * as z from "zod"
import axios from "axios"

import { CharacterType, MessageType } from '@/components/audio/types'
import { Characters, TestMessages } from '@/components/audio/config'
import CharacterSelect from '@/components/audio/character-select'

const FormSchema = z.object({
  prompt: z.string().min(2, {
    message: "2文字以上入力する必要があります。",
  }),
})

export type FormValues = z.infer<typeof FormSchema>

// チャット画面
const Chat = () => {
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([])
  const router = useRouter()
  const { toast } = useToast()
  const [character, setCharacter] = useState<CharacterType>(Characters[0])

  // 音声再生
  const playAudio = async (text: string, speaker: string) => {
    try {
      // 音声取得
      const responseAudio = await axios.post('/api/audio', {
        text,
        speaker,
      })

      // Base64形式で取得
      const base64Audio = responseAudio?.data?.response

      // Bufferに変換
      const byteArray = Buffer.from(base64Audio, 'base64')

      // Blobに変換
      const audioBlob = new Blob([byteArray], { type: 'audio/x-wav' })

      // URLに変換
      const audioUrl = URL.createObjectURL(audioBlob)

      // 音声作成
      const audio = new Audio(audioUrl)

      // 音量[0-1]設定
      audio.volume = 1

      // 再生
      audio.play()
    } catch (e) {
      console.error(e)
    }
  }
 
  // フォームの状態を管理
  const form = useForm<FormValues>({
    defaultValues: {
      prompt: "",
    },
    resolver: zodResolver(FormSchema),
  })

  // ローディング状態
  const loading = form.formState.isSubmitting

  // フォームの送信
  const onSubmit = async (data: FormValues) => {
    try {
      // ユーザーのメッセージ作成
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: data.prompt,
      }

      // ユーザーのメッセージ追加
      const newMessages = [...messages, userMessage]
      setMessages(newMessages)

      // APIコール
      const response = await axios.post("/api/chat", {
        messages: newMessages,
      })

      if (response.status === 200) {
        // レスポンスのメッセージ追加
        const updatedMessages = [...newMessages, response.data];
        setMessages(updatedMessages);

        // 最新のメッセージ内容で音声を再生
        const latestMessageContent = typeof response.data.content === 'string' ? response.data.content : userMessage.content;
        playAudio(latestMessageContent, character.value);

        // フォームのリセット
        form.reset();
      } else {
        // エラーの場合
        toast({
          variant: "destructive",
          title: "メッセージの取得に失敗しました",
          description: "内容をご確認ください",
        })
      }
    } catch (error) {
      console.error(error)
      // エラーの場合
      toast({
        variant: "destructive",
        title: "メッセージの取得に失敗しました",
        description: "内容をご確認ください",
      })
    } finally {
      // リフレッシュ
      router.refresh()
    }
  };
  
  /*
  const sendMessage = async (content: string, speaker: string = character.value) => {
    const message: ChatCompletionRequestMessage = {
      role: "system", // または"user"、コンテキストに応じて適切なロールを設定
      content,
    };
  
    const newMessages = [...messages, message];
    setMessages(newMessages);
  
    playAudio(content, speaker);
  };
  */

  return (
    <>
      {/* メッセージ */}
      <ChatMessages messages={messages} loading={loading} />

      {/* スクロール */}
      <ChatScroll messages={messages} />

      {/* 送信フォーム：fixedクラスを削除して、通常のフローに組み込む */}
      <div className="pb-4 inset-x-0 max-w-screen-md px-5 mx-auto bg-white">
        <ChatForm form={form} onSubmit={onSubmit} loading={loading} />
      </div>

      <div className="flex gap-4">
        {/* キャラクター選択 */}
        <div>
          <CharacterSelect setCharacter={setCharacter} playAudio={playAudio} />
        </div>

        {/* その他のコンポーネント */}
        {/*
        <div>
        <SendMosaicComponent />
        </div>
        <div>
        <TransactionComponent />
        </div>
        */}
      </div>
    </>
  )
}

export default Chat