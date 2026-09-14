import styled from '@emotion/styled';

import type { ButtonStylesProps } from './Button.types';

const Button = styled.button<ButtonStylesProps>`
    width: ${({ width }) => width || '100%'};
    height: 64px;
    padding: 0 24px;

    border: none;
    border-radius: 12px;

    background: #3c3c3c;
    color: #ffffff;

    font-size: 18px;
    font-weight: 500;

    cursor: pointer;

    transition:
            background 0.15s ease,
            color 0.15s ease;

    &:not(:disabled):active {
        background: #2f2f2f;
    }

    &:disabled {
        background: #e2e2e2;
        color: #b8b8b8;
        cursor: not-allowed;
    }
`;

export { Button };