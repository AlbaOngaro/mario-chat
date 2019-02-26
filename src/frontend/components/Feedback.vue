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

<style lang="scss" scoped>
     p{
        color: #aaa;
        padding: 14px 0px;
        margin: 0 20px;
        order: 9999;
     }
</style>