import { Controller } from '@nestjs/common';
import { AvatarSettingsService } from './avatar-settings.service';

@Controller({ path: 'avatar-settings', version: '1' })
export class AvatarSettingsController {
  constructor(private readonly avatarSettingsService: AvatarSettingsService) {}
}
