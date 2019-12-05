/**
 * 获取页面title
 * @param {string} pathname {pathname} 从路由获取的location对象中提取pathname
 * @param {array} routerData routerConfig集合
 * @returns {string} 页面title
 */
export function getPageTitle({ pathname }, routerData = []) {
    let title = '';
    const tItem = routerData.find((item) => {
        return item.path === pathname;
    });
    if (tItem) {
        return tItem.title;
    }
    return title;
}
