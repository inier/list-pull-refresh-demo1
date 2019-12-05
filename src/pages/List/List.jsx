import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from 'react-window-pull-refresh';
import { RadioGroup, Radio } from '../../components/Radio';
import Icon from '../../components/Icon';
import Item from './Item';
import styles from './List.module.scss';

import { getMovieList } from '../../api/fetch';

const Nothing = ({ msg, img }) => {
    return (
        <div>
            {img && <img src={img} alt="img" />}
            <div>{msg}</div>
        </div>
    );
};

class ListDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            list: [],
            total: -1,
            pageSize: 20,

            currentId: '',
        };
    }
    componentDidMount() {
        //第一次加载数据
        this.loadNextPage(0, 50);
    }
    handlePullRefresh = () => {
        const params = {
            start: 0,
        };

        console.log(`refreshing`);
        return this.getData(params).then((res) => {
            console.log(`refreshed`);
            return res;
        });
    };
    handleChange = (value, index) => {
        console.log('currentClueValue:', value);
        this.setState({
            currentId: value,
        });
    };
    itemRender = (item, index, style) => {
        const { total } = this.state;
        const myStyle = {
            ...style,
            display: 'flex',
            flexDirection: 'column',
        };

        if (total) {
            if (index === total) {
                return (
                    <div style={myStyle}>
                        <div className={styles.tail}>没有更多数据了</div>
                    </div>
                );
            }
        }

        return (
            <div key={item.id} style={myStyle}>
                <div className={styles.item}>
                    <Radio value={item.id} index={index}>
                        <Item data={item} />
                    </Radio>
                </div>
            </div>
        );
    };
    loadNextPage = (startIndex, stopIndex) => {
        console.log(`loading ${startIndex}-${stopIndex}`);
        const { pageSize } = this.state;
        let params = {};

        if (startIndex !== 0) {
            params = {
                start: Math.floor(stopIndex / pageSize) * pageSize,
            };
        }

        this.getData(params);
    };
    getData = (params) => {
        this.setState({ loading: true });
        const { pageSize } = this.state;

        params.count = pageSize;

        return getMovieList(params)
            .then((res) => {
                // handle success
                if (res && res.count) {
                    this.setState({
                        loading: false,
                        list: this.state.list.concat(res.subjects),
                        total: res.total,
                    });
                }

                return res;
            })
            .catch((err) => {
                // handle error
                console.log(err);
            })
            .then(() => {
                // always executed
            });
    };
    render() {
        const { loading, list, total, currentId } = this.state;

        if (loading && !list.length) {
            return null;
        }

        return list.length ? (
            <RadioGroup
                name="list"
                selectedValue={currentId}
                onChange={this.handleChange}
                iconName="unchecked"
                iconNameActive="checked"
                style={{ flex: '1', height: '100%' }}
            >
                <List
                    total={total}
                    items={[...list, {}]}
                    isNextPageLoading={loading}
                    loadNextPage={this.loadNextPage}
                    itemHeight={(index) => {
                        let itemHeight = 184;
                        if (index === total) {
                            itemHeight = 30;
                        }

                        return itemHeight;
                    }}
                    handlePullRefresh={this.handlePullRefresh}
                    itemRender={this.itemRender}
                />
            </RadioGroup>
        ) : (
            <Nothing />
        );
    }
}

ListDemo.propTypes = {};

export default ListDemo;
