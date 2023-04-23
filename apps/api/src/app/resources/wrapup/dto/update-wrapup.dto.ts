import { PartialType } from '@nestjs/mapped-types';
import { CreateWrapupDto } from './create-wrapup.dto';

export class UpdateWrapupDto extends PartialType(CreateWrapupDto) {}
