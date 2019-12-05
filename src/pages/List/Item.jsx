import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Image from '../../components/Image';
import styles from './Item.module.scss';

const Cast = ({ list }) => {
    return (
        <div className={styles.cast}>
            {list.map((item) => {
                const { id, avatars = {}, name_en, name } = item;
                return (
                    <div className={styles.castItem} key={id} id={id}>
                        <Image size="sm" src={avatars ? avatars.small : ''} />
                        <div className={styles.castTxt}>{name_en}</div>
                        <div className={styles.castTxt}>{name}</div>
                    </div>
                );
            })}
        </div>
    );
};

const Imem = ({ data }) => {
    const {
        id = '',
        rating = {},
        genres = [],
        title = '',
        images = '',
        directors = [],
        casts = [],
        pubdates = '',
    } = data;
    return (
        <div id={id} className={styles.itemWrap}>
            <div className={cx(styles.itemHeader)}>
                <span>
                    {title} [ 评分：{rating.average} ]{' '}
                </span>{' '}
                -{' '}
                <div>
                    {directors[0] ? directors[0]['name'] : ''} [{' '}
                    {genres ? genres.join('，') : ''} ]
                </div>
            </div>
            <div className={`${styles.itemBody} border-b`}>
                <Image size="lg" src={images.small} />
                <div className={styles.desc}>
                    <Cast list={casts} />
                </div>
            </div>
            <div className={styles.itemFooter}>
                <span className={`${styles.typeName} nowrap`}>{pubdates}</span>
            </div>
        </div>
    );
};

Imem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default Imem;
