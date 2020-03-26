export default {
    //单页面 page
    singular: true,
    antd: {},
    routes: [{
        path: '/',
        component: '../layout',
        routes: [{
            path: '/',
            component: './HelloWorld',
        }, {
            path:'puzzlecards',
            component:'puzzlecards'

        },{
            path:'list',
            component:'./list'
        },
        {
            path: '/dashboard',
            routes: [{
                    path: 'analysis',
                    component: 'Dashboard/Analysis'
                },
                {
                    path: 'monitor',
                    component: 'Dashboard/Monitor'
                }, {
                    path: 'workPlace',
                    component: 'Dashboard/WorkPlace'
                }
            ]

        }],
    }],
    // proxy: {
    //     '/dev': {
    //       target: 'http://jsonplaceholder.typicode.com/posts',
    //       changeOrigin: true,
    //       pathRewrite: { "^/dev": "" }
    //     },
    //   }
}