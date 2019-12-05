import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';
import { isString } from '../../utils';
import Icon from '../Icon';

const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);

// 两个中文字符间自动插入间距
function insertSpace(child) {
    if (isString(child.type) && isTwoCNChar(child.props.children)) {
        return React.cloneElement(
            child,
            {},
            child.props.children.split('').join(' ')
        );
    }
    if (isString(child)) {
        let tChild = child;
        if (isTwoCNChar(child)) {
            tChild = child.split('').join(' ');
        }
        return <span>{tChild}</span>;
    }
    return child;
}

const Button = ({
    prefixCls,
    className,
    children,
    type,
    size,
    full,
    block,
    line,
    noRadius,
    icon,
    loading,
    value,
    active,
    disabled,
    activeStyle,
    activeClassName,
    onClick,
    ...restProps
}) => {
    const iconType = loading ? 'loading' : icon;
    const wrapCls = classnames(prefixCls, className, {
        [`${prefixCls}-${size}`]: size,
        [`${prefixCls}-${type}`]: type,
        [`${prefixCls}-full`]: full,
        [`${prefixCls}-block`]: block,
        [`${prefixCls}-radius`]: !noRadius,
        [`${prefixCls}-loading`]: loading,
        [`${prefixCls}-icon`]: !!iconType,
        [`line`]: type && line,
        [`active`]: active,
        [`disabled`]: disabled,
    });

    const kids = React.Children.map(children, insertSpace);

    // 图标处理
    let iconEl;
    if (typeof iconType === 'string') {
        iconEl = (
            <Icon
                aria-hidden="true"
                name={iconType}
                size={size}
                className={`${prefixCls}-icon`}
            />
        );
    } else if (iconType) {
        const rawCls = iconType.props && iconType.props.className;
        const cls = classnames('icon', `${prefixCls}-icon`, size);
        iconEl = React.cloneElement(iconType, {
            className: rawCls ? `${rawCls} ${cls}` : cls,
        });
    }

    // 进度按钮
    if (type === 'progress') {
        return (
            <button
                className={wrapCls}
                {...restProps}
                onClick={disabled ? undefined : onClick}
                aria-disabled={disabled}
                data-prog={value || 50}
            >
                {children}
            </button>
        );
    }

    return (
        <button
            className={wrapCls}
            {...restProps}
            onClick={disabled ? undefined : onClick}
            aria-disabled={disabled}
        >
            {iconEl}
            {kids}
        </button>
    );
};

Button.defaultProps = {
    prefixCls: 'btn',
    type: '',
    size: 'md',
    noRadius: false,
    disabled: false,
    loading: false,
};

Button.propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.oneOf([
        '',
        'primary',
        'secondary',
        'success',
        'warning',
        'error',
        'important',
        'mono',
        'link',
        'progress',
    ]),
    size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
    full: PropTypes.bool,
    block: PropTypes.bool,
    line: PropTypes.bool,
    noRadius: PropTypes.bool,
    loading: PropTypes.bool,
    icon: PropTypes.string || PropTypes.node,
    active: PropTypes.bool,
    activeStyle: PropTypes.object,
    activeClassName: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

export default Button;
