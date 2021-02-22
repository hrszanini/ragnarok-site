const pages = {}
var scripts = []
const headers = {
    'home':{
        'Cadastro': 'cadastro', 
        'Logar': 'login',
        'Downloads': 'downloads'
    },
    'login':{
        'Alterar Senha': 'alterar_senha',
        'Sair': sair
    }
}

function header(context){
    renderer_headers = ''
    for (item in headers[context]){
        if (typeof headers[context][item] === 'string'){
            renderer_headers += header_button_page(headers[context][item], item);
        }else{
            renderer_headers += header_button_function(headers[context][item], item);
        }
    }
    document.getElementById("header").innerHTML = renderer_headers;
}

function header_button_page(page, label){
    return `<input type="button" value="${label}" onclick="load_page('${page}');" onmouseover="get_page('${page}');"></input>`
}

function header_button_function(func, label){
    return `<input type="button" value="${label}" onclick="${func.name}()"></input>`
}


function get_page(page){
    if(!(page in pages))
    {
        pages[page] = null;
        var url = '/' + page
        get_request(url, text => {
            pages[page] = text;
        });
    }
}

function load_page(page){
    if(page in pages){
        get_page(page);
    }
    document.getElementById("content").innerHTML = pages[page];
}

function append_script(url){
    if(scripts.indexOf(url) == -1)
    {
        scripts.push(url);
        var script = document.createElement("script"); 
        script.src = url;
        document.body.appendChild(script);
    }
}

function get_request(url, callback){
    const request = new Request(url, {method: 'GET'});
    fetch(request)
        .then(response => {
            if (response.status === 200) {
                console.debug(response);
                return response.text();
            } else {
                throw new Error('Ops! Houve um erro em nosso servidor.');
            }
        })
        .then(text => {
            callback(text);
            console.debug(text);
        }).catch(error => {
            console.error(error);
        });
    return url;
}

function request(url, method, data, callback, error_callback){
    loading('visible');
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const request = new Request(url, { method: method, headers: myHeaders, body: JSON.stringify(data)});
    fetch(request)
        .then(response => {
            loading('hidden');
            if (response.status === 200) {
                return response.text();
            } else {
                error('Ops! Houve um erro em nosso servidor');
                throw new Error('Ops! Houve um erro em nosso servidor');
            }
        })
        .then(text => {
            callback(text);
            console.debug(text);
        }).catch(error => {
            error_callback();
            console.error(error);
        });
}

function download(url){
    let element = document.createElement('a')
    element.setAttribute('href', url);
    element.style.visibility = 'hidden';

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element)
}

function sair(){
    localStorage.removeItem('token');
    header('home');
    load_page('login');
}