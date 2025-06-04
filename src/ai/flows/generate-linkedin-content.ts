// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview LinkedIn content generator AI agent.
 *
 * - generateLinkedInContent - A function that handles the LinkedIn content generation process.
 * - GenerateLinkedInContentInput - The input type for the generateLinkedInContent function.
 * - GenerateLinkedInContentOutput - The return type for the generateLinkedInContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLinkedInContentInputSchema = z.object({
  topic: z
    .string()
    .describe("The topic or keywords for generating LinkedIn posts.  For example: 'AI in marketing' or 'leadership tips'."),
});
export type GenerateLinkedInContentInput = z.infer<typeof GenerateLinkedInContentInputSchema>;

const GenerateLinkedInContentOutputSchema = z.object({
  linkedInPost: z.string().describe('Generated LinkedIn post.'),
});
export type GenerateLinkedInContentOutput = z.infer<typeof GenerateLinkedInContentOutputSchema>;

export async function generateLinkedInContent(input: GenerateLinkedInContentInput): Promise<GenerateLinkedInContentOutput> {
  return generateLinkedInContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLinkedInContentPrompt',
  input: {schema: GenerateLinkedInContentInputSchema},
  output: {schema: GenerateLinkedInContentOutputSchema},
  prompt: `You are a social media expert specializing in creating engaging LinkedIn content.

  Based on the topic or keywords provided, generate a LinkedIn post that is tailored to that topic.

  Topic: {{{topic}}}
  `,
});

const generateLinkedInContentFlow = ai.defineFlow(
  {
    name: 'generateLinkedInContentFlow',
    inputSchema: GenerateLinkedInContentInputSchema,
    outputSchema: GenerateLinkedInContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
