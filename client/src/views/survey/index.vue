<template>
  <div class="page-survey">
    <h3 class="page-title">{{surveyName}}</h3>
    <div v-if="questions.length">
      <el-card class="box-card" v-for="(q,index) in questions" :key="index">
        <div slot="header" class="clearfix">
          <span>{{q.questionName}}</span>
        </div>
        <div
          v-for="(item,idx) in q.options"
          :key="idx"
          :class="q.checkedId === item.optionId ? 'checked-option option-item' : 'option-item'"
          @click="choose(item,index,idx)"
        >{{item.optionName}}</div>
      </el-card>
    </div>
    <el-input v-model="telephone" placeholder="请输入手机号"></el-input>
    <el-button type="primary" class="submit-btn" @click="submit">提交</el-button>
  </div>
</template>

<script>
export default {
  name: "survey",
  data() {
    return {
      surveyId: "",
      surveyName: "",
      questions: [],
      telephone: ""
    };
  },
  created() {
    this.queryDetail();
  },
  methods: {
    queryDetail() {
      const { surveyId } = this.$route.query;
      this.surveyId = surveyId;
      API.question.queryDetail({ surveyId }).then(res => {
        this.surveyName = res.attr.surveyName;
        this.questions = res.attr.questions;
      });
    },
    choose(item, index, idx) {
      let q = this.questions[index];
      q.checkedId = item.optionId;
      this.$set(this.questions, index, q);
    },
    submit() {
      let form = {
        surveyId: this.surveyId,
        telephone: this.telephone
      };
      let optionIds = this.questions.map(item => item.checkedId);
      if (optionIds.includes(undefined)) {
        this.$message({ message: "请做完再提交", type: "warning" });
        return;
      }
      form["optionIds"] = optionIds;
      console.log(form);
      API.question.optionCount(form).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.page-survey {
  min-height: 100vh;
  margin: 0 auto;
  padding: 10px;
  .page-title {
    text-align: center;
    line-height: 60px;
  }
  .box-card {
    margin-bottom: 20px;
  }
  .option-item {
    line-height: 40px;
    cursor: pointer;
  }
  .checked-option {
    color: #2ccc34;
    font-weight: bold;
  }
  .submit-btn {
    width: 50%;
    margin: 10px auto;
    display: block;
  }
}
</style>
