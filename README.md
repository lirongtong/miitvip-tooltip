<p align="center">
    <a href="https://admin.makeit.vip/">
        <img width="200" src="https://file.makeit.vip/MIIT/M00/00/00/ajRkHV_pUyOALE2LAAAtlj6Tt_s370.png">
    </a>
</p>

<h1 align="center" color="green">
    <a href="https://component.makeit.vip/captcha" target="_blank" style="color: #41b995">
        Makeit Tooltip
    </a>
</h1>

<div align="center">
基于 Vue3.0 + Vite 开发的气泡浮层，不承载复杂文本，可以替代系统默认的 title 显示的组件。

[![npm package](https://img.shields.io/npm/v/makeit-tooltip.svg?style=flat-square)](https://www.npmjs.org/package/makeit-tooltip)
[![npm_downloads](http://img.shields.io/npm/dm/makeit-tooltip.svg?style=flat-square)](http://www.npmtrends.com/makeit-tooltip)
![MIT](https://img.shields.io/badge/license-MIT-ff69b4.svg)
![webpack](https://img.shields.io/badge/webpack-5.3.2-orange.svg)
![vue](https://img.shields.io/badge/vue-3.0.4-green.svg)
![vite](https://img.shields.io/badge/vite-1.0.0-yellow.svg)
</div>

## 关于

> Makeit Tooltip 气泡浮层组件，基于 Vue3.0 + Vite + JSX 开发，不承载复杂的文本信息，可以替代系统默认的 title 显示。

## 安装

```bash
npm i makeit-tooltip
```

## 使用
```ts
import { createApp } from 'vue'
import MakeitTooltip from 'makeit-tooltip'
import 'makeit-tooltip/dist/tooltip.min.css'
import App from './app.vue'

const app = createApp(App)
app.use(MakeitTooltip)
app.mount('#app')
```

## 示例
```vue
<template>
    <mi-tooltip></mi-tooltip>
</template>
```

## 更多
> 更多定制化内容及使用请查看在线示例：[https://component.makeit.vip/tooltip](https://component.makeit.vip/tooltip)