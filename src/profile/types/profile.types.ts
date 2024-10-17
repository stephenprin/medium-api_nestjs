import { UserTypes } from './../../user/types/user.type';
export type ProfileType = UserTypes & { following: boolean };
