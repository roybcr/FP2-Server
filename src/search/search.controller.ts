import { Controller, Get, Query } from '@nestjs/common';
import { ExtendedUserDto } from 'src/users/dto/extended-user.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  search(@Query('query') query: string) {
    return this.searchService.searchUsers(query);
  }
}
