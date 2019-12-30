<template>
    <div>
        <el-form label-position="left" :inline="true" ref="form" :model="form" label-width="110px">
            <div class="firstText">
                <span></span>
                <span>

            <el-button type="primary" @click="resumeSuccess()">提交</el-button>
                </span>
            </div>
            <el-container>
                <el-aside width="70%">
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="编号">
                                <el-input v-model="form.num" class="width" :disabled="formControl"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="性别">
                                <el-radio :disabled="formControl" v-model="form.checked" label="1">男</el-radio>
                                <el-radio :disabled="formControl" v-model="form.checked" label="2">女</el-radio>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="姓名">
                                <el-input v-model="form.name" class="width" :disabled="formControl"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="民族">
                                <el-input v-model="form.ethnic" class="width" :disabled="formControl"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="出生日期">
                                <el-date-picker
                                        :disabled="formControl"
                                        class="width"
                                        v-model="form.birthday"
                                        type="date"
                                        placeholder="选择日期"
                                >
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="出生地">
                                <el-input v-model="form.birthPlace" class="width" :disabled="formControl"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="学历学位">
                                <el-input v-model="form.edu" class="width" :disabled="formControl"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="籍贯">
                                <el-input v-model="form.nativePlace" class="width" :disabled="formControl"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="现警衔">
                                <el-input v-model="form.rankValue" class="width"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="现警衔任职时间">
                                <el-date-picker
                                        class="width"
                                        v-model="form.rankValueTime"
                                        type="date"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-aside>
                <el-main>
                    <el-row>
                        <el-col :span="10">
                            <el-upload
                                    action=""
                                    class="avatar-uploader"
                                    :http-request="upload"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-col>
                    </el-row>

                </el-main>
            </el-container>

            <el-row>
                <el-col :span="7">
                    <el-form-item label="组织机构">
                        <el-select clearable  v-model="form.organization" @change="organizationChange" placeholder="请选择">
                            <el-option

                                    v-for="item in organizationOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="现任职务">
                        <el-input v-model="form.presentOccupation" class="width"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="现任职务时间">
                        <el-date-picker
                                class="width"
                                v-model="form.presentOccupationTime"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="现部职别">
                        <el-input v-model="form.level" class="width"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="现部职别时间">
                        <el-date-picker
                                class="width"
                                v-model="form.levelTime"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="年龄">
                        <el-input v-model="form.age" class="width" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="入伍时间">
                        <el-date-picker
                                class="width"
                                v-model="form.militaryTime"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd hh:mm:ss"
                        >
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="个人简历" name="1">
                <el-collapse v-model="activeNames" @change="handleChange">
                    <el-collapse-item title="培训经历" name="1">
                        <el-col style="text-align: right">
                            <el-button type="primary" @click="openModel(1)">
                                <i class="el-icon-circle-plus-outline" style="font-size: 15px">新增</i>
                            </el-button>
                        </el-col>
                        <el-table
                                border
                                :data="tableData1"
                                style="width: 100%">
                            <el-table-column
                                    prop="trainStartTime"
                                    align="center"
                                    label="开始时间"
                                    min-width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="trainEndTime"
                                    align="center"
                                    label="结束时间"
                                    min-width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="trainInstitution"
                                    align="center"
                                    label="培训机构"
                                    min-width="220">
                            </el-table-column>
                            <el-table-column
                                    prop="trainStatus"
                                    align="center"
                                    label="状态">
                            </el-table-column>
                            <el-table-column
                                    label="操作"
                                    min-width="100"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                            size="mini"
                                            @click="handleEdit(scope.$index, scope.row,1)">编辑
                                    </el-button>
                                    <el-popconfirm
                                            @onConfirm="handleDelete( scope.row,1)"
                                            confirmButtonText='确定'
                                            cancelButtonText='不用了'
                                            icon="el-icon-info"
                                            iconColor="red"
                                            title="这是一段内容确定删除吗？"
                                    >
                                        <el-button size="mini" slot="reference">删除</el-button>
                                    </el-popconfirm>

                                </template>
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                    <el-collapse-item title="参战记录" name="2">
                        <el-col style="text-align: right">
                            <el-button type="primary" @click="openModel(2)">
                                <i class="el-icon-circle-plus-outline" style="font-size: 15px">新增</i>
                            </el-button>
                        </el-col>
                        <el-table
                                border
                                :data="tableData2"
                                style="width: 100%">
                            <el-table-column
                                    prop="joinWarStartTime"
                                    align="center"
                                    label="参战开始时间"
                                    min-width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="joinWarEndTime"
                                    align="center"
                                    label="参战结束时间"
                                    min-width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="warName"
                                    align="center"
                                    label="参战名称"
                                    min-width="220">
                            </el-table-column>
                            <el-table-column
                                    prop="remark"
                                    align="center"
                                    label="备注">
                            </el-table-column>
                            <el-table-column
                                    label="操作"
                                    min-width="100"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                            size="mini"
                                            @click="handleEdit(scope.$index, scope.row,2)">编辑
                                    </el-button>
                                    <el-popconfirm
                                            @onConfirm="handleDelete( scope.row,2)"
                                            confirmButtonText='确定'
                                            cancelButtonText='不用了'
                                            icon="el-icon-info"
                                            iconColor="red"
                                            title="这是一段内容确定删除吗？"
                                    >
                                        <el-button size="mini" slot="reference">删除</el-button>
                                    </el-popconfirm>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                    <el-collapse-item title="参加非战争军事行动记录" name="3">
                        <el-col style="text-align: right">
                            <el-button type="primary" @click="openModel(3)">
                                <i class="el-icon-circle-plus-outline" style="font-size: 15px">新增</i>
                            </el-button>
                        </el-col>
                        <el-table
                                border
                                :data="tableData3"
                                style="width: 100%">
                            <el-table-column
                                    prop="joinWarStartTime"
                                    align="center"
                                    label="行动开始时间"
                                    min-width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="joinWarEndTime"
                                    align="center"
                                    label="行动结束时间"
                                    min-width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="warName"
                                    align="center"
                                    label="行动名称"
                                    min-width="220">
                            </el-table-column>
                            <el-table-column
                                    prop="remark"
                                    align="center"
                                    label="备注">
                            </el-table-column>
                            <el-table-column
                                    label="操作"
                                    min-width="100"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                            size="mini"
                                            @click="handleEdit(scope.$index, scope.row,3)">编辑
                                    </el-button>
                                    <el-popconfirm
                                            @onConfirm="handleDelete( scope.row,3)"
                                            confirmButtonText='确定'
                                            cancelButtonText='不用了'
                                            icon="el-icon-info"
                                            iconColor="red"
                                            title="这是一段内容确定删除吗？"
                                    >
                                        <el-button size="mini" slot="reference">删除</el-button>
                                    </el-popconfirm>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                    <el-collapse-item title="奖惩记录" name="4">
                        <el-col style="text-align: right">
                            <el-button type="primary" @click="openModel(4)">
                                <i class="el-icon-circle-plus-outline" style="font-size: 15px">新增</i>
                            </el-button>
                        </el-col>
                        <el-table
                                border
                                :data="tableData4"
                                style="width: 100%">
                            <el-table-column
                                    prop="prizeTime"
                                    align="center"
                                    label="时间"
                                    min-width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="prizeDescription"
                                    align="center"
                                    label="荣誉/处罚"
                                    min-width="300">
                            </el-table-column>
                            <el-table-column
                                    prop="remark"
                                    align="center"
                                    label="备注">
                            </el-table-column>
                            <el-table-column
                                    label="操作"
                                    min-width="100"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                            size="mini"
                                            @click="handleEdit(scope.$index, scope.row,4)">编辑
                                    </el-button>
                                    <el-popconfirm
                                            @onConfirm="handleDelete( scope.row,4)"
                                            confirmButtonText='确定'
                                            cancelButtonText='不用了'
                                            icon="el-icon-info"
                                            iconColor="red"
                                            title="这是一段内容确定删除吗？"
                                    >
                                        <el-button size="mini" slot="reference">删除</el-button>
                                    </el-popconfirm>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-collapse-item>
                    <el-collapse-item title="简历" name="5">
                        <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                            <i class="el-icon-edit" style="font-size: 30px;float: right" @click="textareaEdit"></i>
                        </el-tooltip>
                        <el-input
                                type="textarea"
                                :rows="10"
                                placeholder="请输入内容"
                                v-model="textarea"
                                :disabled="textareaControl">
                        </el-input>
                        请注意，简历最多只能提交1000个字符！
                        <el-tooltip class="item" effect="dark" content="提交简历" placement="top-start">
                            <i class="el-icon-success" style="font-size: 30px;float: right" @click="infoSuccess(1)"></i>
                        </el-tooltip>
                    </el-collapse-item>
                    <el-collapse-item title="述职报告" name="6">
                        <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                            <i class="el-icon-edit" style="font-size: 30px;float: right" @click="reportEdit"></i>
                        </el-tooltip>
                        <el-input
                                type="textarea"
                                :rows="10"
                                placeholder="请输入内容"
                                v-model="reportArea"
                                :disabled="reportControl">
                        </el-input>
                        请注意，述职报告最少需要提交1000个字符，最多2000个字符！
                        <el-tooltip class="item" effect="dark" content="提交简历" placement="top-start">
                            <i class="el-icon-success" style="font-size: 30px;float: right" @click="infoSuccess(2)"></i>
                        </el-tooltip>
                    </el-collapse-item>
                </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="档案情况审查" name="2">
                <div class="firstText">
                    <span>家庭成员及重要社会关系</span>
                    <span>
                         <el-button type="primary" @click="openModel(5)">
                                <i class="el-icon-circle-plus-outline" style="font-size: 15px">新增</i>
                            </el-button>
                    </span>
                </div>
                <el-table
                        border
                        :data="familyData"
                        style="width: 100%">
                    <el-table-column
                            prop="appellation"
                            label="称谓"
                            align="center"
                            min-width="110">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="姓名"
                            align="center"
                            min-width="110">
                    </el-table-column>
                    <el-table-column
                            prop="birthday"
                            align="center"
                            min-width="110"
                            label="生日">
                    </el-table-column>
                    <el-table-column
                            prop="politicsStatus"
                            align="center"
                            min-width="110"
                            label="政治面貌">
                    </el-table-column>
                    <el-table-column
                            prop="workInfo"
                            align="center"
                            min-width="110"
                            label="工作单位及职务">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            min-width="110"
                    >
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row,5)">编辑
                            </el-button>
                            <el-popconfirm
                                    @onConfirm="handleDelete( scope.row,5)"
                                    confirmButtonText='确定'
                                    cancelButtonText='不用了'
                                    icon="el-icon-info"
                                    iconColor="red"
                                    title="这是一段内容确定删除吗？"
                            >
                                <el-button size="mini" slot="reference">删除</el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <!--                <el-pagination-->
                <!--                        style="text-align: right"-->
                <!--                        background-->
                <!--                        layout="prev, pager, next"-->
                <!--                        :total="50"-->
                <!--                        @current-change="pageChange">-->
                <!--                </el-pagination>-->
                <el-divider></el-divider>
                <div style="text-align: right">
                    <el-button type="primary" @click="addInvestigate(1)">
                        <i class="el-icon-circle-plus-outline" style="font-size: 15px">新增</i>
                    </el-button>
                </div>
                <el-table
                        border
                        :data="otherFamilyData"
                        style="width: 100%">
                    <el-table-column
                            prop="state"
                            label="档案核查情况"
                            align="center"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="title"
                            label="核查说明"
                            align="center"
                            min-width="200">
                    </el-table-column>
                    <el-table-column
                            prop="checkDesc"
                            label="其他说明"
                            align="center"
                            min-width="200">
                    </el-table-column>
                    <el-table-column
                            prop="checkUser"
                            align="center"
                            min-width="90"
                            label="审查人">
                    </el-table-column>
                    <el-table-column
                            prop="checkTime"
                            align="center"
                            min-width="110"
                            label="审查时间">
                    </el-table-column>
                    <!--                    <el-table-column-->
                    <!--                            prop="loginName"-->
                    <!--                            align="center"-->
                    <!--                            min-width="90"-->
                    <!--                            label="登录人">-->
                    <!--                    </el-table-column>-->
                    <!--                    <el-table-column-->
                    <!--                            prop="loginTime"-->
                    <!--                            align="center"-->
                    <!--                            min-width="110"-->
                    <!--                            label="登录时间">-->
                    <!--                    </el-table-column>-->
                    <el-table-column
                            label="操作"
                            min-width="220"
                            align="center">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="fileEdit(scope.$index, scope.row,1)">编辑
                            </el-button>
                            <el-popconfirm
                                    @onConfirm="fileDelete(scope.$index, scope.row,1)"
                                    confirmButtonText='确定'
                                    cancelButtonText='不用了'
                                    icon="el-icon-info"
                                    iconColor="red"
                                    title="这是一段内容确定删除吗？"
                            >
                                <el-button size="mini" slot="reference">删除</el-button>
                            </el-popconfirm>
                            <el-button
                                    @click="uploadFile(scope.row,1)"
                                    size="mini"
                            >上传附件
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!--                <el-pagination-->
                <!--                        style="text-align: right"-->
                <!--                        background-->
                <!--                        layout="prev, pager, next"-->
                <!--                        :total="50"-->
                <!--                        @current-change="otherFamilyPageChange">-->
                <!--                </el-pagination>-->
            </el-tab-pane>
            <el-tab-pane label="廉洁自律审查" name="3">
                <div style="text-align: right">
                    <el-button type="primary" @click="addInvestigate(2)">
                        <i class="el-icon-circle-plus-outline" style="font-size: 15px">新增</i>
                    </el-button>
                </div>
                <el-table
                        border
                        :data="honestData"
                        style="width: 100%">
                    <el-table-column
                            prop="state"
                            label="廉洁自律核查情况"
                            align="center"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="title"
                            label="核查说明"
                            align="center"
                            min-width="200">
                    </el-table-column>
                    <el-table-column
                            prop="checkDesc"
                            label="其他说明"
                            align="center"
                            min-width="200">
                    </el-table-column>
                    <el-table-column
                            prop="checkUser"
                            align="center"
                            min-width="90"
                            label="审查人">
                    </el-table-column>
                    <el-table-column
                            prop="checkTime"
                            align="center"
                            min-width="110"
                            label="审查时间">
                    </el-table-column>
                    <!--                    <el-table-column-->
                    <!--                            prop="loginName"-->
                    <!--                            align="center"-->
                    <!--                            min-width="90"-->
                    <!--                            label="登录人">-->
                    <!--                    </el-table-column>-->
                    <!--                    <el-table-column-->
                    <!--                            prop="loginTime"-->
                    <!--                            align="center"-->
                    <!--                            min-width="110"-->
                    <!--                            label="登录时间">-->
                    <!--                    </el-table-column>-->
                    <el-table-column
                            label="操作"
                            min-width="220"
                            align="center">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="fileEdit(scope.$index, scope.row,2)">编辑
                            </el-button>
                            <el-popconfirm
                                    @onConfirm="fileDelete(scope.$index, scope.row,2)"
                                    confirmButtonText='确定'
                                    cancelButtonText='不用了'
                                    icon="el-icon-info"
                                    iconColor="red"
                                    title="这是一段内容确定删除吗？"
                            >
                                <el-button size="mini" slot="reference">删除</el-button>
                            </el-popconfirm>
                            <el-button
                                    @click="uploadFile(scope.row,2)"
                                    size="mini"
                            >上传附件
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!--                <el-pagination-->
                <!--                        style="text-align: right"-->
                <!--                        background-->
                <!--                        layout="prev, pager, next"-->
                <!--                        :total="50"-->
                <!--                        @current-change="honestPageChange">-->
                <!--                </el-pagination>-->
            </el-tab-pane>
            <el-tab-pane label="问题线索核查" name="4">
                <div style="text-align: right">
                    <el-button type="primary" @click="addInvestigate(3)">
                        <i class="el-icon-circle-plus-outline" style="font-size: 15px">新增</i>
                    </el-button>
                </div>
                <el-table
                        border
                        :data="questionData"
                        style="width: 100%">
                    <el-table-column
                            prop="state"
                            label="问题线索情况"
                            align="center"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="title"
                            label="核查说明"
                            align="center"
                            min-width="200">
                    </el-table-column>
                    <el-table-column
                            prop="checkDesc"
                            label="其他说明"
                            align="center"
                            min-width="200">
                    </el-table-column>
                    <el-table-column
                            prop="checkUser"
                            align="center"
                            min-width="90"
                            label="审查人">
                    </el-table-column>
                    <el-table-column
                            prop="checkTime"
                            align="center"
                            min-width="110"
                            label="审查时间">
                    </el-table-column>
                    <!--                    <el-table-column-->
                    <!--                            prop="loginName"-->
                    <!--                            align="center"-->
                    <!--                            min-width="90"-->
                    <!--                            label="登录人">-->
                    <!--                    </el-table-column>-->
                    <!--                    <el-table-column-->
                    <!--                            prop="loginTime"-->
                    <!--                            align="center"-->
                    <!--                            min-width="110"-->
                    <!--                            label="登录时间">-->
                    <!--                    </el-table-column>-->
                    <el-table-column
                            label="操作"
                            min-width="220"
                            align="center">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="fileEdit(scope.$index, scope.row,3)">编辑
                            </el-button>
                            <el-popconfirm
                                    @onConfirm="fileDelete(scope.$index, scope.row,3)"
                                    confirmButtonText='确定'
                                    cancelButtonText='不用了'
                                    icon="el-icon-info"
                                    iconColor="red"
                                    title="这是一段内容确定删除吗？"
                            >
                                <el-button size="mini" slot="reference">删除</el-button>
                            </el-popconfirm>
                            <el-button
                                    @click="uploadFile(scope.row,3)"
                                    size="mini"
                            >上传附件
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!--                <el-pagination-->
                <!--                        style="text-align: right"-->
                <!--                        background-->
                <!--                        layout="prev, pager, next"-->
                <!--                        :total="50"-->
                <!--                        @current-change="questionPageChange">-->
                <!--                </el-pagination>-->
            </el-tab-pane>
            <el-tab-pane label="经济责任审查" name="5">
                <div style="text-align: right">
                    <el-button type="primary" @click="addInvestigate(4)">
                        <i class="el-icon-circle-plus-outline" style="font-size: 15px">新增</i>
                    </el-button>
                </div>
                <el-table
                        border
                        :data="economicData"
                        style="width: 100%">
                    <el-table-column
                            prop="state"
                            label="经济责任核查情况"
                            align="center"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="title"
                            label="核查说明"
                            align="center"
                            min-width="200">
                    </el-table-column>
                    <el-table-column
                            prop="checkDesc"
                            label="其他说明"
                            align="center"
                            min-width="200">
                    </el-table-column>
                    <el-table-column
                            prop="checkUser"
                            align="center"
                            min-width="90"
                            label="审查人">
                    </el-table-column>
                    <el-table-column
                            prop="checkTime"
                            align="center"
                            min-width="110"
                            label="审查时间">
                    </el-table-column>
                    <!--                    <el-table-column-->
                    <!--                            prop="loginName"-->
                    <!--                            align="center"-->
                    <!--                            min-width="90"-->
                    <!--                            label="登录人">-->
                    <!--                    </el-table-column>-->
                    <!--                    <el-table-column-->
                    <!--                            prop="loginTime"-->
                    <!--                            align="center"-->
                    <!--                            min-width="110"-->
                    <!--                            label="登录时间">-->
                    <!--                    </el-table-column>-->
                    <el-table-column
                            label="操作"
                            min-width="220"
                            align="center">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="fileEdit(scope.$index, scope.row,4)">编辑
                            </el-button>
                            <el-popconfirm
                                    @onConfirm="fileDelete(scope.$index, scope.row,4)"
                                    confirmButtonText='确定'
                                    cancelButtonText='不用了'
                                    icon="el-icon-info"
                                    iconColor="red"
                                    title="这是一段内容确定删除吗？"
                            >
                                <el-button size="mini" slot="reference">删除</el-button>
                            </el-popconfirm>
                            <el-button
                                    @click="uploadFile(scope.row,4)"
                                    size="mini"
                            >上传附件
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!--                <el-pagination-->
                <!--                        style="text-align: right"-->
                <!--                        background-->
                <!--                        layout="prev, pager, next"-->
                <!--                        :total="50"-->
                <!--                        @current-change="economicPageChange">-->
                <!--                </el-pagination>-->
            </el-tab-pane>
            <el-tab-pane label="军事训练考核" name="6">
                <div style="text-align: right">
                    <el-button type="primary" @click="addInvestigate(5)">
                        <i class="el-icon-circle-plus-outline" style="font-size: 15px">新增</i>
                    </el-button>
                </div>
                <el-table
                        border
                        :data="warData"
                        style="width: 100%">
                    <el-table-column
                            prop="state"
                            label="军事训练考核情况"
                            align="center"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="title"
                            label="核查说明"
                            align="center"
                            min-width="200">
                    </el-table-column>
                    <el-table-column
                            prop="checkDesc"
                            label="其他说明"
                            align="center"
                            min-width="200">
                    </el-table-column>
                    <el-table-column
                            prop="checkUser"
                            align="center"
                            min-width="90"
                            label="审查人">
                    </el-table-column>
                    <el-table-column
                            prop="checkTime"
                            align="center"
                            min-width="110"
                            label="审查时间">
                    </el-table-column>
                    <!--                    <el-table-column-->
                    <!--                            prop="loginName"-->
                    <!--                            align="center"-->
                    <!--                            min-width="90"-->
                    <!--                            label="登录人">-->
                    <!--                    </el-table-column>-->
                    <!--                    <el-table-column-->
                    <!--                            prop="loginTime"-->
                    <!--                            align="center"-->
                    <!--                            min-width="110"-->
                    <!--                            label="登录时间">-->
                    <!--                    </el-table-column>-->
                    <el-table-column
                            label="操作"
                            min-width="220"
                            align="center">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="fileEdit(scope.$index, scope.row,5)">编辑
                            </el-button>
                            <el-popconfirm
                                    @onConfirm="fileDelete(scope.$index, scope.row,5)"
                                    confirmButtonText='确定'
                                    cancelButtonText='不用了'
                                    icon="el-icon-info"
                                    iconColor="red"
                                    title="这是一段内容确定删除吗？"
                            >
                                <el-button size="mini" slot="reference">删除</el-button>
                            </el-popconfirm>
                            <el-button
                                    @click="uploadFile(scope.row,5)"
                                    size="mini"
                            >上传附件
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!--                <el-pagination-->
                <!--                        style="text-align: right"-->
                <!--                        background-->
                <!--                        layout="prev, pager, next"-->
                <!--                        :total="50"-->
                <!--                        @current-change="warPageChange">-->
                <!--                </el-pagination>-->
            </el-tab-pane>
            <el-tab-pane label="健康状况评估" name="7">
                <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                    <i class="el-icon-edit" style="font-size: 30px;float: right" @click="textareaEdit"></i>
                </el-tooltip>
                <el-input
                        type="textarea"
                        :rows="10"
                        placeholder="请输入内容"
                        v-model="textarea7"
                        :disabled="textareaControl">
                </el-input>
                请注意，最多只能提交1000个字符！
                <el-tooltip class="item" effect="dark" content="提交简历" placement="top-start">
                    <i class="el-icon-success" style="font-size: 30px;float: right" @click="infoSuccess(2)"></i>
                </el-tooltip>
                <div style="text-align: right">
                    <el-button type="primary" @click="addInvestigate(6)">
                        <i class="el-icon-circle-plus-outline" style="font-size: 15px">新增</i>
                    </el-button>
                </div>
                <el-table
                        border
                        :data="healthyData"
                        style="width: 100%">
                    <el-table-column
                            prop="state"
                            label="健康评估情况"
                            align="center"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="title"
                            label="核查说明"
                            align="center"
                            min-width="200">
                    </el-table-column>
                    <el-table-column
                            prop="checkDesc"
                            label="其他说明"
                            align="center"
                            min-width="200">
                    </el-table-column>
                    <el-table-column
                            prop="checkUser"
                            align="center"
                            min-width="90"
                            label="审查人">
                    </el-table-column>
                    <el-table-column
                            prop="checkTime"
                            align="center"
                            min-width="110"
                            label="审查时间">
                    </el-table-column>
                    <!--                    <el-table-column-->
                    <!--                            prop="loginName"-->
                    <!--                            align="center"-->
                    <!--                            min-width="90"-->
                    <!--                            label="登录人">-->
                    <!--                    </el-table-column>-->
                    <!--                    <el-table-column-->
                    <!--                            prop="loginTime"-->
                    <!--                            align="center"-->
                    <!--                            min-width="110"-->
                    <!--                            label="登录时间">-->
                    <!--                    </el-table-column>-->
                    <el-table-column
                            label="操作"
                            min-width="220"
                            align="center">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="fileEdit(scope.$index, scope.row,6)">编辑
                            </el-button>
                            <el-popconfirm
                                    @onConfirm="fileDelete(scope.$index, scope.row,6)"
                                    confirmButtonText='确定'
                                    cancelButtonText='不用了'
                                    icon="el-icon-info"
                                    iconColor="red"
                                    title="这是一段内容确定删除吗？"
                            >
                                <el-button size="mini" slot="reference">删除</el-button>
                            </el-popconfirm>
                            <el-button
                                    @click="uploadFile(scope.row,6)"
                                    size="mini"
                            >上传附件
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!--                <el-pagination-->
                <!--                        style="text-align: right"-->
                <!--                        background-->
                <!--                        layout="prev, pager, next"-->
                <!--                        :total="50"-->
                <!--                        @current-change="healthyPageChange">-->
                <!--                </el-pagination>-->
            </el-tab-pane>
            <el-tab-pane label="干部现实表现" name="8">
                <div style="text-align: right">
                    <el-button type="primary" @click="addInvestigate(7)">
                        <i class="el-icon-circle-plus-outline" style="font-size: 15px">新增</i>
                    </el-button>
                </div>
                <el-table
                        border
                        :data="realityData"
                        style="width: 100%">
                    <el-table-column
                            prop="state"
                            label="干部现实表现核查情况"
                            align="center"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="title"
                            label="核查说明"
                            align="center"
                            min-width="200">
                    </el-table-column>
                    <el-table-column
                            prop="checkDesc"
                            label="其他说明"
                            align="center"
                            min-width="200">
                    </el-table-column>
                    <el-table-column
                            prop="checkUser"
                            align="center"
                            min-width="90"
                            label="审查人">
                    </el-table-column>
                    <el-table-column
                            prop="checkTime"
                            align="center"
                            min-width="110"
                            label="审查时间">
                    </el-table-column>
                    <!--                    <el-table-column-->
                    <!--                            prop="loginName"-->
                    <!--                            align="center"-->
                    <!--                            min-width="90"-->
                    <!--                            label="登录人">-->
                    <!--                    </el-table-column>-->
                    <!--                    <el-table-column-->
                    <!--                            prop="loginTime"-->
                    <!--                            align="center"-->
                    <!--                            min-width="110"-->
                    <!--                            label="登录时间">-->
                    <!--                    </el-table-column>-->
                    <el-table-column
                            label="操作"
                            min-width="220"
                            align="center">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="fileEdit(scope.$index, scope.row,7)">编辑
                            </el-button>
                            <el-popconfirm
                                    @onConfirm="fileDelete(scope.$index, scope.row,7)"
                                    confirmButtonText='确定'
                                    cancelButtonText='不用了'
                                    icon="el-icon-info"
                                    iconColor="red"
                                    title="这是一段内容确定删除吗？"
                            >
                                <el-button size="mini" slot="reference">删除</el-button>
                            </el-popconfirm>
                            <el-button
                                    @click="uploadFile(scope.row,7)"
                                    size="mini"
                            >上传附件
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!--                <el-pagination-->
                <!--                        style="text-align: right"-->
                <!--                        background-->
                <!--                        layout="prev, pager, next"-->
                <!--                        :total="50"-->
                <!--                        @current-change="realityPageChange">-->
                <!--                </el-pagination>-->
            </el-tab-pane>
            <el-tab-pane label="其他情况核查" name="9">
                <div style="text-align: right">
                    <el-button type="primary" @click="addInvestigate(8)">
                        <i class="el-icon-circle-plus-outline" style="font-size: 15px">新增</i>
                    </el-button>
                </div>
                <el-table
                        border
                        :data="otherData"
                        style="width: 100%">
                    <el-table-column
                            prop="state"
                            label="其它核查情况"
                            align="center"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="title"
                            label="核查说明"
                            align="center"
                            min-width="200">
                    </el-table-column>
                    <el-table-column
                            prop="checkDesc"
                            label="其他说明"
                            align="center"
                            min-width="200">
                    </el-table-column>
                    <el-table-column
                            prop="checkName"
                            align="center"
                            min-width="110"
                            label="审查人">
                    </el-table-column>
                    <el-table-column
                            prop="checkTime"
                            align="center"
                            min-width="110"
                            label="审查时间">
                    </el-table-column>
                    <!--                    <el-table-column-->
                    <!--                            prop="loginName"-->
                    <!--                            align="center"-->
                    <!--                            min-width="90"-->
                    <!--                            label="登录人">-->
                    <!--                    </el-table-column>-->
                    <!--                    <el-table-column-->
                    <!--                            prop="loginTime"-->
                    <!--                            align="center"-->
                    <!--                            min-width="110"-->
                    <!--                            label="登录时间">-->
                    <!--                    </el-table-column>-->
                    <el-table-column
                            label="操作"
                            min-width="220"
                            align="center">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="fileEdit(scope.$index, scope.row,8)">编辑
                            </el-button>
                            <el-popconfirm
                                    @onConfirm="fileDelete(scope.$index, scope.row,8)"
                                    confirmButtonText='确定'
                                    cancelButtonText='不用了'
                                    icon="el-icon-info"
                                    iconColor="red"
                                    title="这是一段内容确定删除吗？"
                            >
                                <el-button size="mini" slot="reference">删除</el-button>
                            </el-popconfirm>
                            <el-button
                                    @click="uploadFile(scope.row,8)"
                                    size="mini"
                            >上传附件
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!--                <el-pagination-->
                <!--                        style="text-align: right"-->
                <!--                        background-->
                <!--                        layout="prev, pager, next"-->
                <!--                        :total="50"-->
                <!--                        @current-change="otherPageChange">-->
                <!--                </el-pagination>-->
            </el-tab-pane>
        </el-tabs>
        <el-dialog
                :title="check"
                :visible.sync="dialogOrganizationVisible"
                width="50%"
                :before-close="handleClose"
        >
            <div style="padding: 0 5% 0 5%">
                <el-form ref="form" :model="form1" label-width="80px">
                    <el-form-item :label="firstLabel">
                        <el-date-picker
                                v-model="form1.startTime"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item v-if="this.type!==4" :label="secondLabel">
                        <el-date-picker
                                v-model="form1.endTime"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item :label="thirdLabel">
                        <el-input v-model="form1.name"></el-input>
                    </el-form-item>
                    <el-form-item :label="fourthLabel">
                        <el-input v-model="form1.status"></el-input>
                    </el-form-item>
                </el-form>
            </div>

            <span slot="footer" class="dialog-footer">
    <el-button @click="allCancel">取 消</el-button>
    <el-button type="primary" @click="addInput()">确 定</el-button>
  </span>
        </el-dialog>
        <el-dialog
                :title="file"
                :visible.sync="visible"
                width="50%"
                :before-close="handleClose"
        >
            <div style="padding: 0 5% 0 5%">
                <el-form ref="form" :model="form2" label-width="100px">
                    <el-form-item label="核查情况">
                        <el-select clearable  style="width: 100%;" v-model="form2.case" placeholder="请选择">
                            <el-option label="合格" value="合格"></el-option>
                            <el-option label="不合格" value="不合格"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="核查说明">
                        <el-select clearable  v-if="form2.case==='合格'" style="width: 100%;" v-model="form2.explain" placeholder="请选择">
                            <el-option label="按照“三个绝对”坚定理想信念和政治立场，坚决贯彻执行党的路线方针政策，自觉筑牢军魂，任何时候如何情况下都坚决听从党中央、中央军委和习主席的指挥；" value="按照“三个绝对”坚定理想信念和政治立场，坚决贯彻执行党的路线方针政策，自觉筑牢军魂，任何时候如何情况下都坚决听从党中央、中央军委和习主席的指挥"></el-option>
                            <el-option label="带头学习运用中国特色社会主义理论体系，扎实抓好党的创新理论何强军目标学习贯彻，具有较高的理论素养何政策水平，善于从政治和全局上观察、分析、思考问题" value="带头学习运用中国特色社会主义理论体系，扎实抓好党的创新理论何强军目标学习贯彻，具有较高的理论素养何政策水平，善于从政治和全局上观察、分析、思考问题"></el-option>
                            <el-option label="具有坚强的党性原则和组织纪律观念，自觉做到不乱传乱议，不犯个人主义、本位主义、自由主义" value="具有坚强的党性原则和组织纪律观念，自觉做到不乱传乱议，不犯个人主义、本位主义、自由主义"></el-option>
                            <el-option label="牢固树立正确的政绩观，始终本着对部队建设长远负责的态度想问题、办事情、作决策，不图出名挂号，不做表面文章，不急功近利，不弄虚作假；" value="牢固树立正确的政绩观，始终本着对部队建设长远负责的态度想问题、办事情、作决策，不图出名挂号，不做表面文章，不急功近利，不弄虚作假；"></el-option>
                        </el-select>
                        <el-select clearable  v-if="form2.case==='不合格'" style="width: 100%;" v-model="form2.explain" placeholder="请选择">
                            <el-option label="业务知识缺乏，业务技能弱，基本法规制度不熟悉，完成日常业务工作有困难的；" value="业务知识缺乏，业务技能弱，基本法规制度不熟悉，完成日常业务工作有困难的；"></el-option>
                            <el-option label="不能正确领会首长和上级决策意图，整体谋划水平低，导致工作忙乱的；或者缺乏大局意识和实践基础，所以意见建议脱离实际、质量不高的；" value="不能正确领会首长和上级决策意图，整体谋划水平低，导致工作忙乱的；或者缺乏大局意识和实践基础，所以意见建议脱离实际、质量不高的；"></el-option>
                            <el-option label="制定计划可行性差，有明显漏洞的；或者组织协调不力，导致计划不能有效实施的；" value="制定计划可行性差，有明显漏洞的；或者组织协调不力，导致计划不能有效实施的；"></el-option>
                            <el-option label="对不对相关情况了解掌握不及时，不准确的；或者不能有效知道部队解决实际问题的；" value="对不对相关情况了解掌握不及时，不准确的；或者不能有效知道部队解决实际问题的；"></el-option>
                            <el-option label="学习不自觉，不刻苦，缺乏改进提高意识，工作不见起色的；" value="学习不自觉，不刻苦，缺乏改进提高意识，工作不见起色的；"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="其他说明">
                        <el-input v-model="form2.other"></el-input>
                    </el-form-item>
                    <el-form-item label="审查人">
                        <el-input v-model="form2.person"></el-input>
                    </el-form-item>
                    <el-form-item label="审查时间">
                        <el-date-picker
                                style="width: 100%;"
                                v-model="form2.time"
                                type="date"
                                value-format="yyyy-MM-dd hh:mm:ss"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <!--                    <el-form-item label="登录人">-->
                    <!--                        <el-input :disabled="true" v-model="form2.loginPerson"></el-input>-->
                    <!--                    </el-form-item>-->
                    <!--                    <el-form-item label="登录时间">-->
                    <!--                        <el-date-picker-->
                    <!--                                :disabled="true"-->
                    <!--                                style="width: 100%;"-->
                    <!--                                v-model="form2.loginTime"-->
                    <!--                                type="date"-->
                    <!--                                value-format="yyyy-MM-dd hh:mm:ss"-->
                    <!--                                placeholder="选择日期">-->
                    <!--                        </el-date-picker>-->
                    <!--                    </el-form-item>-->
                </el-form>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="investigateCancel">取 消</el-button>
                <el-button type="primary" @click="investigateSubmit">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
                :title="check"
                :visible.sync="accessoryVisible"
                width="50%"
        >
            <div style="padding: 0 5% 0 5%">
                <el-upload
                        class="upload-demo"
                        action=""
                        :http-request="accessoryUpload"
                        :on-preview="accessoryHandlePreview"
                        :on-remove="accessoryHandleRemove"
                        :before-remove="accessoryBeforeRemove"
                        multiple
                        :limit="3"
                        :on-exceed="accessoryHandleExceed"
                        :file-list="accessoryFileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="allCancel">取 消</el-button>
                <el-button type="primary" @click="addInput()">确 定</el-button>
              </span>
        </el-dialog>
        <el-dialog
                :title="familyTittle"
                :visible.sync="familyVisible"
                width="50%"
        >
            <el-form ref="form" :model="familyForm" label-width="120px">
                <el-form-item label="称谓">
                    <el-input v-model="familyForm.appellation"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="familyForm.name"></el-input>
                </el-form-item>
                <el-form-item label="生日">
                    <el-date-picker
                            v-model="familyForm.birthday"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="政治面貌">
                    <el-input v-model="familyForm.politicsStatus"></el-input>
                </el-form-item>
                <el-form-item label="工作单位和职务">
                    <el-input v-model="familyForm.workInfo"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="familyVisibleCancel">取 消</el-button>
                <el-button type="primary" @click="familySubmit()">确 定</el-button>
              </span>
        </el-dialog>
        <el-dialog
                :title="fileTitle"
                :visible.sync="fileVisible"
                width="50%"
        >

            <span slot="footer" class="dialog-footer">
                <el-button @click="fileVisibleCancel">取 消</el-button>
                <el-button type="primary" @click="fileSubmit()">确 定</el-button>
              </span>
        </el-dialog>
    </div>

