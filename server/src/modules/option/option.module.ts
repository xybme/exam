import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionControllor } from './option.controllor';
import { OptionService } from './option.service';
import { OptionEntity } from './option.entity'

@Module({
  imports: [TypeOrmModule.forFeature([OptionEntity])],
  controllers: [OptionControllor],
  providers: [OptionService],
  exports: [OptionService]
})
export class OptionModule {}