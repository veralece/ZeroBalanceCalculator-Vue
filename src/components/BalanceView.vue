<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
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

const displayLabel = computed(() => {
    return `${props.balanceType.toUpperCase()[0]}${props.balanceType.substring(1, props.balanceType.length)}`
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

    <form class="grid balance-form card" v-if="editMode" @submit.prevent="handleSubmit">
        <span class="form-input">
            <input v-model="viewState.name" :id="`${props.name}-name`" :placeholder="`${displayLabel} name`"
                type="text" />
            <label :for="`${props.name}-name`">{{ displayLabel }} name</label>
        </span>

        <span class="form-input">
            <input v-model="viewState.amount" :id="`${props.name}-amount`" :placeholder="`${displayLabel} amount`"
                type="number" />
            <label :for="`${props.name}-amount`">{{ displayLabel }} amount</label>
        </span>
        <button type="submit">Submit</button>
    </form>
</template>