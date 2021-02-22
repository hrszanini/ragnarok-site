const pages = {}

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