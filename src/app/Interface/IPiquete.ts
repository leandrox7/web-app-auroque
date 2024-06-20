export interface IPiquete {
    id: number;
    propertyId: number;
    name: string;
    description: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    lastUpdatedBy: string;
    createdBy: string;
  }