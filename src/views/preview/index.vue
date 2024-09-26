<template>
    <div class="icons-container">
        <!-- 播放界面 -->
        <div class="radius">
            <video :key="videoKey" ref="video_ground" autoplay muted class="video-ground">
                <source :src="videoSource" type="video/mp4" />Your browser does not support the video tag.
            </video>
        </div>

        <div class="video-console flex items-center justify-center">
            <!-- 控制台 -->
            <el-row style="width: 100%; top: 25%;" :gutter="20">
                <el-col :span="8">
                    <div class="flex items-center justify-start" style="width:100%; height:85%">
                        <el-select
                            @change="selectVideoSource"
                            v-model="videoSource"
                            placeholder="video source"
                            style="margin-left:30px;width:260px;"
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
                    <div class="flex items-center justify-center" style="width:100%; height:85%">
                        <el-button icon="el-icon-arrow-left" circle />
                    </div>
                </el-col>
                <!-- 播放/暂停 -->
                <el-col :span="2">
                    <div class="flex items-center justify-center" style="width:100%; heigth:100%;">
                        <el-button
                            size="large"
                            type="primary"
                            icon="el-icon-caret-right"
                            style="font-size: 20px;"
                            circle
                            @click="togglePlayPause"
                        ></el-button>
                    </div>
                </el-col>
                <!-- 下一个 -->
                <el-col :span="2">
                    <div class="flex items-center justify-center" style="width:100%; height:85%">
                        <el-button icon="el-icon-arrow-right" circle />
                    </div>
                </el-col>
                <el-col :span="10">
                    <div class="flex items-center justify-center" style="width:100%; height:85%"></div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
    name: "Icons"
})
export default class extends Vue {
    // 定义响应式状态
    public videoKey = 0;
    public videoSource = "http://123.160.244.172:33334/live/local.live.mp4";
    public isPlaying = true;

    public videoGroupOptions = [
        {
            label: "油田报警业务",
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
    ];

    // 为函数指定返回类型
    public selectVideoSource = (): void => {
        this.reloadVideo();
    };

    public togglePlayPause = (): void => {
        if (this.$refs.video_ground) {
            const video: HTMLVideoElement = this.$refs
                .video_ground as HTMLVideoElement;
            if (video.paused) {
                video.play();
                this.isPlaying = true;
            } else {
                video.pause();
                this.isPlaying = false;
            }
        }
    };

    private reloadVideo = (): void => {
        this.videoKey += 1; // 改变 key 以触发重新渲染
    };
}
</script>

<style lang="scss" scoped>
.icons-container {
    margin: 10px 20px 0;
    overflow: hidden;

    .grid {
        position: relative;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    }

    .icon-item {
        margin: 20px;
        height: 85px;
        text-align: center;
        width: 100px;
        float: left;
        font-size: 30px;
        color: #24292e;
        cursor: pointer;
    }

    span {
        display: block;
        font-size: 16px;
        margin-top: 10px;
    }

    .disabled {
        pointer-events: none;
    }

    .radius {
        position: relative;
        height: auto;
        width: 100%;
        max-width: 1920px;
        overflow: hidden;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 20px;
        margin-top: 0px;
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
    }

    .video-ground {
        width: 100%;
        height: 100%;
        object-fit: fill;
    }

    .video-console {
        background: #fff;
        height: 100px;
        width: 100%;
        position: fixed;
        margin-left: -20px;
        bottom: 0;
        box-shadow: 4px -2px 6px rgb(0 21 41 / 35%);
    }

    // .btn {
    //     cursor: pointer;
    //     position: relative;
    //     // top: 0px;
    //     // left: -18px;
    //     width: 60px;
    //     height: 60px;
    //     box-shadow: 0px 2px 8px rgb(0 21 41 / 55%);
    //     background: #38bdf8;
    //     border-radius: 80px;
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
    //     width: 1000px;
    //     height: 1000px;
    //     border-radius: 100%;
    //     opacity: 0;
    //     transition: all 0.8s;
    // }

    // .btn.canClick:active:after {
    //     width: 10px;
    //     height: 10px;
    //     opacity: 0.6;
    //     transition: 0s;
    // }

    // .btn-down {
    //     cursor: pointer;
    //     position: relative;
    //     /* top: 0px;
    //     left: -10px; */
    //     width: 40px;
    //     height: 40px;
    //     color: #000;
    //     border-radius: 80px;
    //     overflow: hidden;
    // }

    // // .btn-down.canClick {
    // //     background: #fff;/* 设置背景颜色为白色 */
    // //     /* 其他基本样式 */
    // //     transition: box-shadow 0.3s; /* 平滑过渡阴影效果 */
    // // }
    // // .btn-down.canClick:hover {
    // //     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
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
    //     width: 1000px;
    //     height: 1000px;
    //     border-radius: 100%;
    //     opacity: 0;
    //     transition: all 0.8s;
    // }

    // .btn-down.canClick:active:after {
    //     width: 10px;
    //     height: 10px;
    //     opacity: 0.6;
    //     transition: 0s;
    // }
}
</style>
