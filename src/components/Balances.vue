<script setup lang="ts">
import { IBalance } from '../interfaces/ZeroBalanceNamespace';

interface IBalanceProps {
    name: string;
    balances: IBalance[];
    modifyBalance: (key: string, balance: IBalance, method: string) => void;
    error?: string | null;
}

const props = defineProps<IBalanceProps>();

</script>
<template>
    <section>
        <p v-if="props.error">{{ props.error }}</p>

    </section>
</template>