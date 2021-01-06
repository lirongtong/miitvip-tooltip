<template>
    <div class="mi-tooltips">
        <div class="top">
            <mi-tooltip placement="topLeft">
                <template v-slot:title>
                    <p>默认显示提示内容</p>
                    <p>5s后自动隐藏...</p>
                </template>
                <a class="btn">TopLeft</a>
            </mi-tooltip>
            <mi-tooltip :delay-show="0.5" :delay-hide="1">
                <template v-slot:title>
                    <p>延迟500ms显示</p>
                    <p>延迟1s隐藏</p>
                </template>
                <a class="btn">Top ( 延迟 )</a>
            </mi-tooltip>
            <mi-tooltip title="居右的气泡提示文本" :visible="visible" placement="topRight">
                <a class="btn">TopRight</a>
            </mi-tooltip>
        </div>
        <div class="middle">
            <div class="left">
                <mi-tooltip title="文本提示">
                    <a class="btn">LeftTop</a>
                </mi-tooltip>
                <mi-tooltip title="文本提示">
                    <a class="btn">Left</a>
                </mi-tooltip>
                <mi-tooltip title="文本提示">
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
            <mi-tooltip title="文本提示">
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
            }, 5000)
        }
    })
</script>