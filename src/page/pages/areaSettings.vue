<template>
    <div class="areaSetting_Box">
        <!--退频区域确定-->
        <div>
            <p class="titleText">
                <span class="lineBg"></span>
                <span>退频区域确定</span>
                
            </p>
            <div v-loading="isLoading" element-loading-text="数据加载中" id="container"></div>
        </div>
<!--        <hr>-->
        <!--扇区与小区对应关系-->
        <div v-if="false">
            <p class="titleText">
                <span class="lineBg"></span>
                <span>扇区与小区对应关系</span>
            </p>
            <el-table :data="sectorData" v-loading="isLoadingTable" element-loading-text="数据加载中..." border height="600">
                <el-table-column prop="enodebName" label="基站名称" header-align="center" align="center"/>
                <el-table-column prop="sector" label="扇区标识" header-align="center" align="center"/>
                <el-table-column prop="enbid" label="基站标识" header-align="center" align="center"/>
                <el-table-column prop="cellId" label="小区标识" header-align="center" align="center"/>
                <el-table-column prop="siteType" label="射频设备信号" header-align="center" align="center"/>
                <el-table-column prop="workFrequencyBand" label="频点" header-align="center" align="center"/>
                <el-table-column prop="vendor" label="设备厂家" header-align="center" align="center"/>
                <el-table-column prop="supportCarriers" label="支持最大载波数(等效TD-LTE 20M)" header-align="center"
                                 align="center"/>
                <el-table-column prop="usedCarriers" label="已使用载波数(等效到TDD 20M载波)" header-align="center" align="center"/>
                <el-table-column prop="softExpandedCarriers" label="可软扩载波数" header-align="center" align="center"/>
            </el-table>
            <!--分页-->
            <pages
                :total="sectorOptions.total"
                :currentPage="sectorOptions.currentPage"
                :page-size="sectorOptions.pageSize"
                @handleSizeChangeSub="handleSizeChangeSubSector"
                @handleCurrentChangeSub="handleCurrentChangeSector"/>
        </div>
<!--        <hr>-->
        <!--扇区与小区初步退频方案-->
        <div v-if="false">
            <p class="titleText">
                <span class="lineBg"></span>
                <span>扇区与小区初步退频方案</span>
            </p>
            <el-table :data="frequencyTableData" v-loading="isLoadingFrequency" element-loading-text="数据加载中..." border
                      height="600">
                <el-table-column prop="enbid" label="基站标识" header-align="center" align="center"/>
                <el-table-column prop="sector" label="扇区标识" header-align="center" align="center"/>
                <el-table-column prop="workFrequencyBand" label="当前频点" header-align="center" align="center"/>
                <el-table-column prop="currentCarrier" label="当前等效载波数" header-align="center" align="center"/>
                <el-table-column prop="moveWorkFrequencyBand" label="移频后频点" header-align="center" align="center"/>
                <el-table-column prop="moveCarrier" label="移频后等效载波数" header-align="center" align="center"/>
                <el-table-column prop="subtractionCarrier" label="载波差值" header-align="center" align="center"/>
            </el-table>
            <!--分页-->
            <pages
                :total="frequencyOptions.total"
                :currentPage="frequencyOptions.currentPage"
                :page-size="frequencyOptions.pageSize"
                @handleSizeChangeSub="handleSizeChangeSubFrequency"
                @handleCurrentChangeSub="handleCurrentChangeFrequency"/>
        </div>
