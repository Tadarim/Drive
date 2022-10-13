import myAjax from './myAjax.js'


let username = document.querySelector('#username')
let password = document.querySelector('#password')
let btn = document.getElementsByTagName('button')[0]
let tip = document.querySelector('#tip')

username.addEventListener('focus', () => {
    username.style.outline = '2px solid #09AAFF'
    username.style.caretColor = '#09AAFF'
})

username.addEventListener('blur', () => {
    username.style.outline = '2px solid #424242'
})

password.addEventListener('focus', () => {
    password.style.outline = '2px solid #09AAFF'
    password.style.caretColor = '#09AAFF'
})

password.addEventListener('blur', () => {
    password.style.outline = '2px solid #424242'
})

btn.addEventListener('click', () => {
    let json = {
        username: username.value,
        password: password.value,
    }
    if (username.value == '') {
        tip.innerHTML = '请输入用户名'
        username.style.outline = '2px solid #09AAFF'
    }

    else if (password.value == '') {
        tip.innerHTML = '请输入密码'
        password.style.outline = '2px solid red'
    }

    else {
        async function asyncFn() {
            let returnData = await myAjax('http://120.46.130.242:9090/user/login', 'POST', JSON.stringify(json))
            return returnData
        }
        asyncFn().then(value => {
            let data = JSON.parse(value)
            console.log(data.bool);
            
            if (data.bool == false) {
                tip.innerHTML = '用户名或者密码错误,请重新输入'
                password.value = ''
                password.style.outline = '2px solid #09AAFF'
            }
            else{
            let token = data.getResponseHeader('Authorization');
            console.log(token);
                
            sessionStorage.setItem('token',token)
            console.log(sessionStorage.getItem('token'));
            }
        })
    }
})