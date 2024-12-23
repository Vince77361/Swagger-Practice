import { ApiProperty } from '@nestjs/swagger';

export class PostEntity {
  @ApiProperty({
    description: '아이디',
  })
  id: string;
  @ApiProperty({
    description: '글 제목',
  })
  title: string;
  @ApiProperty({
    description: '글 내용',
  })
  content: string;
  @ApiProperty({
    description: '글 작성 날짜',
  })
  created_at: string;
}
