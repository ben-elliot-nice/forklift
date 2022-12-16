import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateWebDemoDto {
  @IsNotEmpty()
  @IsUrl({
    require_protocol: true,
    require_valid_protocol: true,
  })
  url: string;
}
