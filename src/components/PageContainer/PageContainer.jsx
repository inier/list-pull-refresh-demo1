import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './PageContainer.module.scss';
/**
 * 页面主体容器，适用于需要底部按钮时包裹页面主体结构的页面，与BasePage组件组合使用，底部按钮独立于主体
 */
class PageContainer extends Component {
    render() {
        const { className, children } = this.props;
        return (
            <div className={`${styles.pageContainer} ${className}`}>
                {children}
            </div>
        );
    }
}
PageContainer.defaultProps = {
    className: '',
};
PageContainer.propTypes = {
    className: PropTypes.string,
};
export default PageContainer;
