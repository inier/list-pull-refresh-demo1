/**
 * @description 导航的类型，及不同类型的跳转处理
 * @class Navigater
 */
class Navigater {
    // 自定义路由表
    navigation = {
        _blank: {
            category: 'route100',
            desc: '新开方式跳转系统自带浏览器',
            target: '',
        },
    };

    /**
     * @description 根据type的内容查询导航类型及信息
     * @param {*}type 广告跳转类型
     * @returns 返回航类型及信息
     */
    queryNavByType = (type) => {
        return this.navigation[String(type)];
    };

    /**
     * @description 执行用户跳转逻辑
     * @param {string}routeType 用户跳转的类型
     * @param {*}history 内部路由
     * @param {string}routeUrl 用户跳转的地址信息
     * @param {string}title 用户跳转的页面title
     * @returns *
     */
    navigate(routeType, { history, routeUrl = '', title = '', token = '' }) {
        const routeInfo = this.queryNavByType(routeType);
        // 根据跳转类型，分发跳转
        switch (routeInfo.category) {
            case 'route1': {
                history.push(routeInfo.target + routeUrl);
                break;
            }
            case 'route2': {
                history.push(routeInfo.target);
                break;
            }
            case 'route3': {
                history.push(routeUrl);
                break;
            }
            case 'route100': {
                // 新开方式跳转系统浏览器
                if (!routeUrl) {
                    return false;
                }

                window.open(routeUrl, '_blank', 'location=no');
                break;
            }
            default: {
                console.log('请输入正确的跳转类型');
            }
        }
    }
}

export default new Navigater();
