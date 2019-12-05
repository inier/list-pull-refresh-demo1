/**
 * @description 初始化百度js
 */
import img from '../pages/dealer/img/marker.png';

class BDMap {
    constructor(renderId, zoom) {
        this.renderId = renderId;
        this.zoom = zoom;
        this.renderMap(renderId, zoom);
    }

    map;

    renderMap(id) {
        if (window.BMap) {
            this.map = new window.BMap.Map(id);
            // 禁用连续缩放效果。
            this.map.disableContinuousZoom();
            // 启用自动适应容器尺寸变化，默认启用
            this.map.enableAutoResize();
            // 禁用地图惯性拖拽。
            this.map.disableInertialDragging();
            this.map.setMaxZoom(18); // 移动端最大地图级别为18
        } else {
            const timer = setInterval(() => {
                if (window.BMap) {
                    this.map = new window.BMap.Map(id);
                    // 禁用连续缩放效果。
                    this.map.disableContinuousZoom();
                    // 启用自动适应容器尺寸变化，默认启用
                    this.map.enableAutoResize();
                    // 禁用地图惯性拖拽。
                    this.map.disableInertialDragging();
                    this.map.setMaxZoom(18); // 移动端最大地图级别为18
                    clearInterval(timer);
                }
            }, 100);
        }
    }

    // 城市名设置中心店
    renderCenterByName(name) {
        this.map.centerAndZoom(name, this.zoom);
    }

    // 经纬度设置中心点
    renderCenterByLngLat(lng, lat) {
        const point = new window.BMap.Point(lng, lat);
        this.map.centerAndZoom(point, this.zoom);
    }

    // 渲染点
    renderMarker(markers, clickMarker) {
        // this.map.clearOverlays();
        markers.forEach((marker) => {
            const markerPoint = new window.BMap.Point(marker.wgs[0].lng, marker.wgs[0].lat);
            const myIcon = new window.BMap.Icon(img, new window.BMap.Size(14, 20), {
                imageSize: new window.BMap.Size(14, 20),
                anchor: new window.BMap.Size(7, 10), // 指定定位位置
            });
            const markerRender = new window.BMap.Marker(markerPoint, {
                icon: myIcon,
            });

            markerRender.addEventListener('click', () => {
                typeof clickMarker === 'function' && clickMarker(marker);
            });
            this.map.addOverlay(markerRender);
        });
    }

    // 自定义点
    initMarker(markerPoint) {
        const myIcon = new window.BMap.Icon(img, new window.BMap.Size(14, 20), {
            imageSize: new window.BMap.Size(14, 20),
            anchor: new window.BMap.Size(7, 10), // 指定定位位置
        });
        const markerRender = new window.BMap.Marker(markerPoint, {
            icon: myIcon,
        });
        return markerRender;
    }
}

export default BDMap;
