import styled from 'styled-components';

interface Props {
    signal: string;
}
export const Wrapper = styled.div<Props>`
    margin-right: 6rem;
    height: 12rem;
    width: 12rem;
    border-radius: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => {
        switch (props.signal) {
            case '01':
                return 'green';
                break;
            case '10':
                return 'yellow';
                break;
            case '11':
                return 'red';
                break;
            default:
                return 'blue';
                break;
        }
    }};

    > p {
        font-size: 1.4rem;
        color: black;
    }
`;
