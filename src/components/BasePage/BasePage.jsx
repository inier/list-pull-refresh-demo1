import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Prompt from '../Prompt';
import styles from './BasePage.module.scss';

class BasePage extends Component {
    render() {
        const { header, footer, children, prompt, style } = this.props;
        const isPrompt = prompt && Object.keys(prompt).length !== 0;
        return (
            <div className={styles.basePage} style={style}>
                {header}
                {children}
                {footer}
                {isPrompt && <Prompt {...prompt} />}
            </div>
        );
    }
}

BasePage.propTypes = {
    // header节点
    header: PropTypes.node,
    // footer节点
    footer: PropTypes.node,
    // 自定义的样式
    style: PropTypes.object,
    // 路由变化时是否弹出提示框
    prompt: PropTypes.object,
};
export default BasePage;
