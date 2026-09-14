interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    width?: string;
}

interface ButtonStylesProps {
    width?: string;
}

export type {
    ButtonProps,
    ButtonStylesProps,
};
