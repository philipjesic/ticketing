import { Subjects, Publisher, PaymentCreatedEvent } from "@pjtickets_repo/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}