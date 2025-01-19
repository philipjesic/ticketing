import { Publisher, Subjects, TicketCreatedEvent } from '@pjtickets_repo/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}

