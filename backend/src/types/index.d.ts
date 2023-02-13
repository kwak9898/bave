import { Beach } from '../domains/beach/entity/beach.entity';
import { Users } from '../domains/user/entity/user.entity';

declare global {
  namespace Express {
    export interface Request {
      user?: Users;
      beach?: Beach;
      userId?: number;
    }
  }
}
