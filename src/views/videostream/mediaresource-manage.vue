<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="URL"
        style="width: 200px;margin-right: 20px;"
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
      <!-- <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        {{ $t('table.export') }}
      </el-button> -->
      <!-- <el-checkbox
        v-model="showReviewer"
        class="filter-item"
        style="margin-left:15px;"
        @change="tableKey=tableKey+1"
      >
        {{ $t('table.reviewer') }}
      </el-checkbox> -->
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column
        label="URL"
        prop="url"
        width="320"
      >
        <template slot-scope="{row}">
          <span>{{ row.url }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="类型"
        prop="kind"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.kind }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="宽*长"
        prop="w"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.h }}*{{ row.w }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="帧率"
        prop="frame_rate"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.frame_rate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="比特率(k)"
        prop="bit_rate_k"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.bit_rate_k }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="更新时间"
        prop="update_time"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ formatISODate(row.update_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.actions')"
        align="center"
        width="280"
        class-name="fixed-width"
      >
        <template slot-scope="{row, $index}">
          <!-- <el-button
            type="primary"
            size="mini"
            @click="handleUpdate(row)"
          >
            {{ $t('table.edit') }}
          </el-button>
          <el-button
            v-if="row.status!=='running' && row.status!=='retry'"
            size="mini"
            type="success"
            @click="handleModifyStatus(row,'running')"
          >
            {{ $t('table.run') }}
          </el-button>
          <el-button
            v-if="row.status!=='terminated' && row.status!=='ready'"
            size="mini"
            type="danger"
            @click="handleModifyStatus(row,'terminated')"
          >
            {{ $t('table.terminated') }}
          </el-button> -->
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
          label="URL"
          prop="url"
        >
          <el-input v-model="tempvsData.url" />
        </el-form-item>
        <el-form-item
          label="类型"
          prop="kind"
        >
          <el-input v-model="tempvsData.kind" />
        </el-form-item>
        <el-form-item
          label="长"
          prop="h"
        >
          <el-input v-model="tempvsData.h" />
        </el-form-item>
        <el-form-item
          label="宽"
          prop="w"
        >
          <el-input v-model="tempvsData.w" />
        </el-form-item>
        <el-form-item
          label="帧率"
          prop="frame_rate"
        >
          <el-input v-model="tempvsData.frame_rate" />
        </el-form-item>

        <el-form-item
          label="比特率(k)"
          prop="bit_rate_k"
        >
          <el-input v-model="tempvsData.bit_rate_k" />
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
import { getMediaList, createMedia, deleteMedia } from '@/api/mediasource'
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
        url: '',
        kind: '',
        h: '',
        w: '',
        frame_rate: '',
        bit_rate_k: '',
        is_deleted:false
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      const { data } = await getMediaList()
      this.list = data
      // this.total = data.total
      setTimeout(() => {
        this.listLoading = false
      }, 500)
      console.log('-------');
      console.log(this.list)
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
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
        url: '',
        kind: '',
        h: '',
        w: '',
        frame_rate: '',
        bit_rate_k: '',
        is_deleted:false
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
      for (const key in this.tempvsData) {
        if (this.tempvsData[key] === '') {
          this.$notify({
            title: '请输入相应的内容',
            message: '请输入相应的内容',
            type: 'error',
            duration: 2000
          })
          return
        }
      }
      const res = await createMedia(this.tempvsData)
      if (res.code === 200) {
        this.list.push(res.data)
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
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
      this.dialogFormVisible = true
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
    async handleDelete(row, index) {
      console.log(row)
      const res = await deleteMedia({
        msid: row.msid
      })
      if (res.code === 200) {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        this.list.splice(index, 1)
      } else {
        this.$notify({
          title: '删除失败',
          message: res.mes,
          type: 'error',
          duration: 2000
        })
      }
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
    async handleGetPageviews(pageviews) {
      const { data } = await getvsPageviews({ pageviews })
      this.pageviewsData = data.pageviews
      this.dialogPageviewsVisible = true
    },
    handleDownload() {
      this.downloadLoading = true
      const tHeader = ['url', 'kind', 'w', 'h', 'frame_rate', 'bit_rate_k', 'update_time']
      const filterVal = ['url', 'kind', 'w', 'h', 'frame_rate', 'bit_rate_k', 'update_time']
      const data = formatJson(filterVal, this.list)
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