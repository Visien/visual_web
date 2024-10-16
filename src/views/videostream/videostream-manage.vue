<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="name"
        style="width: 260px;margin-right: 20px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <!-- <el-select
        v-model="listQuery.user"
        :placeholder="$t('table.user')"
        clearable
        style="width: 200px"
        class="filter-item"
      >
        <el-option
          v-for="item in userOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-select
        v-model="listQuery.type"
        :placeholder="$t('table.type')"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in typeOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-select
        v-model="listQuery.sort"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option
          v-for="item in sortOptions"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />
      </el-select> -->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        {{ $t('table.search') }}
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        {{ $t('table.add') }}
      </el-button>
      <el-button
        :loading="downloadLoading"
        style="margin:0 0 20px 20px;"
        type="primary"
        icon="el-icon-document"
        @click="handleDownload"
      >
        {{ $t('excel.export') }} Excel
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list2"
      border
      fit
      :default-sort = "{prop: 'vsid'}"
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column
        label="序号"
        sortable
        prop="vsid"
        align="center"
        width="80px"
      >
        <template slot-scope="{row}">
          <span>{{ row.vsid }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="标题"
        prop="title"
        width="200"
      >
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      
      <el-table-column
        label="所属项目"
        prop="project"
        align="center"
        width="120px"
      >
        <template slot-scope="{row}">
          <span>{{ row.project }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="算法"
        prop="algo_name"
        align="center"
        min-width="140px"
      >
        <template slot-scope="{row}">
          <span>{{ row.algo_name }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="status"
        prop="status"
        align="center"
        width="100px"
      >
        <template slot-scope="{row}">
          <el-tag type="success" v-if="row.status === 'running'">
            {{ row.status }}
          </el-tag>
          <el-tag type="info" v-if="row.status === 'ready'">
            {{ row.status }}
          </el-tag>
          <el-tag type="danger" v-if="row.status === 'stopped'">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="rtsp推流地址"
        prop="rtsp_server_url"
        align="center"
        width="300"
      >
        <template slot-scope="{row}">
          <span>{{ row.rtsp_server_url }}</span>
        </template>
      </el-table-column> -->
      <el-table-column
        label="mp4拉流地址"
        prop="play_url_mp4"
        align="center"
        width="320px"
      >
        <template slot-scope="{row}">
          <span>{{ row.play_url_mp4 }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="开始/结束时间 "
        prop="update_time"
        align="center"
        min-width="180px"
      >
        <template slot-scope="{row}">
          <span>{{ row.status === 'running' ? formatISODate(row.start_time) : formatISODate(row.update_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="运行时长 "
        prop="update_time"
        align="center"
        width="100px"
      >
        <template slot-scope="{row}">
          <span>{{ row.status === 'running' ? computeTime(row.start_time) : '--' }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="创建者"
        prop="username"
        align="center"
        min-width="100px"
      >
        <template slot-scope="{row}">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="源类型"
        prop="ms_kind"
        align="center"
        min-width="80px"
      >
        <template slot-scope="{row}">
          <span>{{ row.ms_kind }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.actions')"
        align="center"
        width="240px"
        class-name="fixed-width"
      >
        <template slot-scope="{row, $index}">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(row, $index)"
          >
            编辑
          </el-button>
          <el-button
            v-if="row.status === 'stopped'"
            size="mini"
            type="success"
            @click="handleStart(row, $index)"
          >
            {{ $t('table.run') }}
          </el-button>
          <el-button
            v-if="row.status === 'running'"
            size="mini"
            type="danger"
            @click="handleStop(row, $index)"
          >
            {{ $t('table.terminated') }}
          </el-button>
          <el-button
            type="danger"
            size="mini"
            plain
            @click="handleDelete(row, $index)"
          >
            {{ '删除' }}
          </el-button>
        </template>
      </el-table-column>

      <!-- <el-table-column
        :label="$t('table.date')"
        width="180px"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.timestamp | parseTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.author')"
        width="180px"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="showReviewer"
        :label="$t('table.reviewer')"
        width="110px"
        align="center"
      >
        <template slot-scope="{row}">
          <span style="color:red;">{{ row.reviewer }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.readings')"
        align="center"
        width="95"
      >
        <template slot-scope="{row}">
          <span
            v-if="row.pageviews"
            class="link-type"
            @click="handleGetPageviews(row.pageviews)"
          >{{ row.pageviews }}</span>
          <span v-else>0</span>
        </template>
      </el-table-column> -->
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="tempvsData"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item
          label="标题"
          prop="title"
        >
          <el-input v-model="tempvsData.title" />
        </el-form-item>
        <el-form-item
          label="项目"
          prop="project"
        >
          <el-input v-model="tempvsData.project" />
        </el-form-item>
        <el-form-item
          label="用户ID"
          prop="uid"
        >
          <el-input v-model="tempvsData.uid" />
        </el-form-item>
        <el-form-item
          label="媒体源ID"
          prop="msid"
        >
          <el-input v-model="tempvsData.msid" />
        </el-form-item>
        <el-form-item
          label="算法ID"
          prop="aid"
        >
          <el-input v-model="tempvsData.aid" />
        </el-form-item>

        <el-form-item
          label="算法执行参数"
          prop="algo_argsString"
        >
        <div style="display: flex;width: 380px;">
            <el-input v-model="tempvsData.algo_argsString" />
            <span style="white-space: nowrap;margin-left: 10px;color:red">以空格分割</span>
          </div>
        </el-form-item>

        <el-form-item
          label="显卡"
          prop="devicesString"
        >
        <div style="display: flex;width: 380px;">
            <el-input v-model="tempvsData.devicesString" />
            <span style="white-space: nowrap;margin-left: 10px;color:red">以空格分割</span>
          </div>
        </el-form-item>

        <el-form-item
          label="是否绘制"
          prop="is_draw"
        >
          <el-select v-model="tempvsData.is_draw" placeholder="请选择" style="width:300px">
            <el-option
              label="true"
              value="true"
            >
            </el-option>
            <el-option
              label="false"
              value="false"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="推流-宽"
          prop="w"
        >
          <el-input v-model="tempvsData.w" />
        </el-form-item>
        <el-form-item
          label="推流-高"
          prop="h"
        >
          <el-input v-model="tempvsData.h" />
        </el-form-item>
        <el-form-item
          label="推流-帧率"
          prop="frame_rate"
        >
          <el-input v-model="tempvsData.frame_rate" />
        </el-form-item>
        <el-form-item
          label="推流-比特率"
          prop="bit_rate_k"
        >
          <el-input v-model="tempvsData.bit_rate_k" />
        </el-form-item>
        <el-form-item
          label="推流-live地址"
          prop="rtsp_server_url"
        >
          <el-input v-model="tempvsData.rtsp_server_url" />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button
          type="primary"
          @click="createData()"
        >
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible2"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="tempvsData"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item
          label="标题"
          prop="title"
        >
          <el-input v-model="tempvsData.title" />
        </el-form-item>
        <el-form-item
          label="项目"
          prop="project"
        >
          <el-input v-model="tempvsData.project" />
        </el-form-item>
        <el-form-item
          label="用户ID"
          prop="uid"
        >
          <el-input v-model="tempvsData.uid" />
        </el-form-item>
        <el-form-item
          label="媒体源ID"
          prop="msid"
        >
          <el-input v-model="tempvsData.msid" />
        </el-form-item>
        <el-form-item
          label="算法ID"
          prop="aid"
        >
          <el-input v-model="tempvsData.aid" />
        </el-form-item>

        <el-form-item
          label="算法执行参数"
          prop="algo_argsString"
        >
        
          <div style="display: flex;width: 380px;">
            <el-input v-model="tempvsData.algo_argsString" />
            <span style="white-space: nowrap;margin-left: 10px;color:red">以空格分割</span>
          </div>
        </el-form-item>

        <el-form-item
          label="显卡"
          prop="devicesString"
        >
          <div style="display: flex;width: 380px;">
            <el-input v-model="tempvsData.devicesString" />
            <span style="white-space: nowrap;margin-left: 10px;color:red">以空格分割</span>
          </div>
        </el-form-item>

        <el-form-item
          label="是否绘制"
          prop="is_draw"
        >
          <el-select v-model="tempvsData.is_draw" placeholder="请选择" style="width:300px">
            <el-option
              label="true"
              value="true"
            >
            </el-option>
            <el-option
              label="false"
              value="false"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="推流-宽"
          prop="w"
        >
          <el-input v-model="tempvsData.w" />
        </el-form-item>
        <el-form-item
          label="推流-高"
          prop="h"
        >
          <el-input v-model="tempvsData.h" />
        </el-form-item>
        <el-form-item
          label="推流-帧率"
          prop="frame_rate"
        >
          <el-input v-model="tempvsData.frame_rate" />
        </el-form-item>
        <el-form-item
          label="推流-比特率"
          prop="bit_rate_k"
        >
          <el-input v-model="tempvsData.bit_rate_k" />
        </el-form-item>
        <el-form-item
          label="推流-live地址"
          prop="rtsp_server_url"
        >
          <el-input v-model="tempvsData.rtsp_server_url" />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible2 = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button
          type="primary"
          @click="updataData()"
        >
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="dialogPageviewsVisible"
      title="Reading statistics"
    >
      <el-table
        :data="pageviewsData"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          prop="key"
          label="Channel"
        />
        <el-table-column
          prop="pageviews"
          label="Pageviews"
        />
      </el-table>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="dialogPageviewsVisible = false"
        >{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { cloneDeep } from 'lodash'
import { getVideoStreams, createVideoStream, updateVideoStream, defaultVideoStreamData, getvsPageviews } from '@/api/videostreams'
import { getVideostreamList,getVideostreamListManage, createVideostream, updataVideostream, deleteVideostream, VideostreamStart, VideostreamStop } from '@/api/videostream'
import { exportJson2Excel } from '@/utils/excel'
import { formatJson } from '@/utils'
import Pagination from '@/components/Pagination/index.vue'

export default {
  name: 'ComplexTable',
  components: {
    Pagination
  },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 100,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        user: undefined,
        type: undefined,
        title: undefined,
        sort: '+id'
      },
      userOptions: ['test', 'admin', 'visen'],
      typeOptions: ['local stream', 'remote stream', 'test stream'],
      sortOptions: [
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' }
      ],
      statusOptions: ['running', 'ready', 'terminated', 'retry'],
      showReviewer: false,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPageviewsVisible: false,
      pageviewsData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false,
      tempvsData: {
        title: "",
        project: "",
        uid: '',
        msid: '',
        aid: '',
        algo_argsString:'',
        algo_args: [],
        devicesString:'',
        devices: [],
        is_draw: '',
        w: '',
        h: '',
        frame_rate: '',
        bit_rate_k: '',
        rtsp_server_url: "",
        play_url_mp4: "play_url",
        rtsp_log_path: "rtsp/log/live_path.log",
        pid: 0,
        status: "stopped",
        start_time: "string",
        is_deleted: false,
        list2:[],
      }
    }
  },
  watch: {
    'tempvsData.algo_argsString': function(newVal, oldVal) {
      console.log('对象的属性变化:', newVal)
      if (this.tempvsData.algo_argsString === '') return
      this.tempvsData.algo_args = this.tempvsData.algo_argsString.split(' ').filter(item => item)
      console.log('对象的属性变化:', this.tempvsData.algo_args)
    },
    'tempvsData.devicesString': function(newVal, oldVal) {
      console.log('对象的属性变化:', newVal)
      if (this.tempvsData.devicesString === '') return
      this.tempvsData.devices = this.tempvsData.devicesString.split(' ').filter(item => item)
      console.log('对象的属性变化:', this.tempvsData.devices)
    }
  },
  async created() {
    await this.getListManage()
    await this.getList()
    console.log(this.list);
  },
  methods: {
    computeTime(start_time) {
      const currentTime = new Date()
      const givenTime = new Date(start_time)
      // 计算时间差（以毫秒为单位）
      const timeDifference = currentTime - givenTime;
      // 转换为小时并保留两位小数
      const hours = (timeDifference / (1000 * 60 * 60)).toFixed(2);
      return hours + 'h'
    },
    formatISODate(isoString) {
      const date = new Date(isoString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    async getListManage() {
      this.listLoading = true
      const res = await getVideostreamListManage()
      if (res.code === 200) {
        this.list = res.data
        this.list2 = res.data
      }
      console.log(this.list);
      // this.total = data.total
      setTimeout(() => {
        this.listLoading = false
      }, 500)
    },
    async getList() {
      this.listLoading = true
      const res = await getVideostreamList()
      if (res.code === 200) {
        // console.log(this.list)
        this.list = { ...this.list, ...res.data }
      }
      // this.total = data.total
      setTimeout(() => {
        this.listLoading = false
      }, 500)
    },
    async handleFilter() {
      this.listQuery.page = 1
      await this.getListManage()
      await this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    getSortClass(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    },
    resetTempArticleData() {
      this.tempvsData = {
        title: "",
        project: "",
        uid: '',
        msid: '',
        aid: '',
        algo_argsString:'',
        algo_args: [],
        devicesString:'',
        devices: [],
        is_draw: '',
        w: '',
        h: '',
        frame_rate: '',
        bit_rate_k: '',
        rtsp_server_url: "",
        play_url_mp4: "string",
        rtsp_log_path: "string",
        pid: 0,
        status: "stopped",
        start_time: "string",
        is_deleted: false
      }
    },
    handleCreate() {
      this.resetTempArticleData()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate()
      })
    },
    async createData() {
      this.tempvsData.start_time = new Date().toISOString()
      for (const key in this.tempvsData) {
        if (this.tempvsData[key] === '') {
          console.log(key);
          this.$notify({
            title: '请输入相应的内容',
            message: '请输入相应的内容',
            type: 'error',
            duration: 2000
          })
          return
        }
      }
      const res = await createVideostream(this.tempvsData)
      if (res.code === 200) {
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
        this.handleFilter()
        this.dialogFormVisible = false

      } else {
        this.$notify({
          title: '创建失败',
          message: res.mes,
          type: 'error',
          duration: 2000
        })
      }
    },
    handleUpdate(row) {
      this.tempvsData = Object.assign({}, row)
      this.tempvsData.startTime = +new Date(this.tempvsData.startTime)
      this.dialogStatus = 'update'
      this.dialogFormVisible2 = true
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate()
      })
    },
    updateData() {
      this.$refs.dataForm.validate(async (valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.tempvsData)
          tempData.startTime = +new Date(tempData.startTime)
          const { data } = await updateVideoStream(tempData.id, { article: tempData })
          const index = this.list.findIndex(v => v.id === data.article.id)
          this.list.splice(index, 1, data.article)
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    async handleEdit(row,index) {
      this.tempvsData = Object.assign(this.tempvsData, this.list[index])
      this.tempvsData.algo_argsString = this.tempvsData.algo_args.join(' ')
      this.tempvsData.devicesString = this.tempvsData.devices.join(' ')
      this.dialogFormVisible2 = true
    },
    async updataData() {
      console.log(this.tempvsData)
      const res = await updataVideostream({
        "vsid": this.tempvsData.vsid,
        "title": this.tempvsData.title,
        "project": this.tempvsData.project,
        "uid": this.tempvsData.uid,
        "msid": this.tempvsData.msid,
        "aid": this.tempvsData.aid,
        "algo_args": this.tempvsData.algo_args,
        "devices": this.tempvsData.devices,
        "is_draw": this.tempvsData.is_draw,
        "w": this.tempvsData.w,
        "h": this.tempvsData.h,
        "frame_rate": this.tempvsData.frame_rate,
        "bit_rate_k": this.tempvsData.bit_rate_k,
        "rtsp_server_url": this.tempvsData.rtsp_server_url,
        "play_url_mp4": this.tempvsData.vsplay_url_mp4id,
        "rtsp_log_path": this.tempvsData.rtsp_log_path,
        "pid": this.tempvsData.pid,
        "status": this.tempvsData.status,
        "start_time": this.tempvsData.start_time,
        "is_deleted": this.tempvsData.is_deleted
      })
      if (res.code === 200) {
        this.$notify({
          title: '成功',
          message: '操作成功',
          type: 'success',
          duration: 2000
        })
        this.dialogFormVisible2 = false
        this.handleFilter()
      } else {
        this.$notify({
          title: '操作失败',
          message: res.mes,
          type: 'error',
          duration: 2000
        })
      }
    },
    async handleStart(row,index) {
      const res = await VideostreamStart({
        vsid: row.vsid
      })
      if (res.code === 200) {
        this.$notify({
          title: '成功',
          message: '操作成功',
          type: 'success',
          duration: 2000
        })
        this.handleFilter()
      } else {
        this.$notify({
          title: '操作失败',
          message: res.mes,
          type: 'error',
          duration: 2000
        })
      }
    },
    async handleStop(row,index) {
      const res = await VideostreamStop({
        vsid: row.vsid
      })
      if (res.code === 200) {
        this.$notify({
          title: '成功',
          message: '操作成功',
          type: 'success',
          duration: 2000
        })
        this.handleFilter()
      } else {
        this.$notify({
          title: '操作失败',
          message: res.mes,
          type: 'error',
          duration: 2000
        })
      }
    },

    async handleDelete(row, index) {
      console.log(row)
      const res = await deleteVideostream({
        vsid: row.vsid
      })
      if (res.code === 200) {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        this.handleFilter()
      } else {
        this.$notify({
          title: '删除失败',
          message: res.mes,
          type: 'error',
          duration: 2000
        })
      }
    },
    async handleGetPageviews(pageviews) {
      const { data } = await getvsPageviews({ pageviews })
      this.pageviewsData = data.pageviews
      this.dialogPageviewsVisible = true
    },
    handleDownload() {
      this.downloadLoading = true
      const tHeader = ['vsid', 'title', 'project', 'username', 'ms_kind', 'algo_name', 'play_url_mp4', 'start_time', 'update_time', 'status']
      const filterVal = ['vsid', 'title', 'project', 'username', 'ms_kind', 'algo_name', 'play_url_mp4', 'start_time', 'update_time', 'status']
      console.log(this.list2);
      const data = formatJson(filterVal, this.list2)
      exportJson2Excel(tHeader, data, 'table-list')
      this.downloadLoading = false
    }
  }
}
</script>

<style scoped>
  .filter-container {
    display: flex;
    align-items: flex-start;
  }
</style>