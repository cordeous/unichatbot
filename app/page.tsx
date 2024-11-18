import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { MessageSquarePlus } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-background to-muted">
      <div className="max-w-3xl text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent animate-gradient">
            Student Council Assistant
          </h1>
          <p className="text-xl text-muted-foreground">
            Get instant answers to your questions about student council activities, 
            events, and procedures.
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row justify-center">
          <Link href="/chat">
            <Button 
              size="lg" 
              className="gap-2 transition-transform hover:scale-105 hover:shadow-lg"
            >
              <MessageSquarePlus className="w-5 h-5" />
              Start New Chat
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          {[
            {
              title: "Quick Answers",
              description: "Get immediate responses to common questions about student council"
            },
            {
              title: "24/7 Available",
              description: "Access information anytime, anywhere about events and activities"
            },
            {
              title: "Easy to Use",
              description: "Simple interface to help you find the information you need"
            }
          ].map((card, index) => (
            <div 
              key={index}
              className="p-6 bg-card rounded-lg shadow-sm transition-all duration-200 
                hover:shadow-md hover:scale-105 hover:bg-accent/50 cursor-pointer"
            >
              <h3 className="font-semibold mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}