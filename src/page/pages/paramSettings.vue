<template>
    <div class="paramSettings">
        <!--计算区域参数-->
        <div class="paramsBox">
            <p class="titleText">
                <span class="lineBg"></span>
                <span>计算区域参数</span>
            </p>
            <el-form inline :model="formItem">
                <el-form-item label="NR建站站间距">
                    <el-input oninput="value=value.replace(/[^\d]/g,'')" v-model="formItem.NRSpacing"></el-input>
                </el-form-item>
                <el-form-item label="隔离带宽度">
                    <el-input oninput="value=value.replace(/[^\d]/g,'')" v-model="formItem.IsolationWidth"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="getCalculate">保存</el-button>
        </div>
        <div class="lineBoxBg"></div>
        <!--容量计算时间-->
        <div class="titleTime">
            <p class="titleText">
                <span class="lineBg"></span>
                <span>容量计算时间</span>
            </p>
            <el-form inline :model="formItem">
                <el-form-item>
                    <el-radio v-model="radio1" label="1" @change="radio1Change">当前容量需求</el-radio>
                    <el-radio v-model="radio1" label="2" @change="radio1Change">未来容量需求（1年后）</el-radio>
                    <el-radio v-model="radio1" label="3" @change="radio1Change">未来容量需求（2年后）</el-radio>
                </el-form-item>
                <!--<el-radio v-model="radio1" label="1" @change="radio1Change">当前容量需求</el-radio>
                <el-form-item>
                  <el-input v-model="formItem.currentCapacityRequirement"></el-input>
                </el-form-item>
                <el-radio v-model="radio1" label="2" @change="radio1Change">未来容量需求（1年后）</el-radio>
                <el-form-item>
                  <el-input v-model="formItem.OneYearCapacityRequirement"></el-input>
                </el-form-item>
                <el-radio v-model="radio1" label="3" @change="radio1Change">未来容量需求（2年后）</el-radio>
                <el-form-item>
                  <el-input v-model="formItem.TwoYearCapacityRequirement"></el-input>
                </el-form-item>-->
            </el-form>
            <el-button type="primary" @click="get_CapacityCalculation">保存</el-button>
        </div>
        <div class="lineBoxBg"></div>
        <!--小区-扇区映射参数-->
        <div class="codeBox">
            <p class="titleText">
                <span class="lineBg"></span>
                <span>小区-扇区映射参数</span>
            </p>
            <el-form inline :model="formItem" label-width="170px">
                <el-form-item label="同扇区小区覆盖最大夹角">
                    <el-input oninput="value=value.replace(/[^\d]/g,'')" v-model="formItem.maximumAngle"></el-input>
                </el-form-item>
                <el-form-item label="同扇区小区最远相距距离">
                    <el-input oninput="value=value.replace(/[^\d]/g,'')" v-model="formItem.farthestDistance"></el-input>
                </el-form-item>
                <br>
                <!-- <el-form-item label="基础覆盖优先级1">
                    <el-select class="width200" v-model="formItem.areaPriority1">
                        <el-option v-for="(item,index) in linesList" :label="item.label" :value="item.value"
                                   :key="item.value"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="基础覆盖优先级2">
                    <el-select class="width200" v-model="formItem.areaPriority2">
                        <el-option v-for="(item,index) in linesList" :label="item.label" :value="item.value"
                                   :key="item.value"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="基础覆盖优先级3">
                    <el-select class="width200" v-model="formItem.areaPriority3">
                        <el-option v-for="(item,index) in linesList" :label="item.label" :value="item.value"
                                   :key="item.value"/>
                    </el-select>
                </el-form-item>
                <br/>

                <el-form-item label="基础覆盖优先级4">
                    <el-select class="width200" v-model="formItem.areaPriority4">
                        <el-option v-for="(item,index) in linesList" :label="item.label" :value="item.value"
                                   :key="item.value"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="基础覆盖优先级5">
                    <el-select class="width200" v-model="formItem.areaPriority5">
                        <el-option v-for="(item,index) in linesList" :label="item.label" :value="item.value"
                                   :key="item.value"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="基础覆盖优先级6">
                    <el-select class="width200" v-model="formItem.areaPriority6">
                        <el-option v-for="(item,index) in linesList" :label="item.label" :value="item.value"
                                   :key="item.value"/>
                    </el-select>
                </el-form-item> -->
            </el-form>
            <el-button type="primary" @click="saveCellPuschParameterInfo">保存</el-button>
        </div>
        <div class="lineBoxBg"></div>
        <div class="codeBox">
            <p class="titleText">
                <span class="lineBg"></span>
                <span>利用率参数</span>
            </p>
            <el-input @change="userArg" :style="{'display': 'inline-block', 'width': '200px'}" oninput="value.replace(/[^\d]/g,'')" v-model="cellPusch"></el-input>  %
            <br/>
            <br/>
            <br/>
            <el-button type="primary" @click="saveCellPuschParameterInfo">保存</el-button>
        </div>
        <div class="lineBoxBg"></div>
        <!--扩容优先级-->
        <div class="priorityBox">
            <p class="titleText">
                <span class="lineBg"></span>
                <span>扩容优先级</span>
            </p>
            <el-form inline :model="formItem" label-width="100px">
                <el-form-item label="优先级1">
                    <el-select class="width200" v-model="formItem.Priority1">
                        <el-option v-for="(item,index) in PrioritylinesList" :label="item.label" :value="item.value"
                                   :key="index"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="优先级2">
                    <el-select class="width200" v-model="formItem.Priority2">
                        <el-option v-for="(item,index) in PrioritylinesList" :label="item.label" :value="item.value"
                                   :key="index"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="优先级3">
                    <el-select class="width200" v-model="formItem.Priority3">
                        <el-option v-for="(item,index) in PrioritylinesList" :label="item.label" :value="item.value"
                                   :key="index"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="优先级4">
                    <el-select class="width200" v-model="formItem.Priority4">
                        <el-option v-for="(item,index) in PrioritylinesList" :label="item.label" :value="item.value"
                                   :key="index"/>
                    </el-select>
                </el-form-item>

                <el-form-item label="优先级5">
                    <el-select class="width200" v-model="formItem.Priority5">
                        <el-option v-for="(item,index) in PrioritylinesList" :label="item.label" :value="item.value"
                                   :key="index"/>
                    </el-select>
                </el-form-item>
                <br/>
                <el-form-item label="优先级6">
                    <el-select class="width200" v-model="formItem.Priority6">
                        <el-option v-for="(item,index) in PrioritylinesList" :label="item.label" :value="item.value"
                                   :key="index"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="优先级7">
                    <el-select class="width200" v-model="formItem.Priority7">
                        <el-option v-for="(item,index) in PrioritylinesList" :label="item.label" :value="item.value"
                                   :key="index"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="优先级8">
                    <el-select class="width200" v-model="formItem.Priority8">
                        <el-option v-for="(item,index) in PrioritylinesList" :label="item.label" :value="item.value"
                                   :key="index"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="优先级9">
                    <el-select class="width200" v-model="formItem.Priority9">
                        <el-option v-for="(item,index) in PrioritylinesList" :label="item.label" :value="item.value"
                                   :key="index"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="优先级10">
                    <el-select class="width200" v-model="formItem.Priority10">
                        <el-option v-for="(item,index) in PrioritylinesList" :label="item.label" :value="item.value"
                                   :key="index"/>
                    </el-select>
                </el-form-item>

                <el-form-item label="优先级11">
                    <el-select class="width200" v-model="formItem.Priority11">
                        <el-option v-for="(item,index) in PrioritylinesList" :label="item.label" :value="item.value"
                                   :key="index"/>
                    </el-select>
                </el-form-item>

            </el-form>
            <el-button type="primary" @click="get_ExpansionPriority">保存</el-button>
        </div>
        <div class="lineBoxBg"></div>
        <!--超忙配置表-->
        <div class="busyBox">
            <p class="titleText">
                <span class="lineBg"></span>
                <span>超忙配置表</span>
            </p>
            <el-table class="marginBottom20" :data="busyTableData" border :span-method="arraySpanMethod">
                <el-table-column label="小区分类标准" header-align="center" align="center">
                    <el-table-column prop="name" label="扩容门限" header-align="center" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.$index !== 2">{{scope.row.name}}</span>
                            <div v-if="scope.$index === 2 && scope.row.isSet === false">
                                <span>>=</span>
                                <span>{{scope.row.eRab}}</span>
                            </div>
                            <div v-if="scope.$index === 2 && scope.row.isSet === true">
                                <el-input oninput="value=value.replace(/[^\d|.]/g,'')" v-model="scope.row.eRab"/>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="(小区自忙时平均E-RAB流量,kb)" header-align="center" align="center">
                        <template slot-scope="scope">
                            <div v-if="scope.row.isSet === false">
                                <span v-if="scope.$index === 0">>=</span>
                                <span v-if="scope.$index === 1 || scope.$index === 3"><</span>
                                <span>{{scope.row.eRab}}</span>
                            </div>
                            <el-input v-else oninput="value=value.replace(/[^\d|.]/g,'')" v-model="scope.row.eRab"/>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="有数据传输的RRC数" header-align="center" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.isSet === false">{{scope.row.RRC}}</span>
                        <el-input v-else oninput="value=value.replace(/[^\d|.]/g,'')" v-model="scope.row.RRC"/>
                    </template>
                </el-table-column>
                <el-table-column label="利用率" header-align="center" align="center">
                    <el-table-column label="上行利用率PUSCH" header-align="center" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.isSet === false">{{scope.row.pusCh}}%</span>
                            <el-input v-else oninput="value=value.replace(/[^\d|.]/g,'')" v-model="scope.row.pusCh"/>
                        </template>
                    </el-table-column>
                    <el-table-column prop="xia" label="下行利用率PDSCH/PDCCH" header-align="center" align="center">
                        <template slot-scope="scope">
                            <div v-if="scope.row.isSet === false">
                                <span>{{scope.row.pdsCh}}%</span>
                                <span>/</span>
                                <span>{{scope.row.pdcCh}}%</span>
                            </div>
                            <div v-else class="displayFlex">
                                <el-input class="flex_1" oninput="value=value.replace(/[^\d|.]/g,'')"
                                          v-model="scope.row.pdsCh"/>
                                <el-input class="flex_1" oninput="value=value.replace(/[^\d|.]/g,'')"
                                          v-model="scope.row.pdcCh"/>
                            </div>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column prop="liu" label="上/下行流量(GB)" header-align="center" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.isSet === false">
                            <span>{{scope.row.upStream}}</span>
                            <span>/</span>
                            <span>{{scope.row.downStream}}</span>
                        </div>
                        <div v-else class="displayFlex">
                            <el-input class="flex_1" oninput="value=value.replace(/[^\d|.]/g,'')"
                                      v-model="scope.row.upStream"/>
                            <el-input class="flex_1" oninput="value=value.replace(/[^\d|.]/g,'')"
                                      v-model="scope.row.downStream"/>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-button
                            @click="handleClick(scope.row,scope.$index)"
                            v-if="scope.row.isSet === false"
                            class="redColor"
                            type="text">修改
                        </el-button>
                        <el-button
                            v-else
                            type="text"
                            class="blueColor"
                            @click="handleClick(scope.row,scope.$index)">保存
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" @click="addDataFive">保存</el-button>
        </div>
        <div class="lineBoxBg"></div>
        <!--载波配置表-->
        <div class="carrierBox">
            <p class="titleText">
                <span class="lineBg"></span>
                <span>载波配置表</span>
            </p>
            <el-table :data="carrierTable" border stripe>
                <el-table-column prop="column1" label="频段" header-align="center" align="center"/>
                <el-table-column label="等效TD-LTE载波数" header-align="center" align="center">
                    <el-table-column prop="column2" label="DL" header-align="center" align="center"/>
                    <el-table-column prop="column3" label="UL" header-align="center" align="center"/>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "paramSettings",
        data() {
            return {
                formItem: {
                    //NR建站站间距
                    NRSpacing: '',
                    //隔离带宽度
                    IsolationWidth: '',
                    //当前容量需求
                    currentCapacityRequirement: '',
                    //未来容量需求（1年后）
                    OneYearCapacityRequirement: '',
                    //未来容量需求（2年后）
                    TwoYearCapacityRequirement: '',
                    //单选
                    checked: '',
                    //同扇区小区覆盖最大夹角
                    maximumAngle: '',
                    //同扇区小区最远相距距离
                    farthestDistance: '',
                    //基础覆盖优先级1-6
                    areaPriority1: '',
                    areaPriority2: '',
                    areaPriority3: '',
                    areaPriority4: '',
                    areaPriority5: '',
                    areaPriority6: '',
                    //优先级1-10级
                    Priority1: '',
                    Priority2: '',
                    Priority3: '',
                    Priority4: '',
                    Priority5: '',
                    Priority6: '',
                    Priority7: '',
                    Priority8: '',
                    Priority9: '',
                    Priority10: '',
					Priority11: '',
                },
                linesList: [
                    {label: 'D频段小区', value: '1'},
                    {label: 'F1', value: '2'},
                    {label: 'F2', value: '3'},
                    {label: 'A', value: '4'},
                    {label: 'FDD1800', value: '5'},
                    {label: 'FDD900', value: '6'},
                ],
                // 利用率
                cellPusch: 0,
                //优先级下拉框值
                PrioritylinesList: [
                    {label: '开启D3频点', value: '1'},
                    {label: '开启D7频点', value: '2'},
                    {label: '开启D8频点', value: '3'},
                    {label: '扩容TDL-F1频段', value: '4'},
                    {label: '扩容TDL-F2频段', value: '11'},
                    {label: 'A频段重耕支持TD-LTE（主设备可支持）', value: '5'},
                    {label: '新建/开启FDD1800MHz', value: '6'},
                    {label: '新建/开启FDD900MHz', value: '7'},
                    {label: 'FDD Massive-MIMO', value: '8'},
                    {label: '扇区分裂', value: '9'},
                    {label: '小微站补热', value: '10'},
                    {label: '空', value: '-1'}
                ],
                // 超忙配置表
                busyTableData: [
                    {
                        name: '大包小区',
                        eRab: '0',
                        pusCh: '0',
                        pdsCh: '0',
                        pdcCh: '0',
                        upStream: '0',
                        downStream: '0',
                        RRC: '0',
                        isSet: false
                    },
                    {
                        name: '中包小区',
                        eRab: '0',
                        pusCh: '0',
                        pdsCh: '0',
                        pdcCh: '0',
                        upStream: '0',
                        downStream: '0',
                        RRC: '0',
                        isSet: false
                    },
                    {
                        eRab: '0',
                        isSet: false
                    },
                    {
                        name: '小包小区',
                        eRab: '0',
                        pusCh: '0',
                        pdsCh: '0',
                        pdcCh: '0',
                        upStream: '0',
                        downStream: '0',
                        RRC: '0',
                        isSet: false
                    }
                ],
                busyTableForm: {
                    id: ''
                },
                //载波配置表
                carrierTable: [
                    {
                        column1: 'F1',
                        column2: '1',
                        column3: '1'
                    },
                    {
                        column1: 'F2',
                        column2: '0.5',
                        column3: '0.5'
                    },
                    {
                        column1: 'D1',
                        column2: '1',
                        column3: '1'
                    },
                    {
                        column1: 'D2',
                        column2: '1',
                        column3: '1'
                    },
                    {
                        column1: 'D3',
                        column2: '1',
                        column3: '1'
                    },
                    {
                        column1: 'D7',
                        column2: '1',
                        column3: '1'
                    },
                    {
                        column1: 'D8',
                        column2: '0.5',
                        column3: '0.5'
                    },
                    {
                        column1: 'A',
                        column2: '0.5',
                        column3: '0.5'
                    },
                    {
                        column1: 'FDD-900(10M)',
                        column2: '0.5',
                        column3: '1'
                    },
                    {
                        column1: 'FDD-1800(20M)',
                        column2: '1.5',
                        column3: '2'
                    },
                    {
                        column1: 'FDD massive-MIMO',
                        column2: '3',
                        column3: '3'
                    }
                ],
                jsId: '',
                rlId: '',
                ysId: '',
                krId: '',
                radio1: ''
            }
        },
        methods: {
            //
            radio1Change(val) {
                let _t = this;
                _t.radio1 = val;
            },
            //计算区域参数
            getCalculate() {
                let _t = this;
                _t.$api.post('/params/saveCalculationAreaParameterInfo', {
                    isolationWidth: _t.formItem.IsolationWidth,
                    nrSpacing: _t.formItem.NRSpacing,
                    id: _t.jsId,
                }, function (res) {
                    if (res === true) {
                        _t.$message.success('成功')
                    } else {
                        _t.$message.error('失败');
                    }
                });
            },
            //利用率获取 
            getCellPuschParameterInfot() {
              let _t = this;
              _t.$api.post('/params/getCellPuschParameterInfo', {
                }, function (res) {
                    _t.cellPuschId = res[0].id;
                    _t.cellPusch = res[0].value;
                });
            },
            // 利用率保存 
            saveCellPuschParameterInfo() {
              let _t = this;
              _t.$api.post('/params/saveCellPuschParameterInfo', {
                    cellPusch: this.cellPusch,
                    id: _t.cellPuschId,
                }, function (res) {
                    if (res === true) {
                        _t.$message.success('成功')
                    } else {
                        _t.$message.error('失败');
                    }
                });
            },
            //计算区域参数查询
            getDataOne() {
                let _t = this;
                _t.$api.post('/params/getCalculationAreaParameterInfo', {}, function (res) {
                    if (res.length > 0) {
                        _t.jsId = res[0].id;
                        _t.formItem.IsolationWidth = res[0].IsolationWidth;
                        _t.formItem.NRSpacing = res[0].NRSpacing;
                    }
                })
            },
            //容量计算时间
            get_CapacityCalculation() {
                let _t = this;
                _t.$api.post('/params/saveCapacityCalculationInfo', {
                    currentCapacityRequirement: _t.formItem.currentCapacityRequirement,
                    oneYearCapacityRequirement: _t.formItem.OneYearCapacityRequirement,
                    twoYearCapacityRequirement: _t.formItem.TwoYearCapacityRequirement,
                    checked: _t.radio1,
                    id: _t.rlId
                }, function (res) {
                    if (res === true) {
                        _t.$message.success('成功')
                    } else {
                        _t.$message.error('失败');
                    }
                })
            },
            //容量计算时间查询
            getDataTwo() {
                let _t = this;
                _t.$api.post('/params/getCapacityCalculationInfo', {}, function (res) {
                    if (res.length > 0) {
                        _t.rlId = res[0].id;
                        _t.radio1 = res[0].checked.toString();
                        _t.formItem.currentCapacityRequirement = res[0].currentCapacityRequirement;
                        _t.formItem.OneYearCapacityRequirement = res[0].OneYearCapacityRequirement;
                        _t.formItem.TwoYearCapacityRequirement = res[0].TwoYearCapacityRequirement;
                    }
                })
            },
            //小区-扇区映射参数
            get_MappingParameters() {
                let _t = this;
                _t.$api.post('/params/saveSectorMappingInfo', {
                    maximumAngle: _t.formItem.maximumAngle,
                    farthestDistance: _t.formItem.farthestDistance,
                    areaPriority1: _t.formItem.areaPriority1,
                    areaPriority2: _t.formItem.areaPriority2,
                    areaPriority3: _t.formItem.areaPriority3,
                    areaPriority4: _t.formItem.areaPriority4,
                    areaPriority5: _t.formItem.areaPriority5,
                    areaPriority6: _t.formItem.areaPriority6,
                    id: _t.ysId
                }, function (res) {
                    if (res === true) {
                        _t.$message.success('成功');
                    } else {
                        _t.$message.error('失败');
                    }
                })
            },
            //小区-扇区映射参数查询
            getDataThree() {
                let _t = this;
                _t.$api.post('/params/getSectorMappingInfo', {}, function (res) {
                    if (res.length > 0) {
                        _t.formItem.maximumAngle = res[0].maximumAngle.toString();
                        _t.formItem.farthestDistance = res[0].farthestDistance.toString();
                        _t.formItem.areaPriority1 = res[0].areaPriority1.toString();
                        _t.formItem.areaPriority2 = res[0].areaPriority2.toString();
                        _t.formItem.areaPriority3 = res[0].areaPriority3.toString();
                        _t.formItem.areaPriority4 = res[0].areaPriority4.toString();
                        _t.formItem.areaPriority5 = res[0].areaPriority5.toString();
                        _t.formItem.areaPriority6 = res[0].areaPriority6.toString();
                        _t.ysId = res[0].id
                    }
                })
            },
            //扩容优先级
            get_ExpansionPriority() {
                let _t = this;
                _t.$api.post('/params/saveCapacityExpansionPriorityInfo', {
                    priority1: _t.formItem.Priority1,
                    priority2: _t.formItem.Priority2,
                    priority3: _t.formItem.Priority3,
                    priority4: _t.formItem.Priority4,
                    priority5: _t.formItem.Priority5,
                    priority6: _t.formItem.Priority6,
                    priority7: _t.formItem.Priority7,
                    priority8: _t.formItem.Priority8,
                    priority9: _t.formItem.Priority9,
                    priority10: _t.formItem.Priority10,
                    priority11: _t.formItem.Priority11,
                    id: _t.krId
                }, function (res) {
                    if (res === true) {
                        _t.$message.success('成功');
                    } else {
                        _t.$message.error('失败');
                    }
                })
            },
            //扩容优先级查询
            getDataFour() {
                let _t = this;
                _t.$api.post('/params/getCapacityExpansionPriorityInfo', {}, function (res) {
                    if (res.length > 0) {
                        _t.formItem.Priority1 = res[0].Priority1.toString();
                        _t.formItem.Priority2 = res[0].Priority2.toString();
                        _t.formItem.Priority3 = res[0].Priority3.toString();
                        _t.formItem.Priority4 = res[0].Priority4.toString();
                        _t.formItem.Priority5 = res[0].Priority5.toString();
                        _t.formItem.Priority6 = res[0].Priority6.toString();
                        _t.formItem.Priority7 = res[0].Priority7.toString();
                        _t.formItem.Priority8 = res[0].Priority8.toString();
                        _t.formItem.Priority9 = res[0].Priority9.toString();
                        _t.formItem.Priority10 = res[0].Priority10.toString();
                         _t.formItem.Priority11 = res[0].Priority11.toString();
                        _t.krId = res[0].id;
                    }
                })
            },
            //超忙配置表
            addDataFive() {
                var _t = this;
                var isSetNum = 0;
                _t.busyTableData.forEach((item) => {
                    if (item.isSet === true) {
                        isSetNum++;
                    }
                });
                if (isSetNum !== 0) {
                    _t.$alert('您有未保存的信息,请先保存!', '温馨提示');
                } else {
                    // 校验小区自忙时
                    if (_t.busyTableData[1].eRab.trim() * 1 <= _t.busyTableData[0].eRab.trim() * 1
                        && _t.busyTableData[2].eRab.trim() * 1 < _t.busyTableData[1].eRab.trim() * 1
                        && _t.busyTableData[3].eRab.trim() * 1 <= _t.busyTableData[2].eRab.trim() * 1) {
                        // 表单
                        var formItem = {
                            maxErab: '',
                            maxRpc: '',
                            maxPusch: '',
                            maxPdsch: '',
                            maxPdcch: '',
                            maxUpStream: '',
                            maxDownStream: '',
                            midErabLt: '',
                            midErabGt: '',
                            midRpc: '',
                            midPusch: '',
                            midPdsch: '',
                            midPdcch: '',
                            midUpStream: '',
                            midDownStream: '',
                            minErab: '',
                            minRpc: '',
                            minPusch: '',
                            minPdsch: '',
                            minPdcch: '',
                            minUpStream: '',
                            minDownStream: ''
                        };
                        // 表单赋值
                        formItem.maxErab = _t.busyTableData[0].eRab.trim(); // 大包 小区自忙时
                        formItem.maxRpc = _t.busyTableData[0].RRC.trim();  // 大包rrc
                        formItem.maxPusch = _t.busyTableData[0].pusCh.trim(); // 大包上行
                        formItem.maxPdsch = _t.busyTableData[0].pdsCh.trim(); // 大包下行
                        formItem.maxPdcch = _t.busyTableData[0].pdcCh.trim(); // 大包下行
                        formItem.maxUpStream = _t.busyTableData[0].upStream.trim(); // 大包上行流量
                        formItem.maxDownStream = _t.busyTableData[0].downStream.trim(); // 大包下行流量
                        formItem.midErabLt = _t.busyTableData[1].eRab.trim(); // 中包
                        formItem.midErabGt = _t.busyTableData[2].eRab.trim(); // 中包
                        formItem.midRpc = _t.busyTableData[1].RRC.trim(); // 中包rrc
                        formItem.midPusch = _t.busyTableData[1].pusCh.trim(); // 中包 上行
                        formItem.midPdsch = _t.busyTableData[1].pdsCh.trim(); // 中包 下行
                        formItem.midPdcch = _t.busyTableData[1].pdcCh.trim(); // 中包 下行
                        formItem.midUpStream = _t.busyTableData[1].upStream.trim(); // 大包上行流量
                        formItem.midDownStream = _t.busyTableData[1].downStream.trim(); // 大包下行流量
                        formItem.minErab = _t.busyTableData[3].eRab.trim(); // 小包 自忙时
                        formItem.minRpc = _t.busyTableData[3].RRC.trim(); // 小包 rrc
                        formItem.minPusch = _t.busyTableData[3].pusCh.trim(); // 小包 上行
                        formItem.minPdsch = _t.busyTableData[3].pdsCh.trim(); // 小包 下行
                        formItem.minPdcch = _t.busyTableData[3].pdcCh.trim(); // 小包 下行
                        formItem.minUpStream = _t.busyTableData[3].upStream.trim(); // 小包 上行流量
                        formItem.minDownStream = _t.busyTableData[3].downStream.trim(); // 小包 下行流量
                        _t.$api.post('/params/saveSuperBusyInfo', {
                            id: _t.busyTableForm.id,
                            maxErab: formItem.maxErab, // 大包
                            maxRpc: formItem.maxRpc,  //
                            maxPusch: formItem.maxPusch,
                            maxPdsch: formItem.maxPdsch,
                            maxPdcch: formItem.maxPdcch,
                            maxUpStream: formItem.maxUpStream,
                            maxDownStream: formItem.maxDownStream,
                            midErabLt: formItem.midErabLt, //
                            midErabGt: formItem.midErabGt, //
                            midRpc: formItem.midRpc,
                            midPusch: formItem.midPusch,
                            midPdsch: formItem.midPdsch,
                            midPdcch: formItem.midPdcch,
                            midUpStream: formItem.midUpStream,
                            midDownStream: formItem.midDownStream,
                            minErab: formItem.minErab,
                            minRpc: formItem.minRpc,
                            minPusch: formItem.minPusch,
                            minPdsch: formItem.minPdsch,
                            minPdcch: formItem.minPdcch,
                            minUpStream: formItem.minUpStream,
                            minDownStream: formItem.minDownStream
                        }, function (res) {
                            if (res === true) {
                                _t.$message.success('成功');
                            } else {
                                _t.$message.error('失败');
                            }
                        });
                    } else {
                        _t.$alert('小区自忙时平均E-RAB流量输入有误,请检查!', '温馨提示');
                    }
                }
            },
            //超忙配置表查询
            getDataFive() {
                let _t = this;
                _t.$api.post('/params/getSuperBusyInfo', {}, function (res) {
                    if (res.length !== 0) {
                        _t.busyTableForm.id = res[0].id;
                        // 给表格赋值
                        _t.busyTableData[0].eRab = res[0].maxErab.toString(); // 大包 小区自忙时
                        _t.busyTableData[0].RRC = res[0].maxRpc.toString();  // 大包rrc
                        _t.busyTableData[0].pusCh = res[0].maxPusch.toString(); // 大包上行
                        _t.busyTableData[0].pdsCh = res[0].maxPdsch.toString(); // 大包下行
                        _t.busyTableData[0].pdcCh = res[0].maxPdcch.toString(); // 大包下行
                        _t.busyTableData[0].upStream = res[0].maxUpStream.toString(); // 大包上行流量
                        _t.busyTableData[0].downStream = res[0].maxDownStream.toString(); // 大包下行流量
                        _t.busyTableData[1].eRab = res[0].midErabLt.toString(); // 中包
                        _t.busyTableData[2].eRab = res[0].midErabGt.toString(); // 中包
                        _t.busyTableData[1].RRC = res[0].midRpc.toString(); // 中包rrc
                        _t.busyTableData[1].pusCh = res[0].midPusch.toString(); // 中包 上行
                        _t.busyTableData[1].pdsCh = res[0].midPdsch.toString(); // 中包 下行
                        _t.busyTableData[1].pdcCh = res[0].midPdcch.toString(); // 中包 下行
                        _t.busyTableData[1].upStream = res[0].midUpStream.toString(); // 中包上行流量
                        _t.busyTableData[1].downStream = res[0].midDownStream.toString(); // 中包下行流量
                        _t.busyTableData[3].eRab = res[0].minErab.toString(); // 小包 自忙时
                        _t.busyTableData[3].RRC = res[0].minRpc.toString(); // 小包 rrc
                        _t.busyTableData[3].pusCh = res[0].minPusch.toString(); // 小包 上行
                        _t.busyTableData[3].pdsCh = res[0].minPdsch.toString(); // 小包 下行
                        _t.busyTableData[3].pdcCh = res[0].minPdcch.toString(); // 小包 下行
                        _t.busyTableData[3].upStream = res[0].minUpStream.toString(); // 小包 上行流量
                        _t.busyTableData[3].downStream = res[0].minDownStream.toString(); // 小包 下行流量
                    }
                })
            },
            // 超忙配置表合并
            arraySpanMethod({rowIndex, columnIndex}) {
                if (rowIndex === 1 && columnIndex !== 1) {
                    return {
                        rowspan: 2,
                        colspan: 1
                    }
                }
            },
            // 点击操作及保存按钮
            handleClick(row, index) {
                var _t = this;
                var isSetNum = 0;
                _t.busyTableData.forEach((item) => {
                    if (item.isSet === true) {
                        isSetNum++;
                    }
                });
                // 限制不能进行多行编辑
                if (isSetNum === 0 || row.isSet === true) {
                    // 点击保存
                    if (row.isSet === true) {
                        // 点击了第二行
                        if (index === 1) {
                            if (row.eRab.trim() === ''
                                || _t.busyTableData[2].eRab.trim() === ''
                                || row.pusCh.trim() === ''
                                || row.pdsCh.trim() === ''
                                || row.pdcCh.trim() === ''
                                || row.upStream.trim() === ''
                                || row.downStream.trim() === ''
                                || row.RRC.trim() === '') {
                                _t.$alert('您有为空的输入!', '温馨提示');
                            } else {
                                row.isSet = !row.isSet;
                                _t.busyTableData[2].isSet = !_t.busyTableData[2].isSet;
                            }
                        } else {
                            // 点击了第一行和第三行
                            if (row.eRab.trim() === ''
                                || row.pusCh.trim() === ''
                                || row.pdsCh.trim() === ''
                                || row.pdcCh.trim() === ''
                                || row.upStream.trim() === ''
                                || row.downStream.trim() === ''
                                || row.RRC.trim() === '') {
                                _t.$alert('您有为空的输入!', '温馨提示');
                            } else {
                                row.isSet = !row.isSet;
                            }
                        }
                    } else {
                        // 点击操作
                        row.isSet = !row.isSet;
                        // 点击第二行
                        if (index === 1) {
                            _t.busyTableData[2].isSet = !_t.busyTableData[2].isSet;
                        }
                    }
                } else {
                    _t.$alert('您有未保存的信息,请先保存!', '温馨提示');
                }
            },
            // 利用率大于-1小于101
            userArg (arg) {
              if (arg < 0) {
                  this.cellPusch = 0
              }
              if (arg > 100) {
                  this.cellPusch = 100
              }
            }
        },
        created() {
            let _t = this;
            //计算区域参数查询方法
            _t.getDataOne();
            //容量计算时间查询
            _t.getDataTwo();
            //小区-扇区映射参数查询
            _t.getDataThree();
            //扩容优先级查询
            _t.getDataFour();
            //超忙配置表查询
            _t.getDataFive();
            //获取利用率
            _t.getCellPuschParameterInfot();
        }
    }
</script>

<style scoped>
    /*.btnCla{
      clear: both;
      float: right;
    }*/
</style>
<style>
    .titleTime .el-radio {
        line-height: 40px;
    }
</style>