</template>

<script>
    import service from "../../utils/service";

    export default {
        name: "checkPrepare",
        data() {
            return {
                //附件标题
                fileTitle:'',
                //附件显示
                fileVisible:false,
                //述职报告控制
                reportControl: true,
                //述职报告
                reportArea: '',
                //述职报告ID
                reportId:'',
                //审查档案名
                file: '',
                //审查档案ID
                fileId: '',
                //家庭成员及重要社会关系标题
                familyTittle: '',
                //家庭成员及重要社会关系模态框
                familyVisible: false,
                //家庭成员及重要社会关系form
                familyForm: {
                    appellation: '',
                    name: '',
                    birthday: '',
                    politicsStatus: '',
                    workInfo: ''
                },
                //组织下拉框数据
                organizationOptions: [],
                //组织id
                organizationId: '',
                //附件列表
                accessoryFileList: [],
                form2: {
                    other: '',
                    case: '',
                    explain: '',
                    explains: '',
                    person: '',
                    time: '',
                    loginPerson: '',
                    loginTime: ''
                },
                //审查模态框
                visible: false,
                //附件模态框
                accessoryVisible: false,
                //干部现实
                realityData: [],
                //其他情况核查
                otherData: [],
                //健康状况评估
                healthyData: [],
                //军事训练考核
                warData: [],
                //经济责任审查
                economicData: [],
                //健康评估文本域
                textarea7: '',
                //健康文本域ID
                healthyId: '',
                //问题线索核查
                questionData: [],
                //廉洁自律数据
                honestData: [],
                //家庭成员及重要社会关系数据
                familyData: [],
                //领导干部亲属及身边身边工作人员情况
                otherFamilyData: [],
                //模态框标题控制
                check: '',
                //分辨是哪个表格
                type: '',
                //模态框input label
                firstLabel: '',
                secondLabel: '',
                thirdLabel: '',
                fourthLabel: '',
                dialogOrganizationVisible: false,
                textareaControl: true,
                formControl: true,
                //简历文本域
                textarea: '',
                resumeId: '',
                //控制折叠面板初始显示显示
                activeNames: [ '1', '2', '3', '4', '5','6' ],
                //头像地址
                imageUrl: '',
                //留给后台用的图片地址
                imgUrl: '',
                //培训经历表格
                tableData1: [],
                tableData2: [],
                tableData3: [],
                tableData4: [],

                form1: {
                    startTime: '',
                    endTime: '',
                    name: '',
                    status: '',
                },
                //人员id
                id: '',
                //头像地址
                activeName: '1',
                form: {
                    //入伍时间
                    militaryTime: '',
                    //组织机构
                    organization: '',
                    //编号
                    num: '',
                    //年龄
                    age: '',
                    //姓名
                    name: '',
                    //性别初始选项
                    checked: '1',
                    //生日
                    birthday: '',
                    //种族
                    ethnic: '',
                    //入伍时间
                    MilitaryTime: '',
                    //警衔
                    rankValue: '',
                    //现警衔任职时间
                    rankValueTime: '',
                    //学历
                    edu: '',
                    //现任职务
                    presentOccupation: '',
                    //现任职务时间
                    presentOccupationTime: '',
                    //籍贯
                    nativePlace: '',
                    //入党时间
                    partyTime: '',
                    //出生地
                    birthPlace: '',
                    //现部职别
                    level: '',
                    //现部职别时间
                    levelTime: '',
                    //    人员id
                    id: '',
                    trainTimeList: '',
                    trainInstitution: '',
                    trainStatus: '',
                    personId: '',
                    //当前获取用户userId
                    userId: ''
                }
            }
        },
        mounted() {
            new Promise( ( resolve ) => {
                this.getData().then( () => {
                    resolve();
                } );
            } ).then( () => {

            } )
        },
        created() {

        },
        watch: {
            birthday( newValue ) {
                this.form.age = parseInt( this.$moment( new Date() ).format( 'YYYY' ) ) - parseInt( this.$moment( newValue ).format( 'YYYY' ) );
            },

        },
        computed: {
            birthday() {
                return this.form.birthday
            }
        },
        methods: {
            //组织改变
            organizationChange( value ) {
                this.organizationId = value
            },

            //提交家庭成员及重要社会关系模态框数据
            familySubmit() {
                let birthday = this.$moment( this.familyForm.birthday ).format( "YYYY-MM-DD HH:mm:ss" );
                let data = {
                    infoId: this.id,
                    appellation: this.familyForm.appellation,
                    name: this.familyForm.name,
                    birthday: birthday,
                    politicsStatus: this.familyForm.politicsStatus,
                    workInfo: this.familyForm.workInfo
                };
                if ( this.familyTittle == '编辑家庭成员及重要社会关系' ) {
                    data.id = this.personId
                }
                this.$axios( {
                    method: 'post',
                    url: 'aprPersonalConcern/update',
                    data: this.$Qs.stringify( data )
                } ).then( () => {
                    this.familyVisible = false;
                    this.familyForm.appellation = '';
                    this.familyForm.name = '';
                    this.familyForm.birthday = '';
                    this.familyForm.politicsStatus = '';
                    this.familyForm.workInfo = '';
                    this.getData();
                } )
            },
            //家庭与重要社会关系模态框关闭
            familyVisibleCancel() {
                this.familyVisible = false;
                this.familyForm.appellation = '';
                this.familyForm.name = '';
                this.familyForm.birthday = '';
                this.familyForm.politicsStatus = '';
                this.familyForm.workInfo = '';
            },
            //附件上传
            accessoryUpload( file ) {
                const f = new FormData();
                f.set( 'file', file.file );
                f.set( 'personalInfoId', this.id );
                f.set( 'fileName', file.file.name );
                f.set( 'fileName', file.file.name );
                this.$axios( {
                    method: 'post',
                    url: 'aprPersonalInfo/upload',
                    data: f,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                } )
                    .then( ( res ) => {
                        this.fileList.push( { name: file.file.name, url: service.baseUrl + "/" + res.data } );
                        this.file.push( res.data );
                        this.$message.success( "已成功上传" );

                    } )
            },
            accessoryHandleRemove( file ) {
                const f = new FormData();
                f.set( 'filePath', file.url );
                f.set( 'personalInfoId', this.id );
                service( {
                    method: 'post',
                    url: '/web/admin/workReport/deleteFile.action',
                    data: f,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                } )
                    .then( () => {
                        this.$message.success( "删除成功" );

                    } )
            },
            accessoryHandlePreview( file ) {
                let a = document.createElement( "a" );
                a.setAttribute( 'download', file.name );
                a.href = service.baseUrl + "/" + file.url;
                // a.target="_blank";
                a.click();
                // window.location.href =baseUrl+"/"+file.url;
            },
            accessoryHandleExceed( files, fileList ) {
                this.$message.warning( `当前限制选择 3 个文件，本次选择了 ${ files.length } 个文件，共选择了 ${ files.length + fileList.length } 个文件` );
            },
            accessoryBeforeRemove( file ) {
                return this.$confirm( `确定移除 ${ file.name }？` );
            },
            //基础信息提交
            resumeSuccess() {
                let data = {
                    id: this.id,
                    policeName: this.form.name,
                    policeNo: this.form.num,
                    sex: this.form.checked === '1' ? '男' : '女',
                    birthDay: this.$moment( this.form.birthday ).format( 'YYYY-MM-DD hh:mm:ss' ),
                    nativePlace: this.form.nativePlace,
                    birthPlace: this.form.birthPlace,
                    nation: this.form.ethnic,
                    education: this.form.edu,
                    orgId: this.organizationId,
                    // imgPath:this.imgUrl,
                    nowPosition: this.form.presentOccupation,
                    nowPositionTime: this.$moment( this.form.presentOccupationTime ).format( 'YYYY-MM-DD hh:mm:ss' ),
                    deptPosition: this.form.level,
                    deptPositionTime: this.$moment( this.form.levelTime ).format( 'YYYY-MM-DD hh:mm:ss' ),
                    policeRank: this.form.rankValue,
                    policeRankTime: this.$moment( this.form.rankValueTime ).format( 'YYYY-MM-DD hh:mm:ss' ),
                    userId: this.userId,
                    militaryTime: this.form.militaryTime
                };
                this.$axios( {
                    method: 'post',
                    url: 'aprPersonalInfo/update',
                    data: this.$Qs.stringify( data )
                } ).then( () => {
                    if ( this.form.num == '' || this.form.name == '' || this.form.ethnic == '' || this.form.birthday == '' || this.form.birthPlace == '' || this.form.edu == '' || this.form.nativePlace == '' ) {
                        this.formControl = false;
                    }
                    return this.$message.success( '提交成功' )
                } )
            },
            //附件模态框取消
            fileVisibleCancel(){
                this.fileVisible=false
            },
            //附件模态框确定
            fileSubmit(){
                this.fileVisible=false
            },
            //提交附件
            uploadFile(row,type){
                console.log(row);
                console.log(type);
                this.fileVisible=true;
                // const array=[
                //     '',
                //     'dossier',
                //     'self_discipline',
                //     'problem_clues',
                //     'financial',
                //     'training',
                //     'health',
                //     'cadre',
                //     'other'
                // ];
                // const titleArray=[
                //     '',
                //     'dossier',
                //     'self_discipline',
                //     'problem_clues',
                //     'financial',
                //     'training',
                //     'health',
                //     'cadre',
                //     'other'
                // ];


            },
            //其他情况核查
            otherPageChange() {

            },
            //健康状况评估
            healthyPageChange() {

            },
            //军事训练考核
            warPageChange() {

            },
            //经济责任核查
            economicPageChange() {

            },
            //问题线索核查
            questionPageChange() {

            },
            //档案情况审查分页
            otherFamilyPageChange() {

            },
            //廉洁自律审查分页
            honestPageChange() {

            },
            //干部现实分页
            realityPageChange() {

            },
            getData() {
                return new Promise( resolve => {
                    if ( this.$route.params.infoId ) {
                        this.$axios
                            .get( '/aprPersonalInfo/getPersonalInfoByInfoId?infoId=' + this.$route.params.infoId )
                            .then( ( res ) => {
                                const personalInfo = res.data.data.personalInfo;
                                const sex = personalInfo.sex === "男" ? '1' : '2';
                                this.form.name = personalInfo.policeName;
                                this.form.organization = res.data.data.organization.id;
                                this.form.num = personalInfo.policeNo;
                                this.form.checked = sex;
                                this.form.birthday = personalInfo.birthDay;
                                this.form.ethnic = personalInfo.nation;
                                this.form.rankValue = personalInfo.policeRank;
                                this.form.rankValueTime = personalInfo.policeRankTime;
                                this.form.edu = personalInfo.education;
                                this.form.MilitaryTime = personalInfo.militaryTime;
                                this.form.nativePlace = personalInfo.nativePlace;
                                this.form.partyTime = personalInfo.joinPartyTime;
                                this.form.birthPlace = personalInfo.birthPlace;
                                this.form.presentOccupation = personalInfo.nowPosition;
                                this.form.presentOccupationTime = personalInfo.nowPositionTime;
                                this.form.level = personalInfo.deptPosition;
                                this.form.levelTime = personalInfo.deptPositionTime;
                                this.form.age = personalInfo.age;
                                this.form.militaryTime = personalInfo.militaryTime;
                                this.id = personalInfo.id;
                                this.userId = personalInfo.userId;
                                this.imageUrl = this.$baseUrl + "/" + personalInfo.imgPath;
                                this.imgUrl = personalInfo.pictureIn;
                                if ( this.form.num == null || this.form.name == null || this.form.ethnic == null || this.form.birthday == null || this.form.birthPlace == null || this.form.edu == null || this.form.nativePlace == null ) {
                                    this.formControl = false;
                                }
                                //培训经历
                                this.tableData1 = res.data.data.trainingRecord;

                                //参战记录
                                this.tableData2 = res.data.data.warRecord1;
                                //非参战记录
                                this.tableData3 = res.data.data.warRecord0;
                                //奖惩记录
                                this.tableData4 = res.data.data.prizeInfoRecord;
                                //家庭成员及重要社会关系
                                this.familyData = res.data.data.userConcernInfo;
                                this.tableData1 = this.changTime( this.tableData1 );
                                this.tableData2 = this.changTime( this.tableData2 );
                                this.tableData3 = this.changTime( this.tableData3 );
                                this.tableData4 = this.changTime( this.tableData4 );
                                this.familyData = this.changTime( this.familyData );
                                //简历
                                this.textarea = res.data.data.personalResume[ 0 ].text;
                                this.resumeId = res.data.data.personalResume[ 0 ].id;
                                //述职报告
                                this.reportId=res.data.data.personalWorkReport[ 0 ].id;
                                this.reportArea=res.data.data.personalWorkReport[ 0 ].text;
                                //档案情况审查
                                this.otherFamilyData = res.data.data.personalInspection.personalInspectionDossier;
                                //廉洁自律审查
                                this.honestData = res.data.data.personalInspection.personalInspectionSelf;
                                //问题线索审查
                                this.questionData = res.data.data.personalInspection.personalInspectionProblem;
                                //经济责任审查
                                this.economicData = res.data.data.personalInspection.personalInspectionFinancial;
                                //军事训练审查
                                this.warData = res.data.data.personalInspection.personalInspectionTraining;
                                //健康状况审查
                                this.healthyData = res.data.data.personalInspection.personalInspectionHealth;
                                //干部现实表现审查
                                this.realityData = res.data.data.personalInspection.personalInspectionDossier;
                                //其他情况审查
                                this.otherData = res.data.data.personalInspection.personalInspectionOther;
                                this.otherFamilyData = this.changTime( this.otherFamilyData );
                                this.honestData = this.changTime( this.honestData );
                                this.questionData = this.changTime( this.questionData );
                                this.economicData = this.changTime( this.economicData );
                                this.warData = this.changTime( this.warData );
                                this.healthyData = this.changTime( this.healthyData );
                                this.realityData = this.changTime( this.realityData );
                                this.otherData = this.changTime( this.otherData );
                                //健康文本域
                                this.textarea7 = res.data.data.personalInfo.healthText;
                                this.healthyId = res.data.data.personalInfo.id;
                                resolve();
                            } );
                    } else {
                        this.$axios
                            .get( '/aprPersonalInfo/getPersonalInfoByUserId?userId=' + this.$store.state.currUserId )
                            .then( ( res ) => {
                                const personalInfo = res.data.data.personalInfo;
                                const sex = personalInfo.sex === "男" ? '1' : '2';
                                this.form.name = personalInfo.policeName;
                                this.form.organization = res.data.data.organization.id;
                                this.form.num = personalInfo.policeNo;
                                this.form.checked = sex;
                                this.form.birthday = personalInfo.birthDay;
                                this.form.ethnic = personalInfo.nation;
                                this.form.rankValue = personalInfo.policeRank;
                                this.form.rankValueTime = personalInfo.policeRankTime;
                                this.form.edu = personalInfo.education;
                                this.form.MilitaryTime = personalInfo.militaryTime;
                                this.form.nativePlace = personalInfo.nativePlace;
                                this.form.partyTime = personalInfo.joinPartyTime;
                                this.form.birthPlace = personalInfo.birthPlace;
                                this.form.presentOccupation = personalInfo.nowPosition;
                                this.form.presentOccupationTime = personalInfo.nowPositionTime;
                                this.form.level = personalInfo.deptPosition;
                                this.form.levelTime = personalInfo.deptPositionTime;
                                this.form.age = personalInfo.age;
                                this.form.militaryTime = personalInfo.militaryTime;
                                this.id = personalInfo.id;
                                this.userId = personalInfo.userId;
                                this.imageUrl = this.$baseUrl + "/" + personalInfo.imgPath;
                                this.imgUrl = personalInfo.pictureIn;
                                if ( this.form.num == null || this.form.name == null || this.form.ethnic == null || this.form.birthday == null || this.form.birthPlace == null || this.form.edu == null || this.form.nativePlace == null ) {
                                    this.formControl = false;
                                }
                                //培训经历
                                this.tableData1 = res.data.data.trainingRecord;
                                //参战记录
                                this.tableData2 = res.data.data.warRecord1;
                                //非参战记录
                                this.tableData3 = res.data.data.warRecord0;
                                //奖惩记录
                                this.tableData4 = res.data.data.prizeInfoRecord;
                                //家庭成员及重要社会关系
                                this.familyData = res.data.data.userConcernInfo;
                                this.tableData1 = this.changTime( this.tableData1 );
                                this.tableData2 = this.changTime( this.tableData2 );
                                this.tableData3 = this.changTime( this.tableData3 );
                                this.tableData4 = this.changTime( this.tableData4 );
                                this.familyData = this.changTime( this.familyData );
                                //简历
                                this.textarea = res.data.data.personalResume[ 0 ].text;
                                this.resumeId = res.data.data.personalResume[ 0 ].id;
                                //述职报告
                                this.reportId=res.data.data.personalWorkReport[ 0 ].id;
                                this.reportArea=res.data.data.personalWorkReport[ 0 ].text;
                                //档案情况审查
                                this.otherFamilyData = res.data.data.personalInspection.personalInspectionDossier;
                                //廉洁自律审查
                                this.honestData = res.data.data.personalInspection.personalInspectionSelf;
                                //问题线索审查
                                this.questionData = res.data.data.personalInspection.personalInspectionProblem;
                                //经济责任审查
                                this.economicData = res.data.data.personalInspection.personalInspectionFinancial;
                                //军事训练审查
                                this.warData = res.data.data.personalInspection.personalInspectionTraining;
                                //健康状况审查
                                this.healthyData = res.data.data.personalInspection.personalInspectionHealth;
                                //干部现实表现审查
                                this.realityData = res.data.data.personalInspection.personalInspectionDossier;
                                //其他情况审查
                                this.otherData = res.data.data.personalInspection.personalInspectionOther;
                                this.otherFamilyData = this.changTime( this.otherFamilyData );
                                this.honestData = this.changTime( this.honestData );
                                this.questionData = this.changTime( this.questionData );
                                this.economicData = this.changTime( this.economicData );
                                this.warData = this.changTime( this.warData );
                                this.healthyData = this.changTime( this.healthyData );
                                this.realityData = this.changTime( this.realityData );
                                this.otherData = this.changTime( this.otherData );
                                //健康文本域
                                this.textarea7 = res.data.data.personalInfo.healthText;
                                this.healthyId = res.data.data.personalInfo.id;
                                resolve();
                            } );
                    }
                    this.$axios( {
                        method: 'get',
                        url: 'organization/all/-1'
                    } ).then( ( res ) => {
                        let array = [];
                        for ( let i in res.data ) {
                            array.push( {
                                label: res.data[ i ].orgName + ' - ' + res.data[ i ].orgCode,
                                value: res.data[ i ].id
                            } )
                        }
                        this.organizationOptions = array
                    } )
                } )

            },
            //修改时间格式
            changTime( oldTime ) {
                for ( let i in oldTime ) {
                    oldTime[ i ].trainEndTime = this.$moment( oldTime[ i ].trainEndTime ).format( "YYYY-MM-DD" );
                    oldTime[ i ].trainStartTime = this.$moment( oldTime[ i ].trainStartTime ).format( "YYYY-MM-DD" );
                    oldTime[ i ].joinWarEndTime = this.$moment( oldTime[ i ].trainEndTime ).format( "YYYY-MM-DD" );
                    oldTime[ i ].joinWarStartTime = this.$moment( oldTime[ i ].trainStartTime ).format( "YYYY-MM-DD" );
                    oldTime[ i ].birthday = this.$moment( oldTime[ i ].birthday ).format( "YYYY-MM-DD" );
                    oldTime[ i ].prizeTime = this.$moment( oldTime[ i ].prizeTime ).format( "YYYY-MM-DD" );
                    oldTime[ i ].checkTime = this.$moment( oldTime[ i ].checkTime ).format( "YYYY-MM-DD" );
                }
                return oldTime
            },
            //提交审核
            investigateSubmit() {
                let data = {
                    state: this.form2.case,
                    title: this.form2.explain,
                    checkUser: this.form2.person,
                    checkTime: this.form2.time,
                    checkDesc:this.form2.other,
                    // loginId: this.form2.loginPerson,
                    // loginTime: this.form2.loginTime,
                    infoId: this.id,
                };
                switch ( this.file ) {
                    case '新增档案情况审查数据':
                        data.checkType = 'dossier';
                        this.$axios( {
                            method: 'post',
                            url: 'aprPersonalInspection/update',
                            data: this.$Qs.stringify( data )
                        } ).then( () => {
                            this.getData();
                            return this.$message.success( '新增成功' )
                        } );
                        this.visible = false;
                        break;
                    case '新增廉洁自律审查数据':
                        data.checkType = 'self_discipline';
                        this.$axios( {
                            method: 'post',
                            url: 'aprPersonalInspection/update',
                            data: this.$Qs.stringify( data )
                        } ).then( () => {
                            this.getData();
                            return this.$message.success( '新增成功' )
                        } );
                        this.visible = false;
                        break;
                    case '新增问题线索审查数据':
                        data.checkType = 'problem_clues';
                        this.$axios( {
                            method: 'post',
                            url: 'aprPersonalInspection/update',
                            data: this.$Qs.stringify( data )
                        } ).then( () => {
                            this.getData();
                            return this.$message.success( '新增成功' )
                        } );
                        this.visible = false;
                        break;
                    case '新增经济责任审查数据':
                        data.checkType = 'financial';
                        this.$axios( {
                            method: 'post',
                            url: 'aprPersonalInspection/update',
                            data: this.$Qs.stringify( data )
                        } ).then( () => {
                            this.getData();
                            return this.$message.success( '新增成功' )
                        } );
                        this.visible = false;
                        break;
                    case '新增军事训练考核数据':
                        data.checkType = 'training';
                        this.$axios( {
                            method: 'post',
                            url: 'aprPersonalInspection/update',
                            data: this.$Qs.stringify( data )
                        } ).then( () => {
                            this.getData();
                            return this.$message.success( '新增成功' )
                        } );
                        this.visible = false;
                        break;
                    case '新增健康状况评估数据':
                        data.checkType = 'health';
                        this.$axios( {
                            method: 'post',
                            url: 'aprPersonalInspection/update',
                            data: this.$Qs.stringify( data )
                        } ).then( () => {
                            this.getData();
                            return this.$message.success( '新增成功' )
                        } );
                        this.visible = false;
                        break;
                    case '新增干部现实表现审查数据':
                        data.checkType = 'cadre';
                        this.$axios( {
                            method: 'post',
                            url: 'aprPersonalInspection/update',
                            data: this.$Qs.stringify( data )
                        } ).then( () => {
                            this.getData();
                            return this.$message.success( '新增成功' )
                        } );
                        this.visible = false;
                        break;
                    case '新增其他情况核查数据':
                        data.checkType = 'other';
                        this.$axios( {
                            method: 'post',
                            url: 'aprPersonalInspection/update',
                            data: this.$Qs.stringify( data )
                        } ).then( () => {
                            this.getData();
                            return this.$message.success( '新增成功' )
                        } );
                        this.visible = false;
                        break;
                    case '编辑档案情况审查数据':
                        data.id = this.fileId;
                        data.checkType = 'dossier';
                        this.$axios( {
                            method: 'post',
                            url: 'aprPersonalInspection/update',
                            data: this.$Qs.stringify( data )
                        } ).then( () => {
                            this.getData();
                            return this.$message.success( '编辑成功' )
                        } );
                        this.visible = false;
                        break;
                    case '编辑廉洁自律审查数据':
                        data.id = this.fileId;
                        data.checkType = 'self_discipline';
                        this.$axios( {
                            method: 'post',
                            url: 'aprPersonalInspection/update',
                            data: this.$Qs.stringify( data )
                        } ).then( () => {
                            this.getData();
                            return this.$message.success( '编辑成功' )
                        } );
                        this.visible = false;
                        break;
                    case '编辑问题线索审查数据':
                        data.id = this.fileId;
                        data.checkType = 'problem_clues';
                        this.$axios( {
                            method: 'post',
                            url: 'aprPersonalInspection/update',
                            data: this.$Qs.stringify( data )
                        } ).then( () => {
                            this.getData();
                            return this.$message.success( '编辑成功' )
                        } );
                        this.visible = false;

                        break;
                    case '编辑经济责任审查数据':
                        data.id = this.fileId;
                        data.checkType = 'financial';
                        this.$axios( {
                            method: 'post',
                            url: 'aprPersonalInspection/update',
                            data: this.$Qs.stringify( data )
                        } ).then( () => {
                            this.getData();
                            return this.$message.success( '编辑成功' )
                        } );
                        this.visible = false;
                        break;
                    case '编辑军事训练考核数据':
                        data.id = this.fileId;
                        data.checkType = 'training';
                        this.$axios( {
                            method: 'post',
                            url: 'aprPersonalInspection/update',
                            data: this.$Qs.stringify( data )
                        } ).then( () => {
                            this.getData();
                            return this.$message.success( '编辑成功' )
                        } );
                        this.visible = false;
                        break;
                    case '编辑健康状况评估数据':
                        data.id = this.fileId;
                        data.checkType = 'health';
                        this.$axios( {
                            method: 'post',
                            url: 'aprPersonalInspection/update',
                            data: this.$Qs.stringify( data )
                        } ).then( () => {
                            this.getData();
                            return this.$message.success( '编辑成功' )
                        } );
                        this.visible = false;
                        break;
                    case '编辑干部现实表现审查数据':
                        data.id = this.fileId;
                        data.checkType = 'cadre';
                        this.$axios( {
                            method: 'post',
                            url: 'aprPersonalInspection/update',
                            data: this.$Qs.stringify( data )
                        } ).then( () => {
                            this.getData();
                            return this.$message.success( '编辑成功' )
                        } );
                        this.visible = false;
                        break;
                    case '编辑其他情况核查数据':
                        data.id = this.fileId;
                        data.checkType = 'other';
                        this.$axios( {
                            method: 'post',
                            url: 'aprPersonalInspection/update',
                            data: this.$Qs.stringify( data )
                        } ).then( () => {
                            this.getData();
                            return this.$message.success( '编辑成功' )
                        } );
                        this.visible = false;
                        break;
                    default:
                        this.file = '';
                }

                this.form2.case = '';
                this.form2.explain = '';
                this.form2.person = '';
                this.form2.time = '';

            },
            //取消审核
            investigateCancel() {
                this.form2.case = '';
                this.form2.explain = '';
                this.form2.person = '';
                this.form2.time = '';

                this.visible = false
            },
            //打开新增审核
            addInvestigate( type ) {
                const arr = [
                    '',
                    '新增档案情况审查数据', // 1
                    '新增廉洁自律审查数据', // 2
                    '新增问题线索审查数据', // 3
                    '新增经济责任审查数据', // 4
                    '新增军事训练考核数据', // 5
                    '新增健康状况评估数据', // 6
                    '新增干部现实表现审查数据', // 7
                    '新增其他情况核查数据', // 8
                ];

                this.file = arr[type];
                this.visible = true;

            },
            //删除审查
            fileDelete( index, row ) {
                this.$axios( {
                    method: 'post',
                    url: 'aprPersonalInspection/delete?id=' + row.id
                } ).then( () => {
                    this.getData();
                    return this.$message.success( "删除成功" )
                } )
            },
            //编辑审查
            fileEdit( index, row, type ) {
                console.log(row)
                const array=[
                    '',
                    '编辑档案情况审查数据',
                    '编辑廉洁自律审查数据',
                    '编辑问题线索审查数据',
                    '编辑经济责任审查数据',
                    '编辑军事训练考核数据',
                    '编辑健康状况评估数据',
                    '编辑干部现实表现审查数据',
                    '编辑其他情况核查数据',
                ];
                this.file=array[type];
                this.form2.case = row.state;
                this.form2.explain = row.title;
                this.form2.person = row.checkUser;
                this.form2.time = row.checkTime;
                this.form2.other = row.checkDesc;
                this.fileId = row.id;
                this.visible = true;

            },
            //tabs切换
            handleClick( tab, event ) {
                console.log( tab, event );
            },
            //上传图片
            upload( file ) {
                const f = new FormData();
                f.set( 'file', file.file );
                f.set( 'infoId', this.id );
                this.$axios( {
                    method: 'post',
                    url: 'aprPersonalInfo/upload\n',
                    data: f,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                } )
                    .then( ( res ) => {
                        this.imageUrl = this.$baseUrl + "/" + res.data.data;
                        this.imgUrl = res.data.data;
                    } )
            },
            //上传图片之前
            beforeAvatarUpload( file ) {
                const isLt100M = file.size / 1024 / 1024 < 100;
                if ( !isLt100M ) {
                    this.$message.error( '上传头像图片大小不能超过 2MB!' );
                }
                return isLt100M;
            },
            //图片提交完成
            handleAvatarSuccess( res, file ) {
                this.imageUrl = URL.createObjectURL( file.raw );
            },
            //述职报告编辑
            reportEdit() {
                this.reportControl = false
            },
            infoSuccess( type ) {
                if ( type === 1 ) {
                    if ( this.textarea.length >= 999 ) {
                        return this.$message.error( '超出1000字符，请注意修改！' )
                    } else {
                        let data = {
                            id: this.resumeId,
                            infoId: this.id,
                            text: this.textarea,
                        };
                        let formData = new FormData();
                        let dataEntries = Object.entries( data );
                        for ( let item of dataEntries ) {
                            formData.set( item[ 0 ], item[ 1 ] )
                        }
                        this.$axios( {
                            method: 'post',
                            url: 'aprPersonalResume/update',
                            data: formData,
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
                        } )
                            .then( () => {
                                return this.$message.success( "提交成功" )
                            } )
                    }
                    this.textareaControl = true;
                } else if ( type === 2 ) {
                    if ( this.reportArea.length <= 999) {
                        return this.$message.error( '少于1000字符，请注意修改！' )
                    }else if(this.reportArea.length >= 1999){
                        return this.$message.error( '多于2000字符，请注意修改！' )
                    }else {
                        let data = {
                            infoId: this.id,
                            id: this.reportId,
                            text: this.reportArea,
                        };
                        this.$axios( {
                            method: 'post',
                            url: 'aprPersonalWorkReport/update',
                            data: this.$Qs.stringify( data ),

                        } )
                            .then( () => {
                                this.reportControl=true;
                                return this.$message.success( "提交成功" )
                            } )

                    }
                } else {
                    if ( this.textarea7.length >= 999 ) {
                        return this.$message.error( '超出1000字符，请注意修改！' )
                    } else {
                        let data = {
                            // id: this.healthyId,
                            infoId: this.id,
                            healthText: this.textarea7,
                        };
                        let formData = new FormData();
                        let dataEntries = Object.entries( data );
                        for ( let item of dataEntries ) {
                            formData.set( item[ 0 ], item[ 1 ] )
                        }
                        this.$axios( {
                            method: 'post',
                            url: 'aprPersonalInfo/updateHealthText',
                            data: formData,
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
                        } )
                            .then( () => {
                                return this.$message.success( "提交成功" )
                            } )
                    }
                    this.textareaControl = true;
                }

            },
            openModel( type ) {
                switch ( type ) {
                    case 1 :
                        this.type = 1;
                        this.check = '新增培训经历';
                        this.firstLabel = '开始时间';
                        this.secondLabel = '结束时间';
                        this.thirdLabel = '培训机构';
                        this.fourthLabel = '状态';
                        this.dialogOrganizationVisible = true;
                        break;
                    case 2 :
                        this.type = 2;
                        this.check = '新增参战记录';
                        this.firstLabel = '开始时间';
                        this.secondLabel = '结束时间';
                        this.thirdLabel = '参战名称';
                        this.fourthLabel = '备注';
                        this.dialogOrganizationVisible = true;
                        break;
                    case 3 :
                        this.type = 3;
                        this.check = '新增参加非战争军事记录';
                        this.firstLabel = '开始时间';
                        this.secondLabel = '结束时间';
                        this.thirdLabel = '行动名称';
                        this.fourthLabel = '备注';
                        this.dialogOrganizationVisible = true;
                        break;
                    case 4 :
                        this.type = 4;
                        this.check = '新增奖惩记录';
                        this.firstLabel = '时间';
                        this.thirdLabel = '荣誉/处罚';
                        this.fourthLabel = '备注';
                        this.dialogOrganizationVisible = true;
                        break;
                    case 5:
                        this.familyTittle = '新增家庭成员及重要社会关系\n';
                        this.familyVisible = true;
                        break;
                    default:
                        this.type = 1;
                }
            },
            addInput() {
                if ( this.check == '新增培训经历' || this.check == '新增参战记录' || this.check == '新增参加非战争军事记录' || this.check == '新增奖惩记录' ) {
                    if ( this.type == 1 ) {
                        const startTime = this.$moment( this.form1.startTime ).format( 'YYYY-MM-DD HH:mm:ss' );
                        const endTime = this.$moment( this.form1.endTime ).format( 'YYYY-MM-DD HH:mm:ss' );
                        let data = {
                            infoId: this.id,
                            trainStartTime: startTime,
                            trainEndTime: endTime,
                            trainInstitution: this.form1.name,
                            trainStatus: this.form1.status
                        };
                        this.$axios( {
                            method: 'post',
                            url: 'aprPersonalTrainRecord/update',
                            data: this.$Qs.stringify( data ),

                        } )
                            .then( () => {
                                this.form1.startTime = '';
                                this.form1.endTime = '';
                                this.form1.name = '';
                                this.form1.status = '';
                                this.getData();
                                return this.$message.success( "提交成功" )
                            } )
                    }
                    if ( this.type == 2 ) {
                        const startTime = this.$moment( this.form1.startTime ).format( 'YYYY-MM-DD HH:mm:ss' );
                        const endTime = this.$moment( this.form1.endTime ).format( 'YYYY-MM-DD HH:mm:ss' );
                        let data = {
                            infoId: this.id,
                            isWar: 1,
                            joinWarStartTime: startTime,
                            joinWarEndTime: endTime,
                            warName: this.form1.name,
                            remark: this.form1.status
                        };
                        this.$axios( {
                            method: 'post',
                            url: 'aprPersonalWarRecord/update',
                            data: this.$Qs.stringify( data ),

                        } )
                            .then( () => {
                                this.form1.startTime = '';
                                this.form1.endTime = '';
                                this.form1.name = '';
                                this.form1.other = '';
                                this.form1.status = '';
                                this.getData();
                                return this.$message.success( "提交成功" )
                            } )
                    }
                    if ( this.type == 3 ) {
                        const startTime = this.$moment( this.form1.startTime ).format( 'YYYY-MM-DD HH:mm:ss' );
                        const endTime = this.$moment( this.form1.endTime ).format( 'YYYY-MM-DD HH:mm:ss' );
                        let data = {
                            infoId: this.id,
                            isWar: 0,
                            joinWarStartTime: startTime,
                            joinWarEndTime: endTime,
                            warName: this.form1.name,
                            remark: this.form1.status
                        };
                        this.$axios( {
                            method: 'post',
                            url: 'aprPersonalWarRecord/update',
                            data: this.$Qs.stringify( data ),

                        } )
                            .then( () => {
                                this.form1.startTime = '';
                                this.form1.endTime = '';
                                this.form1.name = '';
                                this.form1.other = '';
                                this.form1.status = '';
                                this.getData();
                                return this.$message.success( "提交成功" )
                            } )
                    }
                    if ( this.type == 4 ) {
                        const startTime = this.$moment( this.form1.startTime ).format( 'YYYY-MM-DD HH:mm:ss' );
                        let data = {
                            infoId: this.id,
                            prizeTime: startTime,
                            prizeDescription: this.form1.name,
                            remark: this.form1.status
                        };
                        this.$axios( {
                            method: 'post',
                            url: 'aprPersonalPrizeRecord/update',
                            data: this.$Qs.stringify( data ),

                        } )
                            .then( () => {
                                this.form1.startTime = '';
                                this.form1.endTime = '';
                                this.form1.name = '';
                                this.form1.other = '';
                                this.form1.status = '';
                                this.getData();
                                return this.$message.success( "提交成功" )
                            } )
                    }

                } else {
                    if ( this.type == 1 ) {
                        const trainStartTime = this.$moment( this.form1.startTime ).format( 'YYYY-MM-DD HH:mm:ss' );
                        const trainEndTime = this.$moment( this.form1.endTime ).format( 'YYYY-MM-DD HH:mm:ss' );
                        let data = {
                            infoId: this.id,
                            id: this.personId,
                            tTime: trainStartTime,
                            trainTEnd: trainEndTime,
                            trainInstitution: this.form1.name,
                            trainStatus: this.form1.status
                        };
                        this.$axios( {
                            method: 'post',
                            url: 'aprPersonalTrainRecord/update',
                            data: this.$Qs.stringify( data ),

                        } )
                            .then( () => {
                                this.form1.startTime = '';
                                this.form1.endTime = '';
                                this.form1.name = '';
                                this.form1.other = '';
                                this.form1.status = '';
                                this.getData();
                                return this.$message.success( "提交成功" )
                            } )
                    }
                    if ( this.type == 2 ) {
                        const startTime = this.$moment( this.form1.startTime ).format( 'YYYY-MM-DD HH:mm:ss' );
                        const endTime = this.$moment( this.form1.endTime ).format( 'YYYY-MM-DD HH:mm:ss' );
                        let data = {
                            infoId: this.id,
                            isWar: 1,
                            id: this.personId,
                            joinWarStartTime: startTime,
                            joinWarEndTime: endTime,
                            warName: this.form1.name,
                            remark: this.form1.status
                        };
                        this.$axios( {
                            method: 'post',
                            url: 'aprPersonalWarRecord/update',
                            data: this.$Qs.stringify( data ),

                        } )
                            .then( () => {
                                this.form1.startTime = '';
                                this.form1.endTime = '';
                                this.form1.name = '';
                                this.form1.other = '';
                                this.form1.status = '';
                                this.getData();
                                return this.$message.success( "提交成功" )
                            } )
                    }
                    if ( this.type == 3 ) {
                        const startTime = this.$moment( this.form1.startTime ).format( 'YYYY-MM-DD HH:mm:ss' );
                        const endTime = this.$moment( this.form1.endTime ).format( 'YYYY-MM-DD HH:mm:ss' );
                        let data = {
                            infoId: this.id,
                            isWar: 0,
                            id: this.personId,
                            joinWarStartTime: startTime,
                            joinWarEndTime: endTime,
                            warName: this.form1.name,
                            remark: this.form1.status
                        };
                        this.$axios( {
                            method: 'post',
                            url: 'aprPersonalWarRecord/update',
                            data: this.$Qs.stringify( data ),

                        } )
                            .then( () => {
                                this.form1.startTime = '';
                                this.form1.endTime = '';
                                this.form1.name = '';
                                this.form1.other = '';
                                this.form1.status = '';
                                this.getData();
                                return this.$message.success( "提交成功" )
                            } )
                    }
                    if ( this.type == 4 ) {
                        const startTime = this.$moment( this.form1.startTime ).format( 'YYYY-MM-DD HH:mm:ss' );
                        let data = {
                            infoId: this.id,
                            id: this.personId,
                            prizeTime: startTime,
                            prizeDescription: this.form1.name,
                            remark: this.form1.status
                        };
                        this.$axios( {
                            method: 'post',
                            url: 'aprPersonalPrizeRecord/update',
                            data: this.$Qs.stringify( data ),

                        } )
                            .then( () => {
                                this.form1.startTime = '';
                                this.form1.endTime = '';
                                this.form1.name = '';
                                this.form1.other = '';
                                this.form1.status = '';
                                this.getData();
                                return this.$message.success( "提交成功" )
                            } )
                    }
                }

                this.dialogOrganizationVisible = false;
            },
            allCancel() {
                this.form1.startTime = '';
                this.form1.endTime = '';
                this.form1.name = '';
                this.form1.other = '';
                this.form1.status = '';
                this.dialogOrganizationVisible = false;
            },
            handleEdit( index, row, type ) {
                switch ( type ) {
                    case 1 :
                        this.type = 1;
                        this.check = '编辑培训经历';
                        this.firstLabel = '开始时间';
                        this.secondLabel = '结束时间';
                        this.thirdLabel = '培训机构';
                        this.fourthLabel = '状态';
                        this.personId = row.id;
                        this.form1.startTime = row.trainStartTime;
                        this.form1.endTime = row.trainEndTime;
                        this.form1.name = row.trainInstitution;
                        this.form1.status = row.trainStatus;
                        this.dialogOrganizationVisible = true;
                        break;
                    case 2 :
                        this.type = 2;
                        this.check = '编辑参战记录';
                        this.firstLabel = '开始时间';
                        this.secondLabel = '结束时间';
                        this.thirdLabel = '参战名称';
                        this.fourthLabel = '备注';
                        this.personId = row.id;
                        this.form1.startTime = row.joinWarStartTime;
                        this.form1.endTime = row.joinWarEndTime;
                        this.form1.name = row.warName;
                        this.form1.status = row.remark;
                        this.dialogOrganizationVisible = true;
                        break;
                    case 3 :
                        this.type = 3;
                        this.check = '编辑参加非战争军事记录';
                        this.firstLabel = '开始时间';
                        this.secondLabel = '结束时间';
                        this.thirdLabel = '行动名称';
                        this.fourthLabel = '备注';
                        this.personId = row.id;
                        this.form1.startTime = row.joinWarStartTime;
                        this.form1.endTime = row.joinWarEndTime;
                        this.form1.name = row.warName;
                        this.form1.status = row.remark;
                        this.dialogOrganizationVisible = true;
                        break;
                    case 4 :
                        this.type = 4;
                        this.check = '编辑奖惩记录';
                        this.firstLabel = '时间';
                        this.thirdLabel = '荣誉/处罚';
                        this.fourthLabel = '备注';
                        this.personId = row.id;
                        this.form1.startTime = row.prizeTime;
                        this.form1.endTime = row.trainTEnd;
                        this.form1.name = row.prizeDescription;
                        this.form1.status = row.remark;
                        this.dialogOrganizationVisible = true;
                        break;
                    case 5:
                        this.familyTittle = '编辑家庭成员及重要社会关系';
                        this.personId = row.id;
                        this.familyForm.appellation = row.appellation;
                        this.familyForm.name = row.name;
                        this.familyForm.birthday = row.birthday;
                        this.familyForm.politicsStatus = row.politicsStatus;
                        this.familyForm.workInfo = row.workInfo;
                        this.familyVisible = true;
                        break;
                    default:
                        this.type = 1;
                }


            },
            //关闭前
            handleClose( done ) {
                this.$confirm( '确认关闭？' )
                    .then( () => {
                        this.form1.startTime = '';
                        this.form1.endTime = '';
                        this.form1.name = '';
                        this.form1.other = '';
                        this.form1.status = '';
                        this.$refs.form.resetFields();
                        done();
                    } )
                    .catch( () => {
                    } );
            },
            handleDelete( row, type ) {
                switch ( type ) {
                    case 1:
                        this.$axios( {
                            method: 'post',
                            url: 'aprPersonalTrainRecord/delete?id=' + row.id
                        } ).then( () => {
                            this.getData();
                            return this.$message.success( '删除成功' )
                        } );
                        break;
                    case 2:
                        this.$axios( {
                            method: 'post',
                            url: 'aprPersonalWarRecord/delete?id=' + row.id
                        } ).then( () => {
                            this.getData();
                            return this.$message.success( '删除成功' )
                        } );
                        break;
                    case 3:
                        this.$axios( {
                            method: 'post',
                            url: 'aprPersonalWarRecord/delete?id=' + row.id
                        } ).then( () => {
                            this.getData();
                            return this.$message.success( '删除成功' )
                        } );
                        break;
                    case 4:
                        this.$axios( {
                            method: 'post',
                            url: 'aprPersonalPrizeRecord/delete?id=' + row.id
                        } ).then( () => {
                            this.getData();
                            return this.$message.success( '删除成功' )
                        } );
                        break;
                    case 5:
                        this.$axios( {
                            method: 'post',
                            url: 'aprPersonalConcern/delete?id=' + row.id
                        } ).then( () => {
                            this.getData();
                            return this.$message.success( '删除成功' )
                        } );
                        break;
                    default:
                        return this.$message.error( '删除失败' );
                }

            },
            textareaEdit() {
                this.textareaControl = false
            },
            handleChange( val ) {
                console.log( val );
            },
            onSubmit() {
                console.log( 'submit!' );
            },
        }
    }
</script>

<style scoped>
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
</style>
