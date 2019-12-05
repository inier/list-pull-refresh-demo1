// 设备或系统相关方法

// 获取设备userAgent
export const UA = navigator.userAgent.toLowerCase();

// 判断设备的类型是 android 或 iphone
export const getDeviceType = () => {
    if (UA.indexOf('iphone') !== -1) {
        return 'iphone';
    }
    return 'android';
};

// 获取ios版本号，如果不是ios返回""
export const getIOSVersion = () => {
    const ver = UA.match(/cpu iphone os (.*?) like mac os/);
    if (ver) {
        // 将版本信息中的_转换为.，如"11_4_1"转为"11.4.1"
        const tVer = ver[1].replace(/_/g, '.');
        console.log(`当前IOS系统版本为：${tVer}`);
        return tVer;
    } else {
        return '';
    }
};

/**
 * 根据UA判断是否为微信内置浏览器，包括微信和企业微信
 * 示例：iphone 6 plus中微信浏览器与企业微信浏览器截取的ua：
 * 企业微信UA："Mozilla/5.0 (iPhone; CPU iPhone OS 10_2 like Mac OS X) AppleWebKit/602.3.12 (KHTML, like Gecko) Mobile/14C92 wxwork/2.4.2 MicroMessenger/6.3.22 Language/zh"
 * 微信浏览器UA："Mozilla/5.0 (iPhone; CPU iPhone OS 10_2 like Mac OS X) AppleWebKit/602.3.12 (KHTML, like Gecko) Mobile/14C92 MicroMessenger/6.5.23 NetType/WIFI Language/zh_CN"
 * @returns {boolean} true/false
 */
export const isMicroMessenger = () => {
    const tUA = UA.match(/micromessenger/i);
    if (tUA && tUA.indexOf('micromessenger') > -1) {
        return true;
    } else {
        return false;
    }
};
