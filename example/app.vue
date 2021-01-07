<template>
    <div class="mi-tooltips">
        <div class="top">
            <mi-tooltip placement="topLeft">
                <template v-slot:title>
                    <p>初始化时，默认显示提示内容</p>
                    <p>初始化成功后 5s 自动隐藏...</p>
                </template>
                <a class="btn">TopLeft</a>
            </mi-tooltip>
            <mi-tooltip :delay-show="0.1" :delay-hide="0.5">
                <template v-slot:title>
                    <p>延迟 100ms 显示</p>
                    <p>延迟 500ms 隐藏</p>
                </template>
                <a class="btn">Top ( 延迟 )</a>
            </mi-tooltip>
            <mi-tooltip title="TopRight 气泡提示 - 文本信息" placement="topRight">
                <a class="btn">TopRight</a>
            </mi-tooltip>
        </div>
        <div class="middle">
            <div class="left">
                <mi-tooltip title="LeftTop 气泡提示 - 文本信息" placement="left-top">
                    <a class="btn">LeftTop</a>
                </mi-tooltip>
                <mi-tooltip title="Left 气泡提示 - 文本信息" placement="left">
                    <a class="btn">Left</a>
                </mi-tooltip>
                <mi-tooltip title="LeftBottom 气泡提示 - 文本信息" placement="left-bottom">
                    <a class="btn">LeftBottom</a>
                </mi-tooltip>
            </div>
            <div class="right">
                <mi-tooltip title="文本提示">
                    <a class="btn">RightTop</a>
                </mi-tooltip>
                <mi-tooltip title="文本提示">
                    <a class="btn">Right</a>
                </mi-tooltip>
                <mi-tooltip title="文本提示">
                    <a class="btn">RightBottom</a>
                </mi-tooltip>
            </div>
        </div>
        <div class="bottom">
            <mi-tooltip title="文本提示">
                <a class="btn">BottomLeft</a>
            </mi-tooltip>
            <mi-tooltip title="Bottom 气泡提示 - 文本信息" placement="bottom" :visible="visible">
                <a class="btn">Bottom</a>
            </mi-tooltip>
            <mi-tooltip title="文本提示">
                <a class="btn">BottomRight</a>
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
        mounted() {
            setTimeout(() => {
                this.visible = false
                this.defaultVisible = false
            }, 1000)
        }
    })
</script>