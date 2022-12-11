<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { IBalance } from '../ZeroBalanceNamespace';
interface IBalanceProps {
    balanceType: string;
    balanceId: string;
    name: string | null;
    amount: number | null;
    modifyBalance: (key: string, method: string, balanceForm: null, balance: IBalance) => void;
    methods: {
        ADD: string,
        UPDATE: string,
        DELETE: string
    };
}

const props = defineProps<IBalanceProps>();
const editMode = ref(false);
const deleteMode = ref(false);
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

function toggleDeleteButton() {
    deleteMode.value = !deleteMode.value;
}
function handleBlur() {
    props.modifyBalance(props.balanceType, props.methods.UPDATE, null, viewState);
}
function handleChange(e: Event) {
    const event: HTMLInputElement = e.target as HTMLInputElement;
    const newBalanceItem: IBalance = { ...viewState, [event.name]: event.value }
    viewState.amount = newBalanceItem.amount;
    viewState.name = newBalanceItem.name;
}
function handleDelete() {
    props.modifyBalance(props.balanceType, props.methods.DELETE, null, viewState);
}
</script>

<template>
    <section class="balance-view grid">
        <input :id="`${props.name}-toggle-edit-checkbox`" type="checkbox" :checked="editMode"
            @change="toggleEditMode" />

        <template v-if="!editMode">
            <h2>{{ props.name }}</h2>
            <p>${{ props.amount }}</p>
        </template>

        <template v-else>
            <section class="grid editable">
                <span class="input grid col-2">
                    <label :for="`${props.name}-name`">Name</label>
                    <input v-model="viewState.name" @change="handleChange" @blur="handleBlur" :id="`${props.name}-name`"
                        name="name" :placeholder="`${displayLabel} name`" type="text" />
                </span>
                <span class="input grid col-2">
                    <label :for="`${props.name}-amount`">Amount</label>
                    <input v-model="viewState.amount" @change="handleChange" @blur="handleBlur"
                        :id="`${props.name}-amount`" name="amount" :placeholder="`${displayLabel} amount`"
                        type="number" />
                </span>
            </section>
            <label class="checkbox delete grid" :for="`${props.name}-toggle-del-checkbox`">
                <span></span>
                <span></span>
                <span></span>
            </label>
            <input :id="`${props.name}-toggle-del-checkbox`" class="checkbox delete" type="checkbox"
                :checked="deleteMode" @change="toggleDeleteButton" />
            <button class="delete-button" @click="handleDelete">Delete</button>
        </template>

    </section>
</template>