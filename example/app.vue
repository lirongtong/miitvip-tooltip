<template>
    <div class="mi-tooltips">
        <div class="top">
            <mi-tooltip title="文本提示">
                <a class="btn">TopLeft</a>
            </mi-tooltip>
            <mi-tooltip title="文本提示">
                <a class="btn">Top</a>
            </mi-tooltip>
            <mi-tooltip title="文本提示">
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
    export default defineComponent({})
</script>