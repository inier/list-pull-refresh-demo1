# 单选列表（移动端）

@ozo/radios

+ react-icons：https://react-icons.netlify.com/
+ @material-ui/core：https://github.com/mui-org/material-ui

单选列表for移动端

## Radio 组件用法

Radio 组件包括 RadioGroup、Radio 两个子组件，需要配合使用。

#### RadioGroup 具有三个属性

-   name：必须，RadioGroup 的 name,用于对 Radio 进行分组
-   selectedValue：必须，RadioGroup 数据回填的对应字段
-   onChange：RadioGroup 值变化是触发的函数

#### Radio 具有两个属性

-   value：必须，按钮选中所对应的值
-   disabled：按钮是否禁用

### 用法

1.  在需要引用 Radio 的页面或组件中引入组件

```
import { RadioGroup, Radio } from "../../components/Radio";
```

2.  在需要引用 Radio 的页面或组件中添加状态：

```
this.state = {
    selectedValue : 'React'
}
```
> mobx 等状态管理放到对应的 store

3.  在需要引用 Radio 的页面或组件中添加选中 Radio 子项后的回调方法

```
handleChange(event){
    console.log('change');
    console.log(event);
    this.setState({selectedValue:event});
}
```

4.  jsx 部分引入以下结构

```
<RadioGroup name="platform" selectedValue={this.state.selectedValue} onChange={(event)=>{this.handleChange(event)}}>
    <Radio value="1" disabled="true">React</Radio>
    <Radio value="2">VUE</Radio>
    <Radio value="3">jQuery</Radio>
</RadioGroup>
```

> Radio 组件的位置可以不是直接子元素。


## API

| 参数名 | 说明 | 必填 | 类型 | 默认值 | 备注 |
| ------ | ---- | ---- | ---- | ------ | ---- |
|        |      |      |      |        |      |
