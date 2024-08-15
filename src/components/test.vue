<template>
    <h3> Search Box </h3>
    <a-input-search v-model:value="value" placeholder="input search text" enter-button @search="onSearch(value, 1)" />
    <a-table :dataSource="dataSource" :columns="columns" :pagination=flagFalse>
        <template v-slot:bodyCell="{ column, record, index }">
            <template v-if="column.dataIndex === 'cover'">
                <img :src="record.cover" />
            </template>
        </template>
    </a-table>
    <a-pagination :defaultPageSize=defaultPageSize :total="totalCount" v-model:current="currentPage" hideOnSinglePage
        @change="onSearch(value, currentPage)" />
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, reactive } from 'vue';

const value = ref('');
const { proxy } = getCurrentInstance()
const dataSource = ref([]);
const totalCount = ref(0)
const currentPage = ref(1)
const defaultPageSize = ref(10)
const flagFalse = ref(false)

const columns = ref([
    {
        title: 'BookId',
        dataIndex: 'bookId',
        key: 'bookId',
        maxwidth: '100px',
    },
    {
        title: 'Cover',
        dataIndex: 'cover',
        key: 'cover',
        maxwidth: '100px',
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        maxwidth: '150px',
    },
    {
        title: 'Intro',
        dataIndex: 'intro',
        key: 'intro',
    },
    {
        title: 'Author',
        dataIndex: 'author',
        key: 'author',
        maxwidth: '100px',
    },
])

const onSearch = async (value: string, page: number) => {
    dataSource.value = []
    const params = {
        keyword: value,
        maxIdx: page * 10 - 10,
        fragmentSize: 120,
        count: 10
    }
    let res = await proxy.$api.searchGlobal(params)
    console.log(res)
    totalCount.value = res.totalCount
    res = res.books
    res.forEach((item) => {
        let book = reactive({
            bookId: item.bookInfo.bookId,
            title: item.bookInfo.title,
            author: item.bookInfo.author,
            cover: item.bookInfo.cover,
            intro: item.bookInfo.intro,

        })
        dataSource.value.push(book)
    })
}
</script>

<style></style>
