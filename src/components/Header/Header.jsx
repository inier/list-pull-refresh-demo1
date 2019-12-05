import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import styles from './Header.module.scss';

const tArrow = (onLeftClick) => (
    <div onClick={onLeftClick}>
        <Icon type="ChevronLeft" style={{ fontSize: '23px' }} />
    </div>
);

const Header = ({
    title,
    noBack,
    onLeftClick,
    rightContent,
    className,
    extra,
}) => {
    return (
        <header className={`${styles.header} h1 border-b ${className}`}>
            <div className={styles.leftContent}>
                {!noBack && tArrow(onLeftClick)}
            </div>
            <div className={styles.content}>
                {extra || <span className={styles.title}>{title}</span>}
            </div>
            <div className={styles.rightContent}>{rightContent}</div>
        </header>
    );
};

Header.defaultProps = {
    className: '',
    title: '标题',
};
Header.propTypes = {
    className: PropTypes.string,
    // Header中间的标题
    title: PropTypes.string,
    // header中间title替代节点
    extra: PropTypes.node,
    // 是否显示左侧返回
    noBack: PropTypes.bool,
    // 左边返回按钮的回调
    onLeftClick: PropTypes.func,
    // 右边的内容区域
    rightContent: PropTypes.node,
};
export default Header;
