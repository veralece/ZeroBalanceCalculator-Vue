<script setup lang="ts">
import { ref, reactive } from 'vue';
import { IBalance } from '../interfaces/ZeroBalanceNamespace';
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
const viewState = reactive<IBalance>({
    balanceId: props.balanceId,
    name: props.name,
    amount: props.amount
});

function toggleEditMode() {
    editMode.value = !editMode.value;
}
function handleSubmit() {
    toggleEditMode();
    props.modifyBalance(props.balanceType, viewState, props.methods.UPDATE);
}
function handleDelete() {
    props.modifyBalance(props.balanceType, viewState, props.methods.DELETE);
}

</script>
<template>
    <section v-if="!editMode">
        <h2>{{ props.name }}</h2>
        <p>{{ props.amount }}</p>
        <button @click="toggleEditMode">Edit</button>
        <button @click="handleDelete">Delete</button>
    </section>

    <form v-if="editMode" @submit.prevent="handleSubmit">
        <label :for="`${props.name}-name`">{{ props.name }} name</label>
        <input v-model="viewState.name" :id="`${props.name}-name`" :placeholder="`Enter ${props.balanceType} name`"
            type="text" />

        <label :for="`${props.name}-amount`"></label>
        <input v-model="viewState.amount" :id="`${props.name}-amount`" :placeholder="`Enter ${props.balanceType} amount`"
            type="number" />
        <button type="submit">Submit</button>
    </form>
</template>