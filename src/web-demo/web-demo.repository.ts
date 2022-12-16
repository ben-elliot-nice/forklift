import { Result } from '@badrap/result';
import { Injectable } from '@nestjs/common';
import { Prisma, WebsiteDemo } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class WebDemoRepository {
  constructor(private prisma: PrismaService) {}
  async createWebDemo(params: {
    data: Prisma.WebsiteDemoCreateInput;
  }): Promise<Result<WebsiteDemo, Error>> {
    const { data } = params;
    try {
      const websiteDemo = await this.prisma.websiteDemo.create({ data });
      return Result.ok(websiteDemo);
    } catch (error) {
      return Result.err(error);
    }
  }
}
