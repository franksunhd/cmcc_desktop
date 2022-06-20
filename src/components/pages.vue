<template>
    <div class="paging">
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPageNum"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "pages",
        data() {
            return {
                // 当前选中页码
                currentPageNum: this.currentPage
            }
        },
        props: {
            // 当前页
            currentPage: {
                type: Number,
                default: 1
            },
            // 每页数据条数
            pageSize: {
                type: Number,
                default: 1000
            },
            // 总数据条数
            total: {
                type: Number,
                default: 0
            },
        },
        methods: {
            // 改变当前页码
            handleCurrentChange(val) {
                this.currentPageNum = val;
                this.$emit("handleCurrentChangeSub", val);
            },
            // 改变条数
            handleSizeChange(val) {
                this.$emit("handleSizeChangeSub", val);
            }
        }
    }
</script>

<style scoped>
    .paging {
        margin: 20px 0 0;
    }
</style>
