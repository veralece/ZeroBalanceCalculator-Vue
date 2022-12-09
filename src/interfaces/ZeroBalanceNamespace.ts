export interface IBalanceForm {
    name: string;
    amount: number | null;
}
export interface IBalance extends IBalanceForm {
    balanceId: string;
}
export interface IBalanceState {
    [key: string]: IBalance[];
}

export interface IBalanceError {
    message: string | null;
}