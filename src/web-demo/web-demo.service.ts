import { Result } from '@badrap/result';
import { Injectable } from '@nestjs/common';
import { WebsiteDemoCreatedDto } from './dtos/web-demo-created.dto';
import { WebDemoRepository } from './web-demo.repository';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class WebDemoService {
  constructor(private webDemoRepository: WebDemoRepository) {}

  async createOne(params: {
    url: string;
    user: User;
  }): Promise<Result<WebsiteDemoCreatedDto, Error>> {
    const { url, user } = params;

    const websiteDemoCreateInput: Prisma.WebsiteDemoCreateInput = {
      url: url,
      author: {
        connect: {
          id: user.id,
        },
      },
    };

    const createWebsiteDemoResult = await this.webDemoRepository.createWebDemo({
      data: websiteDemoCreateInput,
    });

    if (createWebsiteDemoResult.isOk) {
      const createdWebDemo = createWebsiteDemoResult.value;
      const { url } = createdWebDemo;
      return Result.ok({ url: url, status: 'Pending' });
    } else {
      const e = createWebsiteDemoResult.error;
      return Result.err(e);
    }
  }
}
