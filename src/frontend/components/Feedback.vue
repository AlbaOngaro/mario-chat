<template>
    <p v-show="visible" class="feedback">
        <em>{{ handle }} is writing</em>
    </p>
</template>

<script>
    export default {
        props: {
            handle: {
                type: String    
            },
            visible: {
                type: Boolean,
                default: false
            }
        },
    }
</script>

<style>

</style>