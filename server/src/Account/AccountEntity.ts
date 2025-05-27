export interface AccountEntity {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: boolean;
}

export interface AccountLoginDto {
  email: string;
  password: string;
}

export interface AccountRegisterDto {
  name: string;
  email: string;
  password: string;
}