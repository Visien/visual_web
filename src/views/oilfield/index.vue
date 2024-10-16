<template>
  <div class="icons-container">
    <!-- 播放界面 -->
    <div class="radius">
      <!-- <img class="radius_icon" @click="showDialog()" src="@/assets/icon1.png" alt="" /> -->

      <div class="modal-content">
        <div class="modal-header">
          <span class="title">历史识别记录</span>
          <div class="status-legend">
            <div class="legend-item">
              <span class="status-icon yellow"></span><span>违规</span>
            </div>
            <div class="legend-item">
              <span class="status-icon red"></span><span>风险</span>
            </div>
          </div>
        </div>
        <div class="modal-body">
          <div class="table">
            <div class="table-row" v-for="(item, index) in historyList" :key="index">
              <span class="status" :class="item.level > 3 ? 'red' : 'yellow'"></span>
              <span class="column vs-title">{{item.vs_title}}</span>
              <span class="column info">{{item.info}}</span>
              <span class="column alarm-time">{{ item.alarm_time.replace('T', ' ') }}</span>
              <span class="column view" @click="watchItem(item)">查看</span>
            </div>
          </div>
        </div>
      </div>



      <video
        :key="videoKey"
        ref="video_ground"
        autoplay
        muted
        class="video-ground"
      >
        <source :src="videoSource" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    <el-dialog
      title="操作提示"
      :visible.sync="dialogVisible"
      width="20%"
      center
    >
      <div class="dialog-content">
        <div class="hint">{{ info }}</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="handleDelete"
          >确认</el-button
        >
      </div>
    </el-dialog>
    <el-dialog title="" :visible.sync="dialogVisible2">
      <div class="item">
        <img class="itemImg" :src="targetItem.image_url" alt="">
        <div v-html="targetItem.details"></div>
      </div>
    </el-dialog>
    <div class="video-console flex items-center justify-center">
      <!-- 控制台 -->
      <el-row style="width: 100%; top: 25%;" :gutter="20">
        <el-col :span="8">
          <div
            class="flex items-center justify-start"
            style="width:100%; height:85%"
          >
            <el-select
              @change="selectVideoSource"
              v-model="videoSource"
              placeholder="video source"
              style="margin-left:1.875rem;width:16.25rem;"
            >
              <el-option-group
                v-for="videoGroup in videoGroupOptions"
                :key="videoGroup.label"
                :label="videoGroup.label"
              >
                <el-option
                  v-for="item in videoGroup.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-option-group>
            </el-select>
          </div>
        </el-col>
        <!-- 上一个 -->
        <el-col :span="2">
          <div
            class="flex items-center justify-center"
            style="width:100%; height:85%"
          >
            <el-button icon="el-icon-arrow-left" circle />
          </div>
        </el-col>
        <!-- 播放/暂停 -->
        <el-col :span="2">
          <div
            class="flex items-center justify-center"
            style="width:100%; heigth:100%;"
          >
            <el-button
              size="large"
              type="primary"
              icon="el-icon-caret-right"
              style="font-size: 1.25rem;"
              circle
              @click="togglePlayPause"
            ></el-button>
          </div>
        </el-col>
        <!-- 下一个 -->
        <el-col :span="2">
          <div
            class="flex items-center justify-center"
            style="width:100%; height:85%"
          >
            <el-button icon="el-icon-arrow-right" circle />
          </div>
        </el-col>
        <el-col :span="10">
          <div
            class="flex items-center justify-center"
            style="width:100%; height:85%"
          ></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getAlarmAlarm, getAlarmHistory, deleteAlgorit } from '@/api/alarm'
import { VideostreamList_oilfield } from '@/api/videostream'

