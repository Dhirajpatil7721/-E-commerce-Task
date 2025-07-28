// rabbitmq.service.ts (Publisher)
import { Injectable, OnModuleInit } from '@nestjs/common';
import { connect, Channel } from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit {
    private channel: Channel;

    async onModuleInit() {
        const connection = await connect('amqp://guest:guest@localhost:5672');
        this.channel = await connection.createChannel();
        await this.channel.assertQueue('customer_created');
    }

    async publishCustomerCreated(data: any) {
        this.channel.sendToQueue('customer_created', Buffer.from(JSON.stringify(data)));
        await this.channel.sendToQueue('customer_created', Buffer.from(JSON.stringify(data)));
    }

    async publishCustomerCreatedEvent(customer: any) {
    await this.channel.assertQueue('customer_created');
    await this.channel.sendToQueue('customer_created', Buffer.from(JSON.stringify(customer)));
}
}
// rabbitmq.service.ts (Publisher)
// import { Injectable, OnModuleInit } from '@nestjs/common';
// import { connect, Channel } from 'amqplib';

// @Injectable()
// export class RabbitMQService implements OnModuleInit {
//     private channel: Channel; // 📡 Channel to communicate with RabbitMQ

//     // 🔁 This runs when the module is initialized
//     async onModuleInit() {
//         const connection = await connect('amqp://guest:guest@rabbitmq:5672'); // 🔌 Connect to RabbitMQ server
//         this.channel = await connection.createChannel(); // 📲 Create a channel
//         await this.channel.assertQueue('customer_created'); // 📥 Ensure queue exists
//     }

//     // 📤 Publish data to 'customer_created' queue
//     async publishCustomerCreated(data: any) {
//         this.channel.sendToQueue(
//             'customer_created',
//             Buffer.from(JSON.stringify(data)) // 🔄 Convert object to Buffer
//         );
//     }
// }
