'use server';

/**
 * @fileOverview Suggests exercise variations based on the current workout plan and available equipment.
 *
 * - suggestExerciseVariations - A function that suggests exercise variations.
 * - SuggestExerciseVariationsInput - The input type for the suggestExerciseVariations function.
 * - SuggestExerciseVariationsOutput - The return type for the suggestExerciseVariations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestExerciseVariationsInputSchema = z.object({
  currentWorkoutPlan: z
    .string()
    .describe('The user\'s current workout plan, including exercises, sets, and reps.'),
  availableEquipment: z
    .string()
    .describe('A list of equipment available to the user.'),
  fitnessGoals: z
    .string()
    .describe('The user\'s fitness goals (e.g., strength, endurance, hypertrophy).'),
});

export type SuggestExerciseVariationsInput = z.infer<
  typeof SuggestExerciseVariationsInputSchema
>;

const SuggestExerciseVariationsOutputSchema = z.object({
  exerciseVariations: z
    .array(z.string())
    .describe('A list of suggested exercise variations.'),
  reasoning: z
    .string()
    .describe('The AI\'s reasoning for suggesting these variations.'),
});

export type SuggestExerciseVariationsOutput = z.infer<
  typeof SuggestExerciseVariationsOutputSchema
>;

export async function suggestExerciseVariations(
  input: SuggestExerciseVariationsInput
): Promise<SuggestExerciseVariationsOutput> {
  return suggestExerciseVariationsFlow(input);
}

const suggestExerciseVariationsPrompt = ai.definePrompt({
  name: 'suggestExerciseVariationsPrompt',
  input: {schema: SuggestExerciseVariationsInputSchema},
  output: {schema: SuggestExerciseVariationsOutputSchema},
  prompt: `You are a personal trainer. A user will provide their current workout plan, available equipment, and fitness goals.

You should suggest exercise variations that:

*   Target the same muscle groups as the original exercises.
*   Are appropriate for the user's available equipment.
*   Align with the user's fitness goals.
*   Provide variety to keep the workouts interesting and challenging.

Current Workout Plan: {{{currentWorkoutPlan}}}
Available Equipment: {{{availableEquipment}}}
Fitness Goals: {{{fitnessGoals}}}

Suggest 3-5 exercise variations and briefly explain your reasoning for each suggestion.
`,
});

const suggestExerciseVariationsFlow = ai.defineFlow(
  {
    name: 'suggestExerciseVariationsFlow',
    inputSchema: SuggestExerciseVariationsInputSchema,
    outputSchema: SuggestExerciseVariationsOutputSchema,
  },
  async input => {
    const {output} = await suggestExerciseVariationsPrompt(input);
    return output!;
  }
);
