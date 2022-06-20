<template>
    <div
        v-loading.fullscreen.lock="isLoading"
        :element-loading-text="'已完成 ' + progress +' %'"
        class="index_box">
        <!--左侧导航-->
        <div class="side_box" v-show="isShow">
            <div class="appSide_box">
                <img src="../assets/img/appSide/index_logo.png" alt="">
                <div class="click_btn_box tc">
                    <el-button v-loading="isLoading" :disabled="isLoading" @click="changeBtn" class="click_btn"
                               type="primary">
                        <span v-show="!isLoading">一键生成</span>
                    </el-button>
                </div>
                <div>
                    <el-menu class="nav_menu_item" :default-active="current" :router="true" :unique-opened="true">
                        <el-menu-item v-for="(item,index) in appSideList" :key="item.id" :index="item.url">
                            <i :class="item.icon"></i>
                            <span>{{item.name}}</span>
                        </el-menu-item>
                    </el-menu>
                </div>
            </div>
            <!--收起-->
            <i class="el-icon-s-fold" @click="clickInset" id="BusinessMonitoring-navBar-inSet"></i>
        </div>
        <!--展开-->
        <i class="el-icon-s-unfold" @click="clickOutset" id="BusinessMonitoring-navBar-outSet"></i>
        <div class="app_content" id="rightMain">
            <div class="whiteBg">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "index",
        data() {
            return {
                // 显示左侧导航
                isShow: true,
                // 一键生成加载状态
                isLoading: false,
                // 左侧导航菜单
                appSideList: [
                    {
                        url: '/index/dataSettings',
                        name: '数据导入',
                        icon: 'el-icon-sell',
                        id: '2',
                    },
                    {
                        url: '/index/paramSettings',
                        name: '系统设置',
                        icon: 'el-icon-s-operation',
                        id: '1',
                    },
                    // {
                    //     url: '/index/areaSettings',
                    //     name: '退频区域确定',
                    //     icon: 'el-icon-cpu',
                    //     id: '3',
                    // },
                    // {
                    //     url: '/index/CapacityToPredict',
                    //     name: '容量预测',
                    //     icon: 'el-icon-data-line',
                    //     id: '4',
                    // },
                    // {
                    //     url: '/index/villageandSector',
                    //     name: '小区与扇区关系',
                    //     icon: 'el-icon-pie-chart',
                    //     id: '7',
                    // },
                    {
                        url: '/index/frequencyShiftScheme',
                        name: '总退频方案输出',
                        icon: 'el-icon-document',
                        id: '5',
                    },
                    // {
                    //     url: '/index/SetUpThe',
                    //     name: '设置',
                    //     icon: 'el-icon-setting',
                    //     id: '6',
                    // },
                ],
                // 加载进度
                progress: 0,
            }
        },
        methods: {
            // 收缩
            clickInset() {
                var _t = this;
                _t.isShow = false;
                document.getElementById('BusinessMonitoring-navBar-outSet').style.display = 'inline-block';
                document.getElementById('rightMain').style.left = '0';
            },
            // 展开
            clickOutset() {
                var _t = this;
                _t.isShow = true;
                document.getElementById('BusinessMonitoring-navBar-outSet').style.display = 'none';
                document.getElementById('rightMain').style.left = "220px";
            },
            // 点击退出按钮
            exitOut() {
                let _t = this;
                _t.$router.push({name: 'Login'});
            },
            // 点击一键生成
            changeBtn() {
                let _t = this;
                _t.checkData();
            },
            // 检查数据是否全部导入
            checkData() {
                var _t = this;
                _t.$api.post('/check', {}, function (res) {
                    if (res.status === true) {
                        // 校验通过走进度
                        _t.isLoading = true;
                        _t.get();
                    } else if (res.status === false) {
                        // 校验未通过提示
                        _t.$confirm(res.message, '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            _t.progress = 0;
                            _t.isLoading = false;
                            return false;
                        }).catch(() => {
                            _t.progress = 0;
                            _t.isLoading = false;
                            return false;
                        });
                    }
                });
            },
            // get
            get() {
                var _t = this;
                _t.$api.post('/region/get1', {}, function (val1) {
                    if (val1) {
                        _t.progress = 10;
                        _t.sectorBuild();
                    } else {
                        _t.isLoading = false;
                        _t.progress = 0;
                        _t.$message.error('退频区域确定数据生成错误!');
                    }
                });
            },
            sectorBuild() {
                var _t = this;
                _t.$api.post('/sector/buildByCellName', {}, function (val7) {
                    if (val7) {
                        _t.progress = 20;
                        _t.frequencyShiftBuild();
                    } else {
                        _t.isLoading = false;
                        _t.progress = 0;
                        _t.$message.error('扇区-小区关系整理错误!');
                    }
                });
            },
            frequencyShiftBuild() {
                var _t = this;
                _t.$api.post('/frequencyshift/build', {}, function (val8) {
                    if (val8) {
                        _t.progress = 30;
                        _t.parameterInheritance();
                    } else {
                        _t.isLoading = false;
                        _t.progress = 0;
                        _t.$message.error('初步退频方案输出错误!');
                    }
                });
            },
            // 参数继承
            parameterInheritance() {
                var _t = this;
                _t.$api.post('/param/parameterInheritance', {}, function (res) {
                    if (res) {
                        _t.progress = 40;
                        _t.insert();
                    } else {
                        _t.isLoading = false;
                        _t.progress = 0;
                        _t.$message.error('参数继承生成错误!');
                    }
                });
            },
            //
            insert() {
                var _t = this;
                _t.$api.post('/param/forecast', {}, function (val2) {
                    if (val2) {
                        _t.progress = 60;
                        _t.capacity();
                    } else {
                        _t.isLoading = false;
                        _t.progress = 0;
                        _t.$message.error('小区容量预测数据生成错误!');
                    }
                });
            },
            capacity() {
                var _t = this;
                _t.$api.post('/param/capacity', {}, function (val3) {
                    if (val3) {
                        _t.progress = 70;
                        _t.saveSectorExpansionPlanList();
                    } else {
                        _t.isLoading = false;
                        _t.progress = 0;
                        _t.$message.error('小区分担流量数据生成错误!');
                    }
                });
            },
            saveSectorExpansionPlanList() {
                var _t = this;
                _t.$api.post('/expansion/get', {}, function (val4) {
                    if (val4) {
                        _t.progress = 85;
                        _t.saveTotalFrequencySchemeOutputForm();
                    } else {
                        _t.isLoading = false;
                        _t.progress = 0;
                        _t.$message.error('扇区扩容方案生成错误!');
                    }
                });
            },
            saveTotalFrequencySchemeOutputForm() {
                var _t = this;
                _t.$api.post('/expansion/getAll', {}, function (val5) {
                    if (val5) {
                        _t.progress = 100;
                        _t.$alert('总退频方案已生成!', '温馨提示');
                        setTimeout(function () {
                            _t.isLoading = false;
                        }, 2000);
                    } else {
                        _t.isLoading = false;
                        _t.progress = 0;
                        _t.$message.error(' 总退频方案生成错误!');
                    }
                });
            }
        },
        computed: {
            // 监听 url 详情页面的导航
            current() {
                var arr = this.$route.path.split('/');
                if (arr.length > 4) {
                    arr.pop();
                    return arr.join("/");
                } else {
                    return this.$route.path;
                }
            }
        },
    }
