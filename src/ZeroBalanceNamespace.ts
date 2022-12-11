export interface IBalanceForm {
    name: string | null;
    amount: number | null;
}
export interface IBalance extends IBalanceForm {
    balanceId: string;
}
export interface IBalanceState {
    [key: string]: IBalance[];
}

export interface IBalancePropertyError {
    balancePropertyType: string;
    propertyErrorMessage: string;
}

export interface IBalanceError extends IError {
    offendingForms: IBalancePropertyError[] | null;
    offendingBalance: { balanceId?: string } | null;
    key: string | null;
}

export interface IError {
    message: string | null;
}

export const BALANCE_TYPES = {
    INCOME: 'income',
    EXPENSES: 'expenses',
    FUNDS: 'funds',
    SAVINGS: 'savings'
}
export const BALANCE_METHODS = {
    ADD: 'add',
    UPDATE: 'update',
    DELETE: 'del'
}

export const BALANCE_TYPE_PROPERTY = {
    NAME: 'name',
    AMOUNT: 'amount'
}

export const INITIAL_BALANCE_STATE: IBalanceState = {
    income: [],
    expenses: [],
    funds: [],
    savings: []
}

export const INITIAL_BALANCE_ERROR_STATE: IBalanceError = { offendingBalance: null, key: null, message: null, offendingForms: null }