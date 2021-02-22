const api = {
    'update_password': '/api/user/password',
    'add_user': '/api/user'
}

function add_user(){
    id_obj = document.getElementById("username" );
    email_obj = document.getElementById("email");
    birth_obj = document.getElementById("birthday");
    pass_obj = document.getElementById("new-password");
    re_obj = document.getElementById("redo-new-password");

    if(pass_obj.value != re_obj.value){
        error('As senhas digitadas não coincidem');
    }else{
        new_user= {
            "user_id": id_obj.value,
            "user_password": pass_obj.value,
            "user_email": email_obj.value,
            "user_birthday": birth_obj.value
        }
        
        request(api['add_user'], 'POST', new_user, response => {
            ok('Usuário criado com sucesso');
        });
    }
}

function update_password(){
    id_obj = document.getElementById("username" );
    old_pass_obj = document.getElementById("current-password");
    new_pass_obj = document.getElementById("new-password");
    re_pass_obj = document.getElementById("redo-new-password");

    if(new_pass_obj.value != re_pass_obj.value){
        error('As senhas digitadas não coincidem');
    }else{
        new_pass= {
            "user_id": id_obj.value,
            "user_password": old_pass_obj.value,
            "new_password": new_pass_obj.value
        }

        request(api['update_password'], 'PUT', new_pass, response => {
            ok('Senha alterada com sucesso');
        });
    }
}

function request(url, method, data, callback){
    loading('visible');
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const request = new Request(url, { method: method, headers: myHeaders, body: JSON.stringify(data)});
    fetch(request)
        .then(response => {
            loading('hidden');
            if (response.status === 200) {
                callback(response);
            } else {
                error('Ops! Houve um erro em nosso servidor');
                throw new Error('Ops! Houve um erro em nosso servidor');
            }
        })
        .then(response => {
            console.debug(response);
        }).catch(error => {
            console.error(error);
        });
}

function loading(visibility){
    loading_obj = document.getElementById('loading');
    loading_obj.style.visibility = visibility;
    return loading_obj;
}

function ok(msg){
    message('visible', msg, 'rgb(211, 255, 185)');
}

function error(msg){
    message('visible', msg, 'rgb(255, 185, 185)');
}

function off(){
    message('hidden', '', '');
}

function message(visibility, msg, color){
    message_obj = document.getElementById('message');
    message_obj.style.backgroundColor = color;
    message_obj.innerHTML = msg;
    message_obj.style.visibility = visibility;
    
}

function download(url){
    let element = document.createElement('a')
    element.setAttribute('href', url);
    element.style.visibility = 'hidden';

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element)
}