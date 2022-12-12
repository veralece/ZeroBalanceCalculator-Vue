<script setup lang="ts">
import { toNumber } from '@vue/shared';
import { ref, reactive, computed } from 'vue';
import { BALANCE_TYPE_PROPERTY, IBalance } from '../ZeroBalanceNamespace';
interface IBalanceProps {
    balanceType: string;
    balanceId: string;
    name: string | null;
    amount: number | null;
    methods: {
        ADD: string,
        UPDATE: string,
        DELETE: string
    };
}
const emit = defineEmits(['handleChange']);
const props = defineProps<IBalanceProps>();
const editMode = ref(false);
const deleteMode = ref(false);
const viewState = reactive<IBalance>({
    balanceId: props.balanceId,
    name: props.name,
    amount: props.amount
});

const displayLabel = computed(() => {
    return `${props.balanceType.charAt(0).toUpperCase()}${props.balanceType.slice(1)}`;
});
function toggleEditMode() {
    editMode.value = !editMode.value;
}

function toggleDeleteButton() {
    deleteMode.value = !deleteMode.value;
}
function handleChange() {
    emit('handleChange', props.balanceType, props.methods.UPDATE, null, viewState);
}
function handleEnterKeyUp() {
    toggleEditMode();
}
function handleDelete() {
    emit('handleChange', props.balanceType, props.methods.DELETE, null, viewState);
}
</script>

<template>
    <section class="balance-view grid">
        <input :id="`${props.balanceId}-toggle-edit-checkbox`" class="checkbox" type="checkbox" :checked="editMode"
            @change="toggleEditMode" />
        <label :for="`${props.balanceId}-toggle-edit-checkbox`" class="checkbox edit grid"
            :aria-label="`Toggle edit mode for ${name} from ${balanceType}`">
            <svg class="checkbox-svg" view-box="0 0 32 32">
                <rect class="square" rx="2" x="0" y="0" width="32" height="32"></rect>
                <line class="line" x1="16" y1="25" x2="5" y2="14" stroke-width="6px"></line>
                <line class="line" x1="12" y1="25" x2="27" y2="9" stroke-width="6px"></line>
            </svg>
        </label>

        <template v-if="!editMode">
            <section class="grid">
                <h4>{{ props.name }}</h4>
                <p>${{ props.amount }}</p>
            </section>
        </template>

        <template v-else>
            <section class="grid editable">
                <input v-model="viewState.name" class="input" @keyup.enter="handleEnterKeyUp" @change="handleChange" :id="`${viewState.balanceId}-name`"
                    name="name" :placeholder="`${displayLabel} name`" type="text" />
                <input v-model.number="viewState.amount" class="input" @keyup.enter="handleEnterKeyUp" @change="handleChange"
                    :id="`${viewState.balanceId}-amount`" name="amount" :placeholder="`${displayLabel} amount`"
                    type="number" />
            </section>
        </template>
        <input :id="`${props.balanceId}-toggle-del-checkbox`" class="checkbox delete" type="checkbox"
            :checked="deleteMode" @change="toggleDeleteButton" />
        <label class="checkbox delete grid" :for="`${props.balanceId}-toggle-del-checkbox`">
            <svg class="options-checkbox">
                <circle class="circle" r="2" cx="50%" cy="33%"></circle>
                <circle class="circle" r="2" cx="50%" cy="49.5%"></circle>
                <circle class="circle" r="2" cx="50%" cy="66%"></circle>
            </svg>
        </label>
        <button class="delete-button" @click="handleDelete">Delete</button>
    </section>
</template>