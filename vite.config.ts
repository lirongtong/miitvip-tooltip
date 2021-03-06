import path from 'path'
const resolve = (dir: string) => path.join(__dirname, dir)

const config = {
    alias: {
        '/@/': resolve('example'),
        '/@src/': resolve('src'),
        'makeit-tooltip': '/@src/index.ts',
        'makeit-tooltip/style': '/@src/style.ts'
    },
    cssPreprocessOptions: {
        less: {
            javascriptEnabled: true
        }
    },
    optimizeDeps: {
        include: ['vue', 'axios']
    },
    proxy: {
        '/v1': {
            target: 'http://local-account.makeit.vip',
            changeOrigin: true
        }
    }
}
module.exports = config