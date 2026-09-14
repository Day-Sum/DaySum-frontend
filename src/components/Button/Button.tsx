import * as S from './Button.styles';
import type { ButtonProps } from './Button.types';

const Button = ({ children, ...props }: ButtonProps) => {
    return <S.Button {...props}>{children}</S.Button>;
};

export default Button;
