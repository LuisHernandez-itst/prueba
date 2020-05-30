import {Request, Response } from 'express';

class IndexController {
    public index (req:Request, res:Response){
        res.send({text:'API is /api/products'})
    }
}

export const indexController = new IndexController();