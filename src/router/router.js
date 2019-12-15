import Vue from 'vue'
import Router from 'vue-router'

import baidumap from '../components/baidumap'
Vue.use(Router)


export default new Router({
    routes :[
        {
            path:'/map',
            name:'baidumap',
            component:baidumap
        }
    ]
})