// 数据相关：Array和Map等
import _ from 'lodash-es';

/**
 * 对比扁平数组
 * @param {array} newValue 新值，默认值[]
 * @param {array} oldValue 旧值，默认值[]
 * @returns {object} 返回结果，格式: {adds:[], dels:[]}
 */
export function diffFlatArray(newValue = [], oldValue = []) {
    if (!newValue.length) {
        return {
            adds: [],
            dels: oldValue,
        };
    }
    const tNew = _.difference(newValue, oldValue); // 新增
    return {
        adds: tNew,
        dels: _.difference(oldValue, _.difference(newValue, tNew)), // 删除
    };
}

// 清空对象的value
export function initObjValue(obj) {
    return Object.keys(obj).reduce((result, key) => {
        if (obj[key] && Array.isArray(obj[key].slice())) {
            result[key] = [];
        } else {
            result[key] = '';
        }
        return result;
    }, {});
}

/**
 * 对象数组中按指定键值深度查找
 * @param {array} data 数据源，格式：[{xxx:1,yyy:2,zzz:[{xxx:1,yyy:2,zzz:[{...}]}]}]
 * @param {object}  {key:"",value:[] } 指定的key和value
 * @param {object} seed 遍历因子
 * @returns {object} 找到的对象，没找到返回{}
 */
export function findDeepByKey(data, { key, value }, seed) {
    const result = [];
    function tFindDeepByKey(dataT, checkKey) {
        for (let i = 0; i < dataT.length; i++) {
            const item = dataT[i];
            const tValue = item[key];
            const tData = item[seed];

            if (tValue === checkKey || (typeof tValue === 'object' && tValue[checkKey])) {
                result.push(item);

                // eslint-disable-next-line no-continue
                continue;
            }
            if (!_.isEmpty(tData)) {
                tFindDeepByKey(tData, checkKey);
            }
        }
    }
    value.forEach((val) => {
        tFindDeepByKey(data, val);
    });

    return result;
}

/**
 * 查找叶子结点
 * @param {array} arr 数据源，格式：[{xxx:1,yyy:2,zzz:[{xxx:1,yyy:2,zzz:[{...}]}]}]
 * @param {object} seed 遍历因子, 默认值：'data'
 * @returns {array} 叶子结点数组，格式:[{}]
 */
export function findLeafForMap(arr = [], seed = 'data') {
    // 选择对象片段
    let tArr = [];
    (function tFindData(arr) {
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i];
            if (Object.prototype.hasOwnProperty.call(item, seed)) {
                tFindData(item[seed]);
            } else {
                tArr.push(item);
            }
        }
    })(arr);
    return tArr;
}

/**
 * 从集合中获取指定的key的值，返回数组
 * @param {*} data 数据
 * @param {string} [key='id'] 指定key
 * @returns {array} 返回指定key的value集合 [xx,xxx]
 */
export function getValuesForMap(data = [], key = 'id') {
    if (_.isEmpty(data) || data === null) {
        return [];
    }
    return data.map((item) => {
        return item[key];
    });
}

/**
 * tree组件data组装
 * @param {array} arr 数据源，格式：[{xxx:1,yyy:2,zzz:[{xxx:1,yyy:2,zzz:[{...}]}]}]
 * @param {object} [keysMap={ id: 'key', name: 'label', data: 'children' }] 键值映射表，{原key: 目标key}
 * @param {object} [options={key:"",value:"", props:{}}] 操作项，扩展操作，用于筛选符合条件的子树
 * @returns 组装后的数组，格式:[{}], key由keysMap映射
 */
export function assembleData(
    arr = [],
    keysMap = { id: 'key', name: 'label', data: 'children' },
    options = { key: '', value: '', props: {}, seed: 'data' }
) {
    const tMapKeys = Object.keys(keysMap);
    const { key: optKey, value: optValue, props, seed } = options;
    // 是否扩展的开关
    let flag = false;
    // 选择对象片段
    let tArr = [];
    return (function tAssembleData(arr) {
        if (arr === null) {
            return [];
        }

        return arr.map((item) => {
            if (optKey && optValue) {
                if (item[optKey] === optValue) {
                    flag = true;
                }
            }

            // 获取满足options中key和value相等的子树
            if (item[optKey] === optValue) {
                (function tMapResult(result) {
                    return result.map((item) => {
                        tArr.push(item[optKey]);
                        const data = item[seed];
                        if (data && data.length) {
                            return tMapResult(data);
                        }
                        return item[optKey];
                    }, []);
                })([item]);
            }

            // 根据keysMap条件组合数据
            const tResult = tMapKeys.reduce((result, key) => {
                const tData = item[key];
                if (
                    key === seed &&
                    tData !== null &&
                    typeof tData === 'object' &&
                    Array.isArray(tData) &&
                    tData.length > 0
                ) {
                    result[keysMap[key]] = tAssembleData(tData);
                } else {
                    result[keysMap[key]] = item[key];
                }

                return result;
            }, {});

            // 对符合条件的树合并options中的props
            flag && tArr.includes(item[optKey]) && Object.assign(tResult, props);

            return tResult;
        });
    })(arr);
}

