
export interface Hostel {
    id: number;
    name: string;
    type: HostelType;
    description: string;
    isActive: boolean;
}

export enum HostelType {
    Common,
    Boys,
    Girls
}