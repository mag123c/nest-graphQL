import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/user.service';
import { Post } from '../entities/post.entity';
import { PostService } from '../post.service';
import { PostResolver } from '../resolver/post.resolver';

describe('PostResolver', () => {
  let resolver: PostResolver;
  let postService: PostService;

  const mockPostService = {
    findAll: jest.fn(),
  };

  const mockUserService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostResolver,
        {
          provide: PostService,
          useValue: mockPostService,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    resolver = module.get<PostResolver>(PostResolver);
    postService = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('posts', () => {
    it('should return an array of posts', async () => {
      const result: Post[] = [
        {
          id: 1,
          title: 'Test Post',
          content: 'Test Content',
          authorId: 1,
          author: new User(),
          comments: [],
          likes: 0,
          createdAt: new Date(),
        },
      ];

      mockPostService.findAll.mockResolvedValue(result);

      expect(await resolver.posts()).toBe(result);
      expect(mockPostService.findAll).toHaveBeenCalled();
    });

    it('should return an empty array if no posts found', async () => {
      const result: Post[] = [];
      mockPostService.findAll.mockResolvedValue(result);

      expect(await resolver.posts()).toBe(result);
      expect(mockPostService.findAll).toHaveBeenCalled();
    });
  });
});
