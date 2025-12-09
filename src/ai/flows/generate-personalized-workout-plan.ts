'use server';
/**
 * @fileOverview An AI agent for generating personalized workout plans.
 *
 * - generatePersonalizedWorkoutPlan - A function that generates a personalized workout plan.
 * - GeneratePersonalizedWorkoutPlanInput - The input type for the generatePersonalizedWorkoutPlan function.
 * - GeneratePersonalizedWorkoutPlanOutput - The return type for the generatePersonalizedWorkoutPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedWorkoutPlanInputSchema = z.object({
  fitnessGoals: z
    .string()
    .describe('The fitness goals of the user (e.g., weight loss, muscle gain, endurance).'),
  availableEquipment: z
    .string()
    .describe('The equipment available to the user (e.g., dumbbells, barbell, no equipment).'),
  experienceLevel: z
    .string()
    .describe('The experience level of the user (beginner, intermediate, advanced).'),
});
export type GeneratePersonalizedWorkoutPlanInput = z.infer<
  typeof GeneratePersonalizedWorkoutPlanInputSchema
>;

const GeneratePersonalizedWorkoutPlanOutputSchema = z.object({
  workoutPlan: z.string().describe('The generated personalized workout plan.'),
});
export type GeneratePersonalizedWorkoutPlanOutput = z.infer<
  typeof GeneratePersonalizedWorkoutPlanOutputSchema
>;

export async function generatePersonalizedWorkoutPlan(
  input: GeneratePersonalizedWorkoutPlanInput
): Promise<GeneratePersonalizedWorkoutPlanOutput> {
  return generatePersonalizedWorkoutPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedWorkoutPlanPrompt',
  input: {schema: GeneratePersonalizedWorkoutPlanInputSchema},
  output: {schema: GeneratePersonalizedWorkoutPlanOutputSchema},
  prompt: `You are a personal trainer who creates personalized workout plans based on the user's fitness goals, available equipment, and experience level.

Fitness Goals: {{{fitnessGoals}}}
Available Equipment: {{{availableEquipment}}}
Experience Level: {{{experienceLevel}}}

Create a workout plan that is tailored to the user's needs.`,
});

const generatePersonalizedWorkoutPlanFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedWorkoutPlanFlow',
    inputSchema: GeneratePersonalizedWorkoutPlanInputSchema,
    outputSchema: GeneratePersonalizedWorkoutPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
