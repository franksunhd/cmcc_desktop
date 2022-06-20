<template>
    <div class="dataSettings_box">
        <el-tabs v-model="activeName" type="border-card">
            <!--小区工参-->
            <el-tab-pane label="小区工参" name="one">
                <p class="titleText">
                    <span class="lineBg"></span>
                    <span>小区工参导入</span>
                </p>
                <div class="marginBottom20">
                    <el-radio-group v-model="workForm.LTE">
                        <el-radio :label="false">追加导入</el-radio>
                        <el-radio :label="true">覆盖导入</el-radio>
                    </el-radio-group>
                    <el-button class="marginLeft20" type="primary" plain @click="downLoad('lte')">下载模板</el-button>
                    <el-upload
                        class="displayInline marginLeft20"
                        :action="this.$api.root() + 'data/uploadLteInfo'"
                        :data="dataCate.LTE"
                        :disabled="uploadStatus.LTE"
                        name="file"
                        :accept="acceptType"
                        :show-file-list="false"
                        :before-upload="beforeUpload"
                        :on-progress="handleAvatarProgress"
                        :on-success="handleAvatarSuccess"
                        :on-error="handleAvatarError">
                        <el-button
                            type="primary"
                            class="loadingBtn"
                            :disabled="uploadStatus.LTE"
                            v-loading="uploadStatus.LTE"
                            element-loading-spinner="el-icon-loading"
                            @click="addParams('lte')">上传
                        </el-button>
                    </el-upload>
                    <el-button @click="getData" type="primary" class="marginLeft20">查询</el-button>
                    <el-button @click="downLoadLog('lte')" type="warning" class="marginLeft20">下载错误日志</el-button>
                </div>
                <hr>
                <div class="wokeDataTable">
                    <el-table :data="wokeData" v-loading="loading.LTE" element-loading-text="数据加载中..." border
                              height="600">
                        <el-table-column prop="lteId" label="自增ID" header-align="center" align="center"/>
                        <el-table-column prop="cgi" label="CGI" header-align="center" align="center"/>
                        <el-table-column prop="enodebName" label="所属E-NODEB" header-align="center" align="center"/>
                        <el-table-column prop="cellName" label="小区中文名" header-align="center" align="center"/>
                        <el-table-column prop="tac" label="跟踪区码" header-align="center" align="center"/>
                        <el-table-column prop="localCellId" label="小区标识" header-align="center" align="center"/>
                        <el-table-column prop="enbid" label="基站标识" header-align="center" align="center"/>
                        <el-table-column prop="longitude" label="站点经度" header-align="center" align="center"/>
                        <el-table-column prop="latitude" label="站点纬度" header-align="center" align="center"/>
                        <el-table-column prop="coverageType" label="覆盖类型" header-align="center" align="center"/>
                        <el-table-column prop="azimuth" label="方向角" header-align="center" align="center"/>
                        <el-table-column prop="antennaHeight" label="天线挂高" header-align="center" align="center"/>
                        <el-table-column prop="totalDownTiltAngle" label="总下倾角" header-align="center" align="center"/>
                        <el-table-column prop="carrierFfrequencyNum" label="中心载频的信道号" header-align="center"
                                         align="center"/>
                        <el-table-column prop="workFrequencyBand" label="工作频段" header-align="center" align="center"/>
                        <el-table-column prop="pci" label="物理小区识别码" header-align="center" align="center"/>
                        <el-table-column prop="maxTransmitPower" label="最大发射功率" header-align="center" align="center"/>
                        <el-table-column prop="coverScene" label="覆盖场景(13类)" header-align="center" align="center"/>
                        <el-table-column prop="provinceName" label="省份" header-align="center" align="center"/>
                        <el-table-column prop="cityName" label="地市" header-align="center" align="center"/>
                        <el-table-column prop="districtandcounty" label="区县" header-align="center" align="center"/>
                        <el-table-column prop="vendor" label="厂家名称" header-align="center" align="center"/>
                        <el-table-column prop="electronicTiltAngle" label="电子下倾角" header-align="center" align="center"/>
                        <el-table-column prop="mechanicalTiltAngle" label="机械下倾角" header-align="center" align="center"/>
                        <el-table-column prop="isCoreArea" label="是否是核心城区" header-align="center" align="center"/>
                        <el-table-column prop="support3DMimo" label="是否支持3D-MIMO" header-align="center" align="center"/>
                        <el-table-column prop="siteType" label="射频设备型号" header-align="center" align="center"/>
                        <el-table-column prop="supportCarriers" label="支持最大载波数(等效到TDD 20M载波)" header-align="center"
                                         align="center"/>
                        <el-table-column prop="usedCarriers" label="已使用载波数(等效到TDD 20M载波)" header-align="center"
                                         align="center"/>
                        <el-table-column prop="softExpandedCarriers" label="可软扩载波数" header-align="center"
                                         align="center"/>
                    </el-table>
                    <!--分页-->
                    <pages
                        :total="LTEOptions.total"
                        :currentPage="LTEOptions.currentPage"
                        :page-size="LTEOptions.pageSize"
                        @handleSizeChangeSub="handleSizeChangeSubLTE"
                        @handleCurrentChangeSub="handleCurrentChangeLTE"/>
                </div>
            </el-tab-pane>
            <!--NR数据-->
            <el-tab-pane label="NR数据" name="two">
                <p class="titleText">
                    <span class="lineBg"></span>
                    <span>NR数据导入</span>
                </p>
                <div class="marginBottom20">
                    <el-radio-group v-model="workForm.NR">
                        <el-radio :label="false">追加导入</el-radio>
                        <el-radio :label="true">覆盖导入</el-radio>
                    </el-radio-group>
                    <el-button class="marginLeft20" type="primary" plain @click="downLoad('nr')">下载模板</el-button>
                    <el-upload
                        class="displayInline marginLeft20"
                        :action="this.$api.root() + 'data/uploadNrInfo'"
                        :data="dataCate.NR"
                        :disabled="uploadStatus.NR"
                        name="file"
                        :accept="acceptType"
                        :show-file-list="false"
                        :before-upload="beforeUpload"
                        :on-progress="handleAvatarProgressNR"
                        :on-success="handleAvatarSuccess5G"
                        :on-error="handleAvatarError5G">
                        <el-button
                            type="primary"
                            class="loadingBtn"
                            :disabled="uploadStatus.NR"
                            v-loading="uploadStatus.NR"
                            element-loading-spinner="el-icon-loading"
                            @click="addParams('nr')">上传
                        </el-button>
                    </el-upload>
                    <el-button type="primary" class="marginLeft20" @click="getData5g">查询</el-button>
                    <el-button @click="downLoadLog('nr')" type="warning" class="marginLeft20">下载错误日志</el-button>
                </div>
                <hr>
                <el-table :data="fiveData" v-loading="loading.NR" element-loading-text="数据加载中..." border height="600">
                    <el-table-column prop="nrId" label="自增ID" header-align="center" align="center"/>
                    <el-table-column prop="cgi" label="CGI" header-align="center" align="center"/>
                    <el-table-column prop="enodebName" label="所属E-NODEB" header-align="center" align="center"/>
                    <el-table-column prop="cellName" label="小区中文名" header-align="center" align="center"/>
                    <el-table-column prop="tac" label="跟踪区码" header-align="center" align="center"/>
                    <el-table-column prop="localCellId" label="小区标识" header-align="center" align="center"/>
                    <el-table-column prop="enbid" label="基站标识" header-align="center" align="center"/>
                    <el-table-column prop="longitude" label="经度" header-align="center" align="center"/>
                    <el-table-column prop="latitude" label="纬度" header-align="center" align="center"/>
                    <el-table-column prop="coverageType" label="覆盖类型" header-align="center" align="center"/>
                    <el-table-column prop="azimuth" label=" 方位角" header-align="center" align="center"/>
                    <el-table-column prop="antennaHeight" label="天线挂高" header-align="center" align="center"/>
                    <el-table-column prop="totalDownTiltAngle" label="总下倾角" header-align="center" align="center"/>
                    <el-table-column prop="carrierFfrequencyNum" label="中心载频的信道号" header-align="center" align="center"/>
                    <el-table-column prop="workFrequencyBand" label="工作频段" header-align="center" align="center"/>
                    <el-table-column prop="pci" label="物理小区识别码" header-align="center" align="center"/>
                    <el-table-column prop="maxTransmitPower" label="最大发射功率" header-align="center" align="center"/>
                    <el-table-column prop="coverScene" label="覆盖场景(13类)" header-align="center" align="center"/>
                    <el-table-column prop="provinceName" label="省份" header-align="center" align="center"/>
                    <el-table-column prop="cityName" label="地市" header-align="center" align="center"/>
                    <el-table-column prop="districtandcounty" label="区县" header-align="center" align="center"/>
                    <el-table-column prop="vendor" label="厂家名称" header-align="center" align="center"/>
                    <el-table-column prop="electronicTiltAngle" label="电子下倾角" header-align="center" align="center"/>
                    <el-table-column prop="mechanicalTiltAngle" label="机械下倾角" header-align="center" align="center"/>
                    <el-table-column prop="isCoreArea" label="是否是核心城区" header-align="center" align="center"/>
                    <el-table-column prop="support3DMimo" label="是否支持3D-MIMO" header-align="center" align="center"/>
                    <el-table-column prop="siteType" label="射频设备型号" header-align="center" align="center"/>
                </el-table>
                <!--分页-->
                <pages
                    :total="NROptions.total"
                    :currentPage="NROptions.currentPage"
                    :page-size="NROptions.pageSize"
                    @handleSizeChangeSub="handleSizeChangeSubNR"
                    @handleCurrentChangeSub="handleCurrentChangeNR"/>
            </el-tab-pane>
            <!--D频段小区配置参数-->
            <el-tab-pane label="D频段小区配置参数" name="three">
                <p class="titleText">
                    <span class="lineBg"></span>
                    <span>D频段小区配置参数导入</span>
                </p>
                <div class="marginBottom20">
                    <el-radio-group v-model="workForm.DF">
                        <el-radio :label="false">追加导入</el-radio>
                        <el-radio :label="true">覆盖导入</el-radio>
                    </el-radio-group>
                    <el-button class="marginLeft20" type="primary" plain @click="downLoad('d')">下载模板</el-button>
                    <el-upload
                        class="displayInline marginLeft20"
                        :action="this.$api.root() + 'data/uploadParameterInfo'"
                        :data="dataCate.DF"
                        :disabled="uploadStatus.DF"
                        name="file"
                        :accept="acceptType"
                        :show-file-list="false"
                        :before-upload="beforeUpload"
                        :on-progress="handleAvatarProgressD"
                        :on-success="handleAvatarSuccessD"
                        :on-error="handleAvatarErrorD">
                        <el-button
                            type="primary"
                            class="loadingBtn"
                            :disabled="uploadStatus.DF"
                            v-loading="uploadStatus.DF"
                            element-loading-spinner="el-icon-loading"
                            @click="addParams('d')">上传
                        </el-button>
                    </el-upload>
                    <el-button type="primary" class="marginLeft20" @click="getDFData">查询</el-button>
                    <el-button @click="downLoadLog('d')" type="warning" class="marginLeft20">下载错误日志</el-button>
                </div>
                <hr>
                <el-table :data="frequencyTableData" v-loading="loading.DF" element-loading-text="数据加载中..." border
                          height="600">
                    <el-table-column prop="enbid" label="基站标识" header-align="center" align="center"/>
                    <el-table-column prop="cellId" label="小区标识" header-align="center" align="center"/>
                    <el-table-column prop="cellName" label="小区中文名" header-align="center" align="center"/>
                    <el-table-column prop="tac" label="跟踪区码" header-align="center" align="center"/>
                    <el-table-column prop="band" label="上下行子帧配比" header-align="center" align="center"/>
                    <el-table-column prop="fband" label="特殊子帧配比" header-align="center" align="center"/>
                    <el-table-column prop="threshold" label="门限" header-align="center" align="center"/>
                    <el-table-column prop="power" label="功率" header-align="center" align="center"/>
                    <el-table-column prop="neighborRelation" label="邻区关系" header-align="center" align="center"/>
                </el-table>
                <!--分页-->
                <pages
                    :total="DFOptions.total"
                    :currentPage="DFOptions.currentPage"
                    :page-size="DFOptions.pageSize"
                    @handleSizeChangeSub="handleSizeChangeSubDF"
                    @handleCurrentChangeSub="handleCurrentChangeDF"/>
            </el-tab-pane>
            <!--话统数据-->
            <el-tab-pane label="话统数据" name="four">
                <p class="titleText">
                    <span class="lineBg"></span>
                    <span>话统数据导入</span>
                </p>
                <div class="marginBottom20">
                    <el-radio-group v-model="workForm.HT">
                        <el-radio :label="false">追加导入</el-radio>
                        <el-radio :label="true">覆盖导入</el-radio>
                    </el-radio-group>
                    <el-button class="marginLeft20" type="primary" plain @click="downLoad('ht')">下载模板</el-button>
                    <el-upload
                        class="displayInline marginLeft20"
                        :action="this.$api.root() + 'data/uploadTalkInfo'"
                        :data="dataCate.HT"
                        :disabled="uploadStatus.HT"
                        name="file"
                        :accept="acceptType"
                        :show-file-list="false"
                        :before-upload="beforeUpload"
                        :on-progress="handleAvatarProgressHT"
                        :on-success="handleAvatarSuccessHT"
                        :on-error="handleAvatarErrorHT">
                        <el-button
                            type="primary"
                            class="loadingBtn"
                            :disabled="uploadStatus.HT"
                            v-loading="uploadStatus.HT"
                            element-loading-spinner="el-icon-loading"
                            @click="addParams('ht')">上传
                        </el-button>
                    </el-upload>
                    <el-button type="primary" class="marginLeft20" @click="getDataHt">查询</el-button>
                    <el-button @click="downLoadLog('ht')" type="warning" class="marginLeft20">下载错误日志</el-button>
                </div>
                <hr>
                <el-table :data="systemData" v-loading="loading.HT" element-loading-text="数据加载中..." border height="600">
                    <el-table-column prop="datatime" label="日期" header-align="center" align="center"/>
                    <el-table-column prop="eci" label="ECI" header-align="center" align="center"/>
                    <el-table-column prop="cgi" label="CGI" header-align="center" align="center"/>
                    <el-table-column prop="erab" label="小区自忙时平均E-RAB流量(KB)" header-align="center" align="center"/>
                    <el-table-column prop="rrc" label="有数据传输的RRC数" header-align="center" align="center"/>
                    <el-table-column prop="pusch" label="上行利用率PUSCH(%)" header-align="center" align="center"/>
                    <el-table-column prop="pdsch" label="下行利用率PDSCH(%)" header-align="center" align="center"/>
                    <el-table-column prop="pdcch" label="下行利用率PDCCH(%)" header-align="center" align="center"/>
                    <el-table-column prop="upStream" label="上行流量(GB)" header-align="center" align="center"/>
                    <el-table-column prop="downStream" label="下行流量(GB)" header-align="center" align="center"/>
                </el-table>
                <!--分页-->
                <pages
                    :total="HTOptions.total"
                    :currentPage="HTOptions.currentPage"
                    :page-size="HTOptions.pageSize"
                    @handleSizeChangeSub="handleSizeChangeSubHT"
                    @handleCurrentChangeSub="handleCurrentChangeHT"/>
            </el-tab-pane>
            <!--邻区关系表-->
            <el-tab-pane label="邻区关系表" name="five">
                <p class="titleText">
                    <span class="lineBg"></span>
                    <span>邻区关系表数据导入</span>
                </p>
                <div class="marginBottom20">
                    <el-radio-group v-model="workForm.NRS">
                        <el-radio :label="false">追加导入</el-radio>
                        <el-radio :label="true">覆盖导入</el-radio>
                    </el-radio-group>
                    <el-button class="marginLeft20" type="primary" plain @click="downLoad('nrs')">下载模板</el-button>
                    <el-upload
                        class="displayInline marginLeft20"
                        :action="this.$api.root() + 'data/uploadNeighborRelationshipInfo'"
                        :data="dataCate.NRS"
                        :disabled="uploadStatus.NRS"
                        name="file"
                        :accept="acceptType"
                        :show-file-list="false"
                        :before-upload="beforeUpload"
                        :on-progress="handleAvatarProgressNRS"
                        :on-success="handleAvatarSuccessNRS"
                        :on-error="handleAvatarErrorNRS">
                        <el-button
                            type="primary"
                            class="loadingBtn"
                            :disabled="uploadStatus.NRS"
                            v-loading="uploadStatus.NRS"
                            element-loading-spinner="el-icon-loading"
                            @click="addParams('nrs')">上传
                        </el-button>
                    </el-upload>
                    <el-button type="primary" class="marginLeft20" @click="getDataLqg">查询</el-button>
                    <el-button @click="downLoadLog('nrs')" type="warning" class="marginLeft20">下载错误日志</el-button>
                </div>
                <hr>
                <el-table :data="regionTableData" v-loading="loading.NRS" element-loading-text="数据加载中..." border
                          height="600">
                    <el-table-column prop="enbid" label="基站标识" header-align="center" align="center"/>
                    <el-table-column prop="cellId" label="小区标识" header-align="center" align="center"/>
                    <el-table-column prop="nenbId" label="邻区基站标识" header-align="center" align="center"/>
                    <el-table-column prop="nCellId" label="邻区小区标识" header-align="center" align="center"/>
                </el-table>
                <!--分页-->
                <pages
                    :total="NRSOptions.total"
                    :currentPage="NRSOptions.currentPage"
                    :page-size="NRSOptions.pageSize"
                    @handleSizeChangeSub="handleSizeChangeSubNRS"
                    @handleCurrentChangeSub="handleCurrentChangeNRS"/>
            </el-tab-pane>
            <!--邻区统计数据-->
            <el-tab-pane label="邻区统计数据" name="six">
                <p class="titleText">
                    <span class="lineBg"></span>
                    <span>邻区统计数据导入</span>
                </p>
                <div class="marginBottom20">
                    <el-radio-group v-model="workForm.NS">
                        <el-radio :label="false">追加导入</el-radio>
                        <el-radio :label="true">覆盖导入</el-radio>
                    </el-radio-group>
                    <el-button class="marginLeft20" type="primary" plain @click="downLoad('ns')">下载模板</el-button>
                    <el-upload
                        class="displayInline marginLeft20"
                        :action="this.$api.root() + 'data/uploadNeighborStatisticsInfo'"
                        :data="dataCate.NS"
                        :disabled="uploadStatus.NS"
                        name="file"
                        :accept="acceptType"
                        :show-file-list="false"
                        :before-upload="beforeUpload"
                        :on-progress="handleAvatarProgressNS"
                        :on-success="handleAvatarSuccessNS"
                        :on-error="handleAvatarErrorNS">
                        <el-button
                            type="primary"
                            class="loadingBtn"
                            :disabled="uploadStatus.NS"
                            v-loading="uploadStatus.NS"
                            element-loading-spinner="el-icon-loading"
                            @click="addParams('ns')">上传
                        </el-button>
                    </el-upload>
                    <el-button type="primary" class="marginLeft20" @click="getDataLqt">查询</el-button>
                    <el-button @click="downLoadLog('ns')" type="warning" class="marginLeft20">下载错误日志</el-button>
                </div>
                <hr>
                <el-table :data="statusTableData" v-loading="loading.NS" element-loading-text="数据加载中..." border
                          height="600">
                    <el-table-column prop="datetime" label="日期" header-align="center" align="center"/>
                    <el-table-column prop="enbid" label="基站标识" header-align="center" align="center"/>
                    <el-table-column prop="cellId" label="小区标识" header-align="center" align="center"/>
                    <el-table-column prop="nenbId" label="邻区基站标识" header-align="center" align="center"/>
                    <el-table-column prop="nCellId" label="邻区小区标识" header-align="center" align="center"/>
                    <el-table-column prop="switchApplicationTimes" label="切换申请次数" header-align="center" align="center"/>
                    <el-table-column prop="switchSuccessfulTimes" label="切换成功次数" header-align="center" align="center"/>
                </el-table>
                <!--分页-->
                <pages
                    :total="NSOptions.total"
                    :currentPage="NSOptions.currentPage"
                    :page-size="NSOptions.pageSize"
                    @handleSizeChangeSub="handleSizeChangeSubNS"
                    @handleCurrentChangeSub="handleCurrentChangeNS"/>
            </el-tab-pane>
            <!--终端支持受限基站退频清单-->
            <el-tab-pane label="终端支持受限基站退频清单" name="seven">
                <p class="titleText">
                    <span class="lineBg"></span>
                    <span>终端支持受限基站退频清单导入</span>
                </p>
                <div class="marginBottom20">
                    <el-radio-group v-model="workForm.T">
                        <el-radio :label="false">追加导入</el-radio>
                        <el-radio :label="true">覆盖导入</el-radio>
                    </el-radio-group>
                    <el-button class="marginLeft20" type="primary" plain @click="downLoad('t')">下载模板</el-button>
                    <el-upload
                        class="displayInline marginLeft20"
                        :action="this.$api.root() + 'data/uploadTerminalInfo'"
                        :data="dataCate.T"
                        :disabled="uploadStatus.T"
                        name="file"
                        :accept="acceptType"
                        :show-file-list="false"
                        :before-upload="beforeUpload"
                        :on-progress="handleAvatarProgressZD"
                        :on-success="handleAvatarSuccessZD"
                        :on-error="handleAvatarErrorZD">
                        <el-button
                            type="primary"
                            class="loadingBtn"
                            :disabled="uploadStatus.T"
                            v-loading="uploadStatus.T"
                            element-loading-spinner="el-icon-loading"
                            @click="addParams('t')">上传
                        </el-button>
                    </el-upload>
                    <el-button @click="downLoadLog('t')" type="warning" class="marginLeft20">下载错误日志</el-button>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: "dataSettings",
        data() {
            return {
                // 标签页的默认选中
                activeName: 'one',
                // 追加导入及覆盖导入
                workForm: {
                    LTE: true, // 小工工参
                    NR: true, // NR数据
                    DF: true, // D频段
                    HT: true, // 话统数据
                    NRS: true, // 邻区关系表
                    NS: true, // 邻区统计表
                    T: true, // 终端退频
                },
                // 小区工参表
                wokeData: [],
                // 话筒数据表
                systemData: [],
                // 邻区关系表
                regionTableData: [],
                // 邻区统计表
                statusTableData: [],
                // D频段
                frequencyTableData: [],
                // NR数据
                fiveData: [],
                // 上传接口传参
                dataCate: {
                    // 小区工参
                    LTE: {truncate: true},
                    // NR
                    NR: {truncate: true},
                    // D频段
                    DF: {truncate: true},
                    // 话统数据
                    HT: {truncate: true},
                    // 邻区关系表
                    NRS: {truncate: true},
                    // 邻区统计表
                    NS: {truncate: true},
                    // 终端退频
                    T: {truncate: true},
                },
                // 表格数据loading
                loading: {
                    LTE: false, // 小区工参
                    NR: false, // NR数据
                    DF: false, // D频段
                    HT: false, // 话统数据
                    NRS: false, // 邻区关系表
                    NS: false, // 邻区统计表
                    T: false, // 终端
                },
                // 文件上传
                acceptType: '.xls,.xlsx',
                // 上传时的状态
                uploadStatus: {
                    LTE: false, // 小区工参
                    NR: false, // NR数据
                    DF: false, // D频段
                    HT: false, // 话统数据
                    NRS: false, // 邻区关系表
                    NS: false, // 邻区统计表
                    T: false, // 终端退频
                },
                // 小区工参分页
                LTEOptions: {
                    total: 0, // 总条数
                    currentPage: 1, // 当前页码
                    pageSize: 1000 // 显示条数
                },
                // NR数据分页
                NROptions: {
                    total: 0, // 总条数
                    currentPage: 1, // 当前页码
                    pageSize: 1000 // 显示条数
                },
                // D频段分页
                DFOptions: {
                    total: 0, // 总条数
                    currentPage: 1, // 当前页码
                    pageSize: 1000 // 显示条数
                },
                // 话统数据分页
                HTOptions: {
                    total: 0, // 总条数
                    currentPage: 1, // 当前页码
                    pageSize: 1000 // 显示条数
                },
                // 邻区关系表分页
                NRSOptions: {
                    total: 0, // 总条数
                    currentPage: 1, // 当前页码
                    pageSize: 1000 // 显示条数
                },
                // 邻区统计表分页
                NSOptions: {
                    total: 0, // 总条数
                    currentPage: 1, // 当前页码
                    pageSize: 1000 // 显示条数
                }
            }
        },
        methods: {
            // 下载模板
            downLoad(flag) {
                var _t = this;
                var fileName = _t.$api.root() + 'templet/' + flag;
                window.location.href = fileName;
            },
            // 下载错误日志
            downLoadLog(flag) {
                var _t = this;
                _t.$api.get('data/exist/' + flag, {}, function (res) {
                    if (res === true) {
                        var fileName = _t.$api.root() + 'log/' + flag;
                        window.location.href = fileName;
                    } else {
                        _t.$confirm('没有错误日志!', '温馨提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            return false;
                        }).catch(() => {
                            return false;
                        });
                    }
                });
            },
            // 点击上传按钮将是否覆盖导入赋值传参
            addParams(flag) {
                var _t = this;
                if (flag === 'lte') {
                    // 小区工参
                    _t.dataCate.LTE.truncate = _t.workForm.LTE;
                } else if (flag === 'nr') {
                    // NR
                    _t.dataCate.NR.truncate = _t.workForm.NR;
                } else if (flag === 'd') {
                    // D频段
                    _t.dataCate.DF.truncate = _t.workForm.DF;
                } else if (flag === 'ht') {
                    // 话统数据
                    _t.dataCate.HT.truncate = _t.workForm.HT;
                } else if (flag === 'nrs') {
                    // 邻区关系表
                    _t.dataCate.NRS.truncate = _t.workForm.NRS;
                } else if (flag === 'ns') {
                    // 邻区统计表
                    _t.dataCate.NS.truncate = _t.workForm.NS;
                } else if (flag === 't') {
                    // 终端
                    _t.dataCate.T.truncate = _t.workForm.T;
                }
            },
            // 小区工参上传前
            beforeUpload(file) {
                var _t = this;
                var FileExt = file.name.replace(/.+\./, "");
                var isExcel = false;
                if (FileExt === 'xlsx' || FileExt === 'xls') {
                    isExcel = true;
                }
                var fileSize = file.size / 1024 / 1024 < 100;
                if (!isExcel) {
                    _t.$message.error('只能上传xlsx或者xls格式的文件!');
                }
                if (!fileSize) {
                    _t.$message.error('您的文件大小超出100M!');
                }
                return fileSize && isExcel;
            },
            // 小区工参上传时
            handleAvatarProgress(event, file, fileList) {
                var _t = this;
                _t.uploadStatus.LTE = true;
            },
            // 小区工参上传成功后执行
            handleAvatarSuccess(val, file, fileList) {
                let _t = this;
                _t.uploadStatus.LTE = false;
                if (val === true) {
                    _t.$message.success('上传成功!');
                    _t.getData();
                } else {
                    _t.$message.error('上传失败!');
                }
            },
            // 小区工参失败
            handleAvatarError(err, file, fileList) {
                var _t = this;
                _t.uploadStatus.LTE = false;
                _t.$message.error('上传失败!');
            },
            // 小区工参table数据获取
            getData() {
                let _t = this;
                _t.loading.LTE = true;
                _t.$api.post('/data/getLteInfo', {
                    page: _t.LTEOptions.currentPage, // 当前页
                    limit: _t.LTEOptions.pageSize, // 每页显示条数
                }, function (res) {
                    _t.loading.LTE = false;
                    if (res) {
                        _t.wokeData = res.content !== null ? res.content : [];
                        _t.LTEOptions.total = res.total !== null ? res.total : 0;
                    } else {
                        _t.LTEOptions.total = 0;
                        _t.wokeData = [];
                        _t.$message.error('表格数据查询失败!');
                    }
                })
            },
            // 改变当前页码
            handleCurrentChangeLTE(val) {
                var _t = this;
                _t.LTEOptions.currentPage = val;
                _t.getData();
            },
            // 改变每页显示条数
            handleSizeChangeSubLTE(val) {
                var _t = this;
                _t.LTEOptions.pageSize = val;
                _t.getData();
            },
            // NR上传时
            handleAvatarProgressNR(event, file, fileList) {
                var _t = this;
                _t.uploadStatus.NR = true;
            },
            // NR上传成功
            handleAvatarSuccess5G(val, file, fileList) {
                let _t = this;
                _t.uploadStatus.NR = false;
                if (val === true) {
                    _t.$message.success('上传成功!');
                    _t.getData5g();
                } else {
                    _t.$message.error('上传失败!');
                }
            },
            // NR上传失败
            handleAvatarError5G(err, file, fileList) {
                var _t = this;
                _t.uploadStatus.NR = false;
                _t.$message.error('上传失败!');
            },
            // 查询NR数据
            getData5g() {
                let _t = this;
                _t.loading.NR = true;
                _t.$api.post('/data/getNrInfo', {
                    page: _t.NROptions.currentPage, // 当前页
                    limit: _t.NROptions.pageSize, // 每页显示条数
                }, function (res) {
                    _t.loading.NR = false;
                    if (res) {
                        _t.fiveData = res.content !== null ? res.content : [];
                        _t.NROptions.total = res.total !== null ? res.total : 0;
                    } else {
                        _t.NROptions.total = 0;
                        _t.fiveData = [];
                        _t.$message.error('表格数据查询失败!');
                    }
                });
            },
            // 改变当前页码
            handleCurrentChangeNR(val) {
                var _t = this;
                _t.NROptions.currentPage = val;
                _t.getData5g();
            },
            // 改变每页显示条数
            handleSizeChangeSubNR(val) {
                var _t = this;
                _t.NROptions.pageSize = val;
                _t.getData5g();
            },
            // D频段小区配置上传时
            handleAvatarProgressD(event, file, fileList) {
                var _t = this;
                _t.uploadStatus.DF = true;
            },
            // D频段小区配置上传成功
            handleAvatarSuccessD(val, file, fileList) {
                let _t = this;
                _t.uploadStatus.DF = false;
                if (val === true) {
                    _t.$message.success('上传成功!');
                    _t.getDFData();
                } else {
                    _t.$message.error('上传失败!');
                }
            },
            // D频段小区配置上传失败
            handleAvatarErrorD(err, file, fileList) {
                var _t = this;
                _t.uploadStatus.DF = false;
                _t.$message.error('上传失败!');
            },
            // 获取D频段小区数据
            getDFData() {
                let _t = this;
                _t.loading.DF = true;
                _t.$api.post('/data/getParameterInfo', {
                    page: _t.DFOptions.currentPage, // 当前页
                    limit: _t.DFOptions.pageSize, // 每页显示条数
                }, function (res) {
                    _t.loading.DF = false;
                    if (res) {
                        _t.frequencyTableData = res.content !== null ? res.content : [];
                        _t.DFOptions.total = res.total !== null ? res.total : 0;
                    } else {
                        _t.DFOptions.total = 0;
                        _t.frequencyTableData = [];
                        _t.$message.error('表格数据查询失败!');
                    }
                });
            },
            // 改变当前页码
            handleCurrentChangeDF(val) {
                var _t = this;
                _t.DFOptions.currentPage = val;
                _t.getDFData();
            },
            // 改变每页显示条数
            handleSizeChangeSubDF(val) {
                var _t = this;
                _t.DFOptions.pageSize = val;
                _t.getDFData();
            },
            // 话统数据 上传时
            handleAvatarProgressHT(event, file, fileList) {
                var _t = this;
                _t.uploadStatus.HT = true;
            },
            // 话统数据上传成功后执行
            handleAvatarSuccessHT(val, file, fileList) {
                let _t = this;
                _t.uploadStatus.HT = false;
                if (val === true) {
                    _t.$message.success('上传成功!');
                    _t.getDataHt();
                } else {
                    _t.$message.error('上传失败!');
                }
            },
            // 话统失败
            handleAvatarErrorHT(err, file, fileList) {
                var _t = this;
                _t.uploadStatus.HT = false;
                _t.$message.error('上传失败!');
            },
            // 话统数据Table获取
            getDataHt() {
                let _t = this;
                _t.loading.HT = true;
                _t.$api.post('/data/getTalkInfo', {
                    page: _t.HTOptions.currentPage, // 当前页
                    limit: _t.HTOptions.pageSize, // 每页显示条数
                }, function (res) {
                    _t.loading.HT = false;
                    if (res) {
                        _t.systemData = res.content !== null ? res.content : [];
                        _t.HTOptions.total = res.total !== null ? res.total : 0;
                    } else {
                        _t.HTOptions.total = 0;
                        _t.systemData = [];
                        _t.$message.error('表格数据查询失败!');
                    }
                })
            },
            // 改变当前页码
            handleCurrentChangeHT(val) {
                var _t = this;
                _t.HTOptions.currentPage = val;
                _t.getDataHt();
            },
            // 改变每页显示条数
            handleSizeChangeSubHT(val) {
                var _t = this;
                _t.HTOptions.pageSize = val;
                _t.getDataHt();
            },
            // 邻区关系表 上传时
            handleAvatarProgressNRS(event, file, fileList) {
                var _t = this;
                _t.uploadStatus.NRS = true;
            },
            // 邻区关系表上传成功后执行
            handleAvatarSuccessNRS(val, file, fileList) {
                let _t = this;
                _t.uploadStatus.NRS = false;
                if (val === true) {
                    _t.$message.success('上传成功!');
                    _t.getDataLqg();
                } else {
                    _t.$message.error('上传失败!');
                }
            },
            // 邻区关系表失败
            handleAvatarErrorNRS(err, file, fileList) {
                var _t = this;
                _t.uploadStatus.NRS = false;
                _t.$message.error('上传失败!');
            },
            // 邻区关系表Table获取
            getDataLqg() {
                let _t = this;
                _t.loading.NRS = true;
                _t.$api.post('/data/getNeighborRelationshipInfo', {
                    page: _t.NRSOptions.currentPage, // 当前页
                    limit: _t.NRSOptions.pageSize, // 每页显示条数
                }, function (res) {
                    _t.loading.NRS = false;
                    if (res) {
                        _t.regionTableData = res.content !== null ? res.content : [];
                        _t.NRSOptions.total = res.total !== null ? res.total : 0;
                    } else {
                        _t.NRSOptions.total = 0;
                        _t.regionTableData = [];
                        _t.$message.error('表格数据查询失败!');
                    }
                })
            },
            // 改变当前页码
            handleCurrentChangeNRS(val) {
                var _t = this;
                _t.NRSOptions.currentPage = val;
                _t.getDataLqg();
            },
            // 改变每页显示条数
            handleSizeChangeSubNRS(val) {
                var _t = this;
                _t.NRSOptions.pageSize = val;
                _t.getDataLqg();
            },
            // 邻区统计表 上传时
            handleAvatarProgressNS(event, file, fileLis) {
                var _t = this;
                _t.uploadStatus.NS = true;
            },
            // 邻区统计表上传成功后执行
            handleAvatarSuccessNS(val, file, fileList) {
                let _t = this;
                _t.uploadStatus.NS = false;
                if (val === true) {
                    _t.$message.success('上传成功!');
                    _t.getDataLqt();
                } else {
                    _t.$message.error('上传失败!');
                }
            },
            // 邻区统计表上传失败
            handleAvatarErrorNS(err, file, fileList) {
                var _t = this;
                _t.uploadStatus.NS = false;
                _t.$message.error('上传失败!');
            },
            // 邻区统计表Table获取
            getDataLqt() {
                let _t = this;
                _t.loading.NS = true;
                _t.$api.post('/data/getNeighborStatisticsInfo', {
                    page: _t.NSOptions.currentPage, // 当前页
                    limit: _t.NSOptions.pageSize, // 每页显示条数
                }, function (res) {
                    _t.loading.NS = false;
                    if (res) {
                        _t.statusTableData = res.content !== null ? res.content : [];
                        _t.NSOptions.total = res.total !== null ? res.total : 0;
                    } else {
                        _t.NSOptions.total = 0;
                        _t.statusTableData = [];
                        _t.$message.error('表格数据查询失败!');
                    }
                })
            },
            // 改变当前页码
            handleCurrentChangeNS(val) {
                var _t = this;
                _t.NSOptions.currentPage = val;
                _t.getDataLqt();
            },
            // 改变每页显示条数
            handleSizeChangeSubNS(val) {
                var _t = this;
                _t.NSOptions.pageSize = val;
                _t.getDataLqt();
            },
            // 终端上传时
            handleAvatarProgressZD(event, file, fileLis) {
                var _t = this;
                _t.uploadStatus.T = true;
            },
            // 终端上传成功后执行
            handleAvatarSuccessZD(val, file, fileList) {
                let _t = this;
                _t.uploadStatus.T = false;
                if (val === true) {
                    _t.$message.success('上传成功!');
                } else {
                    _t.$message.error('上传失败!');
                }
            },
            // 终端上传失败后执行
            handleAvatarErrorZD(err, file, fileList) {
                var _t = this;
                _t.uploadStatus.T = false;
                _t.$message.error('上传失败!');
            },
        }
    }
</script>

<style scoped>

</style>
