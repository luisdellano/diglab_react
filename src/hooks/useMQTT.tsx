import { MqttClient } from 'mqtt';

import { createContext, useContext, useEffect, useState } from 'react';
import MQTTServices from 'services/MQTTservices';

interface MQTTContextData {
    mqttConnect(): void;
    connectStatus: string;
    client: MqttClient;
    mqttSubscribe(topic: string): void;
    payload: string;
    s0: string;
    s1: string;
    s2: string;
    s3: string;
    s4: string;
    s5: string;
}
const MQTTContext = createContext<MQTTContextData>({} as MQTTContextData);

export const MQTTProvider: React.FC = ({ children }) => {
    const [client, setClient] = useState(null as unknown as MqttClient);
    const [payload, setPayload] = useState('');
    const [s0, setS0] = useState('0');
    const [s1, setS1] = useState('0');
    const [s2, setS2] = useState('0');
    const [s3, setS3] = useState('0');
    const [s4, setS4] = useState('0');
    const [s5, setS5] = useState('0');
    const [connectStatus, setConnectStatus] = useState('Disconnected');

    const mqttConnect = () => {
        console.log('start');
        setConnectStatus('Connecting');
        console.log(client);
        setClient(
            MQTTServices.connectBroker({
                clientId: 'mqttjs_12352',
                host: 'labdigi.wiseful.com.br',
                keepalive: 60,
                password: 'L@Bdygy2A3',
                port: 80,
                username: 'grupo2-bancadaA3'
            })
        );
        console.log(client);

        setConnectStatus('Connected');
    };

    useEffect(() => {
        if (client) {
            client.on('connect', () => {
                setConnectStatus('Connected');
            });
            client.on('error', (err) => {
                console.error('Connection error: ', err);
                client.end();
            });
            client.on('reconnect', () => {
                setConnectStatus('Reconnecting');
            });
            client.on('message', (topic, message) => {
                // console.log(topic);
                switch (topic) {
                    case 'grupo2-bancadaA3/S0':
                        setS0(message.toString());
                        break;
                    case 'grupo2-bancadaA3/S1':
                        setS1(message.toString());
                        break;
                    case 'grupo2-bancadaA3/S2':
                        setS2(message.toString());
                        break;
                    case 'grupo2-bancadaA3/S3':
                        setS3(message.toString());
                        break;
                    case 'grupo2-bancadaA3/S4':
                        setS4(message.toString());
                        break;
                    case 'grupo2-bancadaA3/E1':
                        setPayload(message.toString());
                        break;
                    default:
                        break;
                }
                // console.log(message.toString());
            });
        }
    }, [client]);

    const mqttSubscribe = (topic: string) => {
        if (client) {
            MQTTServices.subscribeTopic({ topic, client });
        }
    };
    return (
        <MQTTContext.Provider
            value={{
                client,
                mqttConnect,
                connectStatus,
                mqttSubscribe,
                payload,
                s0,
                s1,
                s2,
                s3,
                s4,
                s5
            }}
        >
            {children}
        </MQTTContext.Provider>
    );
};

const useMQTT = () => useContext(MQTTContext);
export default useMQTT;
