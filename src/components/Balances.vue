<script setup lang="ts">
import { computed } from 'vue';
import { IBalance } from '../ZeroBalanceNamespace';
import BalanceView from './BalanceView.vue';
interface IBalancesProps {
    balanceType: string;
    balances: IBalance[];
    methods: {
        ADD: string,
        UPDATE: string,
        DELETE: string
    };
}

const emit = defineEmits(['handleChange']);

function handleChange(key: string, method: string, balanceForm: null, balance: IBalance) {
    emit('handleChange', key, method, balanceForm, balance);
}
const props = defineProps<IBalancesProps>();

const balanceTypeName = computed(() => {
    return `${props.balanceType.toUpperCase()[0]}${props.balanceType.substring(1, props.balanceType.length)}`
});
const hasBalances = computed(() => {
    return props.balances.length > 0;
});
</script>
<template>
    <section class="balance-viewer grid">
        <h1 :hidden="!hasBalances">{{ balanceTypeName }}</h1>
        <BalanceView @handle-change="handleChange" :hidden="!hasBalances" v-for="balance in props.balances" :balance-type="props.balanceType" :methods="props.methods"
            :name="balance.name" :amount="balance.amount" :balance-id="balance.balanceId" :key="balance.balanceId" />
    </section>
</template>