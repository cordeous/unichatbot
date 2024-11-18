import { NextResponse } from 'next/server'

type ChatRequest = {
  message: string
}

const KNOWLEDGE_BASE = {
  election: {
    keywords: ['election', 'voting', 'vote', 'candidate'],
    response: "Student Council elections are held annually at the beginning of each academic year. All students are eligible to vote for their class representatives and executive board members. Keep an eye on the school's official communication channels for exact dates and voting procedures."
  },
  events: {
    keywords: ['event', 'activities', 'program', 'schedule'],
    response: "The Student Council organizes various events throughout the year, including spirit weeks, fundraisers, and social gatherings. Check our events calendar on the school website or follow our social media accounts for the latest updates on upcoming activities."
  },
  membership: {
    keywords: ['join', 'become a member', 'membership', 'participate'],
    response: "Great to hear you're interested in joining the Student Council! You can become a member by running for a position during our annual elections or by volunteering for various committees. Attend our next general meeting to learn more about available opportunities."
  },
  meetings: {
    keywords: ['meeting', 'schedule', 'when', 'time'],
    response: "Student Council meetings are typically held bi-weekly on Wednesdays after school in Room 201. All students are welcome to attend these open meetings. For the exact schedule, please check the Student Council bulletin board or our official social media pages."
  },
  contact: {
    keywords: ['contact', 'reach', 'email', 'phone'],
    response: "You can reach the Student Council by emailing studentcouncil@school.edu or by visiting our office in Room 105 during lunch hours. You can also speak with any of the elected representatives or faculty advisors."
  }
}

export async function POST(request: Request) {
  try {
    const body: ChatRequest = await request.json()
    const userMessage = body.message.toLowerCase()

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500))

    // Find matching topic
    const matchedTopic = Object.values(KNOWLEDGE_BASE).find(topic =>
      topic.keywords.some(keyword => userMessage.includes(keyword))
    )

    const response = matchedTopic?.response || 
      "I'm sorry, I don't have specific information about that. For more detailed or personalized assistance, please contact a Student Council representative directly or visit our office."

    return NextResponse.json({ response })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    )
  }
} 