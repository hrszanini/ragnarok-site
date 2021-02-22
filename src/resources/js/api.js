function add_user(){
    id_obj = document.getElementById("new_id" );
    email_obj = document.getElementById("new_email");
    birth_obj = document.getElementById("new_birth");
    pass_obj = document.getElementById("new_pass");
    re_obj = document.getElementById("new_re_pass");

    if(pass_obj.value != re_obj.value){
        alert("As senhas digitadas não coincidem");
    }else{
        new_user= {
            "user_id": id_obj.value,
            "user_password": pass_obj.value,
            "user_email": email_obj.value,
            "user_birthday": birth_obj.value
        }
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const request = new Request('/api/user', { method: 'POST', headers: myHeaders, body: JSON.stringify(new_user)});
        fetch(request)
            .then(response => {
                if (response.status === 200) {
                    alert('Usuário criado com sucesso.');
                } else {
                    alert('Ops! Houve um erro em nosso servidor.');
                    throw new Error('Ops! Houve um erro em nosso servidor.');
                }
            })
            .then(response => {
                console.debug(response);
            }).catch(error => {
                console.error(error);
            });
    }
}

function update_password(){
    id_obj = document.getElementById("user_id" );
    old_pass_obj = document.getElementById("old_pass");
    new_pass_obj = document.getElementById("user_pass");
    re_pass_obj = document.getElementById("re_pass");

    if(new_pass_obj.value != re_pass_obj.value){
        alert("As senhas digitadas não coincidem");
    }else{
        new_pass= {
            "user_id": id_obj.value,
            "user_password": old_pass_obj.value,
            "new_password": new_pass_obj.value
        }
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const request = new Request('/api/user/password', { method: 'PUT', headers: myHeaders, body: JSON.stringify(new_pass)});
        fetch(request)
            .then(response => {
                if (response.status === 200) {
                    alert('Senha alterada com sucesso.');
                } else {
                    alert('Ops! Houve um erro em nosso servidor.');
                    throw new Error('Ops! Houve um erro em nosso servidor.');
                }
            })
            .then(response => {
                console.debug(response);
            }).catch(error => {
                console.error(error);
            });
    }
}