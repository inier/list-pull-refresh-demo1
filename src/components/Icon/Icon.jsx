// icons:https://material-ui.com/zh/components/material-icons/
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import MUIIcon from '@material-ui/core/Icon';
import styles from './Icon.module.scss';

const Icon = ({ type, size, active, className, style }) => {
    return (
        <MUIIcon
            fontSize={size}
            className={cx(styles.icon, className, { [styles.active]: active })}
            style={style}
        >
            {type}
        </MUIIcon>
    );
};

export default Icon;

Icon.propTypes = {
    type: PropTypes.string,
    size: PropTypes.oneOf(['small', 'large']),
    active: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
};
