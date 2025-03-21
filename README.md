# The Council Assistant

A modern, interactive chatbot designed to help students access information about the Student Council quickly and efficiently.

## Features

- 🤖 **Intelligent Responses**: Get instant answers about:
  - Student Council elections and voting
  - Events and activities
  - Membership opportunities
  - Meeting schedules
  - Contact information

- 💬 **Chat Management**:
  - Create multiple chat sessions
  - Persistent chat history within sessions
  - Clean and intuitive interface

- 🎨 **Modern UI/UX**:
  - Responsive design
  - Dark/Light mode support
  - Loading states and animations
  - Error handling with visual feedback

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/council-chatbot.git
cd council-chatbot
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to start using the chatbot.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide Icons
- **State Management**: React Hooks
- **TypeScript**: For type safety

## Project Structure

```
council-chatbot/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts    # Chat API endpoint
│   ├── chat/
│   │   └── page.tsx        # Chat interface page
│   └── page.tsx            # Landing page
├── components/
│   └── student-council-chatbot.tsx  # Main chatbot component
└── public/
    └── ...                 # Static assets
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
#
