export interface UserType {
    id?: number;
    name: string;
    email: string;
    experience?: string;
    skills?: string;
    isActive: string;
    role?: string;
    walletAddress?: string;
    createdAt?: Date;
  }

  export interface StateProps {
    state: string;
    stateCode: string;
    districtCode: string;
    district: string;
    headquarters: string;
    population: number;
    area: number;
    density: number;
}