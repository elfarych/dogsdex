
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/Index.vue') }
    ]
  },

  {
    path: '/farm',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'farm', component: () => import('pages/Farm') }
    ]
  },

  {
    path: '/nft',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'nft', component: () => import('pages/NFT') }
    ]
  },

  {
    path: '/cryptobox',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Cryptobox') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
