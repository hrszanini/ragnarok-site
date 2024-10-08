function update_password(){
    const api = {
        'url': './api/user/password'
    }

    show_loading();
    
    old_password_obj = document.getElementById("current-password");
    new_password_obj = document.getElementById("new-password");
    re_password_obj = document.getElementById("redo-new-password");

    if(new_password_obj.value != re_password_obj.value){
        show_error('As senhas digitadas não coincidem');
    } else {
        payload = {
            "token": sessionStorage.getItem('auth-token'),
            "new_password": new_password_obj.value
        }

        var header = new Headers();
        header.append("Content-Type", "application/json");

        var request = {
            method: 'PUT', 
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
                    throw new Error('Usuário deslogado');
                } else {
                    show_error('Ops! Houve um erro em nosso servidor');
                    throw new Error('Ops! Houve um erro em nosso servidor');
                }
            })
            .then(text => {
                sessionStorage.setItem('auth-token', text.replaceAll('"',''));
                show_ok('Senha alterada com sucesso!');
                console.debug(text);
            }).catch(error => {
                show_error(error);
                console.error(error);
            });
    }
}