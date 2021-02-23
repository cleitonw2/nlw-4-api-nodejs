import { Request as Req, Response as Res } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

class UserController {
    async create(req: Req, res: Res) {
        const { name, email } = req.body;

        const userRepository = getRepository(User);

        const userAlreadyExists = await userRepository.findOne({ email });

        if (userAlreadyExists) {
            return res.status(400).json({
                error: "User already exists!",
            });
        }
        
        const user = userRepository.create({
            name,
            email
        });

        await userRepository.save(user);

        return res.status(200).json(user);
    }
}

export { UserController }