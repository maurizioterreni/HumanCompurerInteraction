import { Serializable } from '../utils/serializzable';
import { Measure } from '../measure/measure';
export interface Sensor {
  id: number;
  description: string;
  title: string;
  sensorTemplate: number;
  unitKnowledgeId: number;
}