/**
 * 给arr对象集合绑定key，值为子项中对应的seed的key
 * @param {array} data 数据源，格式：[{xxx:1,yyy:2}]
 * @param {object} [keysMap={ value: 'key' }] 键值映射表，{原key: 目标key}
 * @returns 组装后的数组，格式:[{}]
 */
export function bindKeyForData(data, keysMap = { value: 'key' }) {
    if (data !== null && typeof data === 'object' && Array.isArray(data) && data.length > 0) {
        const tKey = Object.keys(keysMap)[0];
        data.forEach((item) => {
            item[keysMap[tKey]] = item[tKey];
        });
        return data;
    }
}

/**
 * 扁平对象key映射
 * @param {string} [prefix=''] 前缀
 * @param {*} [mapKeys=[]] 要映射的keys  ['id', 'name', 'code', 'pid']
 * @param {*} flatObj 操作对象
 * @returns 映射对象
 */
export function flatObjectMap(prefix = '', mapKeys = [], flatObj = {}) {
    if (mapKeys.length === 0) {
        return;
    }
    let tKeys = Object.keys(flatObj);
    if (tKeys.length === 0) {
        tKeys = mapKeys;
    }
    return tKeys.map((key) => {
        if (mapKeys.includes(key)) {
            return {
                [key]: `${this.prefix}${_.upperFirst(key)}`,
            };
        } else {
            return { [key]: key };
        }
    });
}

export function flatDataToArr(data = [], seed = 'data') {
    if (_.isEmpty(data)) {
        return [];
    }
    const result = [];
    (function tFlatData(data) {
        data.forEach((item) => {
            const tArr = item[seed];
            result.push(item);
            if (tArr !== null && !_.isEmpty(tArr)) {
                tFlatData(tArr);
            }
        });
    })(data);
    return result;
}

//无限级分类格式化数据，供筛选逻辑使用, 格式：{根id：[{子id:text}]，父id:[{子id:text}], 叶子id:{叶子id:text}}
export function flatDataToObj(data, key = 'id', seed = 'data') {
    let results = {};
    const mROOT = '0';
    (function tFlatData(data) {
        let r = [];
        data.forEach((item) => {
            r.push(item);
            results[item[key]] = item;
            const tArr = item[seed];
            if (tArr && tArr.length) {
                tFlatData(tArr);
            } else {
                return r;
            }
        });

        if (data[key]) {
            results[data[key]] = r;
        } else {
            results[mROOT] = r;
        }
    })(data);

    return results;
}

/**
 * 重命名扁平对象
 * @param {*} flatObj 操作对象
 * @param {string} [prefix=''] 前缀
 * @param {*} [renameKeys=[]] 要重命名的keys  ['id', 'name', 'code', 'pid']
 * @returns 重命名后的对象
 */
export function renameFlatObject(flatObj, prefix = '', renameKeys = []) {
    if (renameKeys.length === 0) {
        return;
    }
    const tKeys = Object.keys(flatObj);
    return tKeys.map((key) => {
        if (renameKeys.includes(key)) {
            return {
                [`${this.prefix}${_.upperFirst(key)}`]: flatObj[key],
            };
        } else {
            return { [key]: flatObj[key] };
        }
    });
}

// 分类阶层对应关系整理，格式：{子id:父id}
// export function dataRank(data, key="id") {
//     var rank = {};
//     data.forEach((item)=>{
//         const tKey = item[key];
//         const tVal = value;
//         if (Array.isArray(tVal)) {
//             tVal.forEach((item)=>{
//               rank[item.value + ""] = tKey;
//             });
//           }
//     });

//     return rank;
//   }

/**
 * @description 通过id获取其遗传基因链，顺序：[...,父id,当前id]
 * @param {*} data 源数据
 * @param {*} id id
 * @param {*} reverse 是否反序
 * @returns {array}
 */
export function getGenes(data, id, reverse = false) {
    let genes = [];
    const mROOT = '0';

    if (!_.isEmpty(data)) {
        (function tGetGenes(data, id) {
            _.each(data, (value, key) => {
                if (id === key) {
                    genes.push(Number(id));

                    if (id !== mROOT) {
                        tGetGenes(data, value);
                    }
                }
            });
        })(data, id);
    }

    if (reverse) {
        return genes;
    } else {
        return genes.reverse();
    }
}

/*** 以下为非通用方法 ***/
//根据传入的选中的ID，反查组织数据，返回对应的角色(树形的结构不一样，所以另外处理)
export function getInitRoleArry(idsArry, dataSource) {
    const newArray = [];
    idsArry.forEach((item) => {
        newArray.push(dataSource.find((it) => it.id === item));
    });
    return newArray;
}

//穿梭框返回的是：key,label
export function getInitArry(data) {
    const newPosArr = [];
    data.forEach((it) => {
        const obj = {};
        obj.id = it.key;
        obj.name = it.label;
        obj.isCheck = it.disabled ? '' : 'Y';
        newPosArr.push(obj);
    });
    return newPosArr;
}

//根据数组对象，返回取对应的ID，字符串拼接
// param:一维数组
export function initIdsStr(param) {
    if (!param) {
        return;
    }
    const newArry = [];
    param.forEach((item) => {
        newArry.push(item.id);
        if (item.data && item.data.length > 0) {
            initIdsStr(item.data);
        }
    });
    return newArry.join(',');
}
