
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('pages/Login.vue'),
    name: 'login'
  },
  {
    path: '/editProfile',
    component: () => import('layouts/PageLayout.vue'),
    children: [
      { path: '', component: () => import('pages/EditProfile.vue'), name:'editProfile' }
    ],
  },
  {
    path: '/myAsset',
    component: () => import('layouts/PageLayout.vue'),
    children: [
      { path: '', component: () => import('pages/MyAsset.vue'), name:'myAsset' }
    ],
  },
  {
    path: '/admin',
    component: () => import('layouts/PageLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Admin.vue'), name:'admin' }
    ],
  },
  {
    path: '/dictionary',
    component: () => import('layouts/PageLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Dictionary.vue'), name:'dictionary' }
    ],
  },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
