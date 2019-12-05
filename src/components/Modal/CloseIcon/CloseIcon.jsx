import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../Icon';
import styles from './CloseIcon.module.scss';

const CloseIcon = ({ size, handleClick }) => (
    <div className={styles.close} onClick={handleClick}>
        <Icon
            type="Close"
            size={size}
            className={styles.close}
            onClick={handleClick}
        />
    </div>
);

CloseIcon.propTypes = {
    size: PropTypes.oneOf(['small', 'large']),
    handleClick: PropTypes.func,
};

export default CloseIcon;
