import { App } from 'vue'
import { default as Tooltip } from './tooltip'

const install = (app: App) => {
    app.use(Tooltip)
    return app
}

export default {
    version: `${process.env.VERSION}`,
    install
}