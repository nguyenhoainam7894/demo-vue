import AppLayout from "@/layouts/AppLayout";
const routes = [
    {
        path: '/cart',
        component: AppLayout,
        name: 'carts',
        meta: {
            title: 'Cart',
            icon: 'shopping-cart'
        },
        children: [
            {
                path: 'cartItem',
                component: () => import('./Cart'),
                name: 'carts',
                meta: {
                    title: 'Products List',
                }
            }
        ]
    }
]

export default routes;