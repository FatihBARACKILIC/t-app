import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JsonWebTokenService } from '../../shared/services/jwt/json-web-token.service';
import { PrismaService } from '../../shared/services/prisma/prisma.service';

@Injectable()
export class TodoAuthorizationGuard implements CanActivate {
  constructor(
    private readonly jsonWebToken: JsonWebTokenService,
    private readonly prisma: PrismaService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const id = req.params['id'];
    const todo = await this.prisma.todo.findFirst({ where: { id } });

    if (req.user.id !== todo?.userId) throw new NotFoundException();

    return true;
  }
}
