export interface IProperty {
    id: number;
    name: string;
    cnpj: string; // Considering the format of the Brazilian CNPJ
    tradeName: string; // Nome fantasia
    location: string;
    area: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    lastUpdatedBy: string;
    createdBy: string;
  }
  