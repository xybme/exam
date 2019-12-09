import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultControllor } from './result.controllor'
import { ResultService } from './result.service'
import { ResultEntity } from './result.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([ResultEntity])
  ],
  controllers: [ResultControllor],
  providers: [ResultService],
  exports: [ResultService]
})
export class ResultModule {}