import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import styles from './SearchBar.module.scss';
const cancelTxt = '取消';
const searchTxt = '搜索';

class SearchBar extends Component {
    constructor() {
        super();
        this.state = {
            rightTxt: '',
            showClear: false,
            isFristInput: true,
        };
        this.inputRef = React.createRef();
    }
    componentDidMount() {
        window.addEventListener('keypress', this.handlekeyPress);
        this.props.autoFocus && this.inputRef.current.focus();
    }
    componentWillUnmount() {
        window.removeEventListener('keypress', this.handlekeyPress);
    }
    /**
     * @description 聚焦
     * @param {*} e dom 元素
     */
    handleOnFocus = (e) => {
        if (!this.state.rightTxt) {
            this.setState({
                rightTxt: cancelTxt,
            });
        }
        if (e.target.value) {
            this.setState({
                showClear: true,
            });
        }
        this.props.onFocus && this.props.onFocus(e.target.value);
    };
    /**
     * @description 失去
     * @param {*} e dom 元素
     */
    handleBlur = (e) => {
        if (!e.target.value) {
            const { onCancel } = this.props;
            !this.state.isFristInput && onCancel && onCancel();
            this.setState({
                rightTxt: '',
                showClear: false,
                isFristInput: true,
            });
        }
    };
    /**
     * @description 调用手机键盘的“搜索”键搜索线索
     * @param {*} e 事件对象
     */
    handlekeyPress = (e) => {
        const { onSearch } = this.props;
        const keycode = e.keyCode;
        if (keycode === 13) {
            e.preventDefault();
            this.props.autoFocus && this.inputRef.current.blur();
            onSearch && onSearch(this.inputRef.current.value);
            this.setState({
                isFristInput: false,
            });
        }
    };
    /**
     * @description 输入
     * @param {*} e dom 元素
     */
    handleChange = (e) => {
        if (e.target.value) {
            this.setState({
                rightTxt: searchTxt,
                showClear: true,
            });
        } else {
            this.setState({
                rightTxt: cancelTxt,
                showClear: false,
            });
        }
    };
    /**
     * @description 清空
     * @param {*} e dom 元素
     */
    handleClear = () => {
        this.inputRef.current.value = '';
        this.setState({
            rightTxt: '',
            showClear: false,
            isFristInput: true,
        });
        const { onCancel } = this.props;
        onCancel && onCancel();
    };
    /**
     * @description 点击右侧按钮
     * @param {*} e dom 元素
     */
    handleOnRight = (e) => {
        // 点击取消
        if (e.target.innerHTML.includes(cancelTxt)) {
            this.setState({
                rightTxt: '',
                showClear: false,
                isFristInput: true,
            });
            const { onCancel } = this.props;
            onCancel && onCancel();
        } else if (e.target.innerHTML.includes(searchTxt)) {
            const { onSearch } = this.props;
            this.setState({
                isFristInput: false,
            });
            // 点击搜索
            onSearch && onSearch(this.inputRef.current.value);
        }
    };
    /**
     * @description 点击左侧按钮
     * @param {*} e dom 元素
     */
    handleGoBack = (e) => {
        this.props.showLeftBtn &&
            this.props.onLeftBtn &&
            this.props.onLeftBtn();
    };
    render() {
        return (
            <div
                className={`${styles.searchBox} ${this.props.className || ''}`}
            >
                {this.props.showLeftBtn && (
                    <div
                        className={`${styles.goBack}`}
                        onClick={this.handleGoBack}
                    >
                        <Icon name="arrow-left1" />
                    </div>
                )}
                <div className={`${styles.inputBox}`}>
                    <span className={`${styles.searchIcon}`}>
                        <Icon name="search1" size="small" />
                    </span>

                    <form action="" onSubmit={this.handlekeyPress}>
                        <input
                            ref={this.inputRef}
                            className={`${styles.input}`}
                            placeholder={this.props.placeholder}
                            onBlur={this.handleBlur}
                            value={this.props.value}
                            onChange={this.handleChange}
                            type="search"
                            onFocus={this.handleOnFocus}
                        />
                    </form>

                    {this.state.showClear && (
                        <span
                            className={`${styles.clearIcon}`}
                            onClick={this.handleClear}
                        >
                            <Icon type="close1" size="xs" />
                        </span>
                    )}
                </div>
                {this.state.rightTxt && (
                    <div
                        className={`${styles.rightTxt}`}
                        onClick={this.handleOnRight}
                    >
                        {this.state.rightTxt}
                    </div>
                )}
            </div>
        );
    }
}
SearchBar.defaultProps = {
    showLeftBtn: false,
    autoFocus: false,
};
SearchBar.propTypes = {
    //最外层容器的class
    className: PropTypes.string,
    //左侧按钮
    showLeftBtn: PropTypes.bool,
    //点击左侧按钮
    onLeftBtn: PropTypes.func,
    //是否自动聚焦
    autoFocus: PropTypes.bool,
    //聚焦回调
    onFocus: PropTypes.func,
    //value
    value: PropTypes.string,
    //placeholder
    placeholder: PropTypes.string,
    //点击取消
    onCancel: PropTypes.func,
    //点击enter键,搜索
    onSearch: PropTypes.func,
};

export default SearchBar;
