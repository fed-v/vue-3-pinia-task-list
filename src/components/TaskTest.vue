<template>
    <div>
        <p>{{ storeTemplate.getTotal }}</p>
    </div>
</template>

<script>
    import { useStoreTemplate } from '../stores/StoreTemplate'

    export default {
        setup() {
            const storeTemplate = useStoreTemplate();
            return { storeTemplate }
        }
    }

</script>

<style scoped>

</style>