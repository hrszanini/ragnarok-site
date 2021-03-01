function add_user(){
    const api = {
        'url': '/api/user'
    }

    show_loading();

    username_obj = document.getElementById("username" );
    email_obj = document.getElementById("email");
    birthday_obj = document.getElementById("birthday");
    password_obj = document.getElementById("new-password");
    re_password_obj = document.getElementById("redo-new-password");

    if(password_obj.value != re_password_obj.value){
        show_error('As senhas digitadas não coincidem');
    } else {
        payload = {
            "user_id": username_obj.value,
            "user_password": password_obj.value,
            "user_email": email_obj.value,
            "user_birthday": birthday_obj.value
        }

        var header = new Headers();
        header.append("Content-Type", "application/json");

        var request = {
            method: 'POST', 
            headers: header, 
            body: JSON.stringify(payload)
        }

        fetch(new Request(api['url'], request))
            .then(response => {
                hide_overtop();
                if (response.status === 200) {
                    return response.text();
                } else {
                    throw new Error('Ops! Houve um erro em nosso servidor');
                }
            })
            .then(text => {
                sessionStorage.setItem('auth-token', text.replaceAll('"',''));
                menu('login');
                show_ok('Usuário cadastrado com sucesso!');
                console.debug(text);
            }).catch(error => {
                show_error(error);
                console.error(error);
            });
    }
}