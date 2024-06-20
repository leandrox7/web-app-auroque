import { IGenericItem } from "./IGenericItem";

export interface IPharmacyItem {
    id: number;
    name: string;
    manufacturer: string;
    batch: string;
    expirationDate: Date; // ou Date, se você estiver convertendo strings de data para objetos Date
    pharmacyTypeId: number;
    pharmacyUnitTypeId: number;
    additionalInfo: string;
    quantity: number;
    price: number;
    isActive: boolean;
    createdAt: string; // ou Date
    updatedAt: string; // ou Date
    lastUpdatedBy: string;
    createdBy: string;
    pharmacyType: IGenericItem | null;
    pharmacyUnitType: IGenericItem | null;
}