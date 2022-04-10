import LedRGB from 'components/LedRGB';
import useMQTT from 'hooks/useMQTT';
import { useEffect, useState } from 'react';
import * as S from './styles';

const HomeTemplate = () => {
    const {
        mqttConnect,
        connectStatus,
        mqttSubscribe,
        payload,
        s0,
        s1,
        s2,
        s3,
        s4,
        s5,
        client
    } = useMQTT();
    const [letters, setLetters] = useState([] as string[]);

    function timeout(delay: number) {
        return new Promise((res) => setTimeout(res, delay));
    }

    useEffect(() => {
        setLetters(payload.split(''));
    }, [payload]);

    const handleStart = async () => {
        mqttConnect();
    };

    useEffect(() => {
        if (client) {
            mqttSubscribe('E1');
            mqttSubscribe('S0');
            mqttSubscribe('S1');
            mqttSubscribe('S2');
            mqttSubscribe('S3');
            mqttSubscribe('S4');
            mqttSubscribe('S5');
        } else {
            console.log('sem cliente');
        }
    }, [client]);

    const [rgb0, setRgb0] = useState('00');
    const [rgb1, setRgb1] = useState('00');
    const [rgb2, setRgb2] = useState('00');
    const [rgb3, setRgb3] = useState('00');
    const [rgb4, setRgb4] = useState('00');

    useEffect(() => {
        if (s5 === '1') {
            switch (s2 + s1 + s0) {
                case '000':
                    setRgb0(s4 + s3);
                    break;
                case '001':
                    setRgb1(s4 + s3);
                    break;
                case '010':
                    setRgb2(s4 + s3);
                    break;
                case '011':
                    setRgb3(s4 + s3);
                    break;
                case '100':
                    setRgb4(s4 + s3);
                    break;

                default:
                    break;
            }
        }
    }, [s5]);

    return (
        <S.Container>
            <S.Wrapper>
                <S.Top>
                    <S.Title>Jogo Da Senha</S.Title>
                    <S.StatusWrapper>
                        <S.Text>{connectStatus}</S.Text>
                        <S.Status connected={connectStatus} />
                    </S.StatusWrapper>
                </S.Top>
                {/* <S.Guess>{payload}</S.Guess> */}
                <S.Bot>
                    <S.RGBWrapper>
                        <LedRGB letter={letters[0]} signal={rgb0} />
                        <LedRGB letter={letters[1]} signal={rgb1} />
                        <LedRGB letter={letters[2]} signal={rgb2} />
                        <LedRGB letter={letters[3]} signal={rgb3} />
                        <LedRGB letter={letters[4]} signal={rgb4} />
                    </S.RGBWrapper>
                </S.Bot>
                {connectStatus === 'Connected' ? (
                    <></>
                ) : (
                    <S.BeginButton onClick={() => handleStart()}>
                        Começar
                    </S.BeginButton>
                )}
            </S.Wrapper>
        </S.Container>
    );
};
export default HomeTemplate;
