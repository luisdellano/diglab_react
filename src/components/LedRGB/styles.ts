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
            case '11':
                return 'green';
            case '01':
                return 'yellow';
            case '10':
                return 'red';
            default:
                return 'blue';
        }
    }};

    > p {
        font-size: 3.6rem;
        color: white;
    }
`;