export default {
  name: "Icons",
  data() {
    return {
      uuid:'',
      info:'',
      vsid:'',
      videoKey: 0,
      videoSource: "",
      isPlaying: true,
      dialogVisible: false,
      dialogVisible2: false,
      list:[],
      historyList:[],
      targetItem:{
        image_url:'',
        info:'',
        details:''
      },
      videoGroupOptions: 
      [
            {
                label: "等待数据注入",
                options: [
                    {
                        value: "http://123.160.244.172:33334/live/local.live.mp4",
                        label: "油田本地视频流(测试1)"
                    },
                    {
                        value: "1",
                        label: "空视频流(测试1)"
                    },
                    {
                        value: "2",
                        label: "空视频流(测试2)"
                    }
                ]
            }
        ]
    };
  },
  async mounted() {
    // setInterval(() => {
    //   this.getAlarm()
    // }, 3000); // 每秒执行一次
    await this.getVideo()
    await this.getHistory()
  },
  methods: {
    watchItem(item) {
      this.targetItem = item
      this.targetItem.details = this.targetItem.details.replace(/\n/g, "<br>");
      this.targetItem.details = this.targetItem.details.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
      this.dialogVisible2 = true
    },
    async getVideo() {
      const res = await VideostreamList_oilfield()
      console.log(res)
      // res.data = []
      if (res.code === 200 && res.data.length > 0) {
        this.videoGroupOptions = [
          {
            label: "AI算法",
            options: res.data.map(item => ({
              value: item.play_url_mp4,
              label: item.title
            }))
          }
        ];
        this.list = res.data
        this.videoSource = res.data[0].play_url_mp4
        this.vsid = res.data[0].vsid
        this.reloadVideo();
      } else {
        this.$notify({
          title: '失败',
          message: 'playlist接口数据为空',
          type: 'error',
          duration: 2000
        })
      }
    },
    async getAlarm() {
      const res = await getAlarmAlarm({
        vsid:this.vsid
      })
      if (res.code === 200) {
        if(res.data.ac == 1 && this.uuid == res.data.uuid) { // 预警
          this.dialogVisible = true
          this.info = res.data.info
        }
        this.uuid == res.data.uuid
      }
    },
    async getHistory() {
      const res = await getAlarmHistory({
        vsid:this.vsid
      })
      if (res.code === 200) {
        this.historyList = res.data
      }
    },
    selectVideoSource(e) {
      this.videoSource = e;
      this.reloadVideo();
      console.log(this.videoSource);
      console.log(e);
      this.vsid = this.list.find(item => item.play_url_mp4 === e).vsid
      this.getHistory()
    },
    handleDelete() {
      this.dialogVisible = !this.dialogVisible;
    },
    showDialog() {
      console.log('点击');
      this.dialogVisible = !this.dialogVisible;
      console.log(this.dialogVisible);
    },
    togglePlayPause() {
      if (this.$refs.video_ground) {
        const video = this.$refs.video_ground;
        if (video.paused) {
          video.play();
          this.isPlaying = true;
        } else {
          video.pause();
          this.isPlaying = false;
        }
      }
    },
    reloadVideo() {
      this.videoKey += 1; // 改变 key 以触发重新渲染
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
  }
};
</script>

<style lang="scss" scoped>
.icons-container {
  margin: 0.625rem 1.25rem 0;
  overflow: hidden;

  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(7.5rem, 1fr));
  }

  .icon-item {
    margin: 1.25rem;
    height: 5.3125rem;
    text-align: center;
    width: 6.25rem;
    float: left;
    font-size: 1.875rem;
    color: #24292e;
    cursor: pointer;
  }

  span {
    display: block;
    // font-size: 1rem;
    margin-top: 0.625rem;
  }

  .disabled {
    pointer-events: none;
  }

  .radius {
    position: relative;
    height: auto;
    width: 100%;
    max-width: 120rem;
    overflow: hidden;
    border: 0.0625rem solid rgba(0, 0, 0, 0.2);
    border-radius: 1.25rem;
    margin-top: 0rem;
    box-shadow: 0 0.125rem 0.5rem 0 rgba(0, 0, 0, 0.2);
  }

  .video-ground {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }

  .video-console {
    background: #fff;
    height: 6.25rem;
    width: 100%;
    position: fixed;
    margin-left: -1.25rem;
    bottom: 0;
    box-shadow: 0.25rem -0.125rem 0.375rem rgb(0 21 41 / 35%);
  }
  .radius_icon {
    position: absolute;
    top: 3.75rem;
    right: 0.625rem;
    width: 3.125rem;
    height: 3.125rem;
    z-index: 100;
    border-radius: 50%;
  }
  .dialog-content {
    text-align: center;
    margin-top: -0.625rem;
  }
  .dialog-content img {
    width: 3.125rem;
    height: 3.125rem;
  }

  .dialog-footer {
    text-align: center;
  }
  .hint {
    font-size: 0.875rem;
    color: #999;
    margin-top: 0.625rem;
  }
  // .btn {
  //     cursor: pointer;
  //     position: relative;
  //     // top: 0rem;
  //     // left: -1.125rem;
  //     width: 3.75rem;
  //     height: 3.75rem;
  //     box-shadow: 0rem .125rem .5rem rgb(0 21 41 / 55%);
  //     background: #38bdf8;
  //     border-radius: 5rem;
  //     color: #ffffff;
  //     overflow: hidden;
  // }

  // .btn.canClick {
  //     background: #38bdf8;
  //     @apply hover: (shadow-lg shadow-gray-400);
  // }

  // .btn::after {
  //     content: "";
  //     background: #f1f1f1;
  //     display: block;
  //     position: absolute;
  //     left: 50%;
  //     top: 50%;
  //     transform: translate(-50%, -50%);
  //     width: 62.5rem;
  //     height: 62.5rem;
  //     border-radius: 100%;
  //     opacity: 0;
  //     transition: all 0.8s;
  // }

  // .btn.canClick:active:after {
  //     width: .625rem;
  //     height: .625rem;
  //     opacity: 0.6;
  //     transition: 0s;
  // }

  // .btn-down {
  //     cursor: pointer;
  //     position: relative;
  //     /* top: 0rem;
  //     left: -0.625rem; */
  //     width: 2.5rem;
  //     height: 2.5rem;
  //     color: #000;
  //     border-radius: 5rem;
  //     overflow: hidden;
  // }

  // // .btn-down.canClick {
  // //     background: #fff;/* 设置背景颜色为白色 */
  // //     /* 其他基本样式 */
  // //     transition: box-shadow 0.3s; /* 平滑过渡阴影效果 */
  // // }
  // // .btn-down.canClick:hover {
  // //     box-shadow: 0 .25rem .375rem rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  // //     /* 你可以根据需要调整阴影的参数 */
  // // }

  // .btn-down::after {
  //     content: "";
  //     background: #232424;
  //     display: block;
  //     position: absolute;
  //     left: 50%;
  //     top: 50%;
  //     transform: translate(-50%, -50%);
  //     width: 62.5rem;
  //     height: 62.5rem;
  //     border-radius: 100%;
  //     opacity: 0;
  //     transition: all 0.8s;
  // }

  // .btn-down.canClick:active:after {
  //     width: .625rem;
  //     height: .625rem;
  //     opacity: 0.6;
  //     transition: 0s;
  // }
}
.modal-content {
  position: absolute;
  right: 0px;
  top: 0px;
  margin: 10px 10px auto;
  padding: 0;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  font-size:12px;

  z-index: 10;
  width: 30%; 
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  animation-name: animatetop;
  animation-duration: 0.4s;
}

