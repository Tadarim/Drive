import myAjax from './myAjax.js'
let username = document.querySelector('#username')
let password = document.querySelector('#password')
let btn = document.querySelector('#btn')
let warn = document.querySelectorAll('.warn')
let email = document.querySelector('#email')
let code = document.querySelector('#code')
let sendCode = document.querySelector('#sendCode')


let nameReg = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,14}$/
let emailReg = /^[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/
let passReg = /^[a-zA-Z][a-zA-Z0-9_]{4,16}$/

function Reg(elem, elemReg, warn) {
    elem.addEventListener('blur', () => {
        if (elem.value != '') {
            if (!elemReg.test(elem.value)) {
                warn.innerHTML = '输入不合法'
                elem.style.border = '2px solid red'
            }
            else {
                warn.innerHTML = ''
                elem.style.border = '2px solid #E0E0E0'
            }
        }
        else {
            warn.innerHTML = ''
            elem.style.border = '2px solid #E0E0E0'
        }
    })
}

Reg(username, nameReg, warn[0])
Reg(email, emailReg, warn[1])
Reg(password, passReg, warn[2])

btn.addEventListener('click', () => {

    let json = {
        username: username.value,
        password: password.value,
        email: email.value,
        authcode: code.value
    }

    if (username.value == '') {
        warn[0].innerHTML = '请输入用户名'
        username.style.border = '2px solid red'
    }
    else if (email.value == '') {
        warn[1].innerHTML = '请输入邮箱'
        email.style.border = '2px solid red'
    }
    else if (password.value == '') {
        warn[2].innerHTML = '请输入密码'
        password.style.border = '2px solid red'
    }
    else if (password.value == '') {
        warn[3].innerHTML = '请输入验证码'
        code.style.border = '2px solid red'
    }
    else {
        async function asyncFn() {
            let returnData = await myAjax('http://120.46.130.242:9090/user/signup', 'POST', JSON.stringify(json))
            return returnData
        }

        asyncFn().then(value => {
            let data = JOSN.parse(value)
            console.log(data);
            console.log(data.string);
            if(data.string == 'invalid authcode'){
                warn[3].innerHTML = '验证码错误'
                code.style.border = '2px solid red'
            }
            else if(data.string == 'user existed'){
                warn[0].innerHTML = '用户已存在'
                username.style.border = '2px solid red'
            }
            else{
                location.href= '../html/login.html'
            }
        })

    }
}

)

sendCode.addEventListener('click', () => {
    let formData = new FormData()

    if (email.value == '') {
        warn[1].innerHTML = '请输入邮箱'
        email.style.border = '2px solid red'
    }
    else {
        formData.append('email',email.value)
        var xhr = new XMLHttpRequest();
        // 对ajax对象进行配置
        xhr.open('post', 'http://120.46.130.242:9090/user/sendemail');
        // 发送请求并传递请求参数
        xhr.send(formData);
        // 监听服务器端给予的响应内容
        xhr.onload = function () {
            console.log(xhr.response);
        }
    }
}
)