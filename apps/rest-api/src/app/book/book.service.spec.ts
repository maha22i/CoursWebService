import { BookDto } from '@courswebservice/common/resource/book';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';
import { mongoDbUri } from '../database.util';
import { BookEntity, BookEntityWithId, BookSchema } from './book.entity';
import { BookMapper } from './book.mapper';
import { BookService } from './book.service';

describe('BookService', () => {
  let service: BookService;
  let mapperMock: Partial<BookMapper>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(mongoDbUri),
        MongooseModule.forFeature([
          { name: BookEntity.name, schema: BookSchema },
        ]),
      ],
      providers: [BookService],
    })
      .useMocker((token) => {
        if (token === BookMapper) {
          mapperMock = {
            mapEntitiesToDtos: jest
              .fn<BookDto[], [BookEntityWithId[]]>()
              .mockReturnValue([
                {
                  id: '',
                  likeCount: 0,
                  publicationDate: '',
                  summary: '',
                  title: '',
                },
                {
                  id: '',
                  likeCount: 0,
                  publicationDate: '',
                  summary: '',
                  title: '',
                },
              ]),
          };
          return mapperMock;
        }
      })
      .compile();

    service = module.get<BookService>(BookService);
  }, 20000);

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an Observable', () => {
      const skip = 0;
      const limit = 10;

      const result = service.findAll(skip, limit);

      expect(result).toBeInstanceOf(Observable);
    });

    it('should stream of PaginatedItems', (done) => {
      const skip = 0;
      const limit = 10;

      const result = service.findAll(skip, limit);

      result.subscribe((data) => {
        expect(data).toBeTruthy();
        expect(typeof data).toBe('object');
        expect(data.items).toBeInstanceOf(Array);
        expect(Number.isInteger(data.count)).toBeTruthy();
        done();
      });
    });

    it('should call mapper.mapEntitiesToDtos one time', (done) => {
      const skip = 0;
      const limit = 10;

      const result = service.findAll(skip, limit);

      result.subscribe(() => {
        expect(mapperMock.mapEntitiesToDtos).toBeCalledTimes(1);
        done();
      });
    });
  });
});
