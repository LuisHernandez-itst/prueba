import {Request, Response } from 'express';
import pool from '../database';

class ProductsController {
    public async list (req: Request, res: Response) {
        const products = await pool.query('SELECT * FROM products');
        res.json(products);
    }

    public async create (req:Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO products set ?', [req.body]);
        res.json({message: 'Listo.'})
    }

    public async delete (req:Request,res:Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM products WHERE id = ?', [id]);
        res.json({ message:'Hecho'})
    }

    public async update (req:Request, res:Response): Promise<void>{
        const { id } = req.params;
        await pool.query('UPDATE products set ? WHERE id = ?',[req.body, id]);
        res.json({message:'Actualizado'});
    }

    public async single (req:Request, res:Response): Promise<any> {
        const { id } = req.params;
        const products = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
        if(products.length > 0) {
            return res.json(products[0]);
        }
        res.status(404).json({text:"Producto no encontrado"});
    }
}

const productsController = new ProductsController();
export default productsController;