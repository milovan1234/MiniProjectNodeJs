const http = require('http');

const options = {
    hostname: 'localhost',
    port: '2000',
    path: '/brisanjeOsobe?id=2',
    method: "POST"
};
function handleResponse(response) {
    var serverData = '';
    response.on('data', function (chunk) {
        serverData += chunk;
    });
    response.on('end', function () {
        console.log(serverData);
    });
}
http.request(options, function (response) {
    handleResponse(response);
}).end();

console.log("Osoba ce biti obrisana za 3 sekunde.");