<script setup lang="ts">
import { reactive, computed } from 'vue';
import { IBalanceForm, IBalanceError, BALANCE_TYPE_PROPERTY } from '../ZeroBalanceNamespace';
import Error from './Error.vue';
const initialState: IBalanceForm = {
    name: null,
    amount: null
}
interface IBalanceFormProps {
    balanceType: string;
    modifyBalance: (key: string, method: string, balanceForm: IBalanceForm, balance: null) => void;
    amount?: number | null;
    method: string;
    error?: IBalanceError;
}
const props = defineProps<IBalanceFormProps>();

const formState: IBalanceForm = reactive({ ...initialState });

const displayLabel = computed(() => {
    return `${props.balanceType.toUpperCase()[0]}${props.balanceType.substring(1, props.balanceType.length)}`
});

const shouldDisplayNameError = computed(() => {
    return props.error && props.error.key === props.balanceType && props.error?.offendingForms?.some(form => form.balancePropertyType === BALANCE_TYPE_PROPERTY.NAME);
});
const shouldDisplayAmountError = computed(() => {
    return props.error && props.error.key === props.balanceType && props.error?.offendingForms?.some(form => form.balancePropertyType === BALANCE_TYPE_PROPERTY.AMOUNT);

});
const displayNameError = computed(() => {
    return props.error?.offendingForms?.find(e => e.balancePropertyType === BALANCE_TYPE_PROPERTY.NAME)?.propertyErrorMessage;
});

const displayAmountError = computed(() => {
    return props.error?.offendingForms?.find(e => e.balancePropertyType === BALANCE_TYPE_PROPERTY.AMOUNT)?.propertyErrorMessage;
});
function handleSubmit() {
    props.modifyBalance(props.balanceType, props.method, formState, null);
    if (formState.amount !== null && formState.amount > 0 && formState.name !== null && formState.name !== '') {
        formState.amount = initialState.amount;
        formState.name = initialState.name;
    }
}
</script>
<template>

    <form class="grid balance-form card" @submit.prevent="handleSubmit">
        <span class="form-input">
            <input v-model="formState.name" :id="`${props.balanceType}-name`" :placeholder="`${displayLabel} name`"
                type="text" />
            <label :for="`${props.balanceType}-name`">{{ displayLabel }} name</label>
        </span>
        <Error v-if="shouldDisplayNameError">{{ displayNameError }}</Error>

        <span class="form-input">
            <input v-model="formState.amount" :id="`${props.balanceType}-amount`"
                :placeholder="`${displayLabel} amount`" type="number" />
            <label :for="`${props.balanceType}-amount`">{{ displayLabel }} amount</label>
        </span>
        <Error v-if="shouldDisplayAmountError">{{ displayAmountError }}</Error>
        <button type="submit">Submit</button>
    </form>
</template>