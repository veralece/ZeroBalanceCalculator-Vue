<script setup lang="ts">
import { reactive } from 'vue';
import uuidv4 from '../hooks/uuid';
import { IBalance } from '../interfaces/ZeroBalanceNamespace';

interface IBalanceFormProps {
    name: string;
    modifyBalance: (key: string, balance: IBalance, method: string) => void;
    balanceId?: string | null;
    amount?: number | null;
    method: string;
}
const props = defineProps<IBalanceFormProps>();

const state: IBalance = reactive({
    balanceId: props.balanceId ? uuidv4() : props.balanceId,
    name: '',
    amount: null
});

</script>
<template>
    <form @submit.prevent="props.modifyBalance(props.name, state, props.method)">
        <label :for="`${props.name}-name`">{{ props.name }} name</label>
        <input v-model="state.name" :id="`${props.name}-name`" :placeholder="`Enter ${props.name} name`" type="text" />

        <label :for="`${props.name}-amount`"></label>
        <input v-model="state.amount" :id="`${props.name}-amount`" :placeholder="`Enter ${props.name} amount`"
            type="number" />
        <button type="submit">Submit</button>
    </form>
</template>