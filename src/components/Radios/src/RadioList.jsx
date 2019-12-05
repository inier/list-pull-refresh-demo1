import React from "react";
import PropTypes from "prop-types";
import RadioGroup from "./RadioGroup";
import Radio from "./Radio";

// Nothing
const Nothing = () => {
  return <div>暂无数据</div>;
};

export default function RadioList({
  data = [],
  itemRender,
  nothing,
  ...restProps
}) {
  if (!data.length) {
    return <React.Fragment>{nothing}</React.Fragment>;
  }

  return (
    <RadioGroup {...restProps}>
      {data.map((item, index) => {
        if (itemRender) {
          return (
            <React.Fragment key={item.id}>
              {itemRender(item, index)}
            </React.Fragment>
          );
        }

        return (
          <Radio key={item.id} value={item.id} index={index}>
            {item.name}
          </Radio>
        );
      })}
    </RadioGroup>
  );
}

RadioList.propTypes = {
  // 数据源，格式：[{id:xxx, name:xxx}],扩展数据可通过 itemRender 方式渲染
  data: PropTypes.array,
  // 渲染列表项节点, 必须通过Radio渲染列表项，可自定义样式等，具体设置参考 Radio 组件
  itemRender: PropTypes.func,
  // 暂无数据渲染节点
  nothing: PropTypes.node,
  // 其他参数项请参考 RadioGroup 组件
  more: PropTypes.any
};

RadioList.defaultProps = {
  data: [],
  itemRender: null,
  nothing: <Nothing />,
  more: null
};
