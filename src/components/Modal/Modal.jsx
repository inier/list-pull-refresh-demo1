import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Button from '../Button';
import CloseIcon from './CloseIcon';
import './Modal.scss';

function checkProps(prop, def) {
    if (typeof prop === 'undefined' || prop === true) {
        return def;
    }
    if (prop && typeof prop === 'string') {
        return prop;
    }
}

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: !!(props.show || typeof props.show === 'undefined'), // 是否确认后返回 true为确认后返回
        };
        // 根节点下创建一个div节点
        this.container = document.createElement('div');
        props.className && (this.container.className = props.className);
        document.body.appendChild(this.container);
    }

    componentWillUnmount() {
        document.body.removeChild(this.container);
    }

    handleCancel = (e) => {
        const { onCancel } = this.props;
        this.setState({
            isShow: false,
        });
        onCancel && onCancel();
    };

    handleDone = (e) => {
        this.setState({
            isShow: false,
        });
        const { onDone } = this.props;
        onDone && onDone();
    };

    render() {
        const {
            type = 'modal',
            prefixCls,
            title,
            content,
            cancelBtnText,
            doneBtnText,
            children,
        } = this.props;
        const { isShow } = this.state;
        const cancelTxt = checkProps(cancelBtnText, '取消');
        const doneTxt = checkProps(doneBtnText, '确定');
        const tModalType = type === 'layer' ? 'layer' : 'dialog';
        const hasMask = !(type === 'alert');
        const tContent = (
            <div className={`${prefixCls} ${isShow ? 'show' : ''}`}>
                {hasMask && (
                    <div
                        className={`${prefixCls}-mask`}
                        onClick={this.handleCancel}
                    />
                )}
                <div className={`${prefixCls}-content ${tModalType}`}>
                    <div className={`${prefixCls}-header border-b`}>
                        <span className={`nowrap ${prefixCls}-title`}>
                            {title || '标题'}
                        </span>
                    </div>
                    {
                        <div className={`${prefixCls}-body`}>
                            {content || children || '暂无内容'}
                        </div>
                    }
                    {type !== 'layer' && (
                        <div className={`${prefixCls}-footer border-t`}>
                            <div className="btnWrap btn-group">
                                {hasMask && cancelTxt && (
                                    <Button
                                        size="xs"
                                        onClick={this.handleCancel}
                                    >
                                        {cancelTxt}
                                    </Button>
                                )}
                                {doneTxt && (
                                    <Button
                                        size="xs"
                                        type="primary"
                                        onClick={this.handleDone}
                                    >
                                        {doneTxt}
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                    {hasMask && (
                        <span className={`${prefixCls}-closeIcon`}>
                            <CloseIcon
                                size="lg"
                                handleClick={this.handleCancel}
                            />
                        </span>
                    )}
                </div>
            </div>
        );

        return ReactDOM.createPortal(tContent, this.container);
    }
}
Modal.defaultProps = {
    prefixCls: 'modal',
};
Modal.propTypes = {
    prefixCls: PropTypes.oneOf(['alert', 'modal', 'layer']),
    // 弹出框标题，默认值：“”
    title: PropTypes.string,
    type: PropTypes.string,
    // 初始显示状态
    show: PropTypes.bool,
    // 弹出框正文内容，默认值：“是否立即返回？”
    content: PropTypes.string,
    // 取消按钮文字，默认值：“取消”
    cancelBtnText: PropTypes.string,
    // 确定按钮文字，默认值：“确定”
    doneBtnText: PropTypes.string,
    // 取消操作回调
    onCancel: PropTypes.func,
    // 确定操作回调，不传，默认返回上一级
    onDone: PropTypes.func,
};

export default Modal;
