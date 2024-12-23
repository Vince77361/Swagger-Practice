import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { PostEntity } from './entity/post.entity';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @ApiOperation({
    summary: '모든 글 불러오기',
    description: '데이터베이스에 존재하는 모든 글을 불러옵니다.',
  })
  @ApiOkResponse({
    type: PostEntity,
    isArray: true,
  })
  async getAllPosts() {
    return await this.postService.getAllPosts();
  }

  @Get('/search')
  @ApiOperation({
    summary: '글 검색하기',
    description: '제목을 기준으로 글을 불러옵니다.',
  })
  @ApiQuery({
    name: 'q',
    type: String,
    description: '책 제목 검색',
    required: true,
  })
  @ApiOkResponse({
    type: PostEntity,
    isArray: true,
  })
  async getPostsByQuery(@Query('q') q?: string) {
    return await this.postService.getPostsByQuery(q);
  }

  @Get(':id')
  @ApiOperation({
    summary: '글 찾기',
    description: '아이디에 해당하는 글을 불러옵니다.',
  })
  @ApiParam({
    name: 'id',
    description: '글 아이디로 찾기',
    type: String,
  })
  @ApiOkResponse({
    type: PostEntity,
    isArray: false,
  })
  @ApiNotFoundResponse()
  async getPostById(@Param('id') id: string) {
    return await this.postService.getPostById(id);
  }

  @Post()
  @ApiOperation({
    summary: '글 작성하기',
    description: '글을 작성합니다.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: '글 아이디',
        },
        title: {
          type: 'string',
          description: '글 제목',
        },
        content: {
          type: 'string',
          description: '글 내용',
        },
        created_at: {
          type: 'string',
          description: '글 작성 날짜',
        },
      },
    },
  })
  @ApiCreatedResponse({
    type: PostEntity,
  })
  async createPost(@Body() dto: CreatePostDTO) {
    return await this.postService.createPost(dto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '글 수정하기',
    description: '아이디에 해당하는 글을 수정합니다.',
  })
  @ApiParam({
    name: 'id',
    description: '글 아이디로 수정하기',
    type: String,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: '글 아이디',
        },
        title: {
          type: 'string',
          description: '글 제목',
        },
        content: {
          type: 'string',
          description: '글 내용',
        },
        created_at: {
          type: 'string',
          description: '글 작성 날짜',
        },
      },
    },
  })
  @ApiOkResponse({
    type: PostEntity,
    isArray: false,
  })
  @ApiNotFoundResponse()
  async updatePost(@Param('id') id: string, @Body() dto: UpdatePostDTO) {
    return await this.postService.updatePost(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '글 삭제하기',
    description: '아이디에 해당하는 글을 삭제합니다.',
  })
  @ApiParam({
    name: 'id',
    description: '글 아이디로 삭제하기',
    type: String,
  })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async deletePost(@Param('id') id: string) {
    await this.postService.deletePost(id);
  }
}
