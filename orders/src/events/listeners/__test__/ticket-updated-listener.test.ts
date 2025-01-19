import { TicketUpdatedListener } from "../ticket-updated-listener";
import { TicketCreatedEvent, TicketUpdatedEvent } from "@pjtickets_repo/common";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket";
import { Message } from "node-nats-streaming";
import mongoose from "mongoose";


const setup = async () => {
    // Create a listener
    const listener = new TicketUpdatedListener(natsWrapper.client);

    // Create and save a ticket
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20
    });
    await ticket.save()

    // Create a fake data object
    const data: TicketCreatedEvent['data'] = {
        id: ticket.id,
        version: ticket.version + 1,
        title: 'new concert',
        price: 999,
        userId: 'asdasd',
    }

    // Create a fake msg object
    // @ts-ignore
    const message: Message = {
        ack: jest.fn()
    }

    // return all of this stuff
    return { message, data, ticket, listener };
};

it('find, updates, and saves a ticket', async () => {
    const { message, data, ticket, listener } = await setup();

    await listener.onMessage(data, message);

    const udpatedTicket = await Ticket.findById(ticket.id);

    expect(udpatedTicket!.title).toEqual(data.title);
    expect(udpatedTicket!.price).toEqual(data.price);
    expect(udpatedTicket!.version).toEqual(data.version);
});

it('acks the message', async () => {
    const { message, data, listener } = await setup();

    await listener.onMessage(data, message);

    expect(message.ack).toHaveBeenCalled();
});

it('does not call ack if the event has a skipped version number', async () => {
    const { message, data, listener, ticket } = await setup();

    data.version = 10;

    try {
        await listener.onMessage(data, message);
    } catch (err) {}
    
    expect(message.ack).not.toHaveBeenCalled();
});