<template>
    <div class="frequencyShiftScheme">
        <div v-show="false" style="border: 1px solid #333;padding: 10px;background-color: #1e2d40;">
            <canvas id="canvasMap" width="160" height="160" style="border: 1px solid red;"></canvas>
        </div>
        <!--  总退频方案输出  -->
        <div class="frequencyShiftSchemeOutput">
            <p class="titleText">
                <span class="lineBg"></span>
                <span>总退频方案输出</span>
            </p>
            <div class="tr marginBottom20">
                <el-button type="primary" @click="printData">下载</el-button>
            </div>
            <el-table :data="frequencyData" v-loading="isLoadingTable" element-loading-text="数据加载中..." border
                      height="700">
                    <el-table-column prop="isCoreArea" label="归属网格" header-align="center" align="center"/>
                    <el-table-column prop="districtandcounty" label="归属区域" header-align="center" align="center"/>
                    <el-table-column prop="sector" label="物理站址+扇区号" header-align="center" align="center"/>
                    <el-table-column prop="address" label="物理站址" header-align="center" align="center"/>
                    <el-table-column prop="isGtRange" label="是否高铁1.5公里" header-align="center" align="center"/>
                    <el-table-column prop="nrEnodebName" label="对应5G站点名" header-align="center" align="center"/>
                    <el-table-column prop="nrCellName" label="对应5G小区名" header-align="center" align="center"/>
                    <el-table-column prop="frequencyType" label="载波类型" header-align="center" align="center"/>
                    <el-table-column prop="dFrequencyNum" label="原D载波数" header-align="center" align="center"/>
                    <el-table-column prop="dFrequencyAverage" label="平均利用率" header-align="center" align="center"/>
                    <el-table-column prop="coverageType" label="存在问题" header-align="center" align="center"/>
                    <el-table-column prop="isError" label="退频方案" header-align="center" align="center"/>
                    <el-table-column prop="chaFrequencyProgramme" label="改频方案" header-align="center" align="center"/>
                    <el-table-column prop="D1" label="D1" header-align="center" align="center"/>
                    <el-table-column prop="D1Pusch" label="D1小区利用率" header-align="center" align="center"/>
                    <el-table-column prop="D2" label="D2" header-align="center" align="center"/>
                    <el-table-column prop="D2Pusch" label="D2小区利用率" header-align="center" align="center"/>
                    <el-table-column prop="D3" label="D3" header-align="center" align="center"/>
                    <el-table-column prop="D3usch" label="D3小区利用率" header-align="center" align="center"/>
                    <el-table-column prop="D4" label="D4" header-align="center" align="center"/>
                    <el-table-column prop="D4Pusch" label="D4小区利用率" header-align="center" align="center"/>
                    <el-table-column prop="D5" label="D5" header-align="center" align="center"/>
                    <el-table-column prop="D5Pusch" label="D5小区利用率" header-align="center" align="center"/>
                    <el-table-column prop="D6" label="D6" header-align="center" align="center"/>
                    <el-table-column prop="D6Pusch" label="D6小区利用率" header-align="center" align="center"/>
                    <el-table-column prop="MIMOD1" label="3DMIMO-D1" header-align="center" align="center"/>
                    <el-table-column prop="MIMOD1Pusch" label="3DMIMO-D1利用率" header-align="center" align="center"/>
                    <el-table-column prop="MIMOD2" label="3DMIMO-D2" header-align="center" align="center"/>
                    <el-table-column prop="MIMOD2Pusch" label="3DMIMO-D2利用率" header-align="center" align="center"/>
                    <el-table-column prop="MIMOD3" label="3DMIMO-D3" header-align="center" align="center"/>
                    <el-table-column prop="MIMOD3Pusch" label="3DMIMO-D3利用率" header-align="center" align="center"/>
                    <el-table-column prop="MIMOD7" label="3DMIMO-D7" header-align="center" align="center"/>
                    <el-table-column prop="MIMOD7Pusch" label="3DMIMO-D7利用率" header-align="center" align="center"/>
                    <el-table-column prop="MIMOD8" label="3DMIMO-D8" header-align="center" align="center"/>
                    <el-table-column prop="MIMOD8Pusch" label="3DMIMO-D8利用率" header-align="center" align="center"/>
                     <el-table-column prop="E1" label="E1" header-align="center" align="center"/>
                    <el-table-column prop="E1Pusch" label="E1利用率" header-align="center" align="center"/>
                     <el-table-column prop="E2" label="E2" header-align="center" align="center"/>
                    <el-table-column prop="E2Pusch" label="E2利用率" header-align="center" align="center"/>
                     <el-table-column prop="E3" label="E3" header-align="center" align="center"/>
                    <el-table-column prop="E3Pusch" label="E3利用率" header-align="center" align="center"/>
                     <el-table-column prop="E4" label="E4" header-align="center" align="center"/>
                    <el-table-column prop="E4Pusch" label="E4利用率" header-align="center" align="center"/>
                     <el-table-column prop="F1" label="F1" header-align="center" align="center"/>
                    <el-table-column prop="F1Pusch" label="F1利用率" header-align="center" align="center"/>
                     <el-table-column prop="F2" label="F2" header-align="center" align="center"/>
                    <el-table-column prop="F2Pusch" label="F2利用率" header-align="center" align="center"/>
                     <el-table-column prop="F3" label="F3" header-align="center" align="center"/>
                    <el-table-column prop="F3Pusch" label="F3利用率" header-align="center" align="center"/>
                     <el-table-column prop="F38382 " label="F-38382" header-align="center" align="center"/>
                    <el-table-column prop="F38382Pusch" label="F-38382利用率" header-align="center" align="center"/>
                     <el-table-column prop="FD1 " label="FD1" header-align="center" align="center"/>
                    <el-table-column prop="FD1Pusch" label="FD1利用率" header-align="center" align="center"/>
                     <el-table-column prop="FD2" label="FD2" header-align="center" align="center"/>
                    <el-table-column prop="FD2Pusch" label="FD2利用率" header-align="center" align="center"/>
                     <el-table-column prop="FG" label="FG" header-align="center" align="center"/>
                    <el-table-column prop="FGPusch" label="FG利用率" header-align="center" align="center"/>
                    <el-table-column prop="A" label="A" header-align="center" align="center"/>
                    <el-table-column prop="APusch" label="A利用率" header-align="center" align="center"/>
            </el-table>
            <pages
                :total="total"
                :currentPage="page"
                :page-size="limit"
                @handleSizeChangeSub="handleSizeChange"
                @handleCurrentChangeSub="handleCurrentChange"/>
            <!--该区域用于打印-->
            <div v-show="false">
                <el-table ref="printMe" :data="frequencyData" border>
                    <el-table-column label="工参数据" header-align="center" align="center">
                        <el-table-column prop="enodebName" label="基站ID" header-align="center" align="center"/>
                        <el-table-column prop="cellName" label="基站名" header-align="center" align="center"/>
                        <el-table-column prop="sector" label="扇区ID" header-align="center" align="center"/>
                        <el-table-column prop="coverageType" label="基站类型" header-align="center" align="center"/>
                        <el-table-column prop="workFrequencyBand" label="当前扇区结构" header-align="center" align="center"/>
                        <el-table-column prop="newWorkFrequencyBand" label="退频后扇区结构" header-align="center"
                                         align="center"/>
                    </el-table-column>
                    <el-table-column label="载波计算" header-align="center" align="center">
                        <el-table-column prop="carrier" label="存量载波" header-align="center" align="center"/>
                        <el-table-column prop="needCarrier" label="载波需求" header-align="center" align="center"/>
                        <el-table-column prop="gap" label="载波GAP" header-align="center" align="center"/>
                    </el-table-column>
                    <el-table-column label="具体扩容方案" header-align="center" align="center">
                        <el-table-column label="FDD" header-align="center" align="center">
                            <el-table-column prop="FDD900" label="FDD900" header-align="center" align="center"/>
                            <el-table-column prop="FDD1800" label="FDD1800" header-align="center" align="center"/>
                        </el-table-column>
                        <el-table-column label="F/A" header-align="center" align="center">
                            <el-table-column prop="F1" label="F1" header-align="center" align="center"/>
                            <el-table-column prop="F2" label="F2" header-align="center" align="center"/>
                            <el-table-column prop="A" label="A" header-align="center" align="center"/>
                        </el-table-column>
                        <el-table-column label="3D MIMO" header-align="center" align="center">
                            <el-table-column prop="D33DMIMO" label="D3 3DMIMO" header-align="center" align="center"/>
                            <el-table-column prop="D73DMIMO" label="D7 3DMIMO" header-align="center" align="center"/>
                            <el-table-column prop="D83DMIMO" label="D8 3DMIMO" header-align="center" align="center"/>
                        </el-table-column>
                        <el-table-column label="D3/7/8" header-align="center" align="center">
                            <el-table-column prop="D3" label="D3" header-align="center" align="center"/>
                            <el-table-column prop="D7" label="D7" header-align="center" align="center"/>
                            <el-table-column prop="D8" label="D8" header-align="center" align="center"/>
                        </el-table-column>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <hr>
        <!--地图-->
        <!-- <div class="frequencyMap">
            <div class="mapBox" id="frequencyMap" v-loading="isLoading" element-loading-text="数据加载中"></div>
            <div class="tc frequency_labelBox">
                <ul class="frequency_label clearFix">
                    <li class="fl" v-for="(item,index) in typeMap" :key="index">
                        <span :style="'background-color:'+ item.color" class="bg"></span>
                        <span>{{item.name}}</span>
                    </li>
                </ul>
            </div>
        </div> -->
    </div>
