import { inject, injectable, registry } from "tsyringe";
import { IUserRepository } from "../../interfaces/IUserRepository";
import { UserRepository } from "../../repositories/UserRepository";
import { User } from "@prisma/client";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { Hash } from "../../../../util/hash";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ){}

  async execute(input: CreateUserDTO): Promise<User> {
    const hashedPassword = Hash.hash(input.password);
    
    return this.userRepository.create({
      ...input,
      password: hashedPassword,
    })
  }
}

export { CreateUserUseCase };