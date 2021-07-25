import http from '../../http/index';

export const a = 1;

export const getInforList = (cb) => {
    return http({
        url: 'userInfo'
    }).then(data => {
        cb(data)
    }).catch(error => {
        cb(error)
    })
}

export const getGoodList = () => {
    return http({
        url: 'goodList'
    })
}

export const getToken = () => {
    return http({
        url: 'getToken'
    })
}

export const passwordVarificationFailed = () => {
    return http({
        url: 'checkpassword/failed'
    })
}


