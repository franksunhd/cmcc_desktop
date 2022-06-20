<template>
    <div class="SetUpThe">
        <div class="SetUpTheFrom">
            <el-form inline :model="form">
                <el-form-item label="用户名">
                    <el-input v-model="form.userName"/>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="form.userPwd"/>
                </el-form-item>
                <el-form-item label="权限类型">
                    <el-radio-group class="marginLeft50" v-model="radio" @change="handleChange">
                        <el-radio :label="3">全国</el-radio>
                        <el-radio :label="2">省</el-radio>
                        <el-radio :label="1">市</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item style="margin-left: 100px">
                    <el-button type="primary" @click="getUser">保存</el-button>
                    <el-button type="warning" @click="cancel">清除</el-button>
                </el-form-item>
            </el-form>
        </div>
        <hr/>
        <div class="SetUpTheTable">
            <el-table :data="SetUpTheTableData" border>
                <el-table-column prop="userName" label="用户名" header-align="center" align="center"/>
                <el-table-column label="密码" header-align="center" align="center">
                    <template slot-scope="scope">
                        <span>********</span>
                    </template>
                </el-table-column>
                <el-table-column label="权限类型" header-align="center" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.role===1">市</span>
                        <span v-if="scope.row.role===2">省</span>
                        <span v-if="scope.row.role===3">全国</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-button type="danger" @click="getUser_sc(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SetUpThe",
        data() {
            return {
                form: {
                    userName: '',
                    userPwd: '',
                },
                radio: 1,
                SetUpTheTableData: [],
            }
        },
        methods: {
            //radio change事件
            handleChange(val) {
                let _t = this;
                _t.radio = val;
            },
            //确定按钮
            getUser() {
                let _t = this;
                if (_t.form.userName.trim() === '' || _t.form.userPwd.trim() === '') {
                    _t.$message.error('用户名和密码不能为空!');
                } else {
                    _t.$api.post('/user/upsert', {
                        userName: _t.form.userName.trim(),
                        userPwd: _t.form.userPwd.trim(),
                        role: _t.radio
                    }, function (res) {
                        if (res) {
                            _t.get_userGet();
                        }
                    })
                }
            },
            //查询
            get_userGet() {
                let _t = this;
                _t.$api.post('/user/get', {}, function (res) {
                    if (res) {
                        _t.SetUpTheTableData = res;
                    }
                })
            },
            //清除按钮
            cancel() {
                let _t = this;
                _t.form.userPwd = '';
                _t.form.userName = '';
            },
            //删除
            getUser_sc(row) {
                let _t = this;
                let id = row.id;
                _t.$api.post('/user/del/' + id, {}, function (res) {
                    if (res) {
                        _t.get_userGet();
                    }
                })
            }
        },
        mounted() {
            let _t = this;
            _t.get_userGet();
            _t.cancel();
        }
    }
</script>

<style scoped>

</style>
