export default [
    {
        path: '/user',
        layout: false,
        component: '@/pages/user/login',
        routes: [
            {
                path: '/user',
                redirect: '/user/login',
            },
            {
                name: '登录',
                path: '/user/login',
                component: './user/login/login',
            },
            {
                name: '注册',
                path: '/user/register',
                component: './user/register',
            },
            {
                name: '忘记密码',
                path: '/user/forget-pwd',
                component: './user/forgetPwd',
            }
        ],
    },
    {
        name: '个人信息',
        path: '/personal',
        icon: 'UserOutlined',
        component: './personalInfo',
    },
    {
        name: '团队信息',
        path: '/team',
        icon: 'TeamOutlined',
        routes: [
            {
                path: '/team/basic',
                name: '基本信息',
                component: '@/pages/teamInfo/basic',
            },
            {
                path: '/team/accounts',
                name: '账号管理',
                component: '@/pages/teamInfo/accounts',
            }
        ]
    },
    {
        path: '/',
        redirect: '/personal',
    },
    // {
    //     name: ' CRUD 示例',
    //     path: '/table',
    //     component: './Table',
    // },
];
