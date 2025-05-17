import type { Horse } from "./horse";

export interface Race {
    round: number;
    length: number;
    participants: Horse[];
    result: Horse[];
}
