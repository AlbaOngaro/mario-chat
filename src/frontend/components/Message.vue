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

<style lang="scss" scoped>
    p {
        padding: 14px 0px;
        margin: 0 20px;
        border-bottom: 1px solid #e9e9e9;
        color: #555;

        strong{
            color: #575ed8;
        }
    }
</style>