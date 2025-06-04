'use server';

/**
 * @fileOverview A LinkedIn post generator from an article summary.
 *
 * - summarizeArticleToLinkedInPost - A function that handles the generation of a LinkedIn post from an article.
 * - SummarizeArticleToLinkedInPostInput - The input type for the summarizeArticleToLinkedInPost function.
 * - SummarizeArticleToLinkedInPostOutput - The return type for the summarizeArticleToLinkedInPost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeArticleToLinkedInPostInputSchema = z.object({
  articleLink: z.string().describe('The link to the article to summarize.'),
});
export type SummarizeArticleToLinkedInPostInput = z.infer<
  typeof SummarizeArticleToLinkedInPostInputSchema
>;

const SummarizeArticleToLinkedInPostOutputSchema = z.object({
  linkedinPost: z
    .string()
    .describe('The generated LinkedIn post based on the article.'),
});
export type SummarizeArticleToLinkedInPostOutput = z.infer<
  typeof SummarizeArticleToLinkedInPostOutputSchema
>;

export async function summarizeArticleToLinkedInPost(
  input: SummarizeArticleToLinkedInPostInput
): Promise<SummarizeArticleToLinkedInPostOutput> {
  return summarizeArticleToLinkedInPostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeArticleToLinkedInPostPrompt',
  input: {schema: SummarizeArticleToLinkedInPostInputSchema},
  output: {schema: SummarizeArticleToLinkedInPostOutputSchema},
  prompt: `You are an AI assistant specialized in generating engaging LinkedIn posts.

  Based on the content of the article provided by the URL, create a professional and engaging LinkedIn post draft that summarizes the key takeaways and encourages conversation among my network.

  Article URL: {{{articleLink}}}`,
});

const summarizeArticleToLinkedInPostFlow = ai.defineFlow(
  {
    name: 'summarizeArticleToLinkedInPostFlow',
    inputSchema: SummarizeArticleToLinkedInPostInputSchema,
    outputSchema: SummarizeArticleToLinkedInPostOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
