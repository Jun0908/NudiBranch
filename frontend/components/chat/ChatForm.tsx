"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UseFormReturn } from "react-hook-form"
import { FormValues } from "@/components/chat/Chat"
import { PaperPlaneIcon } from "@radix-ui/react-icons"

interface ChatFormProps {
  form: UseFormReturn<FormValues>
  onSubmit: (data: FormValues) => Promise<void>
  loading: boolean
}

// 送信フォーム
const ChatForm: React.FC<ChatFormProps> = ({ form, onSubmit, loading }) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-md border px-3 py-2 flex space-x-2 bg-white"
      >
        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl className="m-0 p-0">
                <Input
                  className="border-0 focus-visible:ring-0 focus-visible:ring-transparent shadow-none"
                  placeholder="東京の天気を教えて"
                  disabled={loading}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          className="w-16"
          variant="ghost"
          type="submit"
          disabled={loading}
        >
          <PaperPlaneIcon className="h-5 w-5 text-primary" />
        </Button>
      </form>
    </Form>
  )
}

export default ChatForm
