import styled from 'styled-components';

interface StatusProps {
    connected: string; // '?' -> significa que é propriedade opcional, do contrário obrigatórioa
}

export const Title = styled.h1`
    font-size: 6rem;
    color: #e5e5e5;
`;

export const Container = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #000000;
    padding: 10rem;
`;

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: #14213d;
    border-radius: 1.6rem;
    padding: 1rem;
`;

export const Top = styled.div``;

export const Bot = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

export const ButtonWrapper = styled.div`
    background-color: #fca311;
`;

export const StatusWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const Status = styled.div<StatusProps>`
    color: white;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 0.6rem;
    background-color: ${(props) =>
        props.connected === 'Connected' ? 'green' : 'red'};
`;

export const RGBWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 2.4rem;
`;

export const BeginButton = styled.button`
    font-size: 2rem;
    border-radius: 0.8rem;
    margin-bottom: 0.8rem;
    padding: 0.8rem;
    background-color: #fca311;
    color: #e5e5e5;
    border-style: none;
    :hover {
        background-color: #fb8500;
    }
`;

export const Text = styled.p`
    color: white;
    font-size: 1.2rem;
    margin-right: 0.4rem;
`;

export const Guess = styled.p`
    color: white;
    font-size: 2.4rem;
`;
