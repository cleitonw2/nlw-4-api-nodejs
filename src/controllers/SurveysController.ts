import { Request as Req, Response as Res } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';

class SurveysController {
    async create(req: Req, res: Res) {
        const { title, description } = req.body;

        const surveysRepository = getCustomRepository(SurveysRepository);

        const survey = surveysRepository.create({
            title,
            description
        });

        await surveysRepository.save(survey);

        return res.status(201).json(survey);
    }

    async show(req: Req, res: Res) {
        const surveysRepository = getCustomRepository(SurveysRepository);

        const all = await surveysRepository.find();

        return res.status(200).json(all);
    }
}

export { SurveysController }