import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Radio.module.scss";

export default class RadioGroup extends Component {
  static propTypes = {
    // 子元素
    children: PropTypes.node.isRequired,
    // 用于radio分组
    name: PropTypes.string.isRequired,
    // 所有元素是否inline方式显示
    inline: PropTypes.bool,
    // 选中值，该值在该组中唯一，可以指定默认值
    selectedValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
    ]),
    // 自定义check方法，返回bool
    checker: PropTypes.func,
    // radio改变时的回调事件，返回当前项的value
    onChange: PropTypes.func,
    // 是否显示标记元素，默认为false
    noIcon: PropTypes.bool,
    // 标记元素，默认为勾选图标，正常状态
    icon: PropTypes.node,
    // 标记元素，默认为勾选图标，选中状态
    iconActive: PropTypes.node,
    // 默认标记元素的图标名，正常状态
    iconName: PropTypes.string,
    // 默认标记元素的图标名，选中状态，可以没有
    iconNameActive: PropTypes.string,
    // 图标类型
    iconType: PropTypes.oneOf(["left", "right"]),
    // 图标字号
    iconSize: PropTypes.oneOf([
      "xxs",
      "xs",
      "small",
      "medium",
      "large",
      "xl",
      "xxl",
      "xxxl",
      "inherit"
    ]),
    // 标记元素的自定义样式class名
    iconClassName: PropTypes.string,
    // 标记元素的自定义内联样式
    iconStyle: PropTypes.object,
    // 包裹容器
    WrapComponent: PropTypes.node,
    // 包裹容器的自定义样式class名
    className: PropTypes.string,
    // 包裹容器的自定义内联样式
    style: PropTypes.object
  };

  static childContextTypes = {
    radioGroup: PropTypes.object
  };

  static defaultProps = {
    inline: false,
    noIcon: false,
    icon: null,
    iconActive: null,
    iconName: "select1",
    iconNameActive: "",
    iconType: "right",
    iconSize: "small",
    iconClassName: "",
    iconStyle: null,
    WrapComponent: "div",
    className: "",
    style: null,
    onChange: null,
    checker: null
  };

  getChildContext() {
    const {
      name,
      selectedValue,
      onChange,
      checker,
      noIcon,
      icon,
      iconActive,
      iconName,
      iconNameActive,
      iconType,
      iconSize,
      iconClassName,
      iconStyle
    } = this.props;

    return {
      radioGroup: {
        name,
        selectedValue,
        onChange,
        checker,
        noIcon,
        icon,
        iconActive,
        iconName,
        iconNameActive,
        iconType,
        iconSize,
        iconClassName,
        iconStyle
      }
    };
  }

  render() {
    const {
      children,
      inline,
      name,
      selectedValue,
      onChange,
      checker,
      noIcon,
      icon,
      iconActive,
      iconName,
      iconNameActive,
      iconType,
      iconSize,
      iconClassName,
      iconStyle,
      WrapComponent,
      className = "",
      ...rest
    } = this.props;

    return (
      <WrapComponent
        role="radiogroup"
        className={`${styles.radioGroup} ${className} ${
          inline ? styles.inline : ""
        }`}
        {...rest}
      >
        {children}
      </WrapComponent>
    );
  }
}
