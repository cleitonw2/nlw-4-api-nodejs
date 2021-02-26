import { Request as Req, Response as Res } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class AnswerController {

    async execute(req: Req, res: Res) {
        const { value } = req.params;
        const { u } = req.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        });

        if (!surveyUser)
            throw new AppError("Survey User does not exists!");

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return res.json(surveyUser);
    }
}

export { AnswerController }


  // http://localhost:3000/answers/10?u=e2056636-5f2b-41e3-aaed-0d774fb4d3e9
/**
 * Route Params => Parametros que compõe a rota
 * routes.get("/answers/:value/:outroparametro")// route params
 *
 * Query Params => Busca, Paginação, não obrigatorios
 * ?
 * chave=valor
 */