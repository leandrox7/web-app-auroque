export interface ICattle {
  id: number;
    sisbovId: string;
    piqueteId: number;
    visualId: string;
    propertyId: number;
    animalTypeId: number;
    animalSubtypeId: number;
    breedId: number;
    birthDate: Date; // ou Date se você estiver usando objetos Date no TypeScript
    fatherId: number | null; // pode ser null se a informação não estiver disponível
    motherId: number | null; // pode ser null se a informação não estiver disponível
    gender: 'Male' | 'Female';
    pregnant: boolean;
    destinationId: number;
    originId: number;
    vaccinationStatusId: number;
    isActive: boolean;
    createdBy: number;
    lastUpdatedBy: number;
    createdAt: string; // ou Date
    updatedAt: Date; // ou Date
  }