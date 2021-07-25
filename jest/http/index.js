import axios from "axios";

const host = 'http://mock-api.com/Ln4XXDnx.mock/'

export default ({
  url,
  method = 'get',
  data = {},
  params = '',
}) => {
  return new Promise((resolve, reject) => {
    axios({
      url: host + url,
      method,
      data,
      params,
    }).then(response => {
      let data = null
      try {
        data = JSON.parse(response.data)
      } catch (error) {
        data = response.data
      }
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  }, (reason => {
    console.log(reason)
  }))
}

