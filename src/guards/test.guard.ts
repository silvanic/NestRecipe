import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TestGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    if (
      req.body &&
      req.body['name'] &&
      req.body['name'].toLowerCase().indexOf('trololo') != -1
    ) {
      return false;
    }
    return true;
  }
}
