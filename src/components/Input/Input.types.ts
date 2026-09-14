type InputStatus = 'default' | 'error' | 'success' | 'disabled';
type InputAlign = 'left' | 'center';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    status?: InputStatus;
    message?: string;
    width?: string;
    align?: InputAlign;
}

interface InputStylesProps {
    status: InputStatus;
    width?: string;
    align: InputAlign;
}

export type {
    InputAlign,
    InputProps,
    InputStatus,
    InputStylesProps,
};
