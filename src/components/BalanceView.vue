<script setup lang="ts">
import { ref, reactive } from 'vue';
import { IBalance } from '../interfaces/ZeroBalanceNamespace';
import BalanceForm from './BalanceForm.vue';
interface IBalanceProps {
    balanceType: string;
    balanceId: string;
    name: string;
    amount: number | null;
    modifyBalance: (key: string, balance: IBalance, method: string) => void;
    methods: {
        ADD: string,
        UPDATE: string,
        DELETE: string
    };
}

const props = defineProps<IBalanceProps>();
const editMode = ref(false);
const state = reactive<IBalance>({
    balanceId: props.balanceId,
    name: props.name,
    amount: props.amount
});

function toggleEditMode() {
    editMode.value = !editMode.value;
}
function handleSubmit() {
    toggleEditMode();
    props.modifyBalance(props.balanceType, state, props.methods.UPDATE);
}
</script>
<template>
    <section v-if="!editMode">
        <h2>{{ props.name }}</h2>
        <p>{{ props.amount }}</p>
        <button @click="toggleEditMode">Edit</button>
    </section>

    <form v-if="editMode" @submit.prevent="handleSubmit">
        <label :for="`${props.name}-name`">{{ props.name }} name</label>
        <input v-model="state.name" :id="`${props.name}-name`" :placeholder="`Enter ${props.balanceType} name`" type="text" />

        <label :for="`${props.name}-amount`"></label>
        <input v-model="state.amount" :id="`${props.name}-amount`" :placeholder="`Enter ${props.balanceType} amount`"
            type="number" />
        <button type="submit">Submit</button>
    </form>
</template>