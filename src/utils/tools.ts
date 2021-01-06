import { Fragment, Comment, Text, cloneVNode } from 'vue'

const availablePrefixs = ['moz', 'ms', 'webkit']
class MiTools {
    /**
     * Whether it is a mobile phone.
     * @returns {boolean}
     */
    isMobile(): boolean {
        const agent = navigator.userAgent,
            agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
        let mobile = false
        for (let i = 0, len = agents.length; i < len; i++) {
            if (agent.indexOf(agents[i]) > 0) {
                mobile = true
                break
            }
        }
        return mobile
    }

    /**
     * Clone Node.
     * @param vNode 
     * @param nodeProps 
     * @param override 
     * @param mergeRef 
     */
    cloneElement(vNode: any, nodeProps = {}, override = true, mergeRef = false) {
        let elem = vNode
        if (Array.isArray(vNode)) {
            elem = this.filterEmpty(vNode)[0]
        }
        if (!elem) return null
        const node = cloneVNode(elem, nodeProps, mergeRef)
        node.props = override ? {...node.props, ...nodeProps} : node.props
        return node
    }

    /**
     * Whether the element is empty.
     * @param elem 
     */
    isEmptyElement(elem: any) {
        return (
            elem.type === Comment ||
            (elem.type === Fragment && elem.children.length === 0) ||
            (elem.type === Text && elem.children.trim() == '')
        )
    }

    /**
     * Whether the value is valid.
     * @param value 
     */
    isValid(value: any): boolean {
        return value !== undefined && value !== null && value !== ''
    }

    /**
     * Filter the empty element.
     * @param children 
     */
    filterEmpty(children = []) {
        const res = []
        children.forEach(child => {
            if (Array.isArray(child)) {
                res.push(...child)
            } else if (child.type === Fragment) {
                res.push(...child.children)
            } else {
                res.push(child)
            }
        })
        return res.filter(c => !this.isEmptyElement(c))
    }

    /**
     * Request Animation Polyfill.
     */
    requestAnimationFramePolyfill() {
        let lastTime = 0
        return function(callback: any) {
            const currTime = new Date().getTime()
            const timeToCall = Math.max(0, 16 - (currTime - lastTime))
            const id = window.setTimeout(function() {
                callback(currTime + timeToCall)
            }, timeToCall)
            lastTime = currTime + timeToCall
            return id
        }
    }

    /**
     * Get Request Animation Frame.
     */
    getRequestAnimationFrame() {
        if (typeof window === 'undefined') return () => {}
        if (window.requestAnimationFrame) return window.requestAnimationFrame.bind(window)
        const prefix = availablePrefixs.filter(key => `${key}RequestAnimationFrame` in window)[0]
        return prefix ? window[`${prefix}RequestAnimationFrame`] : this.requestAnimationFramePolyfill()
    }

    /**
     * Request Animation.
     * @param callback 
     * @param delay 
     */
    createRequestAnimationFrame(callback: any, delay: number) {
        const start = Date.now()
        const graf = this.getRequestAnimationFrame()
        const timeout = () => {
            if (Date.now() - start >= delay) callback.call()
            else frame.id = graf(timeout)
        }
        const frame = {
            id: graf(timeout)
        }
        return frame
    }

    /**
     * Cancel request animation.
     * @param id 
     */
    cancelRequestAnimationFrame(id: any) {
        if (typeof window === 'undefined') return null
        if (window.cancelAnimationFrame) return window.cancelAnimationFrame(id)
        const prefix = availablePrefixs.filter(
            key => `${key}CancelAnimationFrame` in window || `${key}CancelRequestAnimationFrame` in window
        )[0]
        return prefix ? (
                window[`${prefix}CancelAnimationFrame`] ||
                window[`${prefix}CancelRequestAnimationFrame`]
            ).call(this, id)
            : clearTimeout(id)
    }
}

export default new MiTools