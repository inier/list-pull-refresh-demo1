import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter, Prompt } from 'react-router-dom';
import Modal from '../Modal';

const modalShow = (title, content, handleCancel, handleDone, ...tProps) => (
    <Modal
        title={title}
        content={content}
        onCancel={handleCancel}
        onDone={handleDone}
        {...tProps}
    />
);

class TPrompt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNormalBack: false, // 是否确认后返回 true为确认后返回
        };
    }

    handleDone = () => {
        const { onDone, history } = this.props;
        this.setState({
            isNormalBack: true,
        });
        onDone && onDone();
        history.goBack();
    };

    handleCancel = () => {
        const { onCancel } = this.props;
        onCancel && onCancel();
    };

    render() {
        const { title, content, ...tProps } = this.props;
        const { isNormalBack } = this.state;
        return (
            <Prompt
                when={!isNormalBack}
                message={() => {
                    modalShow(
                        title,
                        content,
                        this.handleCancel,
                        this.handleDone,
                        ...tProps
                    );
                    return isNormalBack;
                }}
            />
        );
    }
}

TPrompt.propTypes = {
    // 弹出框标题，默认值：“”
    title: PropTypes.string,
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

export default withRouter(TPrompt);
