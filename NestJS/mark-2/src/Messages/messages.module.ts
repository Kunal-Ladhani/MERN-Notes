import { Module } from '@nestjs/common';
import { MessagesController } from './controllers/messages.controller';
import { MessagesService } from './services/messages.service';
import { MessagesRepository } from './repository/messages.repository';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, MessagesRepository]  // ThingsThatCanByUsedAsDependenciesForOtherClasses === PROVIDER
})
export class MessagesModule { }
