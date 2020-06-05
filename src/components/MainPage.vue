<template>
    <div>
        <spinner v-if="showLoader"></spinner>
        <table>
            <thead>
            <tr>
                <td>
                    <sorting-component
                            @sorting="sortByName"
                    />
                </td>
                <td colspan="3">
                    <label for="search">Search</label>
                    <input
                            id="search"
                            type="text"
                            v-model="search"
                            @input="getShowsFromApi"
                    />
                </td>
                <td>
                    <sorting-component
                            @sorting="sortByRating"
                    />
                </td>
            </tr>
            <tr>
                <th>Show name</th>
                <th>Language</th>
                <th>Genre</th>
                <th>The status of the show</th>
                <th>Rating</th>
            </tr>
            </thead>
            <tbody v-if="shows.length !== 0">
            <tr v-for="show in shows" :key="show.id">
                <td>{{show.name}}</td>
                <td>{{show.language}}</td>
                <td><span>{{show.genres.join(', ')}}</span></td>
                <td>{{show.status}}</td>
                <td>{{show.rating.average}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import {getShows} from "@/api/mainApi"
    import SortingComponent from "@/components/SortingComponent";
    import Spinner from 'vue-loading-spinner/src/components/CubeShadow'

    export default {
        name: "MainPage",
        components:{SortingComponent, Spinner},
        data(){
          return {
              search:'girls',
              shows: [],
              showLoader: false
            }
        },
        mounted() {
          this.getShowsFromApi();
        },
        methods: {
            getShowsFromApi(){
                let that = this;
                that.showLoader = true;
                getShows(that.search).then(response => {
                    that.shows = response.data.map(item => item.show);
                    that.showLoader = false;
                })
            },
            sortByRating(type){
                let sortedShows = this.shows.filter(item => item.rating.average !== null);

                if(type === 'ASC'){
                    sortedShows.sort((a, b) => a.rating.average - b.rating.average);
                } else {
                    sortedShows.sort((a, b) => b.rating.average - a.rating.average);
                }

                this.shows = sortedShows.concat(this.shows.filter(item => item.rating.average === null));
                debugger
            },
            sortByName(type){
                if(type === 'ASC'){
                    this.shows.sort((a, b) => {return a.name > b.name ? 1 : -1});
                } else {
                    this.shows.sort((a, b) => {return a.name < b.name ? 1 : -1});
                }
            },
        }
    }
</script>

<style scoped>
    table{
        border: 1px solid black;
        border-collapse: collapse
    }
    td, th {
        border: 1px solid black;
        padding: 5px;
    }
    label {
        margin-right: 5px;
    }
</style>