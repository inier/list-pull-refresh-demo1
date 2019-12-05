import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Radio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            acIndex: props.initIndex || 0,
        };
    }

    /**
     * 点击单个radio 回调
     * @param {*} e dom对象
     * @memberof Radio
     */
    handleClick = (e) => {
        const { onRadioClick } = this.props;
        const info = e.currentTarget.getAttribute('data-info');
        const index = e.currentTarget.getAttribute('data-index');
        // 刷新选中项
        this.setState({
            acIndex: Number(index),
        });
        onRadioClick && onRadioClick(JSON.parse(info));
    };

    /**
     *初始化radio
     *
     * @param {*} d 初始化数据
     * @returns
     * @memberof Radio
     */
    initRadios({ data, radioClassName, activeClass }) {
        if (data && data.length) {
            let tActiveClass = '';
            const { acIndex } = this.state;
            return data.map((item, idx) => {
                tActiveClass = idx === acIndex ? activeClass : '';
                return (
                    <div
                        onClick={this.handleClick}
                        key={item.id}
                        className={`${radioClassName} ${tActiveClass}`}
                        data-info={JSON.stringify(item)}
                        data-index={idx}
                    >
                        {item.text}
                    </div>
                );
            });
        }
    }

    render() {
        const { pClassName, ...restProps } = this.props;
        return <div className={pClassName}>{this.initRadios(restProps)}</div>;
    }
}

export default Radio;

Radio.defaultProps = {
    initIndex: 0,
};

Radio.propTypes = {
    // 组件最外层盒子类名
    pClassName: PropTypes.string,
    // 单选框，普通样式
    radioClassName: PropTypes.string,
    // 单选框，选中样式
    activeClass: PropTypes.string,
    // 渲染 radio数据
    data: PropTypes.array,
    // 默认选中项
    initIndex: PropTypes.number,
    // 点击回调
    onRadioClick: PropTypes.func,
};
