import { Request, Response } from 'express'
import { getRepository } from 'typeorm';

import orphanageView from '../views/orphanages_view';
import Orphanages from '../models/Orphanage';
import * as Yup from 'yup';


export default {
  async index(req: Request, res: Response) {
    const orphanagesRepository = getRepository(Orphanages);

    const orphanage = await orphanagesRepository.find(
      {
        relations: ['images']
      }
    );

    return res.json(orphanageView.renderMany(orphanage))
  },

  async show(req: Request, res: Response) {
    const { id } = req.params

    const orphanagesRepository = getRepository(Orphanages);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images']
    });

    return res.json(orphanageView.render(orphanage))

  },

  async create(req: Request, res: Response) {

    const { 
      name, latitude, longitude,
      about, instructions, opening_hours, open_on_weekends
    } = (req.body);
  
    const orphanagesReposiroty = getRepository(Orphanages);
    
    const reqImages = req.files as Express.Multer.File[];

    const images = reqImages.map(image => {
      return { path: image.filename}
    })

    const data = {
      name, 
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      images
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
      }))
    })


    await schema.validate(data, {
      abortEarly: false,
    })

    const orphanages = orphanagesReposiroty.create(data);
  
    await orphanagesReposiroty.save(orphanages);
  
    return res.status(201).json(orphanages);
  }
};