@keyframes animatetop {
  from {top: -300px; opacity: 0}
  to {top: 0; opacity: 1}
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
  background-color: #0073e6; /* 深蓝色 */
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
}

.status-legend {
  display: flex;
  gap: 6px;
}

.legend-item {
  display: flex;
  align-items: center;
  font-size: 10px;
}

.status-icon {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 5px;
}

.status-icon.yellow {
  background-color: #ffcc00;
}

.status-icon.red {
  background-color: #ff3300;
}

.modal-body {
  padding: 10px;
  background-color: #f9f9f9;
}

.table {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.table-row {
  display: flex;
  align-items: center;
  padding: 4px 10px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  font-size: 11px; /* 进一步压缩字体 */
}

.status {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 10px;
  margin-bottom: 5px;
}

.status.red {
  background-color: #ff3300;
}

.status.yellow {
  background-color: #ffcc00;
}

.column {
  font-size: 12px;
  color: #333333;
  margin-bottom: 5px;
}

.vs-title {
  width: 20%;
}

.info {
  width: 40%;
  color: #555555;
}

.alarm-time {
  width: 30%;
  color: #888888;
}

.view {
  width: 10%;
  color: #0073e6;
  text-align: right;
  cursor: pointer;
  text-decoration: underline;
}

.view:hover {
  color: #005bb5;
}



.close {
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.itemImg {
  display: block;
  margin-bottom:30px;
  height: 200px;
}
</style>
