<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">考评预审</el-menu-item>
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
                    <!--                    <el-form-item label="类别">-->
                    <!--                        <el-select v-model="formInline.sort" placeholder="请选择">-->
                    <!--                            <el-option-->
                    <!--                                    v-for="item in sortOption"-->
                    <!--                                    :key="item.value"-->
                    <!--                                    :label="item.label"-->
                    <!--                                    :value="item.value">-->
                    <!--                            </el-option>-->
                    <!--                        </el-select>-->
                    <!--                    </el-form-item>-->
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
                            <img :src="$baseUrl+'/'+scope.row.personalInfo.imgPath" width="40" height="40"
                                 class="head_pic"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="personalInfo.policeName"
                            label="姓名"
                            min-width="60">
                    </el-table-column>
                    <el-table-column
                            label="材料详情"
                            min-width="90">
                        <template slot-scope="scope">
                            <el-button @click="detailsClick(scope.row)" size="small" type="text">点击查看详情</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="一、汇报推荐">
                        <el-table-column
                                prop="reportTotalNum"
                                label="参评人数"
                                min-width="65">
                        </el-table-column>
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
                    <el-table-column label="二、个人述职评分">
                        <el-table-column
                                prop="workTotalNum"
                                label="参评人数"
                                min-width="65">
                        </el-table-column>
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
                                prop="democraticTotalNum"
                                label="参评人数"
                                min-width="65">
                        </el-table-column>
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
                        <!--                <el-table-column-->
                        <!--                        prop="policeRank"-->
                        <!--                        label="良好"-->
                        <!--                        min-width="55">-->
                        <!--                </el-table-column>-->
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
                        <!--                <el-table-column-->
                        <!--                        prop="policeRank"-->
                        <!--                        label="良好"-->
                        <!--                        min-width="55">-->
                        <!--                </el-table-column>-->
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
                        <!--                <el-table-column-->
                        <!--                        prop="policeRank"-->
                        <!--                        label="良好"-->
                        <!--                        min-width="55">-->
                        <!--                </el-table-column>-->
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
                    <el-table-column
                            fixed="right"
                            label="预审查询"
                            min-width="80">
                        <template slot-scope="scope">
                            <el-button @click="searchClick(scope.row)" size="small" type="text">预审查询</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

        </div>
        <div v-if="activeIndex==='2'">
            <div style="margin-top: 2%">
                <el-row>
                    <el-col :span="3">{{ year }}年度考核</el-col>
                    <el-button type="primary" @click="openModule(1)">一、汇报推荐</el-button>
                    <el-button type="primary" @click="openModule(2)">二、个人述职</el-button>
                    <el-button type="primary" @click="openModule(3)">三、民主评测</el-button>
                    <el-button type="primary" @click="openModule(4)">四、个人谈话</el-button>
                    <el-button type="primary" @click="openModule(5)">五、实绩分析</el-button>
                    <el-button type="primary" @click="openModule(6)">六、素质测试</el-button>
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
                        <span>编号：{{ peopleData.personalInfo.policeNo }}</span>
                        <span>姓名：{{ peopleData.personalInfo.policeName }}</span>
                        <span>性别：{{ peopleData.personalInfo.sex }}</span>
                        <span>年龄：{{ age }}</span>
                        <span>籍贯：{{ peopleData.personalInfo.nativePlace }}</span>
                        <span>民族：{{ peopleData.personalInfo.nation }}</span>
                        <span>出生地：{{ peopleData.personalInfo.birthPlace }}</span>
                        <span>学历：{{ peopleData.personalInfo.education }}</span>
                        <span>组织机构：{{ peopleData.personalInfo.orgName }}</span>
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
                    :data="tableData2"
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
        </div>
        <el-dialog
                :title="title"
                :visible.sync="dialogVisible"
                width="50%"
        >
            <div class="displayFlex">
                <span>登录人：{{ $store.state.roleName }}</span>
                <span>组织机构：{{ $store.state.orgName }}</span>
            </div>
            <p style="color: blue">※请仔细查看考评对象的资料详情，再打分考评</p>
            <p>实绩分析内容（见附表一，业主没提供附表顾目前按扫描件的考评方案内容填写）</p>
            <el-form v-if="title==='汇报推荐'||title==='个人述职'" :model="form" ref="form" label-width="150px"
                     class="demo-ruleForm">
                <el-form-item v-if="title==='汇报推荐'" label="汇报情况"
                              :rules="[
                                  { required: true, message: '请输入汇报情况', trigger: 'blur' },
                                ]"
                >
                    <el-input type="textarea" v-model="form.state"></el-input>
                </el-form-item>
                <el-form-item v-if="title==='个人述职'" label="述职情况"
                              :rules="[
                                  { required: true, message: '请输入汇报情况', trigger: 'blur' },
                                ]"
                >
                    <el-input type="textarea" v-model="form.jobState"></el-input>
                </el-form-item>
                <el-form-item label="意见建议"
                              :rules="[
                                  { required: true, message: '请输入意见建议', trigger: 'blur' },
                                ]"
                >
                    <el-input type="textarea" v-model="form.suggestion"></el-input>
                </el-form-item>
                <el-form-item v-if="title==='汇报推荐'"
                              label="评定结果"
                              :rules="[
                                  { required: true, message: '请输入评定结果', trigger: 'blur' },
                                ]"
                >
                    <el-radio v-model="form.radio" label="推荐">推荐</el-radio>
                    <el-radio v-model="form.radio" label="不推荐">不推荐</el-radio>
                </el-form-item>
                <el-form-item v-if="title==='个人述职'"
                              label="评定结果"
                              :rules="[
                                  { required: true, message: '请输入评定结果', trigger: 'blur' },
                                ]"
                >
                    <el-radio v-model="form.radio" label="优秀">优秀</el-radio>
                    <el-radio v-model="form.radio" label="合格">合格</el-radio>
                    <el-radio v-model="form.radio" label="不合格">不合格</el-radio>
                </el-form-item>
                <el-form-item label="推荐人(输入签字)"
                              :rules="[
                                  { required: true, message: '请输入推荐人', trigger: 'blur' },
                                ]"
                >
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
            <el-form v-if="title==='实绩分析'" :model="form2" ref="form2" label-width="220px" class="demo-ruleForm">
                <el-form-item label="所在单位全面建设情况"
                              :rules="[
                                  { required: true, message: '请输入所在单位全面建设情况', trigger: 'blur' },
                                ]"
                >
                    <el-select clearable  v-model="form2.construction" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-input type="textarea" v-model="form2.constructionArea"></el-input>
                </el-form-item>
                <el-form-item label="所在单位完成重大任务情况"
                              :rules="[
                                  { required: true, message: '请输入所在单位完成重大任务情况', trigger: 'blur' },
                                ]"
                >
                    <el-select clearable  v-model="form2.task" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-input type="textarea" v-model="form2.taskArea"></el-input>
                </el-form-item>
                <el-form-item label="个人工作状况"
                              :rules="[
                                  { required: true, message: '请输入个人工作状况', trigger: 'blur' },
                                ]"
                >
                    <el-select clearable  v-model="form2.self" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-input type="textarea" v-model="form2.selfArea"></el-input>
                </el-form-item>
                <el-form-item label="评定结果"
                              :rules="[
                                  { required: true, message: '请输入评定结果', trigger: 'blur' },
                                ]"
                >
                    <el-radio v-model="form2.radio" label="优秀">优秀</el-radio>
                    <el-radio v-model="form2.radio" label="合格">合格</el-radio>
                    <el-radio v-model="form2.radio" label="不合格">不合格</el-radio>
                </el-form-item>
                <el-form-item label="推荐人(输入签字)"
                              :rules="[
                                  { required: true, message: '请输入推荐人', trigger: 'blur' },
                                ]"
                >
                    <el-input v-model="form2.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button v-if="title==='汇报推荐'||title==='个人述职'" @click="resetForm">取 消</el-button>
                <el-button v-if="title==='汇报推荐'||title==='个人述职'" type="primary"
                           @click="submitForm('form')">确 定</el-button>
                <el-button v-if="title==='实绩分析'" @click="resetForm">取 消</el-button>
                <el-button v-if="title==='实绩分析'" type="primary" @click="submitForm('form2')">确 定</el-button>
             </span>
        </el-dialog>
        <el-dialog
                :title="title"
                :visible.sync="visible"
                width="50%"
        >
            <div class="displayFlex">
                <span>登录人：{{ $store.state.roleName }}</span>
                <span>组织机构：{{ $store.state.orgName }}</span>
            </div>
            <p style="color: blue">※请仔细查看考评对象的资料详情，再打分考评</p>
            <p>素质考试评分标准：85分(含)以上优秀 75分(含)以上良好 60分以上及格(含) 60以下不及格</p>
            <el-form :model="form4" ref="form4" label-width="100px" class="demo-ruleForm">
                <div style="display: flex;justify-content: space-between">
                    <div></div>
                    <div>
                        <el-button type="primary" @click="newTest">新增</el-button>
                    </div>
                </div>
                <el-form-item label="测试内容"
                              :rules="[
                                  { required: true, message: '请输入测试内容', trigger: 'blur' },
                                ]"
                >
                    <el-table
                            border
                            ref="multipleTable"
                            :data="tableDatas"
                            tooltip-effect="dark"
                            style="width: 100%;font-size: 12px;"
                            @selection-change="handleSelectionChange">
                        <el-table-column
                                prop="title"
                                label="测试选项"
                                min-width="55">
                        </el-table-column>
                        <el-table-column
                                prop="text"
                                label="填写内容"
                                min-width="180">
                        </el-table-column>
                        <el-table-column
                                prop="result"
                                label="考评打分"
                                min-width="55">
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                min-width="80">
                            <template slot-scope="scope">
                                <el-button @click="testEdit(scope.$index,scope.row)" size="small">编辑</el-button>
                                <el-popconfirm
                                        @onConfirm="testDelete(scope.$index)"
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
                </el-form-item>
                <el-form-item label="推荐人(输入签字)"
                              :rules="[
                                  { required: true, message: '请输入推荐人', trigger: 'blur' },
                                ]"
                >
                    <el-input v-model="form4.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="textCancel">取 消</el-button>
                <el-button type="primary" @click="textSubmit('form4')">确 定</el-button>
             </span>
        </el-dialog>
        <el-dialog
                :title="tablesTitle"
                :visible.sync="testVisible"
                width="30%"
        >
            <el-form :model="form3" ref="form3" label-width="140px" class="demo-ruleForm">
                <el-form-item label="测试选项"
                              :rules="[
                                  { required: true, message: '请选择测试选项', trigger: 'blur' },
                                ]"
                >
                    <el-select clearable  v-model="form3.value" placeholder="请选择">
                        <el-option
                                v-for="item in contentOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="测试内容">
                    <el-input v-model="form3.content" placeholder="请输入测试内容"></el-input>
                </el-form-item>
                <el-form-item label="考评打分"
                              :rules="[
                                  { required: true, message: '请打分', trigger: 'blur' },
                                ]"
                >
                    <el-select clearable  v-model="form3.point" placeholder="请选择">
                        <el-option
                                v-for="item in pointOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="testCancel">取 消</el-button>
                <el-button type="primary" @click="testSubmit('form3')">确 定</el-button>
             </span>
        </el-dialog>
        <el-dialog
                :title="tableTitle"
                :visible.sync="tableVisible"
                width="90%"
        >
            <div class="displayFlex">
                <span v-if="this.tableTitle==='个人谈话'">登录人：{{ $store.state.roleName }}</span>
                <span v-if="this.tableTitle==='民主测评'">登录人：***</span>
                <span>组织机构：{{ $store.state.orgName }}</span>
            </div>
            <p style="color: blue">※请仔细查看考评对象的资料详情，再打分考评</p>
            <el-table
                    :data="tableData4"
                    :span-method="objectSpanMethod"
                    border
                    style="width: 100%;font-size: 12px">
                <el-table-column
                        prop="six"
                        label="六个方面"
                        min-width="60">
                </el-table-column>
                <el-table-column
                        label="考评项"
                        min-width="60">
                    <template slot-scope="scope">
                        <div v-if="scope.$index===0">
                            <div v-if="sum[0]===4" style="color: rgb(255,90,90)">优秀</div>
                            <div v-if="sum[0]===3" style="color: rgb(0,128,0)">合格</div>
                            <div v-if="sum[0]===2" style="color: rgb(0,128,0)">合格</div>
                            <div v-if="sum[0]===1">不合格</div>
                            <div v-if="sum[0]===0">不合格</div>
                        </div>
                        <div v-if="scope.$index===4">
                            <div v-if="sum[1]===2" style="color: rgb(255,90,90)">优秀</div>
                            <div v-if="sum[1]===1" style="color: rgb(0,128,0)">合格</div>
                            <div v-if="sum[1]===0">不合格</div>
                        </div>
                        <div v-if="scope.$index===6">
                            <div v-if="sum[2]===0">不合格</div>
                            <div v-if="sum[2]===1" style="color: rgb(255,90,90)">优秀</div>
                        </div>
                        <div v-if="scope.$index===7">
                            <div v-if="sum[3]===0">不合格</div>
                            <div v-if="sum[3]===1" style="color: rgb(255,90,90)">优秀</div>
                        </div>
                        <div v-if="scope.$index===8">
                            <div v-if="sum[4]===0">不合格</div>
                            <div v-if="sum[4]===1" style="color: rgb(255,90,90)">优秀</div>
                        </div>
                        <div v-if="scope.$index===9">
                            <div v-if="sum[5]===0">不合格</div>
                            <div v-if="sum[5]===1" style="color: rgb(255,90,90)">优秀</div>
                        </div>
                        <div v-if="scope.$index===10">
                            <div v-if="sum[6]===0">不合格</div>
                            <div v-if="sum[6]===1" style="color: rgb(255,90,90)">优秀</div>
                        </div>
                        <div v-if="scope.$index===11">
                            <div v-if="sum[7]===0">不合格</div>
                            <div v-if="sum[7]===1" style="color: rgb(0,128,0)">合格</div>
                            <div v-if="sum[7]===2" style="color: rgb(0,128,0)">合格</div>
                            <div v-if="sum[7]===3" style="color: rgb(255,90,90)">优秀</div>
                        </div>
                        <div v-if="scope.$index===14">
                            <div v-if="sum[8]===0">不合格</div>
                            <div v-if="sum[8]===1" style="color: rgb(255,90,90)">优秀</div>
                        </div>
                        <div v-if="scope.$index===16">
                            <div v-if="sum[9]===0">不合格</div>
                            <div v-if="sum[9]===1" style="color: rgb(255,90,90)">优秀</div>
                        </div>
                        <div v-if="scope.$index===19">
                            <div v-if="sum[10]===0">不合格</div>
                            <div v-if="sum[10]===1" style="color: rgb(0,128,0)">合格</div>
                            <div v-if="sum[10]===2" style="color: rgb(255,90,90)">优秀</div>
                        </div>
                        <div v-if="scope.$index===21">
                            <div v-if="sum[11]===0">不合格</div>
                            <div v-if="sum[11]===1">不合格</div>
                            <div v-if="sum[11]===2" style="color: rgb(0,128,0)">合格</div>
                            <div v-if="sum[11]===3" style="color: rgb(0,128,0)">合格</div>
                            <div v-if="sum[11]===4" style="color: rgb(255,90,90)">优秀</div>
                        </div>
                        <div v-if="scope.$index===27">
                            <div v-if="sum[12]===0">不合格</div>
                            <div v-if="sum[12]===1" style="color: rgb(0,128,0)">合格</div>
                            <div v-if="sum[12]===2" style="color: rgb(255,90,90)">优秀</div>
                        </div>
                        <div v-if="scope.$index===29">
                            <div v-if="sum[13]===0">不合格</div>
                            <div v-if="sum[13]===1" style="color: rgb(255,90,90)">优秀</div>
                        </div>

                    </template>
                </el-table-column>
                <el-table-column
                        prop="fourteen"
                        label="14个考评项目"
                        min-width="110">
                </el-table-column>
                <el-table-column
                        prop="more"
                        label="多选"
                        min-width="55">
                    <template slot-scope="scope">
                        <div v-if="scope.$index===15"></div>
                        <div v-else-if="scope.$index===17"></div>
                        <div v-else-if="scope.$index===18"></div>
                        <div v-else-if="scope.$index===25"></div>
                        <div v-else-if="scope.$index===26"></div>
                        <el-radio v-else v-model="tableRadio[scope.$index]" label="合格"></el-radio>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="qualified"
                        label="合格项目"
                        min-width="230">
                </el-table-column>
                <el-table-column
                        prop="more2"
                        label="多选"
                        min-width="55">
                    <template slot-scope="scope">
                        <div v-if="scope.$index===15"></div>
                        <div v-else-if="scope.$index===17"></div>
                        <div v-else-if="scope.$index===18"></div>
                        <div v-else-if="scope.$index===25"></div>
                        <div v-else-if="scope.$index===26"></div>
                        <el-radio v-else v-model="tableRadio[scope.$index]" label="不合格"></el-radio>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="unQualified"
                        label="不合格项目"
                        min-width="230">
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="tableCancel">取 消</el-button>
                <el-button type="primary" @click="tableSubmit()">确 定</el-button>
             </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "checkPreliminary",
        data() {
            return {
                //素质测试编辑行
                tablesIndex:'',
                tablesTitle:'',
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
                peopleData: {
                    organization: {
                        orgName: ''
                    },
                    personalInfo: {
                        policeNo: '',
                        policeName: '',
                        sex: '',
                        nativePlace: '',
                        nation: '',
                        birthPlace: '',
                        education: '',
                        nowPosition: '',
                        deptPosition: '',
                        policeRank: ''
                    }
                },
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
                pointOptions: [
                    {
                        label: '优秀',
                        value: '优秀'
                    },
                    {
                        label: '合格',
                        value: '合格'
                    },
                    {
                        label: '不合格',
                        value: '不合格'
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
                tableDatas: [],
                //民主测评，个人谈话数据
                tableData4: [
                    {
                        six: '一、德方面',
                        check: '优秀',
                        fourteen: '1.政治表现\n' +
                            '\n' +
                            '※合格项全√ 优秀\n' +
                            '\n' +
                            '合格项≥1  合格\n' +
                            '\n' +
                            '不合格项≥1 不合格\n' +
                            '\n' +
                            '同一行的合格项和不合格项不能同时选择',
                        qualified: '①是否按照“三个绝对”坚定理想信念和政治立场，坚决贯彻执行党的路线方针政策，自觉筑牢军魂，任何时候如何情况下都坚决听从党中央、中央军委和习主席的指挥',
                        unQualified: '①党性观念差，听信和传播小道消息，犯政治上的自由主义的，或者发表反动，错误言论的，或者参加非法组织的，或者在重大原则问题上和关键时刻态度不鲜明，立场不坚定的；'
                    },
                    {
                        six: '一、德方面',
                        check: '优秀',
                        fourteen: '1.政治表现\n' +
                            '\n' +
                            '※合格项全√ 优秀\n' +
                            '\n' +
                            '合格项≥1  合格\n' +
                            '\n' +
                            '不合格项≥1 不合格\n' +
                            '\n' +
                            '同一行的合格项和不合格项不能同时选择',
                        qualified: '②是否带头学习运用中国特色社会主义理论体系，扎实抓好党的创新理论何强军目标学习贯彻，具有较高的理论素养何政策水平，善于从政治和全局上观察、分析、思考问题；',
                        unQualified: '②有令不行，有禁不止，执行上级指示不坚决、不认真、表太好、行动差的'
                    },
                    {
                        six: '一、德方面',
                        check: '优秀',
                        fourteen: '1.政治表现\n' +
                            '\n' +
                            '※合格项全√ 优秀\n' +
                            '\n' +
                            '合格项≥1  合格\n' +
                            '\n' +
                            '不合格项≥1 不合格\n' +
                            '\n' +
                            '同一行的合格项和不合格项不能同时选择',
                        qualified: '③是否具有坚强的党性原则和组织纪律观念，自觉做到不乱传乱议，不犯个人主义、本位主义、自由主义；',
                        unQualified: '③私心杂念重，为人不正，处事不公，不敢较真硬碰，原则性不强的；'
                    },
                    {
                        six: '一、德方面',
                        check: '优秀',
                        fourteen: '1.政治表现\n' +
                            '\n' +
                            '※合格项全√ 优秀\n' +
                            '\n' +
                            '合格项≥1  合格\n' +
                            '\n' +
                            '不合格项≥1 不合格\n' +
                            '\n' +
                            '同一行的合格项和不合格项不能同时选择',
                        qualified: '④是否牢固树立正确的政绩观，始终本着对部队建设长远负责的态度想问题、办事情、作决策，不图出名挂号，不做表面文章，不急功近利，不弄虚作假；',
                        unQualified: '④自我要求不严，生活作风不检点，乱搞男女关系的，或者道德品质存在明显问题的；'
                    },
                    {
                        six: '一、德方面',
                        check: '合格',
                        fourteen: '2.品德修养（考评规则同1)',
                        qualified: '⑤是否具有良好的道德情操和人品官德，自觉遵守社会公德、职业道德、家庭美德，始终保持党干部良好形象；',
                        unQualified: '⑤对组织隐瞒实情，不如实报告个人有关事项的；'
                    },
                    {
                        six: '一、德方面',
                        check: '合格',
                        fourteen: '2.品德修养（考评规则同1)',
                        qualified: '⑥是否自觉以事业何大局为重，处事公道正派，敢于较真碰硬，为人心胸宽广，善于团结共事。',
                        unQualified: '⑥受到法律制裁、党纪政纪处分的。'
                    },
                    {
                        six: '二、能方面',
                        check: '不合格',
                        fourteen: '3.谋划决策\n' +
                            '\n' +
                            '（考评规则同1)',
                        qualified: '①谋划决策：是否按照能打战、打胜仗的要求，从政治和全局上筹划抓军事斗争准备，坚持战斗力唯一根本标准，按实战化要求从难、从严训练部队，自觉端正训风、演风、考风，有力提高部队遂行任务能力；',
                        unQualified: '①工作筹划指导何实施不够科学，所作决策有明显失误的，或者在困难和风险面前，患得患失，不敢作出决断的；'
                    },
                    {
                        six: '二、能方面',
                        check: '',
                        fourteen: '4.组织指挥\n' +
                            '\n' +
                            '（考评规则同1)',
                        qualified: '②组织指挥：是否具备履行职责所需的专业理论和技能，胜任本级指挥，胜任岗位要求，工作思路清晰，工作方法得当，工作成效明显；',
                        unQualified: '②组织指导部队站备、训练思路不清晰的，或者面对复杂局面，踌躇不前，束手束策的；'
                    },
                    {
                        six: '二、能方面',
                        check: '',
                        fourteen: '5.教育管理\n' +
                            '\n' +
                            '（考评规则同1)',
                        qualified: '③教育管理：是否具有科学思维、法治思维的理念何方法，熟练掌握相关政策法规和程序方法，坚持依法指导、依法管理、依法办事',
                        unQualified: '③对部队思想状况若明若暗，不会做思想工作的，或者思想工作不到位的；'
                    },
                    {
                        six: '二、能方面',
                        check: '',
                        fourteen: '6.团结协作\n' +
                            '\n' +
                            '（考评规则同1)',
                        qualified: '④团结协作：是否具有良好的民主作风和团结协作精神，能够妥善处理各种关系，重视调动各方面积极因素，具有较强的凝聚力、号召力；',
                        unQualified: '④治警不严，管理松懈，对部队中存在的问题抓的不恨，解决不力，甚至熟视无睹、放任自流，部队安全隐患存在明显问题的；'
                    },
                    {
                        six: '二、能方面',
                        check: '',
                        fourteen: '7.学习创新\n' +
                            '\n' +
                            '（考评规则同1)',
                        qualified: '⑤学习创新：是否注重研究新情况、解析新问题，具有较强的创新精神，善于学以致用、创造性地开展工作。',
                        unQualified: '⑤军事训练考核成绩不及格的。'
                    },
                    {
                        six: '三、勤方面',
                        check: '',
                        fourteen: '8.精神状态\n' +
                            '\n' +
                            '（考评规则同1)',
                        qualified: '①是否具有强烈的事业心责任感，爱岗敬业，忠于职守，把主要心思和精力用在工作上，勇于吃苦耐劳，努力创造一流业绩；',
                        unQualified: '①工作精力不集中、不安心本职、不尽心履职，工作标准差、效率低的；'
                    },
                    {
                        six: '三、勤方面',
                        check: '',
                        fourteen: '8.精神状态\n' +
                            '\n' +
                            '（考评规则同1)',
                        qualified: '②是否具有很强的进取精神，始终保持奋发有为的精神状态，不等不靠，积极主动地开展工作，始终坚持工作高标准，勇于创先争优；',
                        unQualified: '②无故不参加学习、工作、训练等，消极怠工的，或者在团以上首长机关检查中3次以上无故不在位的；'
                    },
                    {
                        six: '三、勤方面',
                        check: '',
                        fourteen: '8.精神状态\n' +
                            '\n' +
                            '（考评规则同1)',
                        qualified: '③是否能端正工作指导思想，求真务实，说实话，办实事、求实效，自觉克服形式主义、官僚主义、敢于担当，勇于揭露矛盾，注重解决问题，愿负责、敢负责、善负责；',
                        unQualified: '③工作指导思想不端正，弄虚作假、报喜藏优、搞形式主义的；'
                    },
                    {
                        six: '三、勤方面',
                        check: '',
                        fourteen: '9.工作作风\n' +
                            '\n' +
                            '（考评规则同1)',
                        qualified: '④是否坚持基层至上、士兵第一，深入部队深入基层一线，在密切联系群众中接地气，积极为基层解难题、做好事；',
                        unQualified: '④作风漂浮，不掌握单位实际情况，对官兵反映的困难和问题置若罔闻的。'
                    },
                    {
                        six: '三、勤方面',
                        check: '',
                        fourteen: '9.工作作风\n' +
                            '\n' +
                            '（考评规则同1)',
                        qualified: '⑤是否注重发挥模范带头作用，吃苦耐劳，身先士卒，勇挑重担，率先垂范。',
                        unQualified: ''
                    },
                    {
                        six: '四、绩方面',
                        check: '',
                        fourteen: '10.履行基本职责\n' +
                            '\n' +
                            '（考评规则同1)',
                        qualified: '① 是否善于把上级指示精神与本单位实际相结合，合理部署安排工作，有效推动工作落实；',
                        unQualified: '① 工作没有尽到职责，单位全面建设或分营工作或业务工作出现明显滑坡或者发生严重问题的；'
                    },
                    {
                        six: '四、绩方面',
                        check: '',
                        fourteen: '10.履行基本职责\n' +
                            '\n' +
                            '（考评规则同1)',
                        qualified: '② 本单位建设是否成绩突出，进步明显，基础扎实，全面过硬，或保持良好发展势头；',
                        unQualified: ''
                    },
                    {
                        six: '四、绩方面',
                        check: '',
                        fourteen: '10.履行基本职责\n' +
                            '\n' +
                            '（考评规则同1)',
                        qualified: '③ 个人在单位建设中是否发挥充分作用，做出突出贡献，分管工作取得明显成效；',
                        unQualified: ''
                    },
                    {
                        six: '四、绩方面',
                        check: '',
                        fourteen: '11.执行重大任务\n' +
                            '\n' +
                            '（考评规则同1)',
                        qualified: '④ 是否正确分析判断形势，深刻领会上级决心意图，高标准完成各项任务',
                        unQualified: '② 因本人组织领导不力，未能带领部队按照要求完成大项任务的；'
                    },
                    {
                        six: '四、绩方面',
                        check: '',
                        fourteen: '11.执行重大任务\n' +
                            '\n' +
                            '（考评规则同1)',
                        qualified: '⑤ 特别在完成重大任务中发挥骨干作用、做出突出贡献，在同职级中表现突出',
                        unQualified: '③ 因本人原因，未能按照要求完成重大任务或者做好相应工作，产生不良影响或者造成一定损失的。'
                    },
                    {
                        six: '五、廉方面',
                        check: '',
                        fourteen: '12.廉洁自律\n' +
                            '\n' +
                            '（考评规则同1)',
                        qualified: '① 是否具有很强的法纪观念，认真贯彻执行党纪国法、条令条例和规章制度，严格按党员干部标准约束言行；',
                        unQualified: '①利用职权和职务上的影响谋取不正当利益的；'
                    },
                    {
                        six: '五、廉方面',
                        check: '',
                        fourteen: '12.廉洁自律\n' +
                            '\n' +
                            '（考评规则同1)',
                        qualified: '② 是否自觉践行讲党性，重品行、作表率的要求、旗帜鲜明反对腐败，带头严格遵守廉洁自律各项规定，坚决抵制享乐主义、奢靡之风；',
                        unQualified: '②违反规定从事营利性活动的；'
                    },
                    {
                        six: '五、廉方面',
                        check: '',
                        fourteen: '12.廉洁自律\n' +
                            '\n' +
                            '（考评规则同1)',
                        qualified: '③ 是否做到敬畏权利、管好权利、慎用权利，在选人用人、经费开支、工程建设、住房用车、亲戚和身边人安排等方面，不谋私利，不搞特权；',
                        unQualified: '③违反规定选拔任用干部的；'
                    },
                    {
                        six: '五、廉方面',
                        check: '',
                        fourteen: '12.廉洁自律\n' +
                            '\n' +
                            '（考评规则同1)',
                        qualified: '④ 是否保持良好的道德品行和健康的生活情趣，发扬艰苦奋斗、勤俭节约的优良传统，在做人处事和人交往上严格要求，品行端正，自身形象好、威信高。',
                        unQualified: '④讲排场、比阔气、挥霍公款、铺张浪费的；'
                    },
                    {
                        six: '五、廉方面',
                        check: '',
                        fourteen: '12.廉洁自律\n' +
                            '\n' +
                            '（考评规则同1)',
                        qualified: '',
                        unQualified: '⑤违反规定插手干预涉及官兵切身利益的敏感事务的；'
                    },
                    {
                        six: '五、廉方面',
                        check: '',
                        fourteen: '12.廉洁自律\n' +
                            '\n' +
                            '（考评规则同1)',
                        qualified: '',
                        unQualified: '⑥违反“三清”和“五超”等禁止性规定，拒不整改的。'
                    },
                    {
                        six: '六、体方面',
                        check: '',
                        fourteen: '13.身体素质\n' +
                            '\n' +
                            '（考评规则同1)',
                        qualified: '①是否具有强健的体魄和充沛的精力，能够适应作战、训练和其他工作需要，体能达标考核成绩达到合格以上标准；',
                        unQualified: '①体能达标成绩不合格'
                    },
                    {
                        six: '六、体方面',
                        check: '',
                        fourteen: '13.身体素质\n' +
                            '\n' +
                            '（考评规则同1)',
                        qualified: '②是否具有良好的军人气质形象，军容严整、军姿端正，举止大方得体。',
                        unQualified: '②伤病严重，不能参加正常工作的。'
                    },
                    {
                        six: '六、体方面',
                        check: '',
                        fourteen: '14.心理素质\n' +
                            '\n' +
                            '（考评规则同1)',
                        qualified: '③是否具有坚韧顽强的意志，始终保持积极向上、乐观自信的心态，在困难挫折面前沉着冷静、正确对待，在风险压力面前处变不惊、临危不乱，心理测试达到合格标准；',
                        unQualified: '③心理测试不合格的；'
                    },


                ],
                sum: [
                    4,
                    2,
                    1,
                    1,
                    1,
                    1,
                    1,
                    3,
                    1,
                    1,
                    2,
                    4,
                    2,
                    1
                ],
                tableRadio: [
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',//空

                    '',
                    '',//空
                    '',//空

                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',//空
                    '',//空

                    '',
                    '',
                    '',
                ],
                appraisalId: [
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                ]

            }

        },

        watch: {
            tableRadio: {
                handler(newVal, oldVal) {
                    let w = oldVal.slice(0, 4);
                    let w2 = oldVal.slice(4, 6);
                    let w3 = oldVal.slice(6, 7);
                    let w4 = oldVal.slice(7, 8);
                    let w5 = oldVal.slice(8, 9);
                    let w6 = oldVal.slice(9, 10);
                    let w7 = oldVal.slice(10, 11);
                    let w8 = oldVal.slice(11, 14);
                    let w9 = oldVal.slice(14, 16);
                    let w10 = oldVal.slice(16, 19);
                    let w11 = oldVal.slice(19, 21);
                    let w12 = oldVal.slice(21, 27);
                    let w13 = oldVal.slice(27, 29);
                    let w14 = oldVal.slice(29, 30);
                    let q = 0;
                    let q2 = 0;
                    let q3 = 0;
                    let q4 = 0;
                    let q5 = 0;
                    let q6 = 0;
                    let q7 = 0;
                    let q8 = 0;
                    let q9 = 0;
                    let q10 = 0;
                    let q11 = 0;
                    let q12 = 0;
                    let q13 = 0;
                    let q14 = 0;
                    for (let a in w) {
                        if (w[a] === '合格') {
                            q++
                        }
                    }
                    for (let a2 in w2) {
                        if (w2[a2] === '合格') {
                            q2++
                        }
                    }
                    for (let a3 in w3) {
                        if (w3[a3] === '合格') {
                            q3++
                        }
                    }
                    for (let a4 in w4) {
                        if (w4[a4] === '合格') {
                            q4++
                        }
                    }
                    for (let a5 in w5) {
                        if (w5[a5] === '合格') {
                            q5++
                        }
                    }
                    for (let a6 in w6) {
                        if (w6[a6] === '合格') {
                            q6++
                        }
                    }
                    for (let a7 in w7) {
                        if (w7[a7] === '合格') {
                            q7++
                        }
                    }
                    for (let a8 in w8) {
                        if (w8[a8] === '合格') {
                            q8++
                        }
                    }
                    for (let a9 in w9) {
                        if (w9[a9] === '合格') {
                            q9++
                        }
                    }
                    for (let a10 in w10) {
                        if (w10[a10] === '合格') {
                            q10++
                        }
                    }
                    for (let a11 in w11) {
                        if (w11[a11] === '合格') {
                            q11++
                        }
                    }
                    for (let a12 in w12) {
                        if (w12[a12] === '合格') {
                            q12++
                        }
                    }
                    for (let a13 in w13) {
                        if (w13[a13] === '合格') {
                            q13++
                        }
                    }
                    for (let a14 in w14) {
                        if (w14[a14] === '合格') {
                            q14++
                        }
                    }
                    this.sum[0] = q;
                    this.sum[1] = q2;
                    this.sum[2] = q3;
                    this.sum[3] = q4;
                    this.sum[4] = q5;
                    this.sum[5] = q6;
                    this.sum[6] = q7;
                    this.sum[7] = q8;
                    this.sum[8] = q9;
                    this.sum[9] = q10;
                    this.sum[10] = q11;
                    this.sum[11] = q12;
                    this.sum[12] = q13;
                    this.sum[13] = q14;
                }
                ,
                deep: true
            }
        },
        created() {
            this.year = parseInt(this.$moment(new Date()).format("YYYY"));
        },
        mounted() {
            this.getData()
        },
        methods: {

            //民主测评，个人谈话合并单元格
            objectSpanMethod({rowIndex, columnIndex}) {
                if (columnIndex === 0) {
                    if (rowIndex === 0) {
                        return {
                            rowspan: 6,
                            colspan: 1
                        };
                    } else if (rowIndex === 6) {
                        return {
                            rowspan: 5,
                            colspan: 1
                        };
                    } else if (rowIndex === 11) {
                        return {
                            rowspan: 5,
                            colspan: 1
                        };
                    } else if (rowIndex === 16) {
                        return {
                            rowspan: 5,
                            colspan: 1
                        };
                    } else if (rowIndex === 21) {
                        return {
                            rowspan: 6,
                            colspan: 1
                        };
                    } else if (rowIndex === 27) {
                        return {
                            rowspan: 3,
                            colspan: 1
                        };
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }
                }
                if (columnIndex === 1) {
                    if (rowIndex === 0) {
                        return {
                            rowspan: 4,
                            colspan: 1
                        };
                    } else if (rowIndex === 4) {
                        return {
                            rowspan: 2,
                            colspan: 1
                        };
                    } else if (rowIndex === 6) {
                        return {
                            rowspan: 1,
                            colspan: 1
                        };
                    } else if (rowIndex === 7) {
                        return {
                            rowspan: 1,
                            colspan: 1
                        };
                    } else if (rowIndex === 8) {
                        return {
                            rowspan: 1,
                            colspan: 1
                        };
                    } else if (rowIndex === 9) {
                        return {
                            rowspan: 1,
                            colspan: 1
                        };
                    } else if (rowIndex === 10) {
                        return {
                            rowspan: 1,
                            colspan: 1
                        };
                    } else if (rowIndex === 11) {
                        return {
                            rowspan: 3,
                            colspan: 1
                        };
                    } else if (rowIndex === 14) {
                        return {
                            rowspan: 2,
                            colspan: 1
                        };
                    } else if (rowIndex === 16) {
                        return {
                            rowspan: 3,
                            colspan: 1
                        };
                    } else if (rowIndex === 19) {
                        return {
                            rowspan: 2,
                            colspan: 1
                        };
                    } else if (rowIndex === 21) {
                        return {
                            rowspan: 6,
                            colspan: 1
                        };
                    } else if (rowIndex === 27) {
                        return {
                            rowspan: 2,
                            colspan: 1
                        };
                    } else if (rowIndex === 29) {
                        return {
                            rowspan: 1,
                            colspan: 1
                        };
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }
                }
                if (columnIndex === 2) {
                    if (rowIndex === 0) {
                        return {
                            rowspan: 4,
                            colspan: 1
                        };
                    } else if (rowIndex === 4) {
                        return {
                            rowspan: 2,
                            colspan: 1
                        };
                    } else if (rowIndex === 6) {
                        return {
                            rowspan: 1,
                            colspan: 1
                        };
                    } else if (rowIndex === 7) {
                        return {
                            rowspan: 1,
                            colspan: 1
                        };
                    } else if (rowIndex === 8) {
                        return {
                            rowspan: 1,
                            colspan: 1
                        };
                    } else if (rowIndex === 9) {
                        return {
                            rowspan: 1,
                            colspan: 1
                        };
                    } else if (rowIndex === 10) {
                        return {
                            rowspan: 1,
                            colspan: 1
                        };
                    } else if (rowIndex === 11) {
                        return {
                            rowspan: 3,
                            colspan: 1
                        };
                    } else if (rowIndex === 14) {
                        return {
                            rowspan: 2,
                            colspan: 1
                        };
                    } else if (rowIndex === 16) {
                        return {
                            rowspan: 3,
                            colspan: 1
                        };
                    } else if (rowIndex === 19) {
                        return {
                            rowspan: 2,
                            colspan: 1
                        };
                    } else if (rowIndex === 21) {
                        return {
                            rowspan: 6,
                            colspan: 1
                        };
                    } else if (rowIndex === 27) {
                        return {
                            rowspan: 2,
                            colspan: 1
                        };
                    } else if (rowIndex === 29) {
                        return {
                            rowspan: 1,
                            colspan: 1
                        };
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }
                }
            }
            ,
            //查看详情
            detailsClick(row) {
                this.key = 2;
                this.activeIndex = '2';
                this.infoId = row.personalInfo.id;
                this.$axios({
                    method: 'get',
                    url: 'aprPersonalInfo/getPersonalInfoByInfoId?infoId=' + row.personalInfo.id
                }).then((res) => {
                    this.peopleData = res.data.data;
                    this.peopleData.personalInfo.orgName = res.data.data.organization.orgName;
                    this.policeNo = res.data.data.personalInfo.policeNo;
                    this.age = parseInt(this.$moment(new Date()).format('YYYY')) - parseInt(this.$moment(res.data.data.personalInfo.birthDay).format('YYYY'));
                    this.birthDay = this.$moment(res.data.data.personalInfo.birthDay).format('YYYY-MM-DD');
                    this.militaryTime = this.$moment(res.data.data.personalInfo.militaryTime).format('YYYY-MM-DD');
                    this.nowPositionTime = this.$moment(res.data.data.personalInfo.nowPositionTime).format('YYYY-MM-DD');
                    this.deptPositionTime = this.$moment(res.data.data.personalInfo.deptPositionTime).format('YYYY-MM-DD');
                    this.policeRankTime = this.$moment(res.data.data.personalInfo.policeRankTime).format('YYYY-MM-DD');
                    this.imgPath = this.$baseUrl + res.data.data.personalInfo.imgPath;
                    if (res.data.data.personalResume.length !== 0) {
                        this.textarea2 = res.data.data.personalResume[0].text;
                    }
                    if (res.data.data.personalInspection) {
                        this.tableData2 = res.data.data.personalInspection.personalInspectionAll;
                    }
                });


            }
            ,
            //测试内容新增
            newTest() {
                this.tablesTitle='新增';
                this.testVisible = true
            }
            ,
            //测试内容编辑
            testEdit(index,row) {
                this.tablesIndex=index;
                console.log(this.tablesIndex)
                this.tablesTitle='编辑';
                this.form3.value = row.title;
                this.form3.content = row.text;
                this.form3.point = row.result;
                this.testVisible = true
            }
            ,
            //测试内容删除
            testDelete(index) {
                this.tableDatas.splice(index, 1)
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
            //删除测试内容
            fileDelete(index, row) {
                this.$axios({
                    method: 'post',
                    url: 'aprPersonalInspection/delete?id=' + row.id
                }).then(() => {
                    this.getData();
                    return this.$message.success("删除成功")
                })
            }
            ,

            //获取数据
            getData() {
                let data = {
                    year: this.year,
                    orgId: this.formInline.organization,
                    // nowPosition: this.formInline.sort,
                    policeName: this.formInline.name,
                };
                this.$axios({
                    method: 'get',
                    url: 'organization/all/-1',
                }).then((res) => {
                    this.organizationOptions = [];
                    for (let i in res.data) {
                        this.organizationOptions.push({label: res.data[i].orgName, value: res.data[i].id})
                    }
                    this.$axios({
                        method: 'post',
                        url: 'aprPersonalExamineResult/list2',
                        data: this.$Qs.stringify(data)
                    }).then((res) => {
                        this.tableData = [];
                        for (let i in res.data.data.list) {
                            this.tableData.push(res.data.data.list[i])
                        }
                    })
                });

            }
            ,
            //测试内容提交
            testSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.form3.value)
                        console.log(this.form3.content)
                        console.log(this.form3.point)
                        if(this.tablesTitle==='新增'){
                            this.tableDatas.unshift({
                                title: this.form3.value,
                                text: this.form3.content,
                                result: this.form3.point
                            });
                            this.form3.value = '';
                            this.form3.content = '';
                            this.form3.point = '';
                        }else if(this.tablesTitle==='编辑') {
                            this.tableDatas[this.tablesIndex].title=this.form3.value;
                            this.tableDatas[this.tablesIndex].text=this.form3.content;
                            this.tableDatas[this.tablesIndex].result=this.form3.point;
                            this.form3.value = '';
                            this.form3.content = '';
                            this.form3.point = '';
                            console.log(this.tableDatas)
                        }

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                this.testVisible = false
            }
            ,
            //测试内容取消
            testCancel() {
                this.form3.value = '';
                this.form3.content = '';
                this.form3.point = '';
                this.testVisible = false;
            }
            ,
            //民主测评，个人谈话取消
            tableCancel() {
                this.tableVisible = false
            }
            ,
            //数字转中文
            numberChange(t, c) {
                if (c >= t) {
                    return "优秀";
                } else if (c == 0) {
                    return "不合格";
                } else {
                    return "合格";
                }
            },
            tableSubmit() {
                let oldArray = [
                    4,
                    2,
                    1,
                    1,
                    1,
                    1,
                    1,
                    3,
                    1,
                    1,
                    2,
                    4,
                    2,
                    1
                ];
                let array = [];
                for (let i in this.sum) {
                    array[i] = this.numberChange(oldArray[i], this.sum[i])
                }
                let data = {
                    infoId: this.infoId,
                    datas: [
                        {
                            id: this.appraisalId[0],
                            dimension0: "德方面",
                            dimension1: "政治表现",
                            result: array[0],
                            order: 0,
                            subs: [
                                {
                                    order: 0,
                                    result: this.tableRadio[0]
                                },
                                {
                                    order: 1,
                                    result: this.tableRadio[1]
                                },
                                {
                                    order: 2,
                                    result: this.tableRadio[2]
                                },
                                {
                                    order: 3,
                                    result: this.tableRadio[3]
                                }
                            ]
                        },
                        {
                            id: this.appraisalId[1],
                            dimension0: "德方面",
                            dimension1: "品德修养",
                            result: array[1],
                            order: 1,
                            subs: [
                                {
                                    order: 4,
                                    result: this.tableRadio[4]
                                },
                                {
                                    order: 5,
                                    result: this.tableRadio[5]
                                },

                            ]
                        },
                        {
                            id: this.appraisalId[2],
                            dimension0: "能方面",
                            dimension1: "谋划决策",
                            result: array[2],
                            order: 2,
                            subs: [
                                {
                                    order: 6,
                                    result: this.tableRadio[6]
                                },
                            ]
                        },
                        {
                            id: this.appraisalId[3],
                            dimension0: "能方面",
                            dimension1: "组织指挥",
                            result: array[3],
                            order: 3,
                            subs: [
                                {
                                    order: 7,
                                    result: this.tableRadio[7]
                                },
                            ]
                        },
                        {
                            id: this.appraisalId[4],
                            dimension0: "能方面",
                            dimension1: "教育管理",
                            result: array[4],
                            order: 4,
                            subs: [
                                {
                                    order: 8,
                                    result: this.tableRadio[8]
                                },
                            ]
                        },
                        {
                            id: this.appraisalId[5],
                            dimension0: "能方面",
                            dimension1: "团结协作",
                            result: array[5],
                            order: 5,
                            subs: [
                                {
                                    order: 9,
                                    result: this.tableRadio[9]
                                },
                            ]
                        },
                        {
                            id: this.appraisalId[6],
                            dimension0: "能方面",
                            dimension1: "学习创新",
                            result: array[6],
                            order: 6,
                            subs: [
                                {
                                    order: 10,
                                    result: this.tableRadio[10]
                                },
                            ]
                        },
                        {
                            id: this.appraisalId[7],
                            dimension0: "勤方面",
                            dimension1: "精神状态",
                            result: array[7],
                            order: 7,
                            subs: [
                                {
                                    order: 11,
                                    result: this.tableRadio[11]
                                },
                                {
                                    order: 12,
                                    result: this.tableRadio[12]
                                },
                                {
                                    order: 13,
                                    result: this.tableRadio[13]
                                }
                            ]
                        },
                        {
                            id: this.appraisalId[8],
                            dimension0: "勤方面",
                            dimension1: "工作作风",
                            result: array[8],
                            order: 8,
                            subs: [
                                {
                                    order: 14,
                                    result: this.tableRadio[14]
                                },
                                {
                                    order: 15,
                                    result: this.tableRadio[15]
                                }
                            ]
                        },
                        {
                            id: this.appraisalId[9],
                            dimension0: "绩方面",
                            dimension1: "履行基本职责",
                            result: array[9],
                            order: 9,
                            subs: [
                                {
                                    order: 16,
                                    result: this.tableRadio[16]
                                },
                                {
                                    order: 17,
                                    result: this.tableRadio[17]
                                },
                                {
                                    order: 18,
                                    result: this.tableRadio[18]
                                }
                            ]
                        },
                        {
                            id: this.appraisalId[10],
                            dimension0: "绩方面",
                            dimension1: "执行重大任务",
                            result: array[10],
                            order: 10,
                            subs: [
                                {
                                    order: 19,
                                    result: this.tableRadio[19]
                                },
                                {
                                    order: 20,
                                    result: this.tableRadio[20]
                                }
                            ]
                        },
                        {
                            id: this.appraisalId[11],
                            dimension0: "廉方面",
                            dimension1: "廉洁自律",
                            result: array[11],
                            order: 11,
                            subs: [
                                {
                                    order: 21,
                                    result: this.tableRadio[21]
                                },
                                {
                                    order: 22,
                                    result: this.tableRadio[22]
                                },
                                {
                                    order: 23,
                                    result: this.tableRadio[23]
                                },
                                {
                                    order: 24,
                                    result: this.tableRadio[24]
                                },
                                {
                                    order: 25,
                                    result: this.tableRadio[25]
                                },
                                {
                                    order: 26,
                                    result: this.tableRadio[26]
                                }
                            ]
                        },
                        {
                            id: this.appraisalId[12],
                            dimension0: "体方面",
                            dimension1: "身体素质",
                            result: array[12],
                            order: 12,
                            subs: [
                                {
                                    order: 27,
                                    result: this.tableRadio[27]
                                },
                                {
                                    order: 28,
                                    result: this.tableRadio[28]
                                },
                            ]
                        },
                        {
                            id: this.appraisalId[13],
                            dimension0: "体方面",
                            dimension1: "心理素质",
                            result: array[13],
                            order: 13,
                            subs: [
                                {
                                    order: 29,
                                    result: this.tableRadio[29]
                                },
                            ]
                        },
                    ]
                };
                if (this.tableTitle === '民主测评') {
                    this.$axios({
                        method: 'post',
                        url: 'aprPersonalExamineDemocratic/updateExamineDemocratic',
                        data: data
                    }).then(() => {
                        return this.$message.success('民主测评提交成功')
                    });
                } else {
                    this.$axios({
                        method: 'post',
                        url: 'aprPersonalExamineChat/updateExamineChat',
                        data: data
                    }).then(() => {
                        return this.$message.success('个人谈话提交成功')
                    });
                }

                this.tableVisible = false
            }
            ,
            //素质测试取消
            textCancel() {
                this.tableDatas = [];
                this.form4.name = '';
                this.visible = false
            }
            ,
            //素质测试提交
            textSubmit() {
                let data = {
                    datas: this.tableDatas,
                    infoId: this.infoId,
                    sign: this.form4.name
                };
                this.$axios({
                    method: 'post',
                    url: 'aprPersonalExamineQuality/updateExamineQuality',
                    data: data
                }).then(() => {
                    this.form3.value = '';
                    this.form3.content = '';
                    this.form3.point = '';
                    this.form3.name = '';
                    return this.$message.success("提交成功")
                });
                this.visible = false
            }
            ,
            chineseChange(text, t) {
                if (text == '优秀' || text == '合格' && t === 1) {
                    return t;
                } else if (text == '合格' && t > 1) {
                    return 1;
                } else if (text == '不合格') {
                    return 0;
                }
                return 0;
            },
            //打开模态框
            openModule(type) {
                switch (type) {
                    case 1:
                        this.title = '汇报推荐';
                        this.dialogVisible = true;

                        this.$axios({
                            method: 'get',
                            url: 'aprPersonalExamineReport/detailByInfoId?infoId=' + this.infoId
                        }).then((res) => {
                            this.form.state = res.data.data.text0;
                            this.form.suggestion = res.data.data.text1;
                            this.form.radio = res.data.data.result;
                            this.form.name = res.data.data.sign;
                            this.fileId = res.data.data.id;
                            this.dialogVisible = true;
                        });
                        break;
                    case 2:
                        this.title = '个人述职';
                        this.dialogVisible = true;
                        this.$axios({
                            method: 'get',
                            url: 'aprPersonalExamineWork/detailByInfoId?infoId=' + this.infoId
                        }).then((res) => {
                            this.form.jobState = res.data.data.text0;
                            this.form.suggestion = res.data.data.text1;
                            this.form.radio = res.data.data.result;
                            this.form.name = res.data.data.sign;
                            this.fileId = res.data.data.id;
                        });
                        break;
                    case 3:
                        this.tableTitle = '民主测评';
                        this.tableVisible = true;

                        this.$axios({
                            method: 'get',
                            url: 'aprPersonalExamineDemocratic/detailByInfoId?infoId=' + this.infoId
                        }).then((res) => {
                            let data = res.data.data;
                            let array = [];
                            let radioArray = [];
                            let sum = [];
                            for (let i in data) {
                                sum.push(data[i].result);
                                array.push(data[i].id)
                                for (let s in data[i].subs) {
                                    radioArray.push(data[i].subs[s].result)
                                }
                            }
                            console.log(sum)
                            let oldArray = [
                                4,
                                2,
                                1,
                                1,
                                1,
                                1,
                                1,
                                3,
                                1,
                                1,
                                2,
                                4,
                                2,
                                1
                            ];
                            let sumArray = [];
                            for (let z in sum) {
                                sumArray[z] = this.chineseChange(sum[z], oldArray[z])
                            }
                            this.sum = sumArray;
                            this.tableRadio = radioArray;
                            this.appraisalId = array;
                        });
                        break;
                    case 4:
                        this.tableTitle = '个人谈话';
                        this.tableVisible = true;

                        this.$axios({
                            method: 'get',
                            url: 'aprPersonalExamineChat/detailByInfoId?infoId=' + this.infoId
                        }).then((res) => {
                            let data = res.data.data;
                            let array = [];
                            let radioArray = [];
                            let sum = [];
                            for (let i in data) {
                                sum.push(data[i].result);
                                array.push(data[i].id)
                                for (let s in data[i].subs) {
                                    radioArray.push(data[i].subs[s].result)
                                }
                            }
                            console.log(radioArray)
                            let oldArray = [
                                4,
                                2,
                                1,
                                1,
                                1,
                                1,
                                1,
                                3,
                                1,
                                1,
                                2,
                                4,
                                2,
                                1
                            ];
                            let sumArray = [];
                            for (let z in sum) {
                                sumArray[z] = this.chineseChange(sum[z], oldArray[z])
                            }
                            this.sum = sumArray;
                            this.tableRadio = radioArray;
                            this.appraisalId = array;
                        });
                        break;
                    case 5:
                        this.title = '实绩分析';
                        this.dialogVisible = true;
                        this.$axios({
                            method: 'get',
                            url: 'aprPersonalExaminePerformance/detailByInfoId?infoId=' + this.infoId
                        }).then((res) => {
                            if (res.data.data.length !== 0 || res.data.data !== null) {
                                this.form2.construction = res.data.data.result0;
                                this.form2.constructionArea = res.data.data.text0;
                                this.form2.task = res.data.data.result1;
                                this.form2.taskArea = res.data.data.text1;
                                this.form2.self = res.data.data.result2;
                                this.form2.selfArea = res.data.data.text2;
                                this.form2.name = res.data.data.sign;
                                this.form2.radio = res.data.data.finalResult;
                                this.fileId = res.data.data.id;
                            }

                        });
                        break;
                    case 6:
                        this.title = '素质测试';
                        this.visible = true;

                        this.$axios({
                            method: 'get',
                            url: 'aprPersonalExamineQuality/detailByInfoId?infoId=' + this.infoId
                        }).then((res) => {
                            this.tableDatas = res.data.data;
                            this.form4.name = res.data.data[0].sign
                        });
                        break;
                    default:
                        type = 1
                }
            }
            ,
            //预审查询
            searchClick(row) {
                let data = row;
                this.$router.push({
                    name: 'checkQuery',
                    params: {
                        data: data
                    }
                });
            },
            //取消汇报推荐，个人述职，实绩分析，素质测试模态框
            resetForm() {
                this.form.jobState = '';
                this.form.state = '';
                this.form.suggestion = '';
                this.form.radio = '';
                this.form.name = '';
                this.dialogVisible = false
            }
            ,
            //提交汇报推荐，个人述职，实绩分析，素质测试模态框
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    let data = {
                        text0: this.form.state,
                        text1: this.form.suggestion,
                        result: this.form.radio,
                        sign: this.form.name,
                        infoId: this.infoId,
                        id: this.fileId
                    };
                    if (valid) {
                        switch (this.title) {
                            case '汇报推荐':
                                this.$axios({
                                    method: 'post',
                                    url: 'aprPersonalExamineReport/updateExamineReport',
                                    data: this.$Qs.stringify(data)
                                }).then(() => {
                                    this.form.state = '';
                                    this.form.suggestion = '';
                                    this.form.radio = '';
                                    this.form.name = '';
                                    return this.$message.success('提交成功')
                                });
                                break;
                            case '个人述职':
                                data.text0 = this.form.jobState;
                                this.$axios({
                                    method: 'post',
                                    url: 'aprPersonalExamineWork/updateExamineWork',
                                    data: this.$Qs.stringify(data)
                                }).then(() => {
                                    this.form.jobState = '';
                                    this.form.suggestion = '';
                                    this.form.radio = '';
                                    this.form.name = '';
                                    return this.$message.success('提交成功')
                                });
                                break;
                            case '实绩分析':
                                data.result0 = this.form2.construction;
                                data.text0 = this.form2.constructionArea;
                                data.result1 = this.form2.task;
                                data.text1 = this.form2.taskArea;
                                data.result2 = this.form2.self;
                                data.text2 = this.form2.selfArea;
                                data.sign = this.form2.name;
                                data.finalResult = this.form2.radio;
                                this.$axios({
                                    method: 'post',
                                    url: 'aprPersonalExaminePerformance/updateExaminePerformance',
                                    data: this.$Qs.stringify(data)
                                }).then(() => {
                                    this.form2.construction = '';
                                    this.form2.constructionArea = '';
                                    this.form2.task = '';
                                    this.form2.taskArea = '';
                                    this.form2.self = '';
                                    this.form2.selfArea = '';
                                    this.form2.name = '';
                                    this.form2.radio = '';
                                    return this.$message.success('提交成功')
                                });
                                break;
                            default:
                                return this.$message.error('点击错误')
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                this.dialogVisible = false
            }
            ,
            getIndex($index) {
                //表格序号
                return (this.num - 1) * this.num + $index + 1
            }
            ,
            handleSelect(key) {
                this.activeIndex = key[0];
            }
            ,
            //编辑表格行
            handleClick(row) {
                let infoId = row.infoId;
                this.$router.push({name: 'checkPrepare', params: {infoId: infoId}});
            }
            ,
            //删除表格行
            handleDelete(row) {
                let data = {
                    id: row.id,
                    version: 0
                };
                this.$axios({
                    method: 'post',
                    url: '/user/delUser',
                    data: this.$Qs.stringify(data)
                }).then(() => {
                    this.pageCurrent = 1;
                    this.getData()
                })
            }
            ,
        }
    }
</script>

<style scoped>
    .el-menu-item.is-active {
        background-color: white !important;
        color: rgb(0, 153, 102) !important;
    }
</style>
