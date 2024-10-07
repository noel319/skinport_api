import express, { Request, Response } from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import users from './util/users';

const app = express();
const port: number = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded())

app.get('/api/items', async (req: Request, res:Response) => {
    try{
        const request1 = await axios.get('https://api.skinport.com/v1/items', {
            params: { app_id: '730', currency: 'EUR', tradable: true }
        })
        const request2 = await axios.get('https://api.skinport.com/v1/items', {
            params: { app_id: '730', currency: 'EUR', tradable: false }
        })

        const items = request1.data.map((item_t: any) => {
            const result = {
                name: item_t.market_hash_name, 
                price_t: item_t.min_price, 
                price_nt: 0
            } 
            request2.data.map((item_nt: any) => {
                if(item_nt.name == item_t.name) { result.price_nt = item_nt.min_price;}
            })
            return result;
        });

        res.json(items);
    } catch(err) {
        res.status(500).json({
            error:'Internal Server Error'
        })
    }
})

app.post('/api/purchase', (req: Request, res: Response) => {
    const {username, itemPrice} : {username: string, itemPrice: number} = req.body;
    
    if(!users[username]){
        res.status(404).json({error: "user not found!"});
    }
    
    if(users[username].balance < itemPrice) {
        res.status(400).json({ error: 'Insufficient balance'});
    }
    users[username].balance -= itemPrice;

    res.json({
        message:'purchase success!',
        balance: users[username].balance
    })
})

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})