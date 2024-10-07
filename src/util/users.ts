interface User {
    balance : number
}

const users : Record <string, User> = {
    'user1': {balance: 1000},
    'user2': {balance: 2000},
    'user3': {balance: 3000}
}

export default users;