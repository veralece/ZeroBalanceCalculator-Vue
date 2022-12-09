<script setup lang="ts">
import { computed } from 'vue';
import { IBalance } from '../interfaces/ZeroBalanceNamespace';
import BalanceView from './BalanceView.vue';
interface IBalancesProps {
    balanceType: string;
    balances: IBalance[];
    methods: {
        ADD: string,
        UPDATE: string,
        DELETE: string
    };
    modifyBalance: (key: string, balance: IBalance, method: string) => void;
}

const props = defineProps<IBalancesProps>();

const balanceTypeName = computed(() => {
    return `${props.balanceType.toUpperCase()[0]}${props.balanceType.substring(1, props.balanceType.length)}`
});

</script>
<template>
    <section>
        <h1>{{ balanceTypeName }}</h1>
        <BalanceView v-for="balance in props.balances" :modify-balance="props.modifyBalance"
            :balance-type="props.balanceType" :methods="props.methods" :name="balance.name" :amount="balance.amount"
            :balance-id="balance.balanceId" :key="balance.balanceId" />
    </section>
</template>