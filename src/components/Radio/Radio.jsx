import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import styles from './Radio.module.scss';

const Radio = (
    { children, className = '', style = {}, value, index, defaultChecked, active, ...restProps },
    // eslint-disable-next-line comma-dangle
    { radioGroup }
) => {
    const { name, selectedValue, onChange, checker, noIcon, iconType, ...radioGroupRestProps } = radioGroup;

    const radioId = `${name}-${value}`;
    const optional = {};
    let activeStyle = '';

    if (selectedValue !== undefined) {
        if (String(value) === String(selectedValue) || (checker && checker(value))) {
            optional.checked = true;
            activeStyle = 'active';
        }
    }

    if (typeof onChange === 'function') {
        optional.onChange = (e) => {
            const { index: tIndex } = e.currentTarget.dataset;
            onChange.call(null, value, tIndex);
        };
    }

    function handleClick(e){        
        if(selectedValue === e.currentTarget.dataset.value){
            onChange.call(null, "", undefined);
        }
    }
    return (
        <label
            htmlFor={radioId}
            className={`${styles.radioItem} ${className} ${styles[activeStyle] || ''} ${styles[iconType] || ''}`}
            style={style}
            onClick={(e)=>{handleClick(e)}}
            data-value={value}
        >
            <input
                {...restProps}
                id={radioId}
                type="radio"
                name={name}
                data-index={index}
                checked={false}
                aria-checked={optional.checked}
                {...optional}
                hidden
            />
            {!noIcon && (
                <div className={styles.radioChecker}>
                    <RadioChecker checked={active || optional.checked} active={activeStyle} {...radioGroupRestProps} />
                </div>
            )}
            {children}
        </label>
    );
};

const RadioChecker = ({
    checked,
    active,
    icon,
    iconActive,
    iconName,
    iconNameActive,
    iconSize,
    iconClassName,
    iconStyle,
}) => {
    if (icon && iconActive) {
        return <React.Fragment>{checked ? iconActive : icon}</React.Fragment>;
    } else if (iconNameActive) {
        return (
            <Icon
                type={checked ? iconNameActive : iconName}
                size={iconSize}
                className={`${styles.radioIcon} ${iconClassName} ${active}`}
                style={iconStyle}
            />
        );
    }

    return (
        <Icon
            key={checked}
            type={iconName}
            size={iconSize}
            className={`${styles.radioIcon} ${styles.single} ${iconClassName} ${active}`}
            style={iconStyle}
        />
    );
};

Radio.contextTypes = {
    radioGroup: PropTypes.object,
};

Radio.propTypes = {
    // 当前Radio的value值
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
    // 当前Radio值在源数据列表中的索引
    index: PropTypes.number,
    // 是否禁用，默认false
    disabled: PropTypes.bool,
    // 自定义样式class名称
    className: PropTypes.string,
    // 自定义样式内联
    style: PropTypes.object,
};

Radio.defaultProps = {
    index: undefined,
    disabled: false,
    className: '',
    style: null,
};

export default Radio;
