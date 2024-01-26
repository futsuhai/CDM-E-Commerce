import { IAccountData } from "./accountData.model";
import { IAdress } from "./adress.model";
import { ITokens } from "./tokens.model";

export interface IAccount {
    id?: string, 
    login?: string,
    password?: string;
    email?: string, 
    name?: string,
    family?: string,
    surname?: string,
    date?: Date,
    phone?: string,
    adress?: IAdress,
    avatar?: string,
    tokens?: ITokens,
    role?: Role,
    accountDataModel?: IAccountData
}

export enum Role {
    admin = 'admin',
    user = 'user'
}