export interface Runner {
    id: number;
    name: string;
    yearOfBirth?: number;
    sex: 'M' | 'F';
}

export interface Team {
    id: number;
    legMapping: Record<Leg['name'], Runner['id']>;
}

export interface Rules {
    version: string;
    legs: Leg[];
}

export interface Leg {
    name: string;
}