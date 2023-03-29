import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  const localRoutes: RouteRecordRaw[] = []
  const files: Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    {
      eager: true,
    }
  )
  // 获取所有module并添加
  for (const file in files) {
    const module = files[file]
    localRoutes.push(module.default)
  }

  return localRoutes
}

export let firstMenu: any = null
export function mapMenusToRoutes(userMenus) {
  const localRoutes = loadLocalRoutes()

  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        // 外层路由
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        // 内层路由
        routes.push(route)
      }

      if (!firstMenu && route) firstMenu = submenu
    }
  }
  return routes
}

/**
 * 根据路径匹配需要显示的菜单
 * @param path
 * @param userMenus
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}

interface IBreadcrumbs {
  name: string
  path: string
}
export function mapPathToBreadcrumbs(
  path: string,
  userMenus: any[]
): IBreadcrumbs[] {
  const breadcrumbs: IBreadcrumbs[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}