</template>

<script>
    export default {
        name: "frequencyShiftScheme",
        data() {
            return {
                isLoading: false, // 数据加载
                //总退频方案输出数据
                total: 0,
                page: 1,
                limit: 500,
                frequencyData: [],
                typeMap: {
                    'D1': {color: '#fa8334', radius: 15, name: 'D1'},
                    'D2': {color: '#c40000', radius: 20, name: 'D2'},
                    'D3': {color: '#494848', radius: 25, name: 'D3'},
                    'F1': {color: '#af5ede', radius: 30, name: 'F1'},
                    'F2': {color: '#daa914', radius: 35, name: 'F2'},
                    'A': {color: '#3ca4d4', radius: 40, name: 'A'},
                    'FDD1800': {color: '#566fda', radius: 45, name: 'FDD1800'},
                    'FDD900': {color: '#6a3906', radius: 50, name: 'FDD900'},
                    'D7': {color: '#ff0', radius: 55, name: 'D7'},
                    'D8': {color: '#0ff', radius: 60, name: 'D8'},
                    'D3-MIMO': {color: '#44c43d', radius: 65, name: 'D3-MIMO'},
                    'D7_MIMO': {color: '#66b1ff', radius: 70, name: 'D7-MIMO'},
                    'D8-MIMO': {color: '#EECFA1', radius: 75, name: 'D8-MIMO'},
                },
                // loading 表格
                isLoadingTable: false
            }
        },
        methods: {
            // 打印表格
            printData() {
                var _t = this;
                window.location.href = _t.$api.root() + '/expansion/getExcelInfo';
                this.$message({
                  message: '正在下载excel',
                  type: 'success'
                });
            },
            // 调取表格数据
            getData() {
                let _t = this;
                _t.isLoadingTable = true;
                _t.$api.post('/forecast/getTotalFrequencySchemeOutputForm', {
                    limit: _t.limit,
                    page: _t.page
                }, function (res) {
                    _t.isLoadingTable = false;
                    if (res) {
                        _t.frequencyData = res.content;
                        _t.total = res.total
                    } else {
                        _t.$message.error('表格数据查询失败!');
                    }
                })
            },
            // 获取地图数据
            getMapData() {
                var _t = this;
                _t.isLoading = true;
                _t.$api.post('/forecast/getTotalCapacityForecastGIS', {}, function (res) {
                if (res !== undefined && res !== null) {
                    // 处理地图数据
                    _t.dealWithMapData(res);
                }
                });
            },
            // 处理地图数据
            dealWithMapData(list) {
                var _t = this;
                // 绘制地图
                _t.drawCanvas(list);
            },
            // canvas绘图三叶草
            drawCanvas(list) {
                var _t = this;
                var newArr = new Array(); // 用于绘制点的三叶草数组
                var canvas = document.getElementById('canvasMap');
                var ctx = canvas.getContext('2d');
                // 循环list数据
                list.forEach((item) => {
                    // item1 为每个三叶草
                    var obj = new Object();
                    // 判断该三叶草上是否有子叶
                    if (item.length !== 0) {
                        if (item[0].length !== 0) {
                            // 取出 经纬度
                            var LAT = new Array(); // 每个点的经纬度坐标
                            LAT[0] = item[0].x;
                            LAT[1] = item[0].y;
                            obj.LAT = LAT;
                        }
                        item.forEach((val) => {
                            if (val !== null && val !== undefined) {
                                var radius = _t.typeMap[val.type].radius;
                                var color = _t.typeMap[val.type].color;
                                var start = Number(val.role === null ? 0 : val.role);
                                var end = Number(val.role === null ? 0 : val.role) + 30;
                                ctx.sector(80, 80, radius, start, end, color, 1.5); //绘制扇形
                            }
                        });
                        ctx.circle(80, 80, 5, '#eee'); //绘制圆心
                        obj.iconUrl = canvas.toDataURL('image/png', 1);
                        newArr.push(obj);
                        ctx.clearRect(0, 0, 160, 160); // 清除画布
                    }
                });
                // 三叶草数据组合结束绘制到 地图上
                _t.drawMap(newArr);
            },
            // 将三叶草绘制到地图上
            drawMap(imgArr) {
                var _t = this;
                // AMap是高德地图的构造函数，这里.Map是创建地图，.Marker是创建坐标点
                var map = new AMap.Map('frequencyMap', {//'container'是对应页面盒子的id
                    resizeEnable: true, //自适应大小
                    zoom: 20, //初始视窗
                });
                // 清除地图上所有添加的覆盖物
                map.clearMap();
                // 添加蒙版
                new AMap.DistrictSearch({
                    extensions: 'all',
                    subdistrict: 1
                }).search(null, function () {
                    // 外多边形坐标数组和内多边形坐标数组
                    var outer = [
                        new AMap.LngLat(-360, 90, true),
                        new AMap.LngLat(-360, -90, true),
                        new AMap.LngLat(360, -90, true),
                        new AMap.LngLat(360, 90, true),
                    ];
                    var pathArray = [outer];
                    pathArray.push.apply(pathArray);
                    var polygon = new AMap.Polygon({
                        pathL: pathArray,
                        fillColor: '#6cc66e',
                        fillOpacity: 0.5
                    });
                    polygon.setPath(pathArray);
                    map.add(polygon);
                    // 地图加载完成 隐藏显示的加载蒙版
                    map.on("complete", function () {
                        _t.isLoading = false;
                    });
                });

                // 多边形内部
                var pathIn = new Array();

                imgArr.forEach((val) => {
                    pathIn.push(val.LAT);
                });


                let polygonIn = new AMap.Polygon({
                    path: pathIn, // 经纬度
                    strokeColor: "#FF33FF", // 描边颜色
                    strokeWeight: 0,
                    strokeOpacity: 0.2,
                    fillOpacity: 0.4,
                    fillColor: "#1791fc",
                    zIndex: 50,
                });

                // 画区域
                // map.add(polygonIn);
                // 缩放地图到合适的视野级别
                map.setFitView([polygonIn]);

                imgArr.forEach((item) => {
                    // 实例化点标记
                    var marker = new AMap.Marker({
                        icon: new AMap.Icon({
                            image: item.iconUrl,
                            size: new AMap.Size(80, 80),  //图标大小
                            imageSize: new AMap.Size(80, 80)
                        }),
                        position: item.LAT,
                        offset: new AMap.Pixel(-40, -40)
                    });
                    marker.setMap(map);
                });
            },
            // 注册绘制三叶草的函数方法
            registerCanvas() {
                //定义绘制圆心的方法
                CanvasRenderingContext2D.prototype.circle = function (x, y, radius, color) {
                    var _t = this;
                    _t.beginPath(); // 开始绘图
                    _t.arc(x, y, radius, 0, Math.PI * 2, false);
                    _t.closePath(); // 结束绘图
                    _t.fillStyle = color; // 填充颜色;
                    _t.fill(); // 填充
                };

                //定义绘制扇形的方法
                CanvasRenderingContext2D.prototype.sector = function (x, y, radius, sDeg, eDeg, color, lineWidth) {
                    var _t = this;
                    var DEG = Math.PI / 180;
                    _t.beginPath(); // 开始绘图
                    _t.moveTo(x, y); // 移至坐标原点
                    _t.arc(x, y, radius, DEG * (sDeg - 90), DEG * (eDeg - 90), false); // 画圆同方法、控制起始角度就变成扇形
                    _t.lineTo(x, y); // 画外围线
                    _t.strokeStyle = color; // 外围线颜色
                    _t.lineWidth = lineWidth; // 外围线粗
                    _t.fillStyle = color; // 对扇形颜色设置
                    _t.stroke();  // 描边
                    _t.fill(); // 填充

                    _t.closePath(); // 结束绘图
                }
            },
            handleSizeChange(val) {
                var _t = this;
                _t.limit = val;
                _t.getData();
            },
            handleCurrentChange(val) {
                var _t = this;
                _t.page = val;
                _t.getData();
            },
        },
        created() {
            let _t = this;
            _t.getData();
            // 获取地图数据
           /* _t.getMapData();
            // 注册绘制扇形和圆心的函数
            _t.registerCanvas(); */
        }
    }
</script>

<style scoped>
    .frequency_labelBox {
        margin: 20px 0 0;
    }

    .frequency_label {
        display: inline-block;
        margin: 0 auto;
    }

    .frequency_label li {
        margin: 0 15px;
    }

    .frequency_label li span.bg {
        width: 30px;
        height: 10px;
        border-radius: 5px;
        display: inline-block;
    }

    .mapBox {
        width: 100%;
        height: 600px;
        padding: 20px;
    }
</style>
