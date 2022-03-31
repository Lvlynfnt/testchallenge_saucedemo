
var server = Cypress.env('usedENV')
var selectedServer

switch(server) {

    case 'prod': selectedServer = Cypress.env('prod')
}

const api = {

    login: `${selectedServer}/api/userauth/public/authenticate`

} 

export default api