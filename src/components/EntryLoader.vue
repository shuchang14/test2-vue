<template>
</template>

<script>
	 export default {
        props: ['vueName'],
        data() {
            return {}
        },
        created() {
        	console.log("**************************created*************"+this.vueName);
            this.$options.components[this.vueName] = require('@/components' + this.vueName + '.vue')
        },
        render: function (createElement) {
        	console.log("**************************created*************"+this.vueName);
            return createElement(this.vueName)
        }
    }
</script>

<style>
</style>