import { UserEntity } from '@app/user/user.entity';

export type UserTypes = Omit<UserEntity, 'hashPassword'>;
