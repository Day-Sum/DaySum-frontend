interface DateWheelPickerProps {
    value: Date;
    onChange: (date: Date) => void;
}

interface WheelColumnProps {
    items: number[];
    value: number;
    formatter?: (value: number) => string;
    onChange: (value: number) => void;
}

export type {
    DateWheelPickerProps,
    WheelColumnProps,
};
