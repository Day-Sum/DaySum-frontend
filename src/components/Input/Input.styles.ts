import styled from '@emotion/styled';

import type { InputStylesProps } from './Input.types';

const InputContainer = styled.div<{ width?: string }>`
    width: ${({ width }) => width || '100%'};
`;

const InputWrapper = styled.input<InputStylesProps>`
    width: 100%;
    height: 56px;

    padding: 0 8px;

    border: none;
    border-bottom: 1px solid
        ${({ status }) =>
            status === 'error' ? '#d84a4a' : 'transparent'};

    background: transparent;
    color: #3c3c3c;

    text-align: ${({ align }) => align};
    font-size: 30px;
    font-weight: 300;

    &::placeholder {
        color: #b8b8b8;
    }

    &:focus {
        border-bottom-color: rgba(60, 60, 60, 0.18);
    }

    &:disabled {
        cursor: not-allowed;
        color: #b8b8b8;
    }
`;

const Message = styled.p<{ status: InputStylesProps['status'] }>`
    margin: 8px 0 0;

    text-align: center;
    font-size: 13px;

    color: ${({ status }) =>
        status === 'error' ? '#d84a4a' : '#707070'};
`;

export {
    InputContainer,
    InputWrapper,
    Message,
};
