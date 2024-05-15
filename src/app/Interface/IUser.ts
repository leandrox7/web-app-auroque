export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    observation: string;
    birthDate: string;           // ISO 8601 format date string
    login: string;
    passwordHash: string;
    lastLogin: string;           // ISO 8601 format date string
    loginFailures: number;
    isActive: boolean;
    roleName: string;
    createdAt: string;           // ISO 8601 format date string
    updatedAt: string;           // ISO 8601 format date string
    lastUpdatedBy: string;
    createdBy: string;
    userRoles: any[];            // More specific type can be used if structure of roles is known
  }
  