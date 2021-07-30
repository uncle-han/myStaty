import http from '../../http/index';

export const getGoodList = () => {
    return http({
        url: 'goodList'
    })
}

export const foo = () => {
    return 1 + 1
}

