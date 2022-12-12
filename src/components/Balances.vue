<script setup lang="ts">
import { computed, ComputedRef } from 'vue';
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

const balanceTotal = computed(() => {
    let total: number = 0;
    props.balances.forEach(b => { if (b.amount) total += b.amount });
    return total;
});
function handleChange(key: string, method: string, balanceForm: null, balance: IBalance) {
    emit('handleChange', key, method, balanceForm, balance);
}

const props = defineProps<IBalancesProps>();

const balanceTypeName = computed(() => {
    return `${props.balanceType.charAt(0).toUpperCase()}${props.balanceType.slice(1)}`;
});
const hasBalances = computed(() => {
    return props.balances.length > 0;
});
</script>
<template>
    <section class="balance-viewer grid">
        <h3>{{ balanceTypeName }}</h3>
        <section class="balances">
            <BalanceView @handle-change="handleChange" :hidden="!hasBalances" v-for="balance in props.balances"
                :balance-type="props.balanceType" :methods="props.methods" :name="balance.name" :amount="balance.amount"
                :balance-id="balance.balanceId" :key="balance.balanceId" />
        </section>
        <section :hidden="!hasBalances" class="balance-total flex">
            <h4>{{ balanceTypeName }} Total</h4>
            <p>${{ balanceTotal }}</p>
        </section>
    </section>
</template>