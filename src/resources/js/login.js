function login(){
    const api = {
        'url': './api/login'
    }

    show_loading();
    username_obj = document.getElementById("username");
    password_obj = document.getElementById("current-password");

    payload = {
        "user_id": username_obj.value,
        "user_password": password_obj.value
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
            }
            if (response.status === 403) {
                menu('home');
                load_page('login');
                throw new Error('Usuário e/ou senha incorreto(s)');
            } else {
                throw new Error('Ops! Houve um erro em nosso servidor');
            }
        })
        .then(text => {
            sessionStorage.setItem('auth-token', text.replaceAll('"',''));
            show_ok('Conectado');
            menu('login');
            load_page('alterar_senha');
            console.debug(text);
        }).catch(error => {
            show_error(error);
            console.error(error);
        });
}
