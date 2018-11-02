/* global requirejs, require */
/**
 * app.js
 *
 * Distributed under terms of the MIT license.
 */

requirejs.config({
    baseUrl: './',
    paths: {
        // "Vue": "https://cdnjs.cloudflare.com/ajax/libs/vue/2.3.4/vue.min",
        "Vue": "lib/vue.min",
        "vue": "lib/vue",
        "iv": "lib/require-vuejs", //换输出的
        "vue-router": "lib/vue-router.min",
        "iview": "lib/iview.min",
        // es6 to es5
        es6: '...path_to_bower/requirejs-babel/es6',
        babel: '...path_to_bower/requirejs-babel/babel-5.8.22.min'
    },
    shim: {
        "Vue": {
            "exports": "Vue"
        },
        "iview": {
            deps: ["vue"]
        }
    }
});

require(["Vue", "vue-router", "iview"], function (Vue, VueRouter, iview) {
    Vue.use(VueRouter);
    // console.log(Vue);
    // console.log(VueRouter)
    console.log(iview);
    Vue.use(iview)
    var asyncComp = function (componentName) {
        return function (resolve) {
            require([componentName], resolve);
        };
    };

    var router = new VueRouter({
        routes: [{
                path: "/",
                component: asyncComp("iv!/view/home")
            },
            {
                path: "/home",
                component: asyncComp("iv!/view/home")
            },
            {
                path: "/inner",
                component: asyncComp("iv!/view/inner_template")
            },
            {
                path: "/html",
                component: asyncComp("iv!/view/component.html")
            },
            {
                path: "/vue",
                component: asyncComp("iv!/view/component")
            },
            {
                path: "/async",
                component: asyncComp("iv!/view/async")
            },
            {
                path: "/iv",
                component: asyncComp("iv!/view/iview")
            },
        ]
    });

    new Vue({
        data: {
            started: new Date(),
            visible: false
        },
        router: router,
        el: "#app",
        methods: {
            show: function () {
                this.visible = true;
            }
        }
    });
});