import { Request as Req, Response as Res } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { UsersRepository } from '../repositories/UserRepository';
import SendMailService from '../services/SendMailService';


class SendMailController {

    async execute(req: Req, res: Res) {
        const { email, survey_id } = req.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const user = await usersRepository.findOne({ email })

        if (!user)
            return res.status(400).json({ error: 'User does not exists' });

        const survey = await surveysRepository.findOne({ id: survey_id });

        if (!survey)
            return res.status(400).json({ error: 'Survey does not exists' });

        //salvar as informações na tabela surveyUser
        const surveyUser = surveysUsersRepository.create({
            user_id: user.id,
            survey_id
        });

        await surveysUsersRepository.save(surveyUser);
        //enviar email para o usuário
        await SendMailService.execute(email, survey.title, survey.description);

        return res.json(surveyUser)
    }
}

export { SendMailController }