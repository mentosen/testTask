<template>
    <div>
        <label for="sortAsc">Sorting Asc</label>
        <input
                id="sortAsc"
                type="radio"
                :value="'ASC'"
                v-model="ratingSortingType"
                :checked="ratingSortingType === 'ASC'"
                @change="sorting"
        />
        <label for="sortDesc">Desc</label>
        <input
                id="sortDesc"
                type="radio"
                :value="'DESC'"
                v-model="ratingSortingType"
                :checked="ratingSortingType === 'DESC'"
                @change="sorting"
        />
    </div>
</template>

<script>
    export default {
        name: "SortingComponent",
        data() {
            return {
                ratingSortingType: ''
            }
        },
        methods:{
            sorting(){
                this.$emit('sorting', this.ratingSortingType);
            }
        }
    }
</script>

<style scoped>

</style>