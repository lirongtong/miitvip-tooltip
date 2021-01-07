<template>
    <div class="mi-tooltips" :class="isMobile() ? ' mi-tooltips-mobile' : ''">
        <div class="top">
            <mi-tooltip placement="topLeft" :visible="visible">
                <template v-slot:title>
                    <p>初始化时，默认显示提示内容</p>
                    <p>初始化成功后 5s 自动隐藏...</p>
                    <p>即 visible 手动控制显隐</p>
                </template>
                <a class="btn">TL</a>
            </mi-tooltip>
            <mi-tooltip :delay-show="0.2" :delay-hide="0.5">
                <template v-slot:title>
                    <p>延迟 200ms 显示</p>
                    <p>延迟 500ms 隐藏</p>
                </template>
                <a class="btn">Top ( 延迟 )</a>
            </mi-tooltip>
            <mi-tooltip placement="topRight" bg-color="#f6ca9d">
                <template v-slot:title>
                    <p>TopRight 气泡提示 - 文本信息</p>
                    <p>自定义背景色 #f6ca9d</p>
                </template>
                <a class="btn">TR</a>
            </mi-tooltip>
        </div>
        <div class="middle">
            <div class="left">
                <mi-tooltip placement="left-top" text-color="#f6ca9d">
                    <template v-slot:title>
                        <p>LeftTop 气泡提示 - 文本信息</p>
                        <p>自定义文本颜色 #f6ca9d</p>
                    </template>
                    <a class="btn">LT</a>
                </mi-tooltip>
                <mi-tooltip placement="left" :auto-adjust="false">
                    <template v-slot:title>
                        <p>Left 气泡提示 - 文本信息</p>
                        <p>默认自动调整显示位置（最佳适配）</p>
                        <p>当前设置为不自动适配位置</p>
                        <p>即内容看不见也改变显示位置</p>
                    </template>
                    <a class="btn">Left</a>
                </mi-tooltip>
                <mi-tooltip title="LeftBottom 气泡提示 - 文本信息" placement="left-bottom">
                    <a class="btn">LB</a>
                </mi-tooltip>
            </div>
            <div class="right">
                <mi-tooltip placement="right-top" animation="newspaper">
                    <template v-slot:title>
                        <p>RightTop 气泡提示 - 文本信息</p>
                        <p>组件内置动画 newspaper</p>
                    </template>
                    <a class="btn">RT</a>
                </mi-tooltip>
                <mi-tooltip placement="right" animation="sticky" :animation-duration="1">
                    <template v-slot:title>
                        <p>Right 气泡提示 - 文本信息</p>
                        <p>组件内置动画 sticky</p>
                        <p>动画过渡时长 1s</p>
                    </template>
                    <a class="btn">Right</a>
                </mi-tooltip>
                <mi-tooltip title="RightBottom 气泡提示 - 文本信息" placement="right-bottom">
                    <a class="btn">RB</a>
                </mi-tooltip>
            </div>
        </div>
        <div class="bottom">
            <mi-tooltip placement="bottom-left" trigger="click">
                <template v-slot:title>
                    <p>BottomLeft 气泡提示 - 文本信息</p>
                    <p>Trigger 事件为 Click</p>
                    <p>即点击后方可触发 Tooltip 显示/隐藏</p>
                </template>
                <a class="btn">BL ( 点击 )</a>
            </mi-tooltip>
            <mi-tooltip title="Bottom 气泡提示 - 文本信息" placement="bottom">
                <a class="btn">Bottom</a>
            </mi-tooltip>
            <mi-tooltip title="BottomRight 气泡提示 - 文本信息" placement="bottom-right">
                <a class="btn">BR</a>
            </mi-tooltip>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    export default defineComponent({
        data() {
            return {
                visible: true,
                defaultVisible: true
            }
        },
        methods: {
            isMobile(): boolean {
                const agent = navigator.userAgent,
                    agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
                let mobile = false
                for (let i = 0, len = agents.length; i < len; i++) {
                    if (agent.indexOf(agents[i]) > 0) {
                        mobile = true
                        break
                    }
                }
                return mobile
            }
        },
        mounted() {
            setTimeout(() => {
                this.visible = false
                this.defaultVisible = false
            }, 5000)
        }
    })
</script>