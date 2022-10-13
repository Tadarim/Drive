function myAjax(url,method,data){
    return  new Promise((resolve,reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.open(method,url);
        if(method=='GET')
        xhr.send();
        else
        xhr.send(data);
        xhr.onreadystatechange = function(){
            // 判断状态
            if(xhr.readyState === 4){
                // 判断响应状态码 200-299
                if(xhr.status >= 200 && xhr.status < 300){
                    // 表示成功
                    resolve(xhr);
                }
                else{
                    reject(xhr.status);
                }
            }
        }
    })
}



export default myAjax;