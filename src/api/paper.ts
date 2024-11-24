import {axios} from "../utils/request";
import {PAPER_MODULE} from "./_prefix.ts";



//通过关键词查询论文
export const searchPaper = (keyword: string) => {
    return axios.get(`${PAPER_MODULE}/search`, {params: {keyword}})
        .then(res => {
            return res
        })
}

//根据论文id获取详细信息
export const getPaperById = (paperId: number) => {
    return axios.get(`${PAPER_MODULE}/${paperId}`)
        .then(res => {
            return res
        })
}

//获得同类型的所有论文
export const getPaperByCategory = (category: string, excludePaperId: number) => {
    return axios.get(`${PAPER_MODULE}/category`, {params: {category, excludePaperId}})
        .then(res => {
            return res
        })
}

//获得某一个论文的相似论文
export const getSimilarPaper = (paperId: number, ) => {
    return axios.get(`${PAPER_MODULE}/similar`, {params: {paperId}})
        .then(res => {
            return res
        })
}

//获得某一个论文的引用论文
export const getReferencePaper = (paperId: number) => {
    return axios.get(`${PAPER_MODULE}/reference`, {params: {paperId}})
        .then(res => {
            return res
        })
}