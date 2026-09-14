import * as S from './CodeInput.styles';
import type { CodeInputProps } from './CodeInput.types';

const CodeInput = ({
    actionType,
    onAction,
    ...props
}: CodeInputProps) => {
    return (
        <S.Container>
            <S.Input {...props} />

            <S.ActionButton
                type="button"
                aria-label={
                    actionType === 'copy'
                        ? '커플 코드 복사'
                        : '커플 코드로 연결'
                }
                onClick={onAction}
                disabled={props.disabled}
            >
                {actionType === 'copy' ? (
                    <S.CopyIcon />
                ) : (
                    <S.SubmitIcon />
                )}
            </S.ActionButton>
        </S.Container>
    );
};

export default CodeInput;
