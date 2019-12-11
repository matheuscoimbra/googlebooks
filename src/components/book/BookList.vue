<template>
    <div>
        <v-row>
            <v-col cols="12">
                <search-input-field @search="doSearch" />
            </v-col>
        </v-row>

        <v-row
            v-if="!bookList.length"
            justify="center"
        >
            <v-col
                cols="12"
                md="4"
                class="text-center"
            >
                <p class="overline">
                    Digite algo para iniciar a pesquisa, ou pesquisa alguma outra coisa.
                </p>
            </v-col>
        </v-row>

        <loading :condition="searchOnGoing">
            <v-row>
                <v-col
                    v-for="(book, i) in bookList"
                    :key="i"
                    cols="3"
                >
                    <book-item :book="book" />
                </v-col>
                <infinite-loading @infinite="infiniteHandler" />
            </v-row>
        </loading>
    </div>
</template>

<script>
    import InfiniteLoading from 'vue-infinite-loading';
    import api from '../api/api';
    import Loading from '../loading/Loading.vue';
    import SearchInputField from '../search/SearchInputField.vue';
    import BookItem from './BookItem.vue';

    export default {
        name: 'BookList',
        components: {
            Loading, SearchInputField, BookItem, InfiniteLoading,
        },
        mixins: [api],
        data() {
            return {
                bookList: [],
                searchOnGoing: false,
                page: 0,
            };
        },
        methods: {
            infiniteHandler($state) {
                const search = this.$store.getters.getSearch;
                this.get(`/volumes?q=${search}`, {
                    params: {
                        startIndex: this.page,
                    },
                }).then(({ data }) => {
                    if (data.items.length) {
                        this.page += 1;
                        this.bookList.push(...data.items);
                        $state.loaded();
                    } else {
                        $state.complete();
                    }
                });
            },
            doSearch(textSearch) {
                if (textSearch) {
                    this.searchOnGoing = true;

                    this.get(`/volumes?q=${textSearch}`).then((response) => {
                        this.bookList = response.data.items;
                        this.searchOnGoing = false;
                    }).catch(() => {
                        this.searchOnGoing = false;
                    });
                } else {
                    this.bookList = [];
                }
            },
        },
    };
</script>

<style scoped>

</style>
