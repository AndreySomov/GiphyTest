
async function giphyRequest(url) {
    return await fetch(url).then(res => res.json());
}


export default giphyRequest;