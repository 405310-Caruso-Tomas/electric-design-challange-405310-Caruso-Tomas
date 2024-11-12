import { ModuleType } from "./models/budget";

export interface Module {
    type: ModuleType;
    price: number;
    place: number;
    zone: string;
}
