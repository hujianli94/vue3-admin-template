<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24" :xs="24">
        <el-card>
          <el-button type="primary" @click="createTask">创建任务</el-button>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="当前任务" name="current"></el-tab-pane>
            <el-tab-pane label="未完成" name="unfinish"></el-tab-pane>
            <el-tab-pane label="已完成" name="finished"></el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24" :xs="24">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column fixed prop="name" label="任务名称" width="100"></el-table-column>
          <el-table-column prop="desc" label="任务描述" width="300"></el-table-column>
          <el-table-column prop="start_time" label="开始时间" width="150"></el-table-column>
          <el-table-column prop="end_time" label="结束时间" width="150"></el-table-column>
          <el-table-column prop="assign" label="执行人" width="120"></el-table-column>
          <el-table-column prop="status" label="任务状态" width="120"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template #default="scope">
              <el-button type="text" size="small" @click="editTask(scope.row)">编 辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24" :xs="24">
        <el-drawer
          v-model="dialog"
          title=""
          :before-close="handleClose"
          direction="rtl"
          custom-class="demo-drawer"
          :with-header="false"
        >
          <h3>{{ title }}</h3>
          <br />
          <div class="demo-drawer__content">
            <el-form :model="ruleForm" :rules="rules" label-width="80px">
              <el-form-item label="任务名称" prop="name" :label-width="formLabelWidth">
                <el-input v-model="ruleForm.name" autocomplete="off" />
              </el-form-item>
              <el-form-item label="任务描述" :label-width="formLabelWidth">
                <el-input v-model="ruleForm.desc" autocomplete="off" />
              </el-form-item>
              <el-form-item label="开始时间">
                <el-date-picker
                  v-model="ruleForm.start_time"
                  align="right"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                />
              </el-form-item>
              <el-form-item label="结束时间">
                <el-date-picker
                  v-model="ruleForm.end_time"
                  align="right"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                />
              </el-form-item>
              <el-form-item label="执行人" prop="assign" :label-width="formLabelWidth">
                <el-input v-model="ruleForm.assign" autocomplete="off" />
              </el-form-item>

              <el-form-item label="任务状态" :label-width="formLabelWidth">
                <el-select v-model="ruleForm.status" placeholder="请选择任务状态">
                  <el-option label="待执行" value="INIT" />
                  <el-option label="进行中" value="INPROCESS" />
                  <el-option label="已完成" value="FINISHED" />
                  <el-option label="已废弃" value="DISCARD" />
                </el-select>
              </el-form-item>
            </el-form>
            <el-form-item>
              <el-button type="primary" :loading="loading" @click="onSubmit">
                {{ loading ? '提交中 ...' : '提交' }}
              </el-button>
              <el-button @click="cancelForm">取消</el-button>
            </el-form-item>
          </div>
        </el-drawer>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { submit, pullData } from '@/api/todo'
import { ElDrawer, ElMessageBox, ElMessage } from 'element-plus'
import { validateHan } from '@/utils/validate'

export default {
  setup() {
    const title = ref('')
    const activeTab = ref('current')
    const dialog = ref(false)
    const loading = ref(false)
    const formLabelWidth = '80px'
    let timer
    // const tableData =  ref([])

    const tableData = reactive([
      {
        // 创建响应式数据
        name: '测试任务',
        desc: '任务描述',
        start_time: '2020-06-21',
        end_time: '2020-07-01',
        assign: '张三',
        status: '进行中'
      }
    ])

    const ruleForm = reactive({
      name: '',
      desc: '',
      start_time: '',
      end_time: '',
      assign: '',
      status: ''
    })

    const rules = reactive({
      name: [{ required: true, message: '任务名称不可为空', trigger: 'blur' }, { validator: validateHan }],
      desc: [{ required: true, message: '任务描述不可为空', trigger: 'blur' }, { validator: validateHan }],
      assign: [{ required: true, message: '执行人不可为空', trigger: 'blur' }]
    })

    const createTask = () => {
      title.value = '创建任务'
      dialog.value = true
      ruleForm.values = {}
    }

    const editTask = (row) => {
      title.value = '编辑任务'
      dialog.value = true
      ruleForm.values = row
    }

    const onSubmit = () => {
      loading.value = true
      submit(ruleForm.values).then((response) => {
        console.log(ruleForm.values)
        if (response.code === 0) {
          ElMessage.success('保存成功！')
          loading.value = false
        }
      })
    }

    const handleClose = (done) => {
      if (loading.value) {
        return
      }
      ElMessageBox.confirm('是否退出本次编辑?')
        .then(() => {
          // loading.value = true
          timer = setTimeout(() => {
            done()
            // 动画关闭需要一定的时间
            setTimeout(() => {
              loading.value = false
            }, 400)
          }, 2000)
        })
        .catch(() => {
          // catch error
          ElMessage.success('请勿关闭任务栏')
        })
    }

    const cancelForm = () => {
      loading.value = false
      dialog.value = false
      clearTimeout(timer)
    }

    const getTaskList = (tab) => {
      pullData({ tab: tab }).then((response) => {
        if (response.code === 0) {
          tableData.value = response.data
        }
      })
    }

    return {
      title,
      loading,
      dialog,
      activeTab,
      tableData,
      ruleForm,
      rules,
      formLabelWidth,
      createTask,
      editTask,
      onSubmit,
      handleClose,
      cancelForm,
      getTaskList
    }
  }
}
</script>

<style lang="scss" scoped></style>
