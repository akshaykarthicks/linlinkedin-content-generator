"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { generateLinkedInContent, type GenerateLinkedInContentInput } from '@/ai/flows/generate-linkedin-content';
import { useToast } from "@/hooks/use-toast";
import { Loader2, Linkedin, Sparkles, Copy } from "lucide-react";

// Schema for form validation
const formSchema = z.object({
  userInput: z.string().min(10, { message: "Please enter at least 10 characters for your content idea." }),
});

export default function HomePage() {
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userInput: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedContent(null);

    // 1. Send to n8n webhook
    try {
      const n8nResponse = await fetch('https://aks8888.app.n8n.cloud/webhook-test/d01f9cfa-0fc3-47c3-90a9-a35b63bab27c', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input_text: values.userInput }),
      });
      if (!n8nResponse.ok) {
        toast({
          title: "Webhook Notification Issue",
          description: `Could not send data to n8n: ${n8nResponse.statusText}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error sending to n8n:", error);
      toast({
        title: "Webhook Connection Error",
        description: "Failed to connect to the n8n webhook. Proceeding with AI generation.",
        variant: "destructive",
      });
    }

    // 2. Generate content using AI
    try {
      const aiInput: GenerateLinkedInContentInput = { topic: values.userInput };
      const aiResponse = await generateLinkedInContent(aiInput);
      if (aiResponse && aiResponse.linkedInPost) {
        setGeneratedContent(aiResponse.linkedInPost);
        toast({
          title: "Content Generated!",
          description: "Your LinkedIn post has been successfully generated.",
        });
      } else {
        throw new Error("AI did not return valid content.");
      }
    } catch (error) {
      console.error("Error generating content:", error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred during content generation.",
        variant: "destructive",
      });
      setGeneratedContent(null);
    } finally {
      setIsLoading(false);
    }
  }

  const handleCopy = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent)
        .then(() => {
          toast({ title: "Copied!", description: "Content copied to clipboard." });
        })
        .catch(() => {
          toast({ title: "Copy Failed", description: "Could not copy content. Please try again.", variant: "destructive" });
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-2xl shadow-xl rounded-lg">
        <CardHeader className="text-center p-6">
          <div className="flex items-center justify-center mb-3">
            <Linkedin className="w-10 h-10 sm:w-12 sm:h-12 text-primary mr-3" />
            <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-headline">LinkedUp Content Generator</CardTitle>
          </div>
          <CardDescription className="text-sm sm:text-base text-muted-foreground px-4">
            Enter your base idea, and let AI craft an engaging LinkedIn post for you!
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="userInput"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md sm:text-lg font-medium">Your Content Idea</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., The future of remote work and its impact on team collaboration..."
                        className="min-h-[120px] sm:min-h-[140px] resize-y text-base p-3 rounded-md focus:ring-primary focus:border-primary"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full text-base sm:text-lg py-3 sm:py-4 rounded-md" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate Content
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>

        {generatedContent && !isLoading && (
          <CardFooter className="flex flex-col items-start space-y-4 border-t p-6">
            <div className="flex justify-between items-center w-full">
                <h3 className="text-lg sm:text-xl font-headline text-primary">Generated LinkedIn Post:</h3>
                <Button variant="outline" size="sm" onClick={handleCopy} className="rounded-md">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                </Button>
            </div>
            <div className="w-full p-4 bg-secondary rounded-md shadow-inner whitespace-pre-wrap text-sm sm:text-base leading-relaxed">
              {generatedContent}
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
