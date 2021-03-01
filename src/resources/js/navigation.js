const pages = {};
const scripts = [];
const menus = {
    'home': {
        'Home': 'home',
        'Cadastro': 'cadastro', 
        'Logar': 'login',
        'Downloads': 'downloads'
    },
    'login':{
        'Alterar Senha': 'alterar_senha',
        'Sair': logoff
    }
}

//Menu Controllers
function menu(context, options){
    if(options !== undefined){
        menus[context]=options;
    }
    var menu_obj = document.getElementById("menu");
    menu_obj.innerHTML = '';
    for (item in menus[context]){
        if(typeof menus[context][item] === 'string'){
            var button = menu_option_html_page(menus[context][item], item);
        } else {
            var button = menu_option_js_function(menus[context][item], item);
        }
        menu_obj.appendChild(button);
    }
}

function menu_option_html_page(page, label){
    node = document.createElement('input');
    node.type = 'button';
    node.value = label;
    node.addEventListener('click', () => {load_page(page)}, false);
    node.addEventListener('mouseover', () => {get_page(page)}, false);
    return node;
}

function menu_option_js_function(func, label){
    node = document.createElement('input');
    node.type = 'button';
    node.value = label;
    node.addEventListener('click', () => {func()}, false);
    return node;
}

//Scripts Controller
function script(url){
    if(scripts.indexOf(url) == -1)
    {
        scripts.push(url);
        var script = document.createElement("script"); 
        script.src = url;
        document.body.appendChild(script);
    }
}

//Pages Controllers
function load_page(page){
    if(!(page in pages)){
        get_page(page, ()=> {document.getElementById('content').innerHTML = pages[page]});
    }else{
        document.getElementById('content').innerHTML = pages[page];
    }
}

function get_page(page, callback){
    if(!(page in pages)){
        pages[page] = null;
        var url = `./${page}`;
        fetch(new Request(url, {method: 'GET'}))
            .then(response => {
                if (response.status === 200) {
                    console.debug(response);
                    return response.text();
                } else {
                    throw new Error('Ops! Houve um erro em nosso servidor.');
                }
            })
            .then(text => {
                pages[page] = text;
                if( typeof callback == 'function'){
                    callback();
                }
                console.debug(text);
            }).catch(error => {
                show_error(error);
                console.error(error);
            });
    }
}

//Message Controllers
function show_loading(){
    unevent_overtop();
    var overtop_obj = document.getElementById('overtop');
    overtop_obj.style.backgroundColor = '#aaaaaaaa';
    overtop_obj.style.display ='block';

    var loading_obj = document.getElementById('loading');
    loading_obj.style.display ='block';
}

function show_ok(msg){
    message(msg, 'rgb(211, 255, 185)', 'rgb(0, 255, 0)');
}

function show_error(msg){
    message(msg, 'rgb(255, 185, 185)', 'rgb(255, 0, 0)');
}

function message(msg, color, border){
    var overtop_obj = document.getElementById('overtop');
    overtop_obj.addEventListener('click', hide_overtop, false);
    overtop_obj.style.display ='block';

    var message_obj = document.getElementById('message');
    message_obj.style.backgroundColor = color;
    message_obj.style.borderColor = border;
    message_obj.innerHTML = msg;
    message_obj.style.display ='block';
}

function unevent_overtop(){
    var overtop_obj = document.getElementById('overtop');
    overtop_obj.removeEventListener('click', hide_overtop, false);
}

function hide_overtop(){
    var overtop_obj = document.getElementById('overtop');
    overtop_obj.style.backgroundColor = '#00000000';
    overtop_obj.style.display ='none';

    var nodes = overtop_obj.children;
    for(var i=0; i<nodes.length; i++) {
        nodes[i].style.display ='none';
    } 
}

function logoff(){
    sessionStorage.removeItem('auth-token');
    menu('home');
    load_page('login');
}