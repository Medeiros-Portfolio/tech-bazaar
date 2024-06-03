import { PrismaClient, Prisma, User } from "@prisma/client";
import { IUserRepository } from "../interfaces/IUserRepository";
import { inject, injectable, registry } from "tsyringe";
import { DefaultArgs } from "@prisma/client/runtime/library";

@injectable()
export class UserRepository implements IUserRepository {
  userRepository: Prisma.UserDelegate<DefaultArgs>;

  constructor(
    @inject("PrismaClient")
    private prisma: PrismaClient ,
  ) {
    this.userRepository = this.prisma.user;
  }

  async create(user: Prisma.UserCreateInput): Promise<User> {
    return this.userRepository.create({ data: user });
  }

  async getById(id: number): Promise<User> {
    return this.userRepository.findFirstOrThrow({ where: { id } });
  }
  async getUser(userQuery: Prisma.UserWhereInput): Promise<User> {
    return this.userRepository.findFirstOrThrow({ where: userQuery });
  }

  async getUsers(userQuery: Prisma.UserFindManyArgs<DefaultArgs>): Promise<User[]> {
    throw new Error("Method not implemented.");
  }

  async update (email:string, user: Prisma.UserUpdateInput): Promise<User> {
    return this.userRepository.update({
      data: user,
      where: { 
        email,
      },
    })
  }

  async delete(email: string): Promise<User> {
    return this.userRepository.delete({ where: { email } });
  }
}
