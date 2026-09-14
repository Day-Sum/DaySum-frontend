import * as S from './Input.styles';
import type { InputProps } from './Input.types';

const Input = ({
    status = 'default',
    message,
    width,
    align = 'left',
    ...props
}: InputProps) => {
    const isDisabled = status === 'disabled';

    return (
        <S.InputContainer width={width}>
            <S.InputWrapper
                status={status}
                align={align}
                disabled={isDisabled || props.disabled}
                {...props}
            />

            {message && (
                <S.Message status={status}>
                    {message}
                </S.Message>
            )}
        </S.InputContainer>
    );
};

export default Input;
