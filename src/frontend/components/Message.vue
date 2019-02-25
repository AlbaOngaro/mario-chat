<template>
    <p>
        <strong>{{ handle }}:</strong> {{ message }}
    </p>
</template>

<script>
    export default {
        props: ['handle','message'],
    }
</script>

<style>

</style>