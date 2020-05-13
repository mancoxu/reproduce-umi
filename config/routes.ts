import { IRoute } from '@umijs/types';

const Routes: IRoute[] = [
    { path: '/', redirect: '/app' },
    {
        path: '/app',
        component: '../layouts/BasicLayout',
        routes: [
            {
                path: 'portal',
                name: '数据门户',
                routes: [
                    {
                        path: '*',
                        name: '数据门户-View',
                        component: './Portal',
                    },
                ],
            },
            // 管理端
            {
                path: 'admin',
                name: '管理',
                component: '../layouts/BasicLayout',
                routes: [
                    {
                        path: 'data-portal',
                        name: '数据门户',
                        component: './Admin/DataPortal',
                    },
                    {
                        path: 'log-query',
                        name: '日志查询',
                        component: './Admin/LogQuery',
                    },
                ],
            },
            {
                component: './404',
            },
        ],
    },
    {
        component: './404',
    },
];

export default Routes;
