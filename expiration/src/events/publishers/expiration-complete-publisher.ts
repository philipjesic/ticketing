import { Subjects, Publisher, ExpirationCompleteEvent } from '@pjtickets_repo/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}