// 封装倒计时逻辑函数
// 返回formTime和start函数
import { ref, computed, onUnmounted } from 'vue'
import dayjs from 'dayjs'
export const useCountDown = () => {
    // 响应式未格式化初始时间
    const time = ref(0)
    // formatTime由time计算格式化后的时间
    const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
    // start函数传一个从起点时间开始倒计时
    const start = (current) => {
        time.value = current
        let timer = setInterval(() => {
            time.value--
        }, 1000)
    }
    // 组件销毁时清除定时器                    
    onUnmounted(() => {
        timer && clearInterval(timer)
    })
    return {
        formatTime,
        start,
    }
}