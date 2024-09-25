export enum userRole {
    Customer = "customer",
    Farmer = "farmer"
}

export interface IUser {
    name: string,
    email: string,
    password: string,
    role: userRole,
    address: string,
    contact: string,
    createdAt?: Date
}