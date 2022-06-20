<template>
    <div class="CapacityToPredict">
        <!--小区容量预测数据表-->
        <div class="predictionBox">
            <p class="titleText">
                <span class="lineBg"></span>
                <span>小区容量预测数据表</span>
            </p>
            <el-table :data="predictionData" v-loading="isLoadingTop" element-loading-text="数据加载中..." border
                      height="600">
                <el-table-column prop="datatime" label="日期" header-align="center" align="center"/>
                <el-table-column prop="cgi" label="CGI" header-align="center" align="center"/>
                <el-table-column prop="avgErab" label="平均E-RAB流量(KB)小区自忙时" header-align="center" align="center"/>
                <el-table-column prop="numRrc" label="有数据传输的RRC数" header-align="center" align="center"/>
                <el-table-column prop="ratePusch" label="上行利用率PUSCH" header-align="center" align="center"/>
                <el-table-column prop="ratePdsch" label="下行利用率PDSCH" header-align="center" align="center"/>
                <el-table-column prop="ratePdcch" label="下行利用率PDCCH" header-align="center" align="center"/>
                <el-table-column prop="upData" label="最大上行流量(GB)" header-align="center" align="center"/>
                <el-table-column prop="downData" label="最大下行流量(GB)" header-align="center" align="center"/>
            </el-table>
            <!--分页-->
            <pages
                :total="predictOptions.total"
                :currentPage="predictOptions.currentPage"
                :page-size="predictOptions.pageSize"
                @handleSizeChangeSub="handleSizeChangeSubPredict"
                @handleCurrentChangeSub="handleCurrentChangePredict"/>
        </div>
        <hr/>
        <!--小区分担流量数据表-->
        <div>
            <p class="titleText">
                <span class="lineBg"></span>
                <span>小区分担流量数据表</span>
            </p>
            <el-table :data="trafficDataTable" v-loading="isLoadingTraffic" element-loading-text="数据加载中..." border
                      height="600">
                <el-table-column prop="enbid" label="基站标识" header-align="center" align="center"/>
                <el-table-column prop="sector" label="扇区标识" header-align="center" align="center"/>
                <el-table-column label="源小区" header-align="center" align="center">
                    <el-table-column prop="eci1" label="ECI" header-align="center" align="center"/>
                    <el-table-column prop="workFrequencyBand1" label="频点" header-align="center" align="center"/>
                    <el-table-column prop="carrier1" label="等效载波数" header-align="center" align="center"/>
                </el-table-column>
                <el-table-column label="分担小区" header-align="center" align="center">
                    <el-table-column prop="eci2" label="ECI" header-align="center" align="center"/>
                    <el-table-column prop="workFrequencyBand2" label="频点" header-align="center" align="center"/>
                    <el-table-column prop="shareRation" label="分担比例" header-align="center" align="center"/>
                    <el-table-column prop="shareCarrier" label="分担等效载波数" header-align="center" align="center"/>
                </el-table-column>
            </el-table>
            <!--分页-->
            <pages
                :total="trafficOptions.total"
                :currentPage="trafficOptions.currentPage"
                :page-size="trafficOptions.pageSize"
                @handleSizeChangeSub="handleSizeChangeSubTraffic"
                @handleCurrentChangeSub="handleCurrentChangeTraffic"/>
        </div>
        <hr/>
        <!--扇区扩容方案列表-->
        <div class="expansionPlanListBox">
            <p class="titleText">
                <span class="lineBg"></span>
                <span>扇区扩容方案列表</span>
            </p>
            <el-table :data="expansionPlanList" v-loading="isLoadingBottom" element-loading-text="数据加载中..." border
                      height="600">
                <el-table-column label="工参数据" header-align="center" align="center">
                    <el-table-column prop="enodebName" label="基站标识" header-align="center" align="center"/>
                    <el-table-column prop="cellName" label="基站名" header-align="center" align="center"/>
                    <el-table-column prop="sector" label="扇区ID" header-align="center" align="center"/>
                    <el-table-column prop="coverageType" label="基站类型" header-align="center" align="center"/>
                    <el-table-column prop="workFrequencyBand" label="原扇区结构" header-align="center" align="center"/>
                    <el-table-column prop="newWorkFrequencyBand" label="退频后扇区结构" header-align="center" align="center"/>
                </el-table-column>
                <el-table-column label="载波计算" header-align="center" align="center">
                    <el-table-column prop="carrier" label="存量载波" header-align="center" align="center"/>
                    <el-table-column prop="needCarrier" label="载波需求" header-align="center" align="center"/>
                    <el-table-column prop="gap" label="载波GAP" header-align="center" align="center"/>
                </el-table-column>
            </el-table>
            <!--分页-->
            <pages
                :total="expansionOptions.total"
                :currentPage="expansionOptions.currentPage"
                :page-size="expansionOptions.pageSize"
                @handleSizeChangeSub="handleSizeChangeSubExpansion"
                @handleCurrentChangeSub="handleCurrentChangeExpansion"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CapacityToPredict",
        data() {
            return {
                // 小区容量预测数据表数据
                predictionData: [],
                // 小区容量预测分页
                predictOptions: {
                    total: 0, // 总条数
                    currentPage: 1, // 当前页码
                    pageSize: 1000 // 显示条数
                },
                //小区分担流量数据表数据
                trafficDataTable: [],
                // 小区分担流量分页
                trafficOptions: {
                    total: 0, // 总条数
                    currentPage: 1, // 当前页码
                    pageSize: 1000 // 显示条数
                },
                // 扇区扩容方案列表数据
                expansionPlanList: [],
                // 扇区扩容方案分页
                expansionOptions: {
                    total: 0, // 总条数
                    currentPage: 1, // 当前页码
                    pageSize: 1000 // 显示条数
                },
                // loading小区容量预测
                isLoadingTop: false,
                // loading 扩容方案
                isLoadingBottom: false,
                // loading traffic
                isLoadingTraffic: false,
            }
        },
        methods: {
            // 容量预测
            getData() {
                let _t = this;
                _t.isLoadingTop = true;
                _t.$api.post('/param/getforecast', {
                    page: _t.predictOptions.currentPage, // 当前页
                    limit: _t.predictOptions.pageSize, // 每页显示条数
                }, function (res) {
                    _t.isLoadingTop = false;
                    if (res) {
                        _t.predictionData = res.content !== null ? res.content : [];
                        _t.predictOptions.total = res.total !== null ? res.total : 0;
                    } else {
                        _t.predictionData = [];
                        _t.predictOptions.total = 0;
                        _t.$message.error('表格数据查询失败!');
                    }
                })
            },
            // 改变当前页码
            handleCurrentChangePredict(val) {
                var _t = this;
                _t.predictOptions.currentPage = val;
                _t.getData();
            },
            // 改变每页显示条数
            handleSizeChangeSubPredict(val) {
                var _t = this;
                _t.predictOptions.pageSize = val;
                _t.getData();
            },
            // 小区分担流量数据表数据
            getTrafficData() {
                var _t = this;
                _t.isLoadingTraffic = true;
                _t.$api.post('/param/getcapacity', {
                    page: _t.trafficOptions.currentPage, // 当前页
                    limit: _t.trafficOptions.pageSize, // 每页显示条数
                }, function (res) {
                    _t.isLoadingTraffic = false;
                    if (res) {
                        _t.trafficDataTable = res.content !== null ? res.content : [];
                        _t.trafficOptions.total = res.total !== null ? res.total : 0;
                    } else {
                        _t.trafficDataTable = [];
                        _t.trafficOptions.total = 0;
                        _t.$message.error('表格数据查询失败!');
                    }
                });
            },
            // 改变当前页码
            handleCurrentChangeTraffic(val) {
                var _t = this;
                _t.trafficOptions.currentPage = val;
                _t.getTrafficData();
            },
            // 改变每页显示条数
            handleSizeChangeSubTraffic(val) {
                var _t = this;
                _t.trafficOptions.pageSize = val;
                _t.getTrafficData();
            },
            // 扇区扩容方案列表数据
            getDataThree() {
                let _t = this;
                _t.isLoadingBottom = true;
                _t.$api.post('/forecast/getSectorExpansionPlanForm', {
                    page: _t.expansionOptions.currentPage, // 当前页
                    limit: _t.expansionOptions.pageSize, // 每页显示条数
                }, function (res) {
                    _t.isLoadingBottom = false;
                    if (res) {
                        _t.expansionPlanList = res.content !== null ? res.content : [];
                        _t.expansionOptions.total = res.total !== null ? res.total : 0;
                    } else {
                        _t.expansionPlanList = [];
                        _t.expansionOptions.total = 0;
                        _t.$message.error('表格数据查询失败!');
                    }
                })
            },
            // 改变当前页码
            handleCurrentChangeExpansion(val) {
                var _t = this;
                _t.expansionOptions.currentPage = val;
                _t.getDataThree();
            },
            // 改变每页显示条数
            handleSizeChangeSubExpansion(val) {
                var _t = this;
                _t.expansionOptions.pageSize = val;
                _t.getDataThree();
            },
        },
        created() {
            let _t = this;
            // 获取容量预测
            _t.getData();
            // 获取小区分担
            _t.getTrafficData();
            // 扇区扩容方案列表数据
            _t.getDataThree();
        }
    }
</script>

<style scoped>

</style>
