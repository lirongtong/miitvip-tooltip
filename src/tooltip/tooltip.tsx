import { defineComponent, Teleport } from 'vue'
import PropTypes, { getSlot, tuple, getEvents } from '../utils/props'
import tools from '../utils/tools'

export default defineComponent({
    name: 'MiTooltip',
    inheritAttrs: false,
    props: {
        title: PropTypes.any.isRequired,
        visible: PropTypes.bool,
        placement: PropTypes.oneOf(
            tuple(
                'top', 'topLeft', 'topRight',
                'left', 'leftTop', 'leftBottom',
                'bottom', 'bottomLeft', 'bottomRight',
                'right', 'rightTop', 'rightBottom'
            )
        ).def('top'),
        trigger: PropTypes.oneOf(
            tuple(
                'hover', 'click',
                'focus', 'contextmenu'
            )
        ).def('hover'),
        forceRender: PropTypes.bool.def(false),
        delayShow: PropTypes.number.def(0),
        delayHide: PropTypes.number.def(0),
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
            prefixCls: 'mi-tooltip',
            originEvents: {},
            show: this.$props.visible,
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
            this.delayPopupVisible(true, this.delayShow, this.delayShow ? null : e)
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
            if (this.show || this.forceRender || this._component) {
                return (
                    <Teleport to={this._container} ref={this.saveContainer}>
                        <div class={this.prefixCls} ref={this.prefixCls}></div>
                    </Teleport>
                )
            }
            return null
        },
        delayPopupVisible(visible: boolean, time: number, event: any) {
            const delay = time * 1000
            this.clearDelayTimer()
            if (delay) {
                const point = event ? {x: event.pageX, y: event.pageY} : null
                this.delayTimer = tools.createRequestAnimationFrame(() => {
                    this.popupVisible(visible, point)
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
    },
    render() {
        const children = tools.filterEmpty(getSlot(this))
        const child = children[0]
        this.originEvents = getEvents(child)
        const newChildProps = {key: 'trigger'} as any
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
        return tools.cloneElement(child, newChildProps)
    }
})