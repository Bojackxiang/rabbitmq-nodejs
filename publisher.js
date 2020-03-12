const amqp = require('amqplib')

const connect = async () => {
    try {
        const test = {hello: 'world'}
        // ============ 县创建链接 
        const connection = await amqp.connect("amqp://localhost:5672")
        
        // ============ 有了链接之后穿件通信管道 + 一个带着名称的队列 
        const channel = await connection.createChannel();
        const queueResult = await channel.assertQueue("jobs")
        
        // ============ 开始发送 （⚠️这里只能发送string）
        channel.sendToQueue("jobs", Buffer.from(JSON.stringify(test)))

        
        // ============ close the channel  
        // channel.close();
        // connection.close();

        console.log('job sended ✅')
        // await connection.close();
    } catch (error) {
        console.error(error)
    }
}

connect()

module.exports = {
    connect,
}

