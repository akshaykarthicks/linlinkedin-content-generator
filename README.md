# LinkedIn Content Generator

This is a Next.js application designed to help you generate content for LinkedIn posts. It leverages AI models to assist in creating engaging and relevant content, including summarizing articles into LinkedIn posts.

## Core Features

- **Content Input:** A text input area for users to provide the base content or ideas for their LinkedIn post.
- **AI Content Generation:** Utilizes AI models to generate creative, engaging, and relevant LinkedIn content based on user input.
- **Content Display:** Presents the generated LinkedIn content for review and copying.
- **Summarize Article to LinkedIn Post:** An AI flow specifically designed to take an article link or text and summarize it into a suitable LinkedIn post.

## Technologies Used

- **Next.js:** A React framework for building server-side rendered and static web applications.
- **React:** A JavaScript library for building user interfaces.
- **Tailwind CSS:** A utility-first CSS framework for styling.
- **Genkit:** A framework for building AI-powered applications.
- **AI Models:** Integration with AI models for content generation and summarization.

## Project Structure

- `src/app/`: Contains the main application pages and layout.
- `src/ai/`: Houses the AI-related code, including Genkit configuration and AI flows.
- `src/ai/flows/`: Contains the definitions for the AI flows, such as `summarize-article-to-linkedin-post.ts`.
- `src/components/`: Contains reusable UI components.
- `src/hooks/`: Custom React hooks used in the application.
- `src/lib/`: Utility functions and helper code.
- `docs/`: Documentation files, including the blueprint.md.

## Styling Guidelines

Based on the `docs/blueprint.md`, the application follows these styling guidelines:

- **Primary color:** A muted blue (#6699CC)
- **Background color:** Light gray (#F0F0F0)
- **Accent color:** Soft green (#8FBC8F)
- **Body and headline font:** 'PT Sans'
- Clean and straightforward layout.
- Use simple and professional icons.
- Subtle loading animation during AI processing.

## Getting Started
