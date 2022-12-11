<script setup lang="ts">
import { reactive } from 'vue';
import { IBalancePropertyError, IBalanceState, IBalanceError, IBalance, BALANCE_METHODS, BALANCE_TYPES, INITIAL_BALANCE_ERROR_STATE, INITIAL_BALANCE_STATE, IBalanceForm, BALANCE_TYPE_PROPERTY } from './ZeroBalanceNamespace';
import BalanceForm from './components/BalanceForm.vue';
import Balances from './components/Balances.vue';
import CreateUniqueID from './hooks/uuid';

const balanceState: IBalanceState = reactive({ ...INITIAL_BALANCE_STATE });

const errorState = reactive<IBalanceError>({ ...INITIAL_BALANCE_ERROR_STATE });

function modifyBalance(key: string, method: string, balanceForm: IBalanceForm | null, balance: IBalance | null): void {
  errorState.key = INITIAL_BALANCE_ERROR_STATE.key;
  errorState.message = INITIAL_BALANCE_ERROR_STATE.message;
  errorState.offendingBalance = INITIAL_BALANCE_ERROR_STATE.offendingBalance;
  errorState.offendingForms = INITIAL_BALANCE_ERROR_STATE.offendingForms;

  const checkValidBalance = (balanceToVerify: IBalance | IBalanceForm): boolean => {
    let validSubmission = true;
    const offendingForms: IBalancePropertyError[] = [];

    if (balanceToVerify.amount === null || balanceToVerify.amount < 1) {
      const errorMessage = "Balance is not a valid amount. It should be at least greater than 1.";
      if (balanceForm) {
        offendingForms.push({ propertyErrorMessage: errorMessage, balancePropertyType: BALANCE_TYPE_PROPERTY.AMOUNT });
      }
      else if (balance) {
        errorState.offendingBalance = { balanceId: balance.balanceId };
        errorState.message = errorMessage;
      }
      validSubmission = false;
    }

    if (balanceToVerify.name === null || balanceToVerify.name === "") {
      const errorMessage = "Balance name is invalid.";
      if (balanceForm) {
        offendingForms.push({ propertyErrorMessage: errorMessage, balancePropertyType: BALANCE_TYPE_PROPERTY.NAME });
      }
      else if (balance) {
        errorState.offendingBalance = { balanceId: balance.balanceId };
        errorState.message = errorMessage;
      }
      validSubmission = false;
    }
    if (!validSubmission) {
      errorState.key = key;

      if (offendingForms.length > 0) {
        errorState.offendingForms = offendingForms;
      }
    }

    return validSubmission;
  }

  switch (method) {
    case BALANCE_METHODS.ADD:
      const validAddition = balanceForm && checkValidBalance(balanceForm);
      validAddition && balanceState[key].push({ ...balanceForm, balanceId: CreateUniqueID() });
      break;

    case BALANCE_METHODS.UPDATE:
      const validUpdate = balance && checkValidBalance(balance);
      if (validUpdate) {
        balanceState[key][balanceState[key].findIndex(b => b.balanceId === balance.balanceId)].amount = balance.amount;
        balanceState[key][balanceState[key].findIndex(b => b.balanceId === balance.balanceId)].name = balance.name;
      }
      break;

    case BALANCE_METHODS.DELETE:
      if (balance) {
        balanceState[key] = balanceState[key].filter(b => b.balanceId !== balance.balanceId);
      }
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
        <h1 class="center-text">Zero Balance Calculator</h1>
        <p>
          The purpose of this is to zero out your income by inputting your monthly income, expenses, funds, and savings
          so that all of your money is allocated and accounted.
        </p>
      </header>
      <section id="balance_forms" class="grid">
        <h2 class="center-text">Enter your balances</h2>
        <BalanceForm v-for="balanceType in BALANCE_TYPES" :key="`${balanceType}_form`" :balance-type="balanceType"
          :modify-balance="modifyBalance" :method="BALANCE_METHODS.ADD" :error="errorState" />
      </section>

      <Balances v-for="balanceType in BALANCE_TYPES" :key="`${balanceType}_balances`" :balance-type="balanceType"
        @handle-change="modifyBalance" :balances="balanceState[balanceType]" :methods="BALANCE_METHODS" />
    </article>
  </main>
</template>