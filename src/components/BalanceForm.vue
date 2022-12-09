<script setup lang="ts">
import { reactive, computed } from 'vue';
import uuidv4 from '../hooks/uuid';
import { IBalanceForm, IBalance } from '../interfaces/ZeroBalanceNamespace';
const initialState: IBalanceForm = {
    name: '',
    amount: null
}
interface IBalanceFormProps {
    balanceType: string;
    modifyBalance: (key: string, balance: IBalance, method: string) => void;
    amount?: number | null;
    method: string;
}
const props = defineProps<IBalanceFormProps>();

const formState: IBalanceForm = reactive({ ...initialState });

const displayLabel = computed(() => {
    return `${props.balanceType.toUpperCase()[0]}${props.balanceType.substring(1, props.balanceType.length)}`
});

function handleSubmit() {
    props.modifyBalance(props.balanceType, { ...formState, balanceId: uuidv4() }, props.method);
    formState.amount = initialState.amount;
    formState.name = initialState.name;
}
</script>
<template>
    <form class="grid balance-form card" @submit.prevent="handleSubmit">
        <label :for="`${props.balanceType}-name`">{{ displayLabel }} name</label>
        <input v-model="formState.name" :id="`${props.balanceType}-name`"
            :placeholder="`Enter ${props.balanceType} name`" type="text" />

        <label :for="`${props.balanceType}-amount`"></label>
        <input v-model="formState.amount" :id="`${props.balanceType}-amount`"
            :placeholder="`Enter ${props.balanceType} amount`" type="number" />
        <button type="submit">Submit</button>
    </form>
</template>