to start
    npm install
    npm run build 
    npm start

Postman 

    1.Endpoint
        method: Get,  url: http://localhost:3000/api/items 
        Params: {app_id: '730', currency: 'EUR', tradable: true } //option

    2.Endpoint
        method: Post, url:http://localhost:3000/api/purchase
        Body {x-www-form-urlencoded}: {
            username: 'user1', itemPrice: xx
        }