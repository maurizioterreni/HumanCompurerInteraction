import { Serializable } from '../utils/serializzable';
import { Measure } from '../measure/measure';
export interface Sensor {
  id: number;
  description: string;
  title: string;
  symbol: string;
  name: string;
  maxMeasure: Measure;
  measure: Measure;
  minMeasure: Measure;
  unitKnowledgeId: number;
}
