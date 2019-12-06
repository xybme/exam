import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositonControllor } from './position.controllor';
import { PositionService } from './position.service';
import { PositionEntity } from './position.entity'

@Module({
  imports: [TypeOrmModule.forFeature([PositionEntity])],
  controllers: [PositonControllor],
  providers: [PositionService]
})
export class PositionModule {}