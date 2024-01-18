import { Body, Request, Controller, Get, Param, Post, Response, UseGuards, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateShortnerUrisDto } from './dto/create-shortner-uris.dto';
import { ShortnerUrisDto } from './dto/shortner-uris.dto';
import { AuthDto } from '../auth/dto/auth.dto';
import { ShortnerUrisService } from './shortner-uris.service';
import * as express from 'express';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/local-auth.guard';

@Controller()
@ApiTags('Encurtar URL')
export class ShortnerUrisController {

    constructor(
      private readonly shortnerUrisService: ShortnerUrisService,
      private readonly authService: AuthService
    ) { }


    @UseGuards(JwtAuthGuard)
    @Get('/api/v1/urls')
    @ApiOperation({ summary: 'Retorna a lista de URLs' })
    @ApiBearerAuth()
    async findAll() {
      return this.shortnerUrisService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/api/v1/urls/:id')
    @ApiOperation({ summary: 'Deleta uma url da lista de URLs' })
    @ApiBearerAuth()    
    async remove(@Param('id') id: number) {
      return this.shortnerUrisService.deleteById(id);
    }

    @Post('/api/v1/shortner-uris')
    @ApiOperation({ summary: 'Cria e retorna uma url encurtada' })
    async createShortUri (@Body() createShortnerUrisDto: CreateShortnerUrisDto): Promise<ShortnerUrisDto> {
        return await this.shortnerUrisService.createShortUri(createShortnerUrisDto);
    }

    @Get('/api/v1/:shortUri')
    @ApiOperation({ summary: 'Redireciona para a url original a partir da url encurtada' })
    async redirectToOriginalUri (@Param('shortUri') shortUri: string, @Response() response: express.Response) {
        const shortnerUrisDto = await this.shortnerUrisService.getOriginalUri(shortUri);
        return response.redirect(302, shortnerUrisDto.url);
    }
    
    @UseGuards(LocalAuthGuard)
    @Post('/api/v1/auth/login')
    @ApiBody({ type: AuthDto })
    @ApiOperation({ summary: 'Realiza a autenticação do usuário' })
    async login(@Body() authDto: AuthDto) {
      return this.authService.login(authDto);
    }

    
}
