<template>
  <div>
    <el-form label-position="left" :inline="true" ref="form" :model="form" label-width="120px" :disabled="formControl">
      <div class="firstText">
        <span></span>
        <span>

            <el-button type="primary" @click="infoSuccess()">提交</el-button>
                </span>
      </div>
      <el-container>
        <el-aside width="70%">
          <el-row>
            <el-col :span="10">
              <el-form-item label="编号">
                <el-input v-model="form.num" class="width"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="性别">
                <el-radio v-model="form.checked" label="1">男</el-radio>
                <el-radio v-model="form.checked" label="2">女</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="姓名">
                <el-input v-model="form.name" class="width"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="民族">
                <el-input v-model="form.ethnic" class="width"></el-input>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="出生日期">
                <el-date-picker
                        class="width"
                        v-model="form.birthday"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="入伍时间">
                <el-date-picker
                        class="width"
                        v-model="form.MilitaryTime"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="10">
              <el-form-item label="学历学位">
                <el-input v-model="form.edu" class="width"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="籍贯">
                <el-input v-model="form.nativePlace" class="width"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>

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
          <el-form-item label="入党时间">
            <el-date-picker
                    class="width"
                    v-model="form.partyTime"
                    type="date"
                    placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="出生地">
            <el-input v-model="form.birthPlace" class="width"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="组织机构">
            <el-input v-model="form.organization" class="width"></el-input>
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
            <el-input v-model="form.age" class="width"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
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
                      prop="trainTime"
                      align="center"
                      label="开始时间"
                      min-width="100">
              </el-table-column>
              <el-table-column
                      prop="trainTEnd"
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
                  <el-button
                          size="mini"
                          :disabled="true">删除
                  </el-button>
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
                      prop="trainTimeList[0]"
                      align="center"
                      label="参战开始时间"
                      min-width="100">
              </el-table-column>
              <el-table-column
                      prop="trainTimeList[1]"
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
                  <el-button
                          size="mini"
                          :disabled="true">删除
                  </el-button>
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
                      prop="trainTimeList[0]"
                      align="center"
                      label="行动开始时间"
                      min-width="100">
              </el-table-column>
              <el-table-column
                      prop="trainTimeList[1]"
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
                  <el-button
                          size="mini"
                          :disabled="true">删除
                  </el-button>
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
                  <el-button
                          size="mini"
                          :disabled="true">删除
                  </el-button>
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
              <i class="el-icon-success" style="font-size: 30px;float: right" @click="infoSuccess()"></i>
            </el-tooltip>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="档案情况审查" name="2">
        <div class="firstText">
          <span>家庭成员及重要社会关系</span>
          <span></span>
        </div>
        <el-table
                border
                :data="familyData"
                style="width: 100%">
          <el-table-column
                  prop="appellation"
                  label="称谓"
                  align="center"
                  min-width="150">
          </el-table-column>
          <el-table-column
                  prop="name"
                  label="姓名"
                  align="center"
                  min-width="150">
          </el-table-column>
          <el-table-column
                  prop="birthday"
                  align="center"
                  min-width="150"
                  label="生日">
          </el-table-column>
          <el-table-column
                  prop="politicsStatus"
                  align="center"
                  min-width="150"
                  label="政治面貌">
          </el-table-column>
          <el-table-column
                  prop="workInfo"
                  align="center"
                  min-width="150"
                  label="工作单位及职务">
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
          <el-button type="primary" @click="this.addInvestigate">
            <i class="el-icon-circle-plus-outline" style="font-size: 15px">新增</i>
          </el-button>
        </div>
        <el-table
                border
                :data="otherFamilyData"
                style="width: 100%">
          <el-table-column
                  prop="appellation"
                  label="档案审查情况"
                  align="center"
                  min-width="110">
          </el-table-column>
          <el-table-column
                  prop="name"
                  label="审查说明"
                  align="center"
                  min-width="110">
          </el-table-column>
          <el-table-column
                  prop="birthday"
                  align="center"
                  min-width="110"
                  label="领导干部亲属及身边身边工作人员情况">
          </el-table-column>
          <el-table-column
                  prop="politicsStatus"
                  align="center"
                  min-width="110"
                  label="审查时间">
          </el-table-column>
          <el-table-column
                  prop="workInfo"
                  align="center"
                  label="工作单位及职务">
          </el-table-column>
          <el-table-column
                  prop="workInfo"
                  align="center"
                  min-width="110"
                  label="登录人">
          </el-table-column>
          <el-table-column
                  prop="workInfo"
                  align="center"
                  min-width="110"
                  label="登录时间">
          </el-table-column>
          <el-table-column
                  label="操作"
                  min-width="110"
                  align="center">
            <template slot-scope="scope">
              <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">查看附件
              </el-button>
              <el-button
                      size="mini"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
                style="text-align: right"
                background
                layout="prev, pager, next"
                :total="50"
                @current-change="otherFamilyPageChange">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="廉洁自律审查" name="3">
        <div style="text-align: right">
          <el-button type="primary" @click="this.addInput">
            <i class="el-icon-circle-plus-outline" style="font-size: 15px">新增</i>
          </el-button>
        </div>
        <el-table
                border
                :data="honestData"
                style="width: 100%">
          <el-table-column
                  prop="appellation"
                  label="档案审查情况"
                  align="center"
                  min-width="110">
          </el-table-column>
          <el-table-column
                  prop="name"
                  label="审查说明"
                  align="center"
                  min-width="110">
          </el-table-column>
          <el-table-column
                  prop="birthday"
                  align="center"
                  min-width="110"
                  label="领导干部亲属及身边身边工作人员情况">
          </el-table-column>
          <el-table-column
                  prop="politicsStatus"
                  align="center"
                  min-width="110"
                  label="审查时间">
          </el-table-column>
          <el-table-column
                  prop="workInfo"
                  align="center"
                  label="工作单位及职务">
          </el-table-column>
          <el-table-column
                  prop="workInfo"
                  align="center"
                  min-width="110"
                  label="登录人">
          </el-table-column>
          <el-table-column
                  prop="workInfo"
                  align="center"
                  min-width="110"
                  label="登录时间">
          </el-table-column>
          <el-table-column
                  label="操作"
                  min-width="110"
                  align="center">
            <template slot-scope="scope">
              <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">查看附件
              </el-button>
              <el-button
                      size="mini"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
                style="text-align: right"
                background
                layout="prev, pager, next"
                :total="50"
                @current-change="honestPageChange">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="问题线索核查" name="4">
        <div style="text-align: right">
          <el-button type="primary" @click="this.addInput">
            <i class="el-icon-circle-plus-outline" style="font-size: 15px">新增</i>
          </el-button>
        </div>
        <el-table
                border
                :data="questionData"
                style="width: 100%">
          <el-table-column
                  prop="appellation"
                  label="档案审查情况"
                  align="center"
                  min-width="110">
          </el-table-column>
          <el-table-column
                  prop="name"
                  label="审查说明"
                  align="center"
                  min-width="110">
          </el-table-column>
          <el-table-column
                  prop="birthday"
                  align="center"
                  min-width="110"
                  label="领导干部亲属及身边身边工作人员情况">
          </el-table-column>
          <el-table-column
                  prop="politicsStatus"
                  align="center"
                  min-width="110"
                  label="审查时间">
          </el-table-column>
          <el-table-column
                  prop="workInfo"
                  align="center"
                  label="工作单位及职务">
          </el-table-column>
          <el-table-column
                  prop="workInfo"
                  align="center"
                  min-width="110"
                  label="登录人">
          </el-table-column>
          <el-table-column
                  prop="workInfo"
                  align="center"
                  min-width="110"
                  label="登录时间">
          </el-table-column>
          <el-table-column
                  label="操作"
                  min-width="110"
                  align="center">
            <template slot-scope="scope">
              <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">查看附件
              </el-button>
              <el-button
                      size="mini"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
                style="text-align: right"
                background
                layout="prev, pager, next"
                :total="50"
                @current-change="questionPageChange">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="经济责任审查" name="5">
        <div style="text-align: right">
          <el-button type="primary" @click="this.addInput">
            <i class="el-icon-circle-plus-outline" style="font-size: 15px">新增</i>
          </el-button>
        </div>
        <el-table
                border
                :data="economicData"
                style="width: 100%">
          <el-table-column
                  prop="appellation"
                  label="档案审查情况"
                  align="center"
                  min-width="110">
          </el-table-column>
          <el-table-column
                  prop="name"
                  label="审查说明"
                  align="center"
                  min-width="110">
          </el-table-column>
          <el-table-column
                  prop="birthday"
                  align="center"
                  min-width="110"
                  label="领导干部亲属及身边身边工作人员情况">
          </el-table-column>
          <el-table-column
                  prop="politicsStatus"
                  align="center"
                  min-width="110"
                  label="审查时间">
          </el-table-column>
          <el-table-column
                  prop="workInfo"
                  align="center"
                  label="工作单位及职务">
          </el-table-column>
          <el-table-column
                  prop="workInfo"
                  align="center"
                  min-width="110"
                  label="登录人">
          </el-table-column>
          <el-table-column
                  prop="workInfo"
                  align="center"
                  min-width="110"
                  label="登录时间">
          </el-table-column>
          <el-table-column
                  label="操作"
                  min-width="110"
                  align="center">
            <template slot-scope="scope">
              <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">查看附件
              </el-button>
              <el-button
                      size="mini"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
                style="text-align: right"
                background
                layout="prev, pager, next"
                :total="50"
                @current-change="economicPageChange">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="军事训练考核" name="6">
        <div style="text-align: right">
          <el-button type="primary" @click="this.addInput">
            <i class="el-icon-circle-plus-outline" style="font-size: 15px">新增</i>
          </el-button>
        </div>
        <el-table
                border
                :data="warData"
                style="width: 100%">
          <el-table-column
                  prop="appellation"
                  label="档案审查情况"
                  align="center"
                  min-width="110">
          </el-table-column>
          <el-table-column
                  prop="name"
                  label="审查说明"
                  align="center"
                  min-width="110">
          </el-table-column>
          <el-table-column
                  prop="birthday"
                  align="center"
                  min-width="110"
                  label="领导干部亲属及身边身边工作人员情况">
          </el-table-column>
          <el-table-column
                  prop="politicsStatus"
                  align="center"
                  min-width="110"
                  label="审查时间">
          </el-table-column>
          <el-table-column
                  prop="workInfo"
                  align="center"
                  label="工作单位及职务">
          </el-table-column>
          <el-table-column
                  prop="workInfo"
                  align="center"
                  min-width="110"
                  label="登录人">
          </el-table-column>
          <el-table-column
                  prop="workInfo"
                  align="center"
                  min-width="110"
                  label="登录时间">
          </el-table-column>
          <el-table-column
                  label="操作"
                  min-width="110"
                  align="center">
            <template slot-scope="scope">
              <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">查看附件
              </el-button>
              <el-button
                      size="mini"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
                style="text-align: right"
                background
                layout="prev, pager, next"
                :total="50"
                @current-change="warPageChange">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="健康状况评估" name="7">
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
          <i class="el-icon-success" style="font-size: 30px;float: right" @click="infoSuccess()"></i>
        </el-tooltip>
        <div style="text-align: right">
          <el-button type="primary" @click="this.addInput">
            <i class="el-icon-circle-plus-outline" style="font-size: 15px">新增</i>
          </el-button>
        </div>
        <el-table
                border
                :data="healthyData"
                style="width: 100%">
          <el-table-column
                  prop="appellation"
                  label="档案审查情况"
                  align="center"
                  min-width="110">
          </el-table-column>
          <el-table-column
                  prop="name"
                  label="审查说明"
                  align="center"
                  min-width="110">
          </el-table-column>
          <el-table-column
                  prop="birthday"
                  align="center"
                  min-width="110"
                  label="领导干部亲属及身边身边工作人员情况">
          </el-table-column>
          <el-table-column
                  prop="politicsStatus"
                  align="center"
                  min-width="110"
                  label="审查时间">
          </el-table-column>
          <el-table-column
                  prop="workInfo"
                  align="center"
                  label="工作单位及职务">
          </el-table-column>
          <el-table-column
                  prop="workInfo"
                  align="center"
                  min-width="110"
                  label="登录人">
          </el-table-column>
          <el-table-column
                  prop="workInfo"
                  align="center"
                  min-width="110"
                  label="登录时间">
          </el-table-column>
          <el-table-column
                  label="操作"
                  min-width="110"
                  align="center">
            <template slot-scope="scope">
              <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">查看附件
              </el-button>
              <el-button
                      size="mini"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
                style="text-align: right"
                background
                layout="prev, pager, next"
                :total="50"
                @current-change="healthyPageChange">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="干部现实表现" name="8">
        <div style="text-align: right">
          <el-button type="primary" @click="this.addInput">
            <i class="el-icon-circle-plus-outline" style="font-size: 15px">新增</i>
          </el-button>
        </div>
        <el-table
                border
                :data="warData"
                style="width: 100%">
          <el-table-column
                  prop="appellation"
                  label="档案审查情况"
                  align="center"
                  min-width="110">
          </el-table-column>
          <el-table-column
                  prop="name"
                  label="审查说明"
                  align="center"
                  min-width="110">
          </el-table-column>
          <el-table-column
                  prop="birthday"
                  align="center"
                  min-width="110"
                  label="领导干部亲属及身边身边工作人员情况">
          </el-table-column>
          <el-table-column
                  prop="politicsStatus"
                  align="center"
                  min-width="110"
                  label="审查时间">
          </el-table-column>
          <el-table-column
                  prop="workInfo"
                  align="center"
                  label="工作单位及职务">
          </el-table-column>
          <el-table-column
                  prop="workInfo"
                  align="center"
                  min-width="110"
                  label="登录人">
          </el-table-column>
          <el-table-column
                  prop="workInfo"
                  align="center"
                  min-width="110"
                  label="登录时间">
          </el-table-column>
          <el-table-column
                  label="操作"
                  min-width="110"
                  align="center">
            <template slot-scope="scope">
              <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">查看附件
              </el-button>
              <el-button
                      size="mini"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
                style="text-align: right"
                background
                layout="prev, pager, next"
                :total="50"
                @current-change="realityPageChange">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="其他情况核查" name="9">
        <div style="text-align: right">
          <el-button type="primary" @click="this.addInput">
            <i class="el-icon-circle-plus-outline" style="font-size: 15px">新增</i>
          </el-button>
        </div>
        <el-table
                border
                :data="otherData"
                style="width: 100%">
          <el-table-column
                  prop="appellation"
                  label="档案审查情况"
                  align="center"
                  min-width="110">
          </el-table-column>
          <el-table-column
                  prop="name"
                  label="审查说明"
                  align="center"
                  min-width="110">
          </el-table-column>
          <el-table-column
                  prop="birthday"
                  align="center"
                  min-width="110"
                  label="领导干部亲属及身边身边工作人员情况">
          </el-table-column>
          <el-table-column
                  prop="politicsStatus"
                  align="center"
                  min-width="110"
                  label="审查时间">
          </el-table-column>
          <el-table-column
                  prop="workInfo"
                  align="center"
                  label="工作单位及职务">
          </el-table-column>
          <el-table-column
                  prop="workInfo"
                  align="center"
                  min-width="110"
                  label="登录人">
          </el-table-column>
          <el-table-column
                  prop="workInfo"
                  align="center"
                  min-width="110"
                  label="登录时间">
          </el-table-column>
          <el-table-column
                  label="操作"
                  min-width="110"
                  align="center">
            <template slot-scope="scope">
              <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">查看附件
              </el-button>
              <el-button
                      size="mini"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
                style="text-align: right"
                background
                layout="prev, pager, next"
                :total="50"
                @current-change="otherPageChange">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
            :title="check"
            :visible.sync="dialogOrganizationVisible"
            width="50%"
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
            :title="check"
            :visible.sync="visible"
            width="50%"
    >
      <div style="padding: 0 5% 0 5%">
        <el-form ref="form" :model="form2" label-width="100px" :inline="true">
          <el-form-item label="其他审查情况">
            <el-select clearable  v-model="form2.case" placeholder="请选择">
              <el-option label="合格" value="1"></el-option>
              <el-option label="不合格" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审查说明">
            <el-select clearable  v-model="form2.explain" placeholder="请选择">
              <el-option label="业务知识缺乏，业务技能弱，基本法规制度不熟悉，完成日常业务工作有困难的；" value="1"></el-option>
              <el-option label="不能正确领会首长和上级决策意图，整体谋划水平低，导致工作忙乱的；或者缺乏大局意识和实践基础，所以意见建议脱离实际、质量不高的；" value="2"></el-option>
              <el-option label="制定计划可行性差，有明显漏洞的；或者组织协调不力，导致计划不能有效实施的；" value="3"></el-option>
              <el-option label="对不对相关情况了解掌握不及时，不准确的；或者不能有效知道部队解决实际问题的；" value="4"></el-option>
              <el-option label="学习不自觉，不刻苦，缺乏改进提高意识，工作不见起色的；" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审查说明">
            <el-input v-model="form2.explains"></el-input>
          </el-form-item>
          <el-form-item label="审查人">
            <el-input v-model="form2.person"></el-input>
          </el-form-item>
          <el-form-item label="审查时间">
            <el-date-picker
                    v-model="form2.time"
                    type="date"
                    placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="登录人">
            <el-input v-model="form2.loginPerson"></el-input>
          </el-form-item>
          <el-form-item label="登录时间">
            <el-date-picker
                    v-model="form2.loginTime"
                    type="date"
                    placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
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
  </div>

</template>

<script>
  import service from "../../utils/service";

  export default {
    name: "checkPrepare",
    data() {
      return {
        //附件列表
        accessoryFileList: [],
        form2: {
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
        //其他情况核查
        otherData: [],
        //健康状况评估
        healthyData: [],
        //军事训练考核
        warData: [],
        //经济责任审查
        economicData: [],
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
        //控制折叠面板初始显示显示
        activeNames: [ '1', '2', '3', '4', '5' ],
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
        //头像地址
        activeName: '1',
        form: {
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
        }
      }
    },
    created() {
      new Promise( ( resolve ) => {
        this.getData().then( () => {
          resolve();
        } );
      } ).then( () => {
        this.getNextData();
        this.getWarData();
        this.getNoWarData();
        this.getOtherData();
      } )
    },
    methods: {
      //提交审核
      investigateSubmit() {
        this.visible = false
      },
      //取消审核
      investigateCancel() {
        this.visible = false
      },
      //打开新增审核
      addInvestigate() {
        this.visible = true
      },
      //附件上传
      accessoryUpload( file ) {
        const f = new FormData();
        f.set( 'file', file.file );
        f.set( 'personalInfoId', this.id );
        f.set( 'fileName', file.file.name );
        this.$axios( {
          method: 'post',
          url: 'web/admin/workReport/upload.action',
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
      realityPageChange(){

      },
      getData() {
        return new Promise( resolve => {
          this.$axios
              .get( '/web/admin/personInfo/getPersonalInfoPageJSON.action' )
              .then( ( res ) => {
                const personalInfo = res.data.personalInfo;
                const sex = personalInfo.sex === "男" ? '1' : '2';
                this.form.name = personalInfo.armedPoliceName;
                this.form.checked = sex;
                this.form.birthday = personalInfo.birthDay;
                this.form.ethnic = personalInfo.nation;
                this.form.rankValue = personalInfo.policeRank;
                this.form.edu = personalInfo.education;
                this.form.MilitaryTime = personalInfo.militaryTime;
                this.form.nativePlace = personalInfo.nativePlace;
                this.form.partyTime = personalInfo.joinPartyTime;
                this.form.birthPlace = personalInfo.birthplace;
                this.form.presentOccupation = personalInfo.nowPosition;
                this.form.level = personalInfo.deptPosition;
                this.form.age = personalInfo.age;
                this.textarea = personalInfo.resume;
                this.id = personalInfo.id;
                this.imageUrl = service.baseUrl + "/" + personalInfo.pictureIn;
                this.imgUrl = personalInfo.pictureIn;
                resolve();
              } );
        } )

      },
      //tabs切换
      handleClick( tab, event ) {
        console.log( tab, event );
      },
      //上传图片
      upload( file ) {
        const f = new FormData();
        f.set( 'file', file.file );
        this.$axios( {
          method: 'post',
          url: '/web/admin/personInfo/upload.action',
          data: f,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        } )
            .then( () => {
              // this.imageUrl = baseUrl + "/" + res.data;
              // this.imgUrl = res.data;
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
      //获取培训经历数据
      getNextData() {
        let data = {
          personalInfoId: this.id,
        };
        this.$axios( {
          method: 'post',
          url: '/web/admin/personInfo/findTrainRecord.action',
          data: this.$Qs.stringify( data ),
          // headers:{
          //     "Content-Type":"multipart/form-data"
          // }
        } )
            .then( ( res ) => {
              this.tableData1 = res.data.rows;
            } )
      },
      //获取战争记录数据
      getWarData() {
        let data = {
          personalInfoId: this.id,
          isWar: 1
        };
        this.$axios( {
          method: 'post',
          url: '/web/admin/personInfo/findWarRecord.action',
          data: this.$Qs.stringify( data ),
        } )
            .then( ( res ) => {
              this.tableData2 = res.data.rows;
            } )
      },
      //获取非战争记录数据
      getNoWarData() {
        let data = {
          personalInfoId: this.id,
          isWar: 0
        };
        this.$axios( {
          method: 'post',
          url: '/web/admin/personInfo/findWarRecord.action',
          data: this.$Qs.stringify( data ),
          // headers:{
          //     "Content-Type":"multipart/form-data"
          // }
        } )
            .then( ( res ) => {
              this.tableData3 = res.data.rows;
            } )
      },
      //获取奖惩记录数据
      getOtherData() {
        let data = {
          personalInfoId: this.id,
        };
        this.$axios( {
          method: 'post',
          url: '/web/admin/personInfo/findPrizeInfoRecord.action',
          data: this.$Qs.stringify( data ),
          // headers:{
          //     "Content-Type":"multipart/form-data"
          // }
        } )
            .then( ( res ) => {
              this.tableData4 = res.data.rows;
            } )
      },
      //图片提交完成
      handleAvatarSuccess( res, file ) {
        this.imageUrl = URL.createObjectURL( file.raw );
      },
      infoEdit() {
        this.formControl = false
      },
      infoSuccess() {
        if ( this.textarea.length >= 999 ) {
          return this.$message.error( '超出1000字符，请注意修改！' )
        } else {
          this.formControl = true;
          const birthDay = this.$moment( this.form.birthday ).format( 'YYYY-MM-DD' );
          const militaryTime = this.$moment( this.form.MilitaryTime ).format( 'YYYY-MM-DD' );
          const partyTime = this.$moment( this.form.partyTime ).format( 'YYYY-MM-DD' );
          const sex = this.form.checked === "1" ? '男' : '女';
          let data = {
            id: this.id,
            sex: sex,
            birthd: birthDay,
            nation: this.form.ethnic,
            age: this.form.age,
            armedPoliceName: this.form.name,
            deptPosition: this.form.level,
            militaryT: militaryTime,
            policeRank: this.form.rankValue,
            education: this.form.edu,

            nativePlace: this.form.nativePlace,
            joinPartyT: partyTime,
            birthplace: this.form.birthPlace,
            nowPosition: this.form.presentOccupation,

            resume: this.textarea,
            pictureIn: this.imgUrl
          };
          let formData = new FormData();
          let dataEntries = Object.entries( data );
          for ( let item of dataEntries ) {
            formData.set( item[ 0 ], item[ 1 ] )
          }
          this.$axios( {
            method: 'post',
            url: 'web/admin/personInfo/editPersonalInfo.action',
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
            break;
          case 2 :
            this.type = 2;
            this.check = '新增参战记录';
            this.firstLabel = '开始时间';
            this.secondLabel = '结束时间';
            this.thirdLabel = '参战名称';
            this.fourthLabel = '备注';
            break;
          case 3 :
            this.type = 3;
            this.check = '新增参加非战争军事记录';
            this.firstLabel = '开始时间';
            this.secondLabel = '结束时间';
            this.thirdLabel = '行动名称';
            this.fourthLabel = '备注';
            break;
          case 4 :
            this.type = 4;
            this.check = '新增奖惩记录';
            this.firstLabel = '时间';
            this.thirdLabel = '荣誉/处罚';
            this.fourthLabel = '备注';
            break;
          default:
            this.type = 1;
        }
        this.dialogOrganizationVisible = true;
      },
      addInput() {
        if ( this.check == '新增培训经历' || this.check == '新增参战记录' || this.check == '新增参加非战争军事记录' || this.check == '新增奖惩记录' ) {
          if ( this.type == 1 ) {
            const startTime = this.$moment( this.form1.startTime ).format( 'YYYY-MM-DD' );
            const endTime = this.$moment( this.form1.endTime ).format( 'YYYY-MM-DD' );
            let data = {
              tTime: startTime,
              trainTEnd: endTime,
              trainInstitution: this.form1.name,
              trainStatus: this.form1.status
            };
            this.$axios( {
              method: 'post',
              url: 'web/admin/personInfo/editTrainRecord.action',
              data: this.$Qs.stringify( data ),

            } )
                .then( () => {
                  this.form1.startTime = '';
                  this.form1.endTime = '';
                  this.form1.name = '';
                  this.form1.status = '';
                  this.getNextData();
                  return this.$message.success( "提交成功" )
                } )
          }
          if ( this.type == 2 ) {
            const startTime = this.$moment( this.form1.startTime ).format( 'YYYY-MM-DD' );
            const endTime = this.$moment( this.form1.endTime ).format( 'YYYY-MM-DD' );
            let data = {
              isWar: 1,
              joinWarT: startTime,
              joinWarTEnd: endTime,
              warName: this.form1.name,
              remark: this.form1.status
            };
            this.$axios( {
              method: 'post',
              url: 'web/admin/personInfo/editWarRecord.action',
              data: this.$Qs.stringify( data ),

            } )
                .then( () => {
                  this.form1.startTime = '';
                  this.form1.endTime = '';
                  this.form1.name = '';
                  this.form1.status = '';
                  this.getWarData();
                  return this.$message.success( "提交成功" )
                } )
          }
          if ( this.type == 3 ) {
            const startTime = this.$moment( this.form1.startTime ).format( 'YYYY-MM-DD' );
            const endTime = this.$moment( this.form1.endTime ).format( 'YYYY-MM-DD' );
            let data = {
              isWar: 0,
              joinWarT: startTime,
              joinWarTEnd: endTime,
              warName: this.form1.name,
              remark: this.form1.status
            };
            this.$axios( {
              method: 'post',
              url: 'web/admin/personInfo/editWarRecord.action',
              data: this.$Qs.stringify( data ),

            } )
                .then( () => {
                  this.form1.startTime = '';
                  this.form1.endTime = '';
                  this.form1.name = '';
                  this.form1.status = '';
                  this.getNoWarData();
                  return this.$message.success( "提交成功" )
                } )
          }
          if ( this.type == 4 ) {
            const startTime = this.$moment( this.form1.startTime ).format( 'YYYY-MM-DD' );
            let data = {
              PrizeT: startTime,
              prizeDescription: this.form1.name,
              remark: this.form1.status
            };
            this.$axios( {
              method: 'post',
              url: 'web/admin/personInfo/editPrizeInfoRecord.action',
              data: this.$Qs.stringify( data ),

            } )
                .then( () => {
                  this.form1.startTime = '';
                  this.form1.endTime = '';
                  this.form1.name = '';
                  this.form1.status = '';
                  this.getOtherData();
                  return this.$message.success( "提交成功" )
                } )
          }

        } else {
          if ( this.type == 1 ) {
            const startTime = this.$moment( this.form1.startTime ).format( 'YYYY-MM-DD' );
            const endTime = this.$moment( this.form1.endTime ).format( 'YYYY-MM-DD' );
            let data = {
              id: this.personId,
              tTime: startTime,
              trainTEnd: endTime,
              trainInstitution: this.form1.name,
              trainStatus: this.form1.status
            };
            this.$axios( {
              method: 'post',
              url: 'web/admin/personInfo/editTrainRecord.action',
              data: this.$Qs.stringify( data ),

            } )
                .then( () => {
                  this.form1.startTime = '';
                  this.form1.endTime = '';
                  this.form1.name = '';
                  this.form1.status = '';
                  this.getNextData();
                  return this.$message.success( "提交成功" )
                } )
          }
          if ( this.type == 2 ) {
            const startTime = this.$moment( this.form1.startTime ).format( 'YYYY-MM-DD' );
            const endTime = this.$moment( this.form1.endTime ).format( 'YYYY-MM-DD' );
            let data = {
              isWar: 1,
              id: this.personId,
              joinWarT: startTime,
              joinWarTEnd: endTime,
              warName: this.form1.name,
              remark: this.form1.status
            };
            this.$axios( {
              method: 'post',
              url: 'web/admin/personInfo/editWarRecord.action',
              data: this.$Qs.stringify( data ),

            } )
                .then( () => {
                  this.form1.startTime = '';
                  this.form1.endTime = '';
                  this.form1.name = '';
                  this.form1.status = '';
                  this.getWarData();
                  return this.$message.success( "提交成功" )
                } )
          }
          if ( this.type == 3 ) {
            const startTime = this.$moment( this.form1.startTime ).format( 'YYYY-MM-DD' );
            const endTime = this.$moment( this.form1.endTime ).format( 'YYYY-MM-DD' );
            let data = {
              isWar: 0,
              id: this.personId,
              joinWarT: startTime,
              joinWarTEnd: endTime,
              warName: this.form1.name,
              remark: this.form1.status
            };
            this.$axios( {
              method: 'post',
              url: 'web/admin/personInfo/editWarRecord.action',
              data: this.$Qs.stringify( data ),

            } )
                .then( () => {
                  this.form1.startTime = '';
                  this.form1.endTime = '';
                  this.form1.name = '';
                  this.form1.status = '';
                  this.getNoWarData();
                  return this.$message.success( "提交成功" )
                } )
          }
          if ( this.type == 4 ) {
            const startTime = this.$moment( this.form1.startTime ).format( 'YYYY-MM-DD' );
            let data = {
              id: this.personId,
              PrizeT: startTime,
              prizeDescription: this.form1.name,
              remark: this.form1.status
            };
            this.$axios( {
              method: 'post',
              url: 'web/admin/personInfo/editPrizeInfoRecord.action',
              data: this.$Qs.stringify( data ),

            } )
                .then( () => {
                  this.form1.startTime = '';
                  this.form1.endTime = '';
                  this.form1.name = '';
                  this.form1.status = '';
                  this.getOtherData();
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
            this.form1.startTime = row.trainTime;
            this.form1.endTime = row.trainTEnd;
            this.form1.name = row.trainInstitution;
            this.form1.status = row.trainStatus;
            break;
          case 2 :
            this.type = 2;
            this.check = '编辑参战记录';
            this.firstLabel = '开始时间';
            this.secondLabel = '结束时间';
            this.thirdLabel = '参战名称';
            this.fourthLabel = '备注';
            this.personId = row.id;
            this.form1.startTime = row.joinWarTime;
            this.form1.endTime = row.joinWarTEnd;
            this.form1.name = row.warName;
            this.form1.status = row.remark;
            break;
          case 3 :
            this.type = 3;
            this.check = '编辑参加非战争军事记录';
            this.firstLabel = '开始时间';
            this.secondLabel = '结束时间';
            this.thirdLabel = '行动名称';
            this.fourthLabel = '备注';
            this.personId = row.id;
            this.form1.startTime = row.joinWarTime;
            this.form1.endTime = row.joinWarTEnd;
            this.form1.name = row.warName;
            this.form1.status = row.remark;
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
            break;
          default:
            this.type = 1;
        }

        this.dialogOrganizationVisible = true;
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
