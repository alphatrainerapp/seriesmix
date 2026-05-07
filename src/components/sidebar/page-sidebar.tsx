'use client';

import { ClientProfileCard } from './client-profile-card';
import { PrescriptionFormsCard } from './prescription-forms-card';
import { TrainingMetricsCard } from './training-metrics-card';
import { ResistanceProfilesCard } from './resistance-profiles-card';
import type { Exercise } from '@/lib/types';

export function PageSidebar({ exercises, currentTab }: { exercises: Exercise[], currentTab: string }) {
  return (
    <div className="space-y-6">
      <ClientProfileCard />
      <PrescriptionFormsCard />
      <TrainingMetricsCard />
      <ResistanceProfilesCard exercises={exercises} currentTab={currentTab} />
    </div>
  );
}
