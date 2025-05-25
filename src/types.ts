export interface Runner {
    id: number;
    name: string;
}

export interface Team {
    legMapping: Record<Leg['name'], Runner['id']>;
}

export interface Rules {
    version: string;
    legs: Leg[];
}

export interface Leg {
    name: string;
}