<!--        <hr>-->
        <!--参数继承-->
        <div v-if="false">
            <p class="titleText">
                <span class="lineBg"></span>
                <span>参数继承</span>
            </p>
            <el-table :data="inheritData" v-loading="isLoadingInherit" element-loading-text="数据加载中..." border
                      height="600">
                <el-table-column prop="enbid" label="基站标识" header-align="center" align="center"/>
                <el-table-column prop="cellName" label="基站名称" header-align="center" align="center"/>
                <el-table-column prop="sector" label="扇区标识" header-align="center" align="center"/>
                <el-table-column prop="cellId" label="小区标识" header-align="center" align="center"/>
                <el-table-column prop="workFrequencyBand" label="当前频点" header-align="center" align="center"/>
                <el-table-column prop="currentCarrier" label="当前等效载波数" header-align="center" align="center"/>
                <el-table-column prop="newEnbid" label="新基站标识" header-align="center" align="center"/>
                <el-table-column prop="newCellId" label="新小区标识" header-align="center" align="center"/>
                <el-table-column prop="moveWorkFrequencyBand" label="移频后频点" header-align="center" align="center"/>
                <el-table-column prop="tac" label="跟踪区域码" header-align="center" align="center"/>
                <el-table-column prop="band" label="上下行子帧配比" header-align="center" align="center"/>
                <el-table-column prop="fband" label="特殊子帧配比" header-align="center" align="center"/>
                <el-table-column prop="threshold" label="门限" header-align="center" align="center"/>
                <el-table-column prop="power" label="功率" header-align="center" align="center"/>
                <el-table-column prop="neighborRelation" label="邻区关系" header-align="center" align="center"/>
            </el-table>
            <!--分页-->
            <pages
                :total="paramsOptions.total"
                :currentPage="paramsOptions.currentPage"
                :page-size="paramsOptions.pageSize"
                @handleSizeChangeSub="handleSizeChangeSubParams"
                @handleCurrentChangeSub="handleCurrentChangeParams"/>
        </div>
        <!--小区工参抽屉弹出层-->
        <el-drawer
            title="基站信息"
            append-to-body
            :visible.sync="drawerVisible"
            direction="rtl"
            :before-close="handleClose">
            <div class="padRight20">
                <el-form :model="formItem" label-width="150px">
                    <el-form-item label="E-NODEB">
                        <el-input v-model="formItem.enodebName" disabled/>
                    </el-form-item>
                    <el-form-item label="ENB_ID">
                        <el-input v-model="formItem.enbid" disabled/>
                    </el-form-item>
                    <el-form-item label="经度">
                        <el-input v-model="formItem.longitude" disabled/>
                    </el-form-item>
                    <el-form-item label="纬度">
                        <el-input v-model="formItem.latitude" disabled/>
                    </el-form-item>
                    <el-form-item label="覆盖类型">
                        <el-input v-model="formItem.coverageType" disabled/>
                    </el-form-item>
                    <el-form-item label="覆盖场景">
                        <el-input v-model="formItem.coverScene" disabled/>
                    </el-form-item>
                    <el-form-item label="省份">
                        <el-input v-model="formItem.provinceName" disabled/>
                    </el-form-item>
                    <el-form-item label="地市">
                        <el-input v-model="formItem.cityName" disabled/>
                    </el-form-item>
                    <el-form-item label="区县">
                        <el-input v-model="formItem.districtandcounty" disabled/>
                    </el-form-item>
                    <el-form-item label="厂家名称">
                        <el-input v-model="formItem.vendor" disabled/>
                    </el-form-item>
                    <el-form-item label="是否是核心城区">
                        <el-input v-model="formItem.isCoreArea" disabled/>
                    </el-form-item>
                </el-form>
            </div>
        </el-drawer>
    </div>
</template>

