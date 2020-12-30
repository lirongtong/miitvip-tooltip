import { createApp } from 'vue'
import MakeitTooltip from 'makeit-tooltip'
import App from './app.vue'
import 'makeit-tooltip/style'
import './index.less'

const app = createApp(App)
app.use(MakeitTooltip)
app.mount('#app')