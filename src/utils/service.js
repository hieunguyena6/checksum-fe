import axiosInstance from './request';

export const login = ({ userName, password }) => {
  return axiosInstance.post('/v1/auth/login', {
    userName,
    password
  })
}

export const signUp = ({ userName, password }) => {
  return axiosInstance.post('/v1/auth/signup', {
    userName,
    password
  })
}

export const createFileChecksum = ({ checksum, fileName }) => {
  return axiosInstance.post('/v1/file/checksum', {
    checksum,
    fileName
  })
}

export const getFileByChecksum = (checksum) => {
  return axiosInstance.get('/v1/file', {
    params: {
      checksum
    }
  })
}