<script>

    export default {
        name: "areaSettings",
        data() {
            return {
                // loading地图
                isLoading: false,
                // loading表格
                isLoadingTable: false,
                // loading初步
                isLoadingFrequency: false,
                // loading 参数继承
                isLoadingInherit: false,
                // 扇区与小区对应关系表格
                sectorData: [],
                // 小区工参分页
                sectorOptions: {
                    total: 0, // 总条数
                    currentPage: 1, // 当前页码
                    pageSize: 1000 // 显示条数
                },
                // 扇区-小区级初步退频方案
                frequencyTableData: [],
                // 初步退频分页
                frequencyOptions: {
                    total: 0, // 总条数
                    currentPage: 1, // 当前页码
                    pageSize: 1000 // 显示条数
                },
                // 参数继承表格
                inheritData: [],
                // 参数继承分页
                paramsOptions: {
                    total: 0, // 总条数
                    currentPage: 1, // 当前页码
                    pageSize: 1000 // 显示条数
                },
                // 抽屉蒙版
                drawerVisible: false,
                // 详情
                formItem: {
                    eci: '', //
                    cgi: '', // CGI
                    enodebName: '', // 所属E-NODEB
                    cellName: '', // 小区中文名
                    tac: '', // 跟踪区码
                    localCellId: '', // 本地小区标识
                    enbid: '', // enbId
                    longitude: '', // 经度
                    latitude: '', // 纬度
                    coverageType: '', // 覆盖类型
                    azimuth: '', // 方位角
                    antennaHeight: '', // 天线挂高
                    totalDownTiltAngle: '', // 总下倾角
                    carrierFfrequencyNum: '', // 中心载频的信道号
                    workFrequencyBand: '', // 工作频段
                    pci: '', // 物理小区识别码
                    maxTransmitPower: '', // 最大发射功率
                    coverScene: '', // 覆盖场景
                    provinceName: '', // 省份
                    cityName: '', // 地市
                    districtandcounty: '', // 区县
                    vendor: '', // 厂家名称
                    electronicTiltAngle: '', // 电子下倾角
                    mechanicalTiltAngle: '', // 机械下倾角
                    isCoreArea: '', // 是否是核心城区
                    support3DMimo: '', // 是否支持3D-MIMO
                    siteType: '', // 射频设备型号
                    supportCarriers: '', // 支持最大载波数（等效到TDD 20M载波）
                    usedCarriers: '', // 已使用载波数（等效到TDD 20M载波）
                    softExpandedCarriers: '', // 可软扩载波数
                }
            }
        },
        methods: {
            // 获取绘制地图数据
            getMap() {
                var _t = this;
                // 数据懒加载蒙版 显示
                _t.isLoading = true;
                _t.$api.post('/region/show', {}, function (res) {
                    if (res !== undefined && res !== null) {
                        var pathIn = []; // 内边数组
                        var pathOut = []; // 外扩数组
                        var pathPoints = []; // 描点数组
                        // AMap是高德地图的构造函数，这里.Map是创建地图，.Marker是创建坐标点
                        var map = new AMap.Map('container', {//'container'是对应页面盒子的id
                            resizeEnable: true, //自适应大小
                            zoom: 8, //初始视窗
                        });
                        // 清除地图上所有添加的覆盖物
                        map.clearMap();

                        //  min:内边点集合
                        if (res.min !== undefined && res.min !== null && res.min.length !== 0) {
                            res.min.forEach((item) => {
                                var minArr = new Array();
                                minArr[0] = item.x_longitude;
                                minArr[1] = item.y_latitude;
                                pathIn.push(minArr);
                            });
                        }
                        // max:外扩点集合
                        if (res.max !== undefined && res.max !== null && res.max.length !== 0) {
                            res.max.forEach((item) => {
                                var maxArr = new Array();
                                maxArr[0] = item.x_longitude;
                                maxArr[1] = item.y_latitude;
                                pathOut.push(maxArr);
                            });
                        }
                        // points: 全部点集合
                        if (res.points !== undefined && res.points !== null && res.points.length !== 0) {
                            res.points.forEach((item) => {
                                var obj = new Object();
                                var pointsArr = new Array();
                                pointsArr[0] = item.x_longitude;
                                pointsArr[1] = item.y_latitude;
                                obj.points = pointsArr;
                                obj.eci = item.eci ? item.eci : null;
                                pathPoints.push(obj);
                            });
                        }

                        var polygonIn = new AMap.Polygon({
                            path: pathIn, // 经纬度
                            strokeColor: "#FF33FF", // 描边颜色
                            strokeWeight: 0,
                            strokeOpacity: 0.2,
                            fillOpacity: 0.4,
                            fillColor: "#1791fc",
                            zIndex: 50,
                        });

                        var polygonOut = new AMap.Polygon({
                            path: pathOut,
                            strokeColor: "#f22",
                            strokeWeight: 0,
                            strokeOpacity: 0.2,
                            fillOpacity: 0.4,
                            fillColor: '#f22',
                            zIndex: 49,
                        });
                        map.add(polygonIn);
                        map.add(polygonOut);
                        // 缩放地图到合适的视野级别
                        map.setFitView([polygonIn]);
                        pathPoints.forEach((item) => {
                            // 实例化点标记
                            var marker = new AMap.Marker({
                                icon: new AMap.Icon({
                                    image: require('../../assets/img/map/points.png'),
                                    size: new AMap.Size(6, 6),  //图标大小
                                    imageSize: new AMap.Size(6, 6)
                                }),
                                position: item.points, // 位置 经纬度
                                offset: new AMap.Pixel(-3, -3), // 偏移位置
                            });
                            marker.setMap(map); // 绘图
                            marker.off('click'); // 清除点击事件
                            // 重新注册点击事件
                            marker.on('click', function () {
                                _t.getAreaData(item);
                            });
                        });
                        // 地图加载完成 隐藏显示的加载蒙版
                        map.on("complete", function () {
                            _t.isLoading = false;
                        });
                    }
                });
            },
            // 扇区与小区对应关系
            getTableData() {
                let _t = this;
                _t.isLoadingTable = true;
                _t.$api.post('/region/getSectorToCellCorrespondenceForm', {
                    page: _t.sectorOptions.currentPage, // 当前页
                    limit: _t.sectorOptions.pageSize, // 每页显示条数
                }, function (res) {
                    _t.isLoadingTable = false;
                    if (res) {
                        _t.sectorData = res.content !== null ? res.content : [];
                        _t.sectorOptions.total = res.total !== null ? res.total : 0;
                    } else {
                        _t.sectorData = [];
                        _t.sectorOptions.total = 0;
                        _t.$message.error('表格数据查询失败!');
                    }
                })
            },
            // 改变当前页码
            handleCurrentChangeSector(val) {
                var _t = this;
                _t.sectorOptions.currentPage = val;
                _t.getTableData();
            },
            // 改变每页显示条数
            handleSizeChangeSubSector(val) {
                var _t = this;
                _t.sectorOptions.pageSize = val;
                _t.getTableData();
            },
            // 点击地图小区 调取该小区工参数据
            getAreaData(item) {
                var _t = this;
                _t.drawerVisible = true;
                _t.$api.post('/region/getLteInfoByEci', {
                    eci: item.eci
                }, function (res) {
                    if (res !== null) {
                        _t.formItem.eci = res.eci; // eci
                        _t.formItem.cgi = res.cgi; // CGI
                        _t.formItem.enodebName = res.enodebName; // 所属E-NODEB
                        _t.formItem.cellName = res.cellName; // 小区中文名
                        _t.formItem.tac = res.tac; // 跟踪区码
                        _t.formItem.localCellId = res.localCellId; // 本地小区标识
                        _t.formItem.enbid = res.enbid; // enbId
                        _t.formItem.longitude = res.longitude; // 经度
                        _t.formItem.latitude = res.latitude; // 纬度
                        _t.formItem.coverageType = res.coverageType; // 覆盖类型
                        _t.formItem.azimuth = res.azimuth; // 方位角
                        _t.formItem.antennaHeight = res.antennaHeight; // 天线挂高
                        _t.formItem.totalDownTiltAngle = res.totalDownTiltAngle; // 总下倾角
                        _t.formItem.carrierFfrequencyNum = res.carrierFfrequencyNum; // 中心载频的信道号
                        _t.formItem.workFrequencyBand = res.workFrequencyBand; // 工作频段
                        _t.formItem.pci = res.pci; // 物理小区识别码
                        _t.formItem.maxTransmitPower = res.maxTransmitPower; // 最大发射功率
                        _t.formItem.coverScene = res.coverScene; // 覆盖场景
                        _t.formItem.provinceName = res.provinceName; // 省份
                        _t.formItem.cityName = res.cityName; // 地市
                        _t.formItem.districtandcounty = res.districtandcounty; // 区县
                        _t.formItem.vendor = res.vendor; // 厂家名称
                        _t.formItem.electronicTiltAngle = res.electronicTiltAngle; // 电子下倾角
                        _t.formItem.mechanicalTiltAngle = res.mechanicalTiltAngle; // 机械下倾角
                        _t.formItem.isCoreArea = res.isCoreArea; // 是否是核心城区
                        _t.formItem.support3DMimo = res.support3DMimo; // 是否支持3D-MIMO
                        _t.formItem.siteType = res.siteType; // 射频设备型号
                        _t.formItem.supportCarriers = res.supportCarriers; // 支持最大载波数（等效到TDD 20M载波）
                        _t.formItem.usedCarriers = res.usedCarriers; // 已使用载波数（等效到TDD 20M载波）
                        _t.formItem.softExpandedCarriers = res.softExpandedCarriers; // 可软扩载波数
                    }
                });
            },
            // 重置小区工参抽屉
            handleClose() {
                var _t = this;
                _t.drawerVisible = false;
                _t.formItem.eci = ''; // eci
                _t.formItem.cgi = ''; // CGI
                _t.formItem.enodebName = ''; // 所属E-NODEB
                _t.formItem.cellName = ''; // 小区中文名
                _t.formItem.tac = ''; // 跟踪区码
                _t.formItem.localCellId = ''; // 本地小区标识
                _t.formItem.enbid = ''; // enbId
                _t.formItem.longitude = ''; // 经度
                _t.formItem.latitude = ''; // 纬度
                _t.formItem.coverageType = ''; // 覆盖类型
                _t.formItem.azimuth = ''; // 方位角
                _t.formItem.antennaHeight = ''; // 天线挂高
                _t.formItem.totalDownTiltAngle = ''; // 总下倾角
                _t.formItem.carrierFfrequencyNum = ''; // 中心载频的信道号
                _t.formItem.workFrequencyBand = ''; // 工作频段
                _t.formItem.pci = ''; // 物理小区识别码
                _t.formItem.maxTransmitPower = ''; // 最大发射功率
                _t.formItem.coverScene = ''; // 覆盖场景
                _t.formItem.provinceName = ''; // 省份
                _t.formItem.cityName = ''; // 地市
                _t.formItem.districtandcounty = ''; // 区县
                _t.formItem.vendor = ''; // 厂家名称
                _t.formItem.electronicTiltAngle = ''; // 电子下倾角
                _t.formItem.mechanicalTiltAngle = ''; // 机械下倾角
                _t.formItem.isCoreArea = ''; // 是否是核心城区
                _t.formItem.support3DMimo = ''; // 是否支持3D-MIMO
                _t.formItem.siteType = ''; // 射频设备型号
                _t.formItem.supportCarriers = ''; // 支持最大载波数（等效到TDD 20M载波）
                _t.formItem.usedCarriers = ''; // 已使用载波数（等效到TDD 20M载波）
                _t.formItem.softExpandedCarriers = ''; // 可软扩载波数
            },
            // 获取 扇区与小区初步退频方案
            getFrequencyData() {
                var _t = this;
                _t.isLoadingFrequency = true;
                _t.$api.post('frequencyshift/get', {
                    page: _t.frequencyOptions.currentPage, // 当前页
                    limit: _t.frequencyOptions.pageSize, // 每页显示条数
                }, function (res) {
                    _t.isLoadingFrequency = false;
                    if (res) {
                        _t.frequencyTableData = res.content !== null ? res.content : [];
                        _t.frequencyOptions.total = res.total !== null ? res.total : 0;
                    } else {
                        _t.frequencyTableData = [];
                        _t.frequencyOptions.total = 0;
                        _t.$message.error('表格数据查询失败!');
                    }
                });
            },
            // 改变当前页码
            handleCurrentChangeFrequency(val) {
                var _t = this;
                _t.frequencyOptions.currentPage = val;
                _t.getFrequencyData();
            },
            // 改变每页显示条数
            handleSizeChangeSubFrequency(val) {
                var _t = this;
                _t.frequencyOptions.pageSize = val;
                _t.getFrequencyData();
            },
            // 获取 参数继承数据
            getInheritData() {
                var _t = this;
                _t.isLoadingInherit = true;
                _t.$api.post('/param/getparameterInheritance', {
                    page: _t.paramsOptions.currentPage, // 当前页
                    limit: _t.paramsOptions.pageSize, // 每页显示条数
                }, function (res) {
                    _t.isLoadingInherit = false;
                    if (res) {
                        _t.inheritData = res.content !== null ? res.content : [];
                        _t.paramsOptions.total = res.total !== null ? res.total : 0;
                    } else {
                        _t.inheritData = [];
                        _t.paramsOptions.total = 0;
                        _t.$message.error('表格数据查询失败!');
                    }
                });
            },
            // 改变当前页码
            handleCurrentChangeParams(val) {
                var _t = this;
                _t.paramsOptions.currentPage = val;
                _t.getInheritData();
            },
            // 改变每页显示条数
            handleSizeChangeSubParams(val) {
                var _t = this;
                _t.paramsOptions.pageSize = val;
                _t.getInheritData();
            },
        },
        created() {
            let _t = this;
            // 获取地图数据
            _t.getMap();
            // 获取 扇区与小区对应关系数据
            // _t.getTableData();
            // 获取 扇区与小区初步退频方案
            // _t.getFrequencyData();
            // 参数继承
            // _t.getInheritData();
        },
    }
</script>

<style scoped>
    .titleText span.des {
        font-size: 14px;
        font-weight: normal;
        margin-left: 50px;
    }

    #container {
        position: relative;
        width: 100%;
        height: 600px;
        padding: 20px;
    }
</style>
