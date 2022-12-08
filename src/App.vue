<script setup lang="ts">
import { reactive } from 'vue';
import { IBalanceState, IBalance, IBalanceError } from './interfaces/ZeroBalanceNamespace';
import BalanceForm from './components/BalanceForm.vue';
import Balances from './components/Balances.vue';
const BALANCE_TYPES = {
  INCOME: 'income',
  EXPENSES: 'expenses',
  FUNDS: 'funds',
  SAVINGS: 'savings'
}
const BALANCE_METHOD = {
  ADD: 'add',
  UPDATE: 'update',
  DELETE: 'del'
}
const balanceState: IBalanceState = reactive({
  income: [],
  expenses: [],
  funds: [],
  savings: []
});

const error = reactive<IBalanceError>({ message: null });

function modifyBalance(key: string, balance: IBalance, method: string): void {
  error.message = null;

  if (balance.amount === null || balance.amount < 1) {
    error.message = "Balance is not a valid amount.";
    return;
  }

  if (balance.name === null || balance.name === "") {
    error.message = "Balance name is invalid."
    return;
  }

  switch (method) {
    case BALANCE_METHOD.ADD:
      balanceState[key].push(balance);
      break;
    case BALANCE_METHOD.UPDATE:
      balanceState[key][balanceState[key].findIndex(b => b.balanceId = balance.balanceId)] = balance;
      break;
    case BALANCE_METHOD.DELETE:
      balanceState[key] = balanceState[key].filter(b => b.balanceId !== balance.balanceId);
      break;
    default:
      break;
  }
}

//forms are responsible for adding to the state, so they only recieve the add methods
//TODO
//Display Balances
//Update Balances after they have been created
//Export balances as a csv, maybe?
</script>

<template>
  <main>
    <article>
      <header>
        <h1>Zero Balance Calculator</h1>
        <p>
          The purpose of this is to zero out your income by inputting your monthly income, expenses, funds, and savings
          so that all of your money is allocated and accounted.
        </p>
      </header>
      <template v-for="balanceType in BALANCE_TYPES" :key="balanceType">
        <BalanceForm :name="balanceType" :modify-balance="modifyBalance" :method="BALANCE_METHOD.ADD">
        </BalanceForm>
      </template>
      <p v-if="(error.message !== null)">{{ error.message }}</p>
      <template v-for="balanceType in BALANCE_TYPES">
        <Balances :name="balanceType" :modify-balance="modifyBalance" :balances="balanceState[balanceType]">
        </Balances>
      </template>
    </article>
  </main>
</template>

<style scoped>

</style>
