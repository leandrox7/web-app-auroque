export interface ICattleEvent {
    id: number;
    cattleId: number;
    description: string;
    title: string;
    typeId: number
    isActive: boolean;
    date: Date;
    createdBy: number;
    lastUpdatedBy: number;
    createdAt: Date;  // ou string, dependendo de como você deseja manipular datas
    updatedAt: Date;  // ou string
}
