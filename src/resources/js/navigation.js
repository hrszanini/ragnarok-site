function page(page){
    var url = '/' + page
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
            document.getElementById("content").innerHTML = text;
            console.debug(text);
        }).catch(error => {
            console.error(error);
        });
    return url;
}



