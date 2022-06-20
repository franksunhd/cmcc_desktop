<template>
    <div class="dataSettings_box" :style="{'background': '#fff', 'padding': '10px'}">
        <p class="titleText">
            <span class="lineBg"></span>
            <span>小区与扇区关系</span>
        </p>
        <el-button type="primary" @click="downLoad">下载</el-button>
        <hr>
        <div class="wokeDataTable">
            <el-table :data="data" v-loading="loading" element-loading-text="数据加载中..." border
                        height="600" min-width="100">
                <el-table-column prop="enbid" label="基站ID" header-align="center" align="center" :render-header="labelHead"/>
                <el-table-column prop="cell_id" label="小区ID" header-align="center" align="center" :render-header="labelHead"/>
                <el-table-column prop="eci" label="ECI" header-align="center" align="center" />
                <el-table-column prop="sector" label="扇区ID" header-align="center" align="center" :render-header="labelHead"/>
                <el-table-column prop="work_frenquency_band" label="频点" header-align="center" align="center" :render-header="labelHead"/>
                <el-table-column prop="move_workz_frenquency_band" label="推荐移频后频点" header-align="center" align="center" :render-header="labelHead"/>
                <el-table-column prop="work_frenquency_band_sector" label="所属扇区当前频率组网结构" header-align="center" align="center" :render-header="labelHead"/>
                <el-table-column prop="move_workz_frenquency_band_sector" label="所属扇区移频后推荐组网结构" header-align="center" align="center" :render-header="labelHead"/>
            </el-table>
            <!--分页-->
            <pages
                :total="total"
                :currentPage="currentPage"
                :page-size="500"
                @handleSizeChangeSub="handleSizeChangeSub"
                @handleCurrentChangeSub="handleCurrentChange"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "dataSettings",
        data() {
            return {
                currentPage: 1,//选中页
                pageSize: 10,//每页条数
                total: 0,//总条数
                data: [],//table数据
                loading: false,//加载标识
            }
        },
        mounted() {
          this.getData();
        },
        methods: {
            // table数据获取
            getData() {
                let _t = this;
                _t.loading = true;
                _t.$api.post('/sectorCell/getPage', {
                    page: _t.currentPage, // 当前页
                    limit: 500, // 每页显示条数
                }, function (res) {
                    _t.loading = false;
                    if (res) {
                        _t.data = res.infos !== null ? res.infos : [];
                        _t.total = res.nums !== null ? res.nums : 0;
                    } else {
                        _t.total = 0;
                        _t.data = [];
                        _t.$message.error('表格数据查询失败!');
                    }
                })
            },
            // 改变当前页码
            handleCurrentChange(val) {
                var _t = this;
                _t.currentPage = val;
                _t.getData();
            },
            // 改变每页显示条数
            handleSizeChangeSub(val) {
                var _t = this;
                _t.pageSize = val;
                _t.getData();
            },
            //表头文字不换行
            labelHead(h,{column,index}){
                    let l = column.label.length
                    let f = 16 //每个字大小，其实是每个字的比例值，大概会比字体大小差不多大一点，
                   column.minWidth = f*l //字大小乘个数即长度 ,注意不要加px像素，这里minWidth只是一个比例值，不是真正的长度
　　　　　　　　　　　　//然后将列标题放在一个div块中，注意块的宽度一定要100%，否则表格显示不完全
                  return h('div',{class:'table-head',style:{width:'100%'}},[column.label])
     
           },
           //excel下载
           downLoad() {
               var _t = this;
               window.location.href = _t.$api.root() + '/sectorCell/export';
               this.$message({
                 message: '正在下载excel',
                 type: 'success'
               });
                // _t.$api.get(_t.$api.root() + '/sectorCell/export', {}, function (res) {
                //     if (res === true) {
                //         var fileName = _t.$api.root() + 'log/' + flag;
                //         window.location.href = fileName;
                //     } else {
                //         _t.$confirm('没有找到excel!', '温馨提示', {
                //             confirmButtonText: '确定',
                //             cancelButtonText: '取消',
                //             type: 'warning'
                //         }).then(() => {
                //             return false;
                //         }).catch(() => {
                //             return false;
                //         });
                //     }
                // });
           }
        }
    }
</script>

<style scoped>
.table-head{
    font-size:14px!important;
  }
</style>
