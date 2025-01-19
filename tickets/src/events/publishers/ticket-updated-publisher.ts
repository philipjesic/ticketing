import { Publisher, Subjects, TicketUpdatedEvent } from '@pjtickets_repo/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
