import { Message } from './message.model';

export interface Conversation {
  id: string;
  parentId: string;
  directeurId: string;
  garderieId: string;
  messages: Message[];
  derniereMiseAJour: string;
  messagesNonLus: number;
  dernierMessage?: Message;
  otherUserName?: string;
  nurseryName?: string;
}
