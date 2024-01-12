import ImageView from './ImageView/index.vue'
import XtuSku from './XtuSku/index.vue'

export const componentPlugin = {
    install(app){
        app.component('ImageView',ImageView)
        app.component('XtuSku',XtuSku)
    }
}