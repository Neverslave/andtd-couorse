

export default {
    //单页面 page
    singular: true,
    antd: {

    },
    routes: [{
        path: '/',
        component: '../layout',
        routes: [{
            path: '/',
            component: './HelloWorld',
        }]
    }],
}
