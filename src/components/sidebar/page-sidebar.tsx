'use client';

import { ClientProfileCard } from './client-profile-card';
import { PrescriptionFormsCard } from './prescription-forms-card';
import { TrainingMetricsCard } from './training-metrics-card';
import { ResistanceProfilesCard } from './resistance-profiles-card';

export function PageSidebar() {
  return (
    <div className="space-y-6">
      <ClientProfileCard />
      <PrescriptionFormsCard />
      <TrainingMetricsCard />
      <ResistanceProfilesCard />
    </div>
  );
}
