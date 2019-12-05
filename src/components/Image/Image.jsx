import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Image.module.scss';

const Image = ({
    src,
    alt,
    size = 'md',
    inline = false,
    radius = 0,
    style,
    className = '',
}) => {
    return (
        <div
            className={cx(styles.img, className, {
                [`${styles[size]}`]: size,
                [`${styles[inline]}`]: inline,
            })}
            style={{ borderRadius: `${radius}px`, ...style }}
        >
            {src && <img src={src} alt={alt || src} />}
        </div>
    );
};

export default Image;

Image.propTypes = {};
