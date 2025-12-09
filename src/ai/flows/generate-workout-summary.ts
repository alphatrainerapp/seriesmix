'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a workout summary.
 *
 * The flow takes workout data as input and returns a summary of the workout performance,
 * including key metrics and insights.
 *
 * @remarks
 * - generateWorkoutSummary - A function that generates a workout summary.
 * - GenerateWorkoutSummaryInput - The input type for the generateWorkoutSummary function.
 * - GenerateWorkoutSummaryOutput - The return type for the generateWorkoutSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the workout data
const GenerateWorkoutSummaryInputSchema = z.object({
  workoutName: z.string().describe('The name of the workout.'),
  date: z.string().describe('The date of the workout.'),
  duration: z.number().describe('The duration of the workout in minutes.'),
  exercises: z.array(
    z.object({
      name: z.string().describe('The name of the exercise.'),
      sets: z.number().describe('The number of sets performed.'),
      reps: z.string().describe('The reps performed (e.g., 8-12).'),
      weight: z.number().optional().describe('The weight used (if applicable).'),
    })
  ).describe('The list of exercises performed in the workout.'),
  notes: z.string().optional().describe('Any notes about the workout.'),
});
export type GenerateWorkoutSummaryInput = z.infer<typeof GenerateWorkoutSummaryInputSchema>;

// Define the output schema for the workout summary
const GenerateWorkoutSummaryOutputSchema = z.object({
  summary: z.string().describe('A summary of the workout performance.'),
});
export type GenerateWorkoutSummaryOutput = z.infer<typeof GenerateWorkoutSummaryOutputSchema>;

// Exported function to generate workout summary
export async function generateWorkoutSummary(input: GenerateWorkoutSummaryInput): Promise<GenerateWorkoutSummaryOutput> {
  return generateWorkoutSummaryFlow(input);
}

// Define the prompt for generating the workout summary
const workoutSummaryPrompt = ai.definePrompt({
  name: 'workoutSummaryPrompt',
  input: {schema: GenerateWorkoutSummaryInputSchema},
  output: {schema: GenerateWorkoutSummaryOutputSchema},
  prompt: `You are an AI personal trainer. Generate a workout summary based on the following data. Be encouraging and provide insights.

Workout Name: {{{workoutName}}}
Date: {{{date}}}
Duration: {{{duration}}} minutes

Exercises:
{{#each exercises}}
- Name: {{{name}}}, Sets: {{{sets}}}, Reps: {{{reps}}}{{#if weight}}, Weight: {{{weight}}} kg{{/if}}
{{/each}}

Notes: {{{notes}}}

Summary:`,
});

// Define the Genkit flow for generating the workout summary
const generateWorkoutSummaryFlow = ai.defineFlow(
  {
    name: 'generateWorkoutSummaryFlow',
    inputSchema: GenerateWorkoutSummaryInputSchema,
    outputSchema: GenerateWorkoutSummaryOutputSchema,
  },
  async input => {
    const {output} = await workoutSummaryPrompt(input);
    return output!;
  }
);
