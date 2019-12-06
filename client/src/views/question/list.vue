<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="文件名" v-model="searchForm.surveyName" style="width: 200px;" />
      <el-select v-model="searchForm.status" placeholder="状态" clearable>
        <el-option label="未开始" :value="0"></el-option>
        <el-option label="进行中" :value="1"></el-option>
        <el-option label="已结束" :value="2"></el-option>
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchTable(1)">查询</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%; text-align:center">
      <el-table-column prop="surveyId" label="surveyId" />
      <el-table-column prop="surveyName" label="问卷名" />
      <el-table-column prop="describe" label="描述" />
      <el-table-column prop="createdAt" label="创建时间" />
      <el-table-column label="操作" align="center" width="220" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="jump(scope.row)">答卷</el-button>
          <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        status: '',
        surveyName: ''
      },
      tableData: []
    };
  },
  created() {
    this.searchTable();
  },
  methods: {
    searchTable() {
      API.question.query({ currentPage: 1, ...this.searchForm }).then(res => {
        this.tableData = res.rows;
      });
    },
    edit({surveyId}) {
      this.$router.push({path: `/question/edit?surveyId=${surveyId}`})
    },
    add() {
      this.$router.push({path: '/question/edit'})
    },
    jump({surveyId}) {
      this.$router.push({path: `/survey?surveyId=${surveyId}`})
    }
  }
};
</script>
