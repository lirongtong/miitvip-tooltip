import { App } from 'vue'
import { version } from '../package.json'
import { default as Tooltip } from './tooltip'

const install = (app: App) => {
    app.use(Tooltip)
    return app
}

export { Tooltip }

export default {
    version,
    install
}