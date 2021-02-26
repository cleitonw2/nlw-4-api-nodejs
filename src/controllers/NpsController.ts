import { Request as Req, Response as Res } from 'express';
import { getCustomRepository, Not, IsNull } from 'typeorm';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class NpsController {

    async execute(req: Req, res: Res) {
        const { survey_id } = req.params;

        const survesUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveysUsers = await survesUsersRepository.find({
            survey_id,
            value: Not(IsNull())
        });

        const detractor = surveysUsers.filter(
            (survey) => survey.value >= 0 && survey.value <= 6
        ).length;

        const promoters = surveysUsers.filter(
            (survey) => survey.value >= 9 && survey.value <= 10
        ).length;

        const passives = surveysUsers.filter(
            (survey) => survey.value >= 7 && survey.value <= 8
        ).length;

        const totalAnswers = surveysUsers.length;

        const calculate = Number(
            (((promoters - detractor) / totalAnswers) * 100).toFixed(2)
        );

        return res.json({
            detractor,
            promoters,
            passives,
            totalAnswers,
            nps: calculate
        })
    }
}

export { NpsController }

/** NPS
  *  1 2 3 4 5 6 7 8 9 10
  * Detratores => 0 - 6
  * Passivos => 7 - 8
  * Promotores => 9 - 10
  *
  * (Número de promotores - Número de detratores) / (número de respondentes) * 100
  */