</script>

<style scoped>
    #BusinessMonitoring-navBar-inSet,
    #BusinessMonitoring-navBar-outSet {
        height: 40px;
        width: 14px;
        top: 50%;
        text-align: center;
        line-height: 40px;
        position: fixed;
        font-size: 16px;
    }

    #BusinessMonitoring-navBar-inSet {
        left: 205px;
        border-radius: 15px 0 0 15px;
        background-color: #66b1ff;
        color: #fff;
        z-index: 999;
        cursor: pointer;
    }

    #BusinessMonitoring-navBar-outSet {
        left: 1px;
        display: none;
        z-index: 998;
        cursor: pointer;
        border-radius: 0 15px 15px 0;
        background-color: #66b1ff;
        color: #fff;
    }

    .index_box {
        width: 100%;
        height: 100%;
    }

    .side_box {
        width: 220px;
        height: 100%;
    }

    .appSide_box {
        width: 220px;
        background-color: #1e2d40;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
    }

    .click_btn_box {
        padding: 30px 0;
    }

    .click_btn {
        width: 180px;
        border-radius: 20px;
    }

    .nav_menu_item {
        background-color: transparent;
    }

    .nav_menu_item .el-menu-item.is-active {
        background-color: #fff;
    }
</style>
<style>
    .nav_menu_item li {
        color: #fff;
    }

    .nav_menu_item .el-menu-item:focus,
    .nav_menu_item .el-menu-item:hover {
        color: #1e2d40;
    }

    .progress_box .el-loading-spinner .circular {
        width: 52px;
        height: 52px;
    }
</style>
