import { BookDto } from '@courswebservice/common/resource/book';
import { Test } from '@nestjs/testing';
import { BookEntityWithId } from './book.entity';
import { BookMapper } from './book.mapper';

describe('BookMapper', () => {
  let mapper: BookMapper;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BookMapper],
    }).compile();

    mapper = module.get<BookMapper>(BookMapper);
  });

  describe('mapEntityToDto', () => {
    it('should return a dto', () => {
      const entity: BookEntityWithId = {
        id: '123',
        title: 'title',
        description: 'description',
        publication: new Date(),
        Likecon: 100,
      };
      const expectedDtoStructure: BookDto = {
        id: '',
        likeCount: 0,
        publicationDate: '',
        summary: '',
        title: '',
      };

      const result = mapper.mapEntityToDto(entity);

      expect(result).toBeDefined();
      expect(result).not.toBeNull();
      Object.keys(expectedDtoStructure).forEach((element) => {
        expect(Object.keys(result)).toContain(element);
        expect(typeof result[element]).toBe(
          typeof expectedDtoStructure[element]
        );
      });
    });

    it('should return a dto with undefined publicationDate', () => {
      const entity: BookEntityWithId = {
        id: '123',
        title: 'title',
        description: 'description',
        publication: null,
        Likecon: 100,
      };

      const result = mapper.mapEntityToDto(entity);

      expect(result.publicationDate).toBeUndefined();
    });
  });

  describe('mapEntitiesToDtos', () => {
    it('should return array of Dto', () => {
      const entities: BookEntityWithId[] = [
        {
          description: '',
          id: '',
          Likecon: 0,
          publication: new Date(),
          title: '',
        },
        {
          description: '',
          id: '',
          Likecon: 0,
          publication: null,
          title: '',
        },
      ];

      const result = mapper.mapEntitiesToDtos(entities);

      expect(result).toBeInstanceOf(Array);
    });

    it('should return array of Dto with the same size as array of Entity', () => {
      const entities: BookEntityWithId[] = [
        {
          description: '',
          id: '',
          Likecon: 0,
          publication: new Date(),
          title: '',
        },
        {
          description: '',
          id: '',
          Likecon: 0,
          publication: null,
          title: '',
        },
      ];

      const result = mapper.mapEntitiesToDtos(entities);

      expect(result.length).toBe(entities.length);
    });

    it('should return an empty array', () => {
      const entities: BookEntityWithId[] = [];

      const result = mapper.mapEntitiesToDtos(entities);

      expect(result.length).toBe(0);
    });

    it('should return undefined if null array of Entity', () => {
      const entities: BookEntityWithId[] = null;

      const result = mapper.mapEntitiesToDtos(entities);

      expect(result).toBeUndefined();
    });
  });
});
