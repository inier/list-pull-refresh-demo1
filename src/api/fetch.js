import axios from 'axios';

const doubanApi = {
    host: 'https://api.douban.com',
    version: 'v2',
    apikey: '0b2bdeda43b5688921839c8ecb20399b',
};

const doubanMovieMock = {
    count: 20,
    start: 0,
    total: 250,
    title: '豆瓣电影Top250',
    subjects: [
        {
            rating: {
                max: 10,
                average: 9.7,
                details: {
                    '1': 1379,
                    '2': 1139,
                    '3': 18641,
                    '4': 181631,
                    '5': 1127610,
                },
                stars: '50',
                min: 0,
            },
            genres: ['犯罪', '剧情'],
            title: '肖申克的救赎',
            casts: [
                {
                    avatars: {
                        small:
                            'https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p17525.webp',
                        large:
                            'https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p17525.webp',
                        medium:
                            'https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p17525.webp',
                    },
                    name_en: 'Tim Robbins',
                    name: '蒂姆·罗宾斯',
                    alt: 'https://movie.douban.com/celebrity/1054521/',
                    id: '1054521',
                },
                {
                    avatars: {
                        small:
                            'https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p34642.webp',
                        large:
                            'https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p34642.webp',
                        medium:
                            'https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p34642.webp',
                    },
                    name_en: 'Morgan Freeman',
                    name: '摩根·弗里曼',
                    alt: 'https://movie.douban.com/celebrity/1054534/',
                    id: '1054534',
                },
                {
                    avatars: {
                        small:
                            'https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5837.webp',
                        large:
                            'https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5837.webp',
                        medium:
                            'https://img1.doubanio.com/view/celebrity/s_ratio_celebrity/public/p5837.webp',
                    },
                    name_en: 'Bob Gunton',
                    name: '鲍勃·冈顿',
                    alt: 'https://movie.douban.com/celebrity/1041179/',
                    id: '1041179',
                },
            ],
            durations: ['142分钟'],
            collect_count: 2313101,
            mainland_pubdate: '',
            has_video: true,
            original_title: 'The Shawshank Redemption',
            subtype: 'movie',
            directors: [
                {
                    avatars: {
                        small:
                            'https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p230.webp',
                        large:
                            'https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p230.webp',
                        medium:
                            'https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p230.webp',
                    },
                    name_en: 'Frank Darabont',
                    name: '弗兰克·德拉邦特',
                    alt: 'https://movie.douban.com/celebrity/1047973/',
                    id: '1047973',
                },
            ],
            pubdates: ['1994-09-10(多伦多电影节)', '1994-10-14(美国)'],
            year: '1994',
            images: {
                small:
                    'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.webp',
                large:
                    'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.webp',
                medium:
                    'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.webp',
            },
            alt: 'https://movie.douban.com/subject/1292052/',
            id: '1292052',
        },
    ],
};

var insaxios = axios.create({
    //初始化数据
    timeout: 10000,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
    withCredentials: false,
});

export function getMovieList(params) {
    const type = 'movie',
        top = '250';
    const { host, version, apikey } = doubanApi;

    return insaxios({
        url: `/doubanApi/${version}/${type}/top${top}`,
        method: 'get', // 默认
        params: {
            start: 0,
            count: 20,
            ...params,
            apikey: apikey,
        },
    })
        .then((response) => {
            console.log(response);
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
}
