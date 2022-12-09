<script setup lang="ts">
import { reactive } from 'vue';
import { IBalanceState, IBalanceError, IBalance } from './interfaces/ZeroBalanceNamespace';
import BalanceForm from './components/BalanceForm.vue';
import Balances from './components/Balances.vue';
const BALANCE_TYPES = {
  INCOME: 'income',
  EXPENSES: 'expenses',
  FUNDS: 'funds',
  SAVINGS: 'savings'
}
const BALANCE_METHODS = {
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
    error.message = "Balance is not a valid amount. It should be at least greater than 1.";
    return;
  }

  if (balance.name === null || balance.name === "") {
    error.message = "Balance name is invalid."
    return;
  }

  switch (method) {
    case BALANCE_METHODS.ADD:
      balanceState[key].push(balance);
      break;
    case BALANCE_METHODS.UPDATE:
      console.log(balance);
      balanceState[key][balanceState[key].findIndex(b => b.balanceId = balance.balanceId)] = balance;
      break;
    case BALANCE_METHODS.DELETE:
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
      <section id="balance_forms" class="grid">
        <h2>Enter your balances</h2>
        <BalanceForm v-for="balanceType in BALANCE_TYPES" :key="`${balanceType}_form`" :balance-type="balanceType"
          :modify-balance="modifyBalance" :method="BALANCE_METHODS.ADD" />
      </section>

      <p v-if="(error.message !== null)">{{ error.message }}</p>

      <Balances v-for="balanceType in BALANCE_TYPES" :key="`${balanceType}_balances`" :balance-type="balanceType"
        :modify-balance="modifyBalance" :balances="balanceState[balanceType]" :methods="BALANCE_METHODS" />
    </article>
  </main>
</template>