import {axios} from '../utils/request'
import { USER_MODULE } from './_prefix'

type LoginInfo = {
    username: string,
    password: string
}

type RegisterInfo = {
    username: string,
    password: string,
    email: string,
    role: string
}

//用户登录
export const userLogin = (loginInfo: LoginInfo) => {
    return axios.post(`${USER_MODULE}/login`, null, {params: loginInfo})
        .then(res =>{
            return res
        })
}

//用户注册
export const userRegister = (registerInfo: RegisterInfo) => {
    return axios.post(`${USER_MODULE}/register`, registerInfo)
        .then(res =>{
            return res
        })
}

//将某个用户升级为vip
export const upgradeToVip = (userId: number) => {
    return axios.post(`${USER_MODULE}/vip`, null, {params: {userId}})
        .then(res =>{
            return res
        })
}
export const userInfo = () => {
    return axios.get(`${USER_MODULE}`)
        .then(res => {
            return res
        })
}