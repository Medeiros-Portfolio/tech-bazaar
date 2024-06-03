import { Request, Response } from 'express'
import { CreateUserUseCase } from './CreateUser.useCase';
import { inject, injectable } from 'tsyringe';
import { createUserSchema } from '../../dtos/CreateUserDTO';
import { z } from 'zod'

@injectable()
class CreateUserController {
  constructor(
    @inject("CreateUserUseCase")
    private createUserUseCase: CreateUserUseCase
  ){}

  async handle(request: Request, response: Response) {
    try {
      const payload = createUserSchema.parse(request.body)
  
      const user = await this.createUserUseCase.execute(payload)
  
      return response.status(201).json(user)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return response.status(400).json({ error: error.issues.map(issue => issue.message) })
      }

      return response.status(500).json({ error: "Internal Server Error" })
    }
  }
}

export { CreateUserController }