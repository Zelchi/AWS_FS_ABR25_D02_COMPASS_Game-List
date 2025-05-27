export interface AccountEntity {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: boolean;
}

export interface AccountRegister {
  name: string;
  email: string;
  password: string;
}

export interface AccountLogin {
  email: string;
  password: string;
}