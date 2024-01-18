import { ApiProperty } from "@nestjs/swagger";
import { IsUrl } from "class-validator";
import { ShortnerUrisBuilder } from "../builders/shortner-uris.builder";
import { ShortnerUris } from "../entities/shortner-uris.entity";

export class CreateShortnerUrisDto {

    @IsUrl({}, { message: 'url inválida' })
    @ApiProperty({ name: 'url', description: 'URL que será encurtada', required: true })
    url: string;

    toEntity (): ShortnerUris {
        return new ShortnerUrisBuilder()
            .withUrl(this.url)
            .build();
    }

}