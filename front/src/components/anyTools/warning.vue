<template>
    <div class="text-center">
        <v-alert
                outlined
                type="warning"
                prominent
                border="left"
        >
            {{text}}
        </v-alert>
    </div>
</template>

<script>
    export default {
        name: "warning",
        data: () => ({
            text: 'Мижозни ва Автомобильни танланг',
        }),
    }
</script>

<style scoped>

</style>