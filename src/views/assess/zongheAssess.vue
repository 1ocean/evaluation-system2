<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">综合考评</el-menu-item>
            <el-menu-item v-if="key===2" index="2">资料详情</el-menu-item>
        </el-menu>
        <div v-if="activeIndex==='1'">
            <div style="margin-top: 2%">
                <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="120px">
                    <span>{{ year }}年度</span>
                    <el-form-item label="组织机构">
                        <el-select clearable  v-model="formInline.organization" placeholder="请选择">
                            <el-option
                                    v-for="item in organizationOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="姓名">
                        <el-input v-model="formInline.name" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>

                </el-form>
                <el-table
                        border
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%;font-size: 12px;"
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            prop="personalInfo.policeNo"
                            label="编号"
                            min-width="80">
                    </el-table-column>
                    <el-table-column
                            label="头像"
                            min-width="65">
                        <template slot-scope="scope">
                            <img :src="$baseUrl+'/'+scope.row.personalInfo.imgPath" width="40" height="40" class="head_pic"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="personalInfo.policeName"
                            label="姓名"
                            min-width="60">
                    </el-table-column>
                    <el-table-column
                            label="材料详情"
                            min-width="90"
                            align="center"
                    >
                        <template slot-scope="scope">
                            <el-button @click="detailsClick(scope.row)" size="small" type="text">考核</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="一、汇报推荐">
                        <el-table-column
                                prop="reportRecommendNum"
                                label="推荐"
                                min-width="55">
                        </el-table-column>
                        <el-table-column
                                prop="reportUrecommendNum"
                                label="不推荐"
                                min-width="55">
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="二、个人述职">
                        <el-table-column
                                prop="workYnum"
                                label="优秀"
                                min-width="55">
                        </el-table-column>
                        <el-table-column
                                prop="workHege"
                                label="合格"
                                min-width="55">
                        </el-table-column>
                        <el-table-column
                                prop="workBuhege"
                                label="不合格"
                                min-width="55">
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="三、民主测评">
                        <el-table-column
                                prop="democraticYnum"
                                label="优秀"
                                min-width="55">
                        </el-table-column>
                        <el-table-column
                                prop="democraticHege"
                                label="合格"
                                min-width="55">
                        </el-table-column>
                        <el-table-column
                                prop="democraticBuhege"
                                label="不合格"
                                min-width="55">
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="四、个别谈话">
                        <el-table-column
                                prop="chatYnum"
                                label="优秀"
                                min-width="55">
                        </el-table-column>
                        <el-table-column
                                prop="chatHege"
                                label="合格"
                                min-width="55">
                        </el-table-column>
                        <el-table-column
                                prop="chatBuhege"
                                label="不合格"
                                min-width="55">
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="五、实绩分析">
                        <el-table-column
                                prop="performanceYnum"
                                label="优秀"
                                min-width="55">
                        </el-table-column>
                        <el-table-column
                                prop="performanceHege"
                                label="合格"
                                min-width="55">
                        </el-table-column>
                        <el-table-column
                                prop="performanceBuhege"
                                label="不合格"
                                min-width="55">
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="六、素质考核">
                        <el-table-column
                                prop="qualityYnum"
                                label="优秀"
                                min-width="55">
                        </el-table-column>
                        <el-table-column
                                prop="qualityHege"
                                label="合格"
                                min-width="55">
                        </el-table-column>
                        <el-table-column
                                prop="qualityBuhege"
                                label="不合格"
                                min-width="55">
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="七、综合评定">
                        <el-table-column
                                prop="zonghe"
                                label=""
                                min-width="105">
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="审核考评">
                        <el-table-column
                                label="通过"
                                min-width="55">
                            <template slot-scope="scope">
                                <el-popconfirm
                                        @onConfirm="pass( scope.row)"
                                        confirmButtonText='确定'
                                        cancelButtonText='不用了'
                                        icon="el-icon-info"
                                        iconColor="red"
                                        title="确定通过吗？"
                                        v-if="!scope.row.ystate||scope.row.ystate==='未通过'" style="cursor: pointer"
                                >
                                    <div slot="reference">
                                        <img src="../../assets/pass.png" height="40" width="40"/>
                                    </div>
                                </el-popconfirm>

                                <div v-if="scope.row.ystate==='通过'">通过</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="不通过"
                                min-width="55">
                            <template slot-scope="scope">
                                <el-popconfirm
                                        @onConfirm="unPass( scope.row)"
                                        confirmButtonText='确定'
                                        cancelButtonText='不用了'
                                        icon="el-icon-info"
                                        iconColor="red"
                                        title="确定不通过吗？"
                                        v-if="!scope.row.ystate||scope.row.ystate==='通过'" style="cursor: pointer"
                                >
                                    <div slot="reference" >
                                        <img src="../../assets/down.png" height="40" width="40"/>
                                    </div>
                                </el-popconfirm>

                                <div v-if="scope.row.ystate==='未通过'">未通过</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="qualityBuhege"
                                label="审核人"
                                min-width="55">
                        </el-table-column>
                        <el-table-column
                                prop="qualityBuhege"
                                label="更新时间"
                                min-width="55">
                        </el-table-column>
                    </el-table-column>
                </el-table>
                <el-pagination
                        @current-change="currentChange"
                        @prev-click="prevClick"
                        @next-click="nextClick"
                        style="text-align: right"
                        background
                        layout="prev, pager, next"
                        :page-size="pageSize"
                        :total="total">
                </el-pagination>
            </div>

        </div>
        <div v-if="activeIndex==='2'">
            <div style="margin-top: 2%">

            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="评定详情" name="first">
                    <el-table
                            border
                            ref="multipleTable"
                            :data="tableData2"
                            tooltip-effect="dark"
                    >
                        <el-table-column label="一、汇报推荐">
                            <el-table-column
                                    prop="reportTotalNum"
                                    label="参与人数"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="reportRcommendRatio"
                                    label="推荐"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="reportUrecommendRatio"
                                    label="不推荐"
                                    min-width="55">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="二、个人述职">
                            <el-table-column
                                    prop="workTotalNum"
                                    label="参与人数"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="workYnumRatio"
                                    label="优秀"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="workHegeRatio"
                                    label="合格"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="workBuhegeRatio"
                                    label="不合格"
                                    min-width="55">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="三、民主测评">
                            <el-table-column
                                    prop="democraticTotalNum"
                                    label="参与人数"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="democraticYnumRatio"
                                    label="优秀"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="democraticHegeRatio"
                                    label="合格"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="democraticBuhegeRatio"
                                    label="不合格"
                                    min-width="55">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="四、个别谈话">
                            <el-table-column
                                    prop="chatYratio"
                                    label="优秀"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="chatHegeRatio"
                                    label="合格"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="chatBuhegeRatio"
                                    label="不合格"
                                    min-width="55">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="五、实绩分析">
                            <el-table-column
                                    prop="performanceYratio"
                                    label="优秀"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="performanceHegeRatio"
                                    label="合格"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="performanceBuhegeRatio"
                                    label="不合格"
                                    min-width="55">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="六、素质考核">
                            <el-table-column
                                    prop="qualityYratio"
                                    label="优秀"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="qualityHegeRatio"
                                    label="合格"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="qualityBuhegeRatio"
                                    label="不合格"
                                    min-width="55">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="七、综合评定">
                            <el-table-column
                                    prop="zonghe"
                                    label=""
                                    min-width="105">
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                    <el-table
                            border
                            ref="multipleTable"
                            :data="tableData3"
                            tooltip-effect="dark"
                            style="font-size: 12px;margin-top: 2%;"
                    >
                        <el-table-column label="1.政治表现">
                            <el-table-column
                                    prop="yratio1"
                                    label="优秀"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="hratio1"
                                    label="合格"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="bratio1"
                                    label="不合格"
                                    min-width="57">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="2.品德修养">
                            <el-table-column
                                    prop="yratio2"
                                    label="优秀"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="hratio2"
                                    label="合格"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="bratio2"
                                    label="不合格"
                                    min-width="57">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="3.谋划决策">
                            <el-table-column
                                    prop="yratio3"
                                    label="优秀"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="hratio3"
                                    label="合格"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="bratio3"
                                    label="不合格"
                                    min-width="57">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="4.组织指挥">
                            <el-table-column
                                    prop="yratio4"
                                    label="优秀"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="hratio4"
                                    label="合格"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="bratio4"
                                    label="不合格"
                                    min-width="57">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="5.教育管理">
                            <el-table-column
                                    prop="yratio5"
                                    label="优秀"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="hratio5"
                                    label="合格"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="bratio5"
                                    label="不合格"
                                    min-width="57">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="6.团结协作">
                            <el-table-column
                                    prop="yratio6"
                                    label="优秀"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="hratio6"
                                    label="合格"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="bratio6"
                                    label="不合格"
                                    min-width="57">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="7.学习创新">
                            <el-table-column
                                    prop="yratio7"
                                    label="优秀"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="hratio7"
                                    label="合格"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="bratio7"
                                    label="不合格"
                                    min-width="57">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="8.精神状态">
                            <el-table-column
                                    prop="yratio8"
                                    label="优秀"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="hratio8"
                                    label="合格"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="bratio8"
                                    label="不合格"
                                    min-width="57">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="9.工作作风">
                            <el-table-column
                                    prop="yratio9"
                                    label="优秀"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="hratio9"
                                    label="合格"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="bratio9"
                                    label="不合格"
                                    min-width="57">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="10.履行基本职责">
                            <el-table-column
                                    prop="yratio10"
                                    label="优秀"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="hratio10"
                                    label="合格"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="bratio10"
                                    label="不合格"
                                    min-width="57">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="11.执行重大任务">
                            <el-table-column
                                    prop="yratio11"
                                    label="优秀"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="hratio11"
                                    label="合格"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="bratio11"
                                    label="不合格"
                                    min-width="57">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="12.廉洁自律">
                            <el-table-column
                                    prop="yratio12"
                                    label="优秀"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="hratio12"
                                    label="合格"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="bratio12"
                                    label="不合格"
                                    min-width="57">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="13.身体素质">
                            <el-table-column
                                    prop="yratio13"
                                    label="优秀"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="hratio13"
                                    label="合格"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="bratio13"
                                    label="不合格"
                                    min-width="57">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="14.心理素质">
                            <el-table-column
                                    prop="yratio14"
                                    label="优秀"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="hratio14"
                                    label="合格"
                                    min-width="55">
                            </el-table-column>
                            <el-table-column
                                    prop="bratio14"
                                    label="不合格"
                                    min-width="57">
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="资料详情" name="second">
                    <div style="margin-top: 2%">
                        <el-row>
                            <el-col :span="3">{{ year }}年度考核-资料详情</el-col>
                        </el-row>
                    </div>
                    <div style="display: flex;justify-content: space-around;margin-top: 2%">
                        <div>
                            <div style="display: grid;
                grid-gap: 20px;
                grid-template-columns: auto auto auto auto auto;
                grid-template-rows: auto auto auto;
                font-size: 14px"
                            >
                                <span>编号：{{ peopleData.personalInfo.policeNo}}</span>
                                <span>姓名：{{ peopleData.personalInfo.policeName }}</span>
                                <span>性别：{{ peopleData.personalInfo.sex }}</span>
                                <span>年龄：{{ age }}</span>
                                <span>籍贯：{{ peopleData.personalInfo.nativePlace }}</span>
                                <span>民族：{{ peopleData.personalInfo.nation }}</span>
                                <span>出生地：{{ peopleData.personalInfo.birthPlace }}</span>
                                <span>学历：{{ peopleData.personalInfo.education }}</span>
                                <span>组织机构：{{ peopleData.organization.orgName }}</span>
                                <span>现任职务：{{ peopleData.personalInfo.nowPosition }}</span>
                                <span>现部职别：{{ peopleData.personalInfo.deptPosition }}</span>
                                <span>现警衔：{{ peopleData.personalInfo.policeRank }}</span>
                                <span>出生日期：{{ birthDay }}</span>
                                <span>入伍(工作)时间：{{ militaryTime }}</span>
                                <span>现职务任职时间：{{ nowPositionTime }} </span>
                                <span>现部职别时间：{{ deptPositionTime }}</span>
                                <span>现警衔时间：{{ policeRankTime }}</span>
                            </div>
                        </div>
                        <div>
                            <img :src="imgPath" alt="" width="200" height="200">
                        </div>
                    </div>
                    <div style="font-size: 20px;font-weight: bolder">
                        <p>个人简历</p>
                        <el-input
                                type="textarea"
                                :autosize="{ minRows: 5, maxRows: 10}"
                                placeholder="请输入内容"
                                v-model="textarea2"
                                :disabled="true"
                        >
                        </el-input>
                    </div>
                    <div style="font-size: 20px;font-weight: bolder">
                        <p>核查部分</p>
                    </div>
                    <el-table
                            border
                            ref="multipleTable"
                            :data="tableData4"
                            tooltip-effect="dark"
                    >
                        <el-table-column
                                prop=""
                                label="序号"
                                width="80">
                            <template slot-scope="scope">
                                <span v-text="getIndex(scope.$index)"> </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="tab"
                                label="核查项目"
                                min-width="110">
                        </el-table-column>
                        <el-table-column
                                prop="state"
                                label="核查情况"
                                min-width="110">
                        </el-table-column>
                        <el-table-column
                                prop="title"
                                label="核查说明"
                                min-width="160">
                        </el-table-column>
                        <el-table-column
                                prop="checkDesc"
                                label="其它说明"
                                min-width="160">
                        </el-table-column>
                        <el-table-column
                                prop="checkUser"
                                label="审查人"
                                min-width="90">
                        </el-table-column>
                        <el-table-column
                                prop="checkTime"
                                label="审查时间"
                                min-width="120">
                        </el-table-column>
                        <el-table-column
                                prop="loginName"
                                label="登录人"
                                min-width="90">
                        </el-table-column>
                        <el-table-column
                                prop="loginTime"
                                label="更新时间"
                                min-width="120">
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="操作"
                                width="150">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="text" size="small">查看附件</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    export default {
        name: "checkPreliminary",
        data() {
            return {
                activeName: 'first',
                key: 1,
                timeControl: false,
                organizationOptions: [],
                timeConditionsOptions: [],
                //民主测评，个人谈话模态框
                tableVisible: false,
                //汇报推荐，个人述职，实绩分析模态框名
                title: '',
                //汇报推荐，个人述职，实绩分析模态框
                dialogVisible: false,
                //素质测试模态框
                visible: false,
                //测试内容模态框
                testVisible: false,
                //民主测评，个人谈话标题
                tableTitle: '',
                //汇报推荐，个人述职，实绩分析form
                form: {
                    state: '',
                    suggestion: '',
                    name: '',
                    radio: '推荐',
                    jobState: ''
                },
                //资料详情个人资料
                peopleData: {},
                form2: {
                    construction: '',
                    constructionArea: '',
                    task: '',
                    taskArea: '',
                    self: '',
                    selfArea: '',
                    name: '',
                    radio: '优秀'
                },
                form3: {
                    value: '',
                    content: '',
                    point: '',
                },
                form4: {
                    name: ''
                },
                //综合考评表格分页
                total:50,
                //综合考评表格单页数量
                pageSize:10,
                //当前第几页
                pageCurrent:1,
                contentOptions: [
                    {
                        label: '体能',
                        value: '体能'
                    },
                    {
                        label: '技能',
                        value: '技能'
                    },
                    {
                        label: '考试',
                        value: '考试'
                    }
                ],
                options: [
                    {
                        label: '优秀',
                        value: '优秀',
                    },
                    {
                        label: '合格',
                        value: '合格',
                    },
                    {
                        label: '不合格',
                        value: '不合格',
                    },
                ],
                activeIndex: '1',
                formInline: {
                    organization: '',
                    sort: '',
                    name: ''
                },
                sortOption: [
                    {
                        label: '警官',
                        value: '警官'
                    },
                    {
                        label: '干部',
                        value: '干部'
                    }
                ],
                num: '',
                //编号
                policeNo: '',
                //年龄
                age: '',
                //出生日期
                birthDay: '',
                //入伍(工作)时间
                militaryTime: '',
                //现职务任职时间
                nowPositionTime: '',
                //现部职别时间
                deptPositionTime: '',
                //现警衔时间
                policeRankTime: '',
                //头像地址
                imgPath: '',
                //个人简历文本
                textarea2: '',
                year: '',
                //档案ID
                fileId: '',
                //当前人员id
                infoId: '',
                tableData: [],
                tableData2: [],
                tableData3: [],
                tableData4: [],

            }

        },

        created() {
            this.year = parseInt( this.$moment( new Date() ).format( "YYYY" ) );
        },
        mounted() {
            this.getData()
        },
        methods: {
            //表格选择页
            currentChange( val ) {
                this.pageCurrent = `${ val }`;
                this.getData()
            },
            //表格上一页
            prevClick( val ) {
                this.pageCurrent = `${ val }`;
                this.getData();
            },
            //表格下一页
            nextClick( val ) {
                this.pageCurrent = `${ val }`;
                this.getData();
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            //不通过
            unPass(row) {
                let data={
                    ystate:'未通过',
                    id:row.yearId
                };
                this.$axios( {
                    method: 'post',
                    url:'aprPersonalInfoYear/update',
                    data:this.$Qs.stringify(data)
                } ).then(()=>{
                    this.getData()
                })
            },
            //通过
            pass(row) {
                let data={
                    ystate:'通过',
                    id:row.yearId
                };
                this.$axios( {
                    method: 'post',
                    url:'aprPersonalInfoYear/update',
                    data:this.$Qs.stringify(data)
                } ).then(()=>{
                    this.getData()
                })
            },
            //获取数据
            getData() {
                let data = {
                    year: this.year,
                    orgId: this.formInline.organization,
                    // nowPosition: this.formInline.sort,
                    policeName: this.formInline.name,
                };
                this.$axios( {
                    method: 'get',
                    url: 'organization/all/-1',
                } ).then( ( res ) => {
                    this.organizationOptions = [];
                    for ( let i in res.data ) {
                        this.organizationOptions.push( { label: res.data[ i ].orgName, value: res.data[ i ].id } )
                    }
                    this.$axios( {
                        method: 'post',
                        url: 'aprPersonalExamineResult/list2',
                        data: this.$Qs.stringify( data )
                    } ).then( ( res ) => {
                        this.tableData = [];
                        for ( let i in res.data.data.list ) {
                            this.tableData.push( res.data.data.list[ i ] )
                        }
                    } )
                } );
                let datas = {
                    year: this.year,
                    orgId: this.formInline.organization,
                    // nowPosition: this.formInline.sort,
                    policeName: this.formInline.name,
                };
                this.$axios( {
                    method: 'get',
                    url: 'organization/all/-1',
                } ).then( ( res ) => {
                    this.organizationOptions = [];
                    for ( let i in res.data ) {
                        this.organizationOptions.push( { label: res.data[ i ].orgName, value: res.data[ i ].id } )
                    }
                    this.$axios( {
                        method: 'post',
                        url: 'aprPersonalExamineResult/list2',
                        data: this.$Qs.stringify( datas )
                    } ).then( ( res ) => {
                        this.tableData = [];
                        for ( let i in res.data.data.list ) {
                            this.tableData.push( res.data.data.list[ i ] )
                        }
                    } )
                } );

            }
            ,
            getIndex( $index ) {
                //表格序号
                return ( this.num - 1 ) * this.num + $index + 1
            },
            //查看详情
            detailsClick( row ) {
                return new Promise(resolve => {
                    this.key = 2;
                    this.activeIndex = '2';
                    resolve()
                }).then(()=>{
                    this.infoId = row.personalInfo.id;
                    this.$axios( {
                        method: 'get',
                        url: 'aprPersonalExamineResult/getPersonalCheckByInfoId?infoId=' + row.personalInfo.id
                    } ).then( (res) => {
                        this.tableData2=res.data.data
                    } );
                    this.$axios( {
                        method: 'get',
                        url: 'aprPersonalExamineResult/get14DataByInfoId?infoId=' + row.personalInfo.id
                    } ).then( (res) => {
                        let array=[];
                        array.push(res.data.data);
                        this.tableData3=array;
                    } );
                    this.$axios( {
                        method: 'get',
                        url: 'aprPersonalInfo/getPersonalInfoByInfoId?infoId=' + row.personalInfo.id
                    } ).then( ( res ) => {
                        this.peopleData = res.data.data;
                        this.policeNo = res.data.data.personalInfo.policeNo;
                        this.age = parseInt( this.$moment( new Date() ).format( 'YYYY' ) ) - parseInt( this.$moment( res.data.data.personalInfo.birthDay ).format( 'YYYY' ) );
                        this.birthDay = this.$moment( res.data.data.personalInfo.birthDay ).format( 'YYYY-MM-DD' );
                        this.militaryTime = this.$moment( res.data.data.personalInfo.militaryTime ).format( 'YYYY-MM-DD' );
                        this.nowPositionTime = this.$moment( res.data.data.personalInfo.nowPositionTime ).format( 'YYYY-MM-DD' );
                        this.deptPositionTime = this.$moment( res.data.data.personalInfo.deptPositionTime ).format( 'YYYY-MM-DD' );
                        this.policeRankTime = this.$moment( res.data.data.personalInfo.policeRankTime ).format( 'YYYY-MM-DD' );
                        this.imgPath = this.$baseUrl + res.data.data.personalInfo.imgPath;
                        this.textarea2 = res.data.data.personalResume[ 0 ].text;
                        this.tableData4 = res.data.data.personalInspection.personalInspectionAll;

                    } );

                })


            }
            ,
            //查询
            onSubmit() {
                this.getData()
            }
            ,
            handleSelectionChange() {
            }
            ,
            timeChange() {
                this.timeControl = false;
            }
            ,

            handleSelect( key ) {
                this.activeIndex = key[ 0 ];
            }
        }
    }
</script>

<style scoped>
    .el-menu-item.is-active {
        background-color: white !important;
        color: rgb(0, 153, 102) !important;
    }
</style>
