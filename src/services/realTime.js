import mqtt from 'mqtt';
import { logger } from './logger';

const lastData = {};
const emitSocket = [];

const initSocketServer = (server) => {
    /**
     * Create the socket connection.
     */

    const io = require('socket.io')(server);

    /**
     * Create the MQTT client to connect to the MQTT Broker
     */

    const mqttHost = process.env.MQTT_HOST || 'localhost';
    const mqttPort = parseInt(process.env.MQTT_PORT) || 1883;
    const client = mqtt.connect(`mqtt://${mqttHost}:${mqttPort}`, {
        username: process.env.MQTT_USERNAME,
        password: process.env.MQTT_PASSWORD
    });

    /**
     * Subscribe to the topic
     */

    client.on('connect', function () {
        logger.info('MQTT CONNECTION START');
        client.subscribe(process.env.MQTT_TOPIC || 'Plant/Data');
        client.subscribe(process.env.MQTT_ERROR_TOPIC || 'Plant/Error');
    });


    client.on('message', function (topic, payload) {

        if (topic === (process.env.MQTT_TOPIC || 'Plant/Data')) {
            const msg = JSON.parse(payload.toString());
            msg.time = new Date(msg.time[0], msg.time[1] - 1, msg.time[2], msg.time[3], msg.time[4], msg.time[5]);

            if (!lastData[msg.container_ID]) {
                logger.info(
                    `Container ${msg.container_ID} connected.`
                );
            }
            lastData[msg.container_ID] = msg;

            emitData({
                light: msg.light,
                soilHumid: msg.soil_humi,
                container: msg.container_ID
            });
        } else if (topic === (process.env.MQTT_ERROR_TOPIC || 'Plant/Error')) {
            const msg = JSON.parse(payload.toString());
            logger.error(`Container ${msg.container_ID} sent error:`, msg.errors);
        }
    });

    /**
     * Websocket will emit the message when the client get the response from the topic
     */

    io.on('connection', function (socket) {
        const emit = (msg) => socket.emit(process.env.SOCKET_TOPIC || 'Plant/Data', msg);

        socket.on('disconnect', () => {
            const index = emitSocket.indexOf(emit);
            if (index !== -1) emitSocket.splice(index, 1);
        });

        emitSocket.push(emit);

        socket.on(process.env.SOCKET_REQ_DATA || 'lastData', (msg) => {
            if (lastData[msg]) {
                socket.emit(process.env.SOCKET_TOPIC || 'Plant/Data', {
                    light: lastData[msg].light,
                    soilHumid: lastData[msg].soil_humi,
                    container: lastData[msg].container_ID
                });
            }
        });

    });

    setInterval(() => {
        for (const data of Object.keys(lastData)) {
            if (!lastData[data]) continue;

            const now = new Date();
            const valid = new Date(lastData[data].time);
            valid.setSeconds(valid.getSeconds() + lastData[data].valid);
            if (now > valid) {
                logger.info(
                    `Data of container ${lastData[data].container_ID} expired.`
                );
                emitData({
                    light: '---',
                    soilHumid: '--.--',
                    container: lastData[data].container_ID
                });
                delete lastData[data];
            }
        }
    }, 1000);
};

const emitData = (data) => {
    emitSocket.forEach((x) => x(data));
};

export { initSocketServer };
