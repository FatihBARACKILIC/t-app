import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ArgonService } from 'src/shared/services/argon/argon.service';

@Injectable()
export class PasswordControlGuard implements CanActivate {
  constructor(private readonly argonService: ArgonService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const http = context.switchToHttp();
    const req = http.getRequest();

    const isMatch = await this.argonService.verify(
      req.user.password,
      req.body.password,
    );

    if (!isMatch) throw new UnauthorizedException();

    return true;
  }
}
