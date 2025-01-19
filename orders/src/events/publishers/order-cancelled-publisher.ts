import { Subjects, Publisher, OrderCancelledEvent } from '@pjtickets_repo/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}