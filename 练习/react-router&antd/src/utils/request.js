const baseUrl = "http://120.76.247.5:2001/api";

export const request = (url) => {
    return fetch(baseUrl + url).then((res)=>{
        return res.json();
    })
}