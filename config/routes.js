export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    name: 'ctpc.job-list',
    icon: 'table',
    path: '/jobs',
    component: './JobList/JobPage',
  },
  {
    path: '/runlist',
    name: 'ctpc.runlist',
    icon: 'crown',
    component: './JobBuildList/JobBuildPage',
    routes: [
      {
        path: '/runlist/itest',
        name: 'itest',
        icon: 'smile',
        component: './JobBuildList/JobBuildPage',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
