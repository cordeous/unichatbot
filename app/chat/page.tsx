import { StudentCouncilChatbotComponent } from "@/components/student-council-chatbot"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Home } from 'lucide-react'

export default function ChatPage() {
  return (
    <main className="container mx-auto py-4">
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="w-full flex justify-end">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-center">Student Council Assistant</h1>
      </div>
      <StudentCouncilChatbotComponent />
    </main>
  )
} 