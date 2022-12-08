export interface IBalance {
    balanceId: string;
    name: string;
    amount: number | null;
}

export interface IBalanceState {
    [key: string]: IBalance[];
}

export interface IBalanceError { 
    message: string | null;
}