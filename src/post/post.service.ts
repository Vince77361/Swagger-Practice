import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllPosts() {
    return await this.prisma.post.findMany();
  }

  async getPostById(id: string) {
    return await this.prisma.post.findUnique({ where: { id } });
  }

  async getPostsByQuery(q: string) {
    const query = q.replace(/\s+/g, '');
    return await this.prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
            },
          },
        ],
      },
    });
  }

  async createPost(dto: CreatePostDTO) {
    const { title, content } = dto;

    return await this.prisma.post.create({
      data: {
        title,
        content,
      },
    });
  }

  async updatePost(id: string, dto: UpdatePostDTO) {
    const { title, content } = dto;

    return await this.prisma.post.update({
      where: { id },
      data: {
        title,
        content,
      },
    });
  }

  async deletePost(id: string) {
    await this.prisma.post.delete({ where: { id } });
  }
}
