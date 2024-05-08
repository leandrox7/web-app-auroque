export interface ICattle {
    id: number;                 // Unique identifier
    idVisualIdentification: string;  // Visual ID, like a tag or collar number
    idSisbovIdentification: string;  // SISBOV ID for tracking cattle in Brazil
    gender: string;  // Gender of the animal
    animalType: string;         // General type, e.g., "Cattle", "Sheep"
    animalSubtype: string;      // More specific type, e.g., "Dairy cattle", "Beef cattle"
    breed: string;              // Breed of the animal
    origin: string;             // Where the animal originated
    purpose: string;            // Purpose for which the animal is raised
    birthDate: Date;            // Date of birth
    vaccinationStatus: string;  // Vaccination status, e.g., "Up to date", "Pending"
    weight: number;             // Current weight in kilograms
  }