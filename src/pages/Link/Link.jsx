import React, { Component } from 'react';
import BasePage from '../../components/BasePage';
import Header from '../../components/Header';
import PageContainer from '../../components/PageContainer';
import SearchBar from '../../components/SearchBar';
import PageBottomButton from '../../components/Button';
import List from '../List';
import styles from './Link.module.scss';

class Link extends Component {
    constructor(props) {
        super(props);

        this.state = {
            keyword: '',
            isSearch: false,
            currentValue: '',
        };
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }
    doSearch = (keyword) => {
        if (keyword) {
            this.setState({ keyword });
            this.setState({ isSearch: true });
        }
    };
    doSearchCancel = () => {
        this.setState({ keyword: '', isSearch: false });
    };
    handleChangeIsSearch = () => {
        this.setState({ isSearch: false });
    };

    handleSubmit = () => {
        console.log('submit');
    };
    getData = () => {};
    render() {
        const { keyword, isSearch, currentValue } = this.state;

        return (
            <BasePage header={<Header title="搜索列表" />}>
                {/* 搜索Bar */}
                <SearchBar
                    onCancel={this.doSearchCancel}
                    onSearch={this.doSearch}
                />

                <PageContainer>
                    {/* 线索列表 */}
                    <List
                        keyword={keyword}
                        isSearch={isSearch}
                        handleChangeIsSearch={this.handleChangeIsSearch}
                    />
                </PageContainer>

                {/* 底部按钮 */}
                <PageBottomButton
                    disabled={!currentValue}
                    onClick={this.handleSubmit}
                >
                    确 认
                </PageBottomButton>
            </BasePage>
        );
    }
}

Link.propTypes = {};

export default Link;
