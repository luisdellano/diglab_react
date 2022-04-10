import { IClientOptions, connect, MqttClient } from 'mqtt';

type connectData = (data: {
    password: string;
    port: number;
    keepalive: number;
    host: string;
    clientId: string;
    username: string;
}) => MqttClient;

type subscribeData = (data: { topic: string; client: MqttClient }) => void;
type publishData = (data: {
    topic: string;
    client: MqttClient;
    payload: string;
}) => void;

export default class MQTTServices {
    static connectBroker: connectData = ({
        host,
        keepalive,
        password,
        port,
        clientId,
        username
    }) => {
        const url = `ws://${host}:${port}/mqtt`;

        const options: IClientOptions = {
            clientId,
            username,
            password,
            keepalive,
            protocolId: 'MQTT',
            protocolVersion: 4,
            clean: true,
            reconnectPeriod: 1000,
            connectTimeout: 30 * 1000,
            will: {
                topic: 'WillMsg',
                payload: 'Connection Closed abnormally..!',
                qos: 0,
                retain: false
            },
            rejectUnauthorized: false
        };

        return connect(url, options);
    };

    static publishTopic: publishData = ({ client, topic, payload }) => {
        client.publish(topic, payload, { qos: 0 }, () => {
            console.log('hier');
        });
    };

    static subscribeTopic: subscribeData = ({ topic, client }) => {
        client.subscribe(
            `grupo2-bancadaA3/${topic}`,
            { qos: 0 },
            (err: Error) => {
                console.log(err);
            }
        );
    };
}
