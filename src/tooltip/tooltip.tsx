import { defineComponent, Teleport, Transition, VNode, vShow, withDirectives } from 'vue'
import PropTypes, { getSlot, tuple, getEvents, getSlotContent } from '../utils/props'
import tools from '../utils/tools'

export default defineComponent({
    name: 'MiTooltip',
    inheritAttrs: false,
    props: {
        title: PropTypes.any,
        visible: PropTypes.bool,
        placement: PropTypes.oneOf(
            tuple(
                'top', 'topLeft', 'topRight', 'top-left', 'top-right',
                'left', 'leftTop', 'leftBottom', 'left-top', 'left-bottom',
                'bottom', 'bottomLeft', 'bottomRight', 'bottom-left', 'bottom-right',
                'right', 'rightTop', 'rightBottom', 'right-top', 'right-bottom'
            )
        ).def('top'),
        trigger: PropTypes.oneOf(
            tuple(
                'hover', 'click',
                'focus', 'contextmenu'
            )
        ).def('hover'),
        className: PropTypes.string,
        forceRender: PropTypes.bool.def(false),
        delayShow: PropTypes.number.def(0),
        delayHide: PropTypes.number.def(0),
        autoAdjust: PropTypes.bool.def(true),
        container: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.object]),
        destroy: PropTypes.bool.def(false)
    },
    watch: {
        visible(val: boolean) {
            this.show = val
        }
    },
    data() {
        return {
            id: `mi-${tools.uid()}`,
            prefixCls: 'mi-tooltip',
            originEvents: {},
            show: this.$props.visible,
            position: {},
            _container: null,
            _component: null
        }
    },
    methods: {
        getContainer() {
            const type = typeof this.container
            if (type === 'function') return this.container()
            if (type === 'string') {
                let temp = this.container
                if (temp.indexOf('#') === -1) temp = `#${temp}`
                return document.querySelector(temp)
            }
            if (
                type === 'object' &&
                this.container instanceof window.HTMLElement
            ) return this.container
            return document.body
        },
        createContainer() {
            this._container = this.getContainer()
            this.$forceUpdate()
        },
        removeContainer() {
            this._container = null
            this._component = null
        },
        saveContainer(elem: any) {
            this._component = elem
        },
        onMouseEnter(e: any) {
            this.fireEvents('onMouseEnter', e)
            this.delayPopupVisible(true, this.delayShow, e)
        },
        onMouseLeave(e: any) {
            this.fireEvents('onMouseLeave', e)
            this.delayPopupVisible(false, this.delayHide)
        },
        fireEvents(type: string, e: any) {
            if (this.originEvents[type]) this.originEvents[type](e)
            const event = this.$props[type] || this.$attrs[type]
            if (event) event(e)
        },
        popupVisible(popupVisible: boolean, event: any) {
            this.clearDelayTimer()
            this.show = popupVisible
            if (event) {
                this.$nextTick(() => {
                    const elem = this.$refs[`${this.prefixCls}-content`]
                    const width = elem.offsetWidth
                    const height = elem.offsetHeight
                    const target = event.target
                    const targetWidth = target.offsetWidth
                    const halfWidth = Math.round(targetWidth / 2 * 100) / 100
                    const offsetX = event.offsetX
                    const offsetY = event.offsetY
                    let x = event.pageX + (halfWidth - offsetX) - (Math.round(width / 2 * 100) / 100)
                    let y = event.pageY - offsetY - height - 16
                    switch (this.placement) {
                        case 'topLeft':
                        case 'top-left':
                            x = event.pageX - offsetX
                            break;
                        case 'topRight':
                        case 'top-right':
                            x = event.pageX + (targetWidth - offsetX) - width
                            break;
                    }
                    this.position = {x, y}
                })
            }
        },
        delayPopupVisible(visible: boolean, time: number, event: any) {
            const delay = time * 1000
            this.clearDelayTimer()
            if (delay) {
                this.delayTimer = tools.createRequestAnimationFrame(() => {
                    this.popupVisible(visible, event)
                    this.clearDelayTimer()
                }, delay)
            } else this.popupVisible(visible, event)
        },
        clearDelayTimer() {
            if (this.delayTimer) {
                tools.cancelRequestAnimationFrame(this.delayTimer)
                this.delayTimer = null
            }
        }
    },
    beforeUnmount() {
        this.removeContainer()
    },
    mounted() {
        this.createContainer()
        if (this.forceRender || this.show) {
            const elem = document.getElementById(this.id)
            if (elem) {
                const elemWidth = elem.offsetWidth
                const position = {
                    x: elem.offsetLeft,
                    y: elem.offsetTop
                }
                this.$nextTick(() => {
                    const content = this.$refs[`${this.prefixCls}-content`]
                    const width = content.offsetWidth
                    const height = content.offsetHeight
                    let x = position.x - (Math.round((width - elemWidth) / 2 * 100) / 100)
                    let y = position.y - (height + 16)
                    switch (this.placement) {
                        case 'topLeft':
                        case 'top-left':
                            x = position.x
                            break;
                        case 'topRight':
                        case 'top-right':
                            x = position.x + elemWidth - width
                            break;
                    }
                    this.position = {x, y}
                })
            }
        }
    },
    render() {
        const children = tools.filterEmpty(getSlot(this))
        const child = children[0]
        this.originEvents = getEvents(child)
        const newChildProps = {key: 'trigger', id: this.id} as any
        switch (this.trigger) {
            case 'hover':
                newChildProps.onMouseEnter = this.onMouseEnter
                newChildProps.onMouseLeave = this.onMouseLeave
                break;
            case 'click':
                newChildProps.onClick = () => console.log('click')
                newChildProps.onMouseLeave = () => console.log('leave')
                break;
            case 'focus':
                break;
            case 'contextmenu':
                break;
        }
        const newChild = tools.cloneElement(child, newChildProps)
        let teleport: any
        if (this._container) {
            if (this.show || this.forceRender || this._component) {
                const style = {
                    left: `${this.position.x}px`,
                    top: `${this.position.y}px`
                }
                const title = <div>{ getSlotContent(this, 'title') }</div>
                teleport = (
                    <Teleport to={this._container} ref={this.saveContainer}>
                        <div class={this.prefixCls + `${this.className ? ` ${this.className}` : ''}`} ref={this.prefixCls}>
                            <Transition key="tooltip" name="mi-fade" appear>
                                { () => withDirectives((
                                    <div class={`${this.prefixCls}-${this.placement}`} style={this._component ? style : null}>
                                        <div class={`${this.prefixCls}-content`} ref={`${this.prefixCls}-content`}>
                                            <div class={`${this.prefixCls}-arrow`}></div>
                                            <div class={`${this.prefixCls}-inner`} role="tooltip">
                                                { title }
                                            </div>
                                        </div>
                                    </div>
                                ) as VNode, [[vShow, this.show]]) }
                            </Transition>
                        </div>
                    </Teleport>
                )
            }
        }
        return [teleport, newChild]
    }
})