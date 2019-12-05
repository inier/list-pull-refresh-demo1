// 基础方法集
import _ from 'lodash-es';

/**
 * get value of name from cookie
 * @param {String} name cookie name
 * @returns {*} 指定name的cookie
 */
export function getCookie(name) {
    const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
    const arr = document.cookie.match(reg);
    if (arr) {
        return unescape(arr[2]);
    }
    return null;
}

/**
 * 字母前加前缀
 * @param {string} str 操作数
 * @param {string} [prefix='btn']  前缀，默认为'btn'
 * @returns 操作后值
 */
export function addPrefix(str, prefix = 'btn') {
    const arr = _.upperFirst(str.trim()).split(/\s+/);
    const tResult = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        tResult.push(`${prefix}${arr[i]}`);
    }
    return tResult.join(' ');
}

/**
 * @description  转义html标签
 * @param {*} str 字符串
 * @returns 转以后的字符串
 */
export function escapeHTML(str) {
    return `${str}`
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}
