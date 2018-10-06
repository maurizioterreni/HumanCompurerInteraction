import { UnitKnowledge } from '../unitKnowledge/unitKnowledge';

export interface SensorKnowledge{
  description: string;
  id: number;
  unitMeasureDtos: UnitKnowledge[];
}
