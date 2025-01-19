import { Publisher, OrderCreatedEvent, Subjects } from "@pjtickets_repo/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}