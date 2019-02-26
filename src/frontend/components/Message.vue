<template>
    <div :class="'message -' + position">
        <div :class="'nes-balloon from-' + position + (position === 'right' ? ' is-primary' : '')">
            <p>{{ message }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['handle','message', 'position'],
    }
</script>

<style lang="scss" scoped>
    
</style>