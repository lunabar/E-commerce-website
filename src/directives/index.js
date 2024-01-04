// 定义懒加载
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
    install(app){
        app.directive('img-lazy', {
            mounted(el, binding){
                // el为自定义指令绑定的dom节点，这里为<img ````>
                // binding.value绑定的是自定义指令的值(指令等于后面的表达式的值),这里为item.picture 图片的地址
                const { stop } = useIntersectionObserver(
                    el,
                    ([{ isIntersecting }]) => {
                      console.log(isIntersecting)
                    //   进入视口
                      if(isIntersecting){
                        el.src = binding.value
                        // useIntersectionObserver对于元素的监听是一直存在的，图片第一次加载完后无需再继续监听，浪费内存
                        stop()
                      }
                       
                    },
                  )
            }
        })
    }
}