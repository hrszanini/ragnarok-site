function download(url){
    let element = document.createElement('a')
    element.setAttribute('href', url);
    element.style.visibility = 'hidden';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}