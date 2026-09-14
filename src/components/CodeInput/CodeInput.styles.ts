import styled from '@emotion/styled';

const Container = styled.div`
    position: relative;

    width: 100%;
`;

const Input = styled.input`
    width: 100%;
    height: 64px;
    padding: 0 64px 0 18px;

    border: 1px solid #dddddd;
    border-radius: 12px;

    background: rgba(255, 255, 255, 0.92);
    color: #3c3c3c;

    font-size: 20px;
    font-weight: 400;
    letter-spacing: 1px;

    &::placeholder {
        color: #b7b7b7;
        letter-spacing: 0;
    }

    &:focus {
        border-color: #b9aa92;
    }
`;

const ActionButton = styled.button`
    position: absolute;
    right: 8px;
    top: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 48px;
    height: 48px;
    padding: 0;

    background: transparent;
    color: #424242;

    cursor: pointer;
    transform: translateY(-50%);

    &:disabled {
        color: #b8b8b8;
        cursor: not-allowed;
    }
`;

const CopyIcon = styled.span`
    position: relative;

    display: block;

    width: 23px;
    height: 23px;

    &::before,
    &::after {
        content: '';
        position: absolute;

        width: 14px;
        height: 17px;

        border: 2px solid currentColor;
        border-radius: 3px;
        background: #ffffff;
    }

    &::before {
        left: 1px;
        top: 1px;
    }

    &::after {
        right: 1px;
        bottom: 1px;
    }
`;

const SubmitIcon = styled.span`
    position: relative;

    display: block;

    width: 17px;
    height: 17px;

    border-top: 2px solid currentColor;
    border-right: 2px solid currentColor;

    transform: rotate(45deg);
`;

export {
    ActionButton,
    Container,
    CopyIcon,
    Input,
    SubmitIcon,
};
