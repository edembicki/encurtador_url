import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateShortnerUrisDto } from '../dto/create-shortner-uris.dto';
import { ShortnerUrisDto } from '../dto/shortner-uris.dto';
import { ShortnerUrisRepository } from '../repositories/shortner-uris.repository';
import { Observable, from } from 'rxjs';
import { ShortnerUris } from '../entities/shortner-uris.entity';
import { ShortnerUrisDtoBuilder } from '../dto/shortner-uris-dto.builder';

@Injectable()
export class ShortnerUrisService {

    private MINIMAL_SHORT_URI_SIZE = 5;

    constructor(
        @InjectRepository(ShortnerUrisRepository)
        private readonly shortnerUrisRepository: ShortnerUrisRepository
    ) { }

    async createShortUri (createShortnerUris: CreateShortnerUrisDto): Promise<ShortnerUrisDto> {
        const shortnerUris = createShortnerUris.toEntity();
        await shortnerUris.initialize();

        if (shortnerUris.shortUri.length < this.MINIMAL_SHORT_URI_SIZE) {
            throw new InternalServerErrorException('Não foi possível gerar a url curta');
        }

        await this.shortnerUrisRepository.save(shortnerUris);

        return shortnerUris.toDtoWithNewUrl();
    }

    async getOriginalUri (shortUri: string): Promise<ShortnerUrisDto> {
        if(shortUri){
          const shortnerUris = await this.shortnerUrisRepository.findOne({ shortUri });

          if (!shortnerUris) {
            throw new NotFoundException('Não foi possível encontrar a url informada');
          }

          const currentDate = new Date();
          if (currentDate > shortnerUris.expiration) {
              throw new BadRequestException('A url solicitada expirou');
          }

          return shortnerUris.toDtoWithUrl();
        }
    }

    async findAll(): Promise<ShortnerUrisDto[]> {
      const shortnerUrisList: ShortnerUris[] = await this.shortnerUrisRepository.find();
      
      const shortnerUrisDtoList: ShortnerUrisDto[] = shortnerUrisList.map(shortnerUris => {
          const urlWithSchema = shortnerUris.setSchema(shortnerUris.url);
          
          return new ShortnerUrisDtoBuilder()
              .withId(shortnerUris.id)
              .withUrl(urlWithSchema)
              .withNewUrl(shortnerUris.shortUri)
              .withCount(shortnerUris.clickCount)
              .build();
      });
      
      return shortnerUrisDtoList;
    }

    async deleteById(id: number): Promise<void> {
      await this.shortnerUrisRepository.delete(id);
    }

}
