'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const chartData = [
  { muscle: 'Peito', series: 3 },
  { muscle: 'Deltoide', series: 10.5 },
  { muscle: 'Costas', series: 18 },
  { muscle: 'Tríceps', series: 18 },
  { muscle: 'Bíceps', series: 6 },
  { muscle: 'Quadríceps', series: 15 },
  { muscle: 'Post. de coxa', series: 1 },
  { muscle: 'Abd.', series: 7.5 },
];

const chartConfig = {
  series: {
    label: 'Séries',
    color: 'hsl(var(--chart-2))',
  },
};

export function TrainingMetricsCard() {
  return (
    <Card className="bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Métricas do treino</CardTitle>
        <div className="flex items-center justify-between">
          <CardDescription>Séries por músculo</CardDescription>
          <Select defaultValue="semanal">
            <SelectTrigger className="w-auto h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semanal">Semanal</SelectItem>
              <SelectItem value="mensal">Mensal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-64">
          <BarChart
            data={chartData}
            margin={{ top: 0, right: 0, left: -20, bottom: -10 }}
            accessibilityLayer
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="muscle"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              interval={0}
            />
             <YAxis
              domain={[0, 20]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="series" fill="var(--color-series)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
