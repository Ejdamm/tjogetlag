export interface Runner {
    id: number;
    name: string;
    yearOfBirth?: number;
    sex: 'M' | 'F';
}

export interface Team {
    id: number;
    legMapping: LegMapping;
}

export type LegMapping = Record<Leg['name'], Runner['id']>;

export interface RuleSet {
    version: string;
    limits: Limits[];
    legs: Leg[];
}

export interface Limits {
    maxRunners?: number;
    maxTeams?: number;
    minAge?: number;
    maxAge?: number;
    sex?: 'M' | 'F';
    maxCount?: number;
    minCount?: number;
}

export interface Leg {
    name: string;
    extra?: number;
    limits?: Limits[];
}