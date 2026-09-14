interface CodeInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    actionType: 'copy' | 'submit';
    onAction: () => void;
}

export type { CodeInputProps };
