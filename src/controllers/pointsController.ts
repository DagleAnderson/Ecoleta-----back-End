
import knexConn from '../database/connection';
import {Request,Response} from 'express';

class PointsController{

    async index(request : Request , response : Response){
        const {city,uf,items} = request.query;

        const parsedItems = String(items)
        .split(',')
        .map(item =>Number(item.trim()));

        const points = await knexConn('points')
        .join('points_items','points.id','=','points_items.point_id')
        .whereIn('points_items.items_id',parsedItems)
        .where('city',String(city))
        .where('uf',String(uf))
        .distinct()
        .select('points.*') ;

        return response.json(points);

    }

    async show(request : Request , response : Response) {
        const {id} = request.params;

        const point = await knexConn('points').where('id',id).first();

        if(!point){
            return response.status(400).json({message:'Point not found'});
        }

        const items = await knexConn('items')
        .join('points_items','items.id','=','points_items.items_id')
        .where('points_items.point_id',id)
        .select('items.title');

        return response.json({point,items});
    }


    async create(request : Request,response: Response) {
        const{ // recurso de desestruturação -> o mesmo que -> const data.nome = nome;
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;

        const point = {
            image: 'image-fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }

        const trx = await knexConn.transaction(); // assegura que o processo de insert só ocorra de forma integra
        const insertedIds = await trx('points').insert(point);

        const point_id = insertedIds[0];

        const pointItems = items.map((items_id:number) =>{
            return{
                items_id,
                point_id:point_id
            };
        });
    
        await trx('points_items').insert(pointItems);
        
        await trx.commit();
        
        return response.json({
            id: point_id,
            ...point
        });
    }
}

export default PointsController;