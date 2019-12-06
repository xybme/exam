<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px" size="small" style="width:600px">
      <el-form-item
        label="问卷名称"
        prop="surveyName"
        :rules="{ required: true, message: '请输入名称', trigger: 'blur' }"
      >
        <el-input v-model="form.surveyName"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status" placeholder="请选择">
          <el-option label="未开始" :value="0"></el-option>
          <el-option label="进行中" :value="1"></el-option>
          <el-option label="已结束" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.describe"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
    <hr />
    <div v-if="form.surveyId">
      <el-button type="primary" @click="addQues">新增问题</el-button>
      <div class="question-ul">
        <el-card class="box-card" v-for="(q,index) in questionArr" :key="index">
        <div slot="header" class="clearfix">
          <span>{{q.questionName}}</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="editQ(q)">修改</el-button>
        </div>
        <div v-for="(item,idx) in q.options" :key="idx" class="text item">
          <span>{{item.optionName}}</span> <span>{{item.count}}</span>
        </div>
      </el-card>
      </div>

      
    </div>

    <el-dialog title="编辑问题" :visible.sync="showDialog" width="600px" center>
      <div class="question-form">
        <el-form ref="form" :model="form" label-width="80px" size="small" style="width:600px">
          <div class="title">问题名</div>
          <el-input v-model="quesForm.questionName"></el-input>
          <div class="title margin30">选项</div>
          <div v-for="(item,index) in quesForm.options" :key="index">
            <el-input v-model="item.optionName"></el-input>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitQuestion">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showDialog: false,
      form: {
        surveyName: "",
        status: 0,
        describe: ""
      },
      quesForm: {
        questionName: "",
        options: [
          { optionName: "" },
          { optionName: "" },
          { optionName: "" },
          { optionName: "" }
        ]
      },
      questionArr: []
    }
  },
  created() {
    const { surveyId } = this.$route.query
    if (surveyId) {
      this.quesForm.surveyId = surveyId
      API.question.query({ surveyId }).then(res => {
        this.form = res.rows[0]
      })
      this.queryDetail()
    }
  },
  methods: {
    queryDetail() {
      const { surveyId } = this.$route.query
      API.question.queryDetail({ surveyId }).then(res => {
        this.questionArr = res.attr.questions
      })
    },
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.surveyId) {
            // 编辑
            API.question.surveyUpdate(this.form).then(res => {
              this.$message({ message: res.message, type: "success" })
            })
          } else {
            // 新增
            API.question.surveyAdd(this.form).then(res => {
              const { surveyId } = res.attr
              this.$router.replace({
                path: `/question/edit?surveyId=${surveyId}`
              })
            })
          }
        }
      })
    },
    submitQuestion() {
      API.question.questionAdd(this.quesForm).then(res => {
        this.showDialog = false
        this.queryDetail()
        this.$message({ message: '新增成功', type: "success" })
      })
    },
    editQ(q) {
      console.log(q)
      this.showDialog = true
      this.quesForm = q
    },
    addQues() {
      this.showDialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
.question-form {
  width: 500px;
  margin: 0 auto;
  .title {
    font-size: 16px;
    font-weight: bold;
  }
  .el-input {
    margin-top: 10px;
    width: 500px;
  }
  .margin30 {
    margin-top: 30px;
  }
}
.question-ul{
  display: flex;
  flex-wrap: wrap;
  .box-card{
    width: 360px;
    margin: 0 20px 20px 0;
  }
  .item{
    display: flex;
    justify-content: space-between;
  }
}
</style>
