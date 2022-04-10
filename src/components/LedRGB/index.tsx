import * as S from './styles';

export type LedRGBProps = {
    letter: string;
    signal: string;
};

const LedRGB: React.FC<LedRGBProps> = ({ signal, letter }) => (
    <S.Wrapper signal={signal}>
        <p>{letter}</p>
    </S.Wrapper>
);

export default LedRGB;
