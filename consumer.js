const amqp = require('amqplib')

const connect = async () => {
    try {
        // ============ consumer 县创建链接 
        const connection = await amqp.connect("amqp://localhost:5672")
        
        // ============ consumer 开始建立通道, 然后开始寻找queue
        const channel = await connection.createChannel();
        await channel.assertQueue("jobs")

        await channel.consume("jobs", (message) => {
            console.log('收到信息', message.content.toString())
            channel.ack(message) // => 这个ack就是不用回复的意思
            /**
             * 这边有个问题，会莫名其妙的收到很多遍相同的信息
             * 重新启动consumer之后，会收到之前的东西，因为他们都被存在queue里面
             */
        })


        console.log('consumer is waing for message')
        
    } catch (error) {
        console.error(error)
    }
}

connect()