const del = () => {
    axios.delete('http://localhost:8080/adote-quatropatas/pet', data)
    .then ((response)=> renderOutput(response))
}

const element = document.querySelector('#delete-request-set-headers .status');
const headers = { 
    'Authorization': 'Bearer my-token',
    'My-Custom-Header': 'foobar'
};
axios.delete('https://reqres.in/api/posts/1', { headers })
    .then(() => element.innerHTML = 'Delete successful');