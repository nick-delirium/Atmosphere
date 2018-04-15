import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import News from './views/News.vue'
import COmap from './views/COmap.vue'
import NO2map from './views/NO2map.vue'
import NOmap from './views/NOmap.vue'
import SO2map from './views/SO2map.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/news',
      name: 'news',
      component: News
    },
    {
      path: '/COmap',
      name: 'comap',
      component: COmap
    },
    {
      path: '/NO2map',
      name: 'no2map',
      component: NO2map
    },
    {
      path: '/NOmap',
      name: 'nomap',
      component: NOmap
    },
    {
      path: '/SO2map',
      name: 'so2map',
      component: SO2map
    }
  ]
})
