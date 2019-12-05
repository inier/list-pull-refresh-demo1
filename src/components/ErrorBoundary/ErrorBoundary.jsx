import React, { Component } from 'react';
import styles from './ErrorBoundary.module.scss';

// 图片引入
import BG_1 from './img/bc-1.png';
import BG_2 from './img/bc-2.png';

class ErrorBoundary extends Component {
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    componentDidCatch(error, info) {
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, info);
    }

    goHome = () => {
        window.location.replace(window.location.origin + process.env.PUBLIC_URL);
    };

    refresh = () => {
        window.location.reload();
    };

    render() {
        const { hasError } = this.state;
        const { children } = this.props;

        if (hasError) {
            return (
                <div className={styles.content}>
                    <img className={styles.BG_1} src={BG_1} alt="err bg" />
                    <img className={styles.BG_2} src={BG_2} alt="err bg" />
                    <div className={styles.tips}>
                        <div className={styles.left}>可能的原因:&nbsp;</div>
                        <div className={styles.right}>
                            <div>·&nbsp;网络信号弱</div>
                            <div>·&nbsp;找不到请求网页</div>
                            <div>·&nbsp;输入的网址不正确</div>
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <div className={`${styles.refresh} ${styles.btn}`} onClick={this.refresh}>
                            刷新本页
                        </div>
                        <div className={`${styles.home} ${styles.btn}`} onClick={this.goHome}>
                            回到首页
                        </div>
                    </div>
                </div>
            );
        }
        return children;
    }
}

// index.propTypes = {

// };

export default ErrorBoundary;
