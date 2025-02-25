// import { ImageInterface } from './image.interface';
import { SkillInterface } from './skill.interface';

export interface DuacodeInterface {
  id?: string;
  nif?: string;
  name?: string;
  biografy?: string;
  departament?: string;
  workstation?: string;
  skills?: SkillInterface[];
  imageUrl?: string;
  omeletOnion?: boolean;
  birthdate?: Date;
  is_deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
