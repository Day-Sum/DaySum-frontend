import { useEffect, useRef } from 'react';

import * as S from './DateWheelPicker.styles';
import type {
    DateWheelPickerProps,
    WheelColumnProps,
} from './DateWheelPicker.types';

const createRange = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, index) => start + index);

const WheelColumn = ({
    items,
    value,
    formatter = String,
    onChange,
}: WheelColumnProps) => {
    const columnRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const selectedIndex = items.indexOf(value);

        if (selectedIndex < 0 || !columnRef.current) return;

        columnRef.current.scrollTo({
            top: selectedIndex * S.ITEM_HEIGHT,
        });
    }, [items, value]);

    const handleScroll = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            if (!columnRef.current) return;

            const index = Math.round(
                columnRef.current.scrollTop / S.ITEM_HEIGHT,
            );
            const nextValue = items[Math.min(Math.max(index, 0), items.length - 1)];

            if (nextValue !== value) {
                onChange(nextValue);
            }
        }, 80);
    };

    const handleClick = (item: number) => {
        const index = items.indexOf(item);

        columnRef.current?.scrollTo({
            top: index * S.ITEM_HEIGHT,
            behavior: 'smooth',
        });

        onChange(item);
    };

    return (
        <S.Column ref={columnRef} onScroll={handleScroll}>
            {items.map((item) => (
                <S.Item
                    key={item}
                    type="button"
                    selected={item === value}
                    onClick={() => handleClick(item)}
                >
                    {formatter(item)}
                </S.Item>
            ))}
        </S.Column>
    );
};

const DateWheelPicker = ({
    value,
    onChange,
}: DateWheelPickerProps) => {
    const today = new Date();
    const currentYear = today.getFullYear();

    const year = value.getFullYear();
    const month = value.getMonth() + 1;
    const day = value.getDate();

    const years = createRange(currentYear - 80, currentYear);
    const months = createRange(1, 12);
    const daysInMonth = new Date(year, month, 0).getDate();
    const days = createRange(1, daysInMonth);

    const updateDate = (
        nextYear: number,
        nextMonth: number,
        nextDay: number,
    ) => {
        const maxDay = new Date(nextYear, nextMonth, 0).getDate();
        const safeDay = Math.min(nextDay, maxDay);
        const nextDate = new Date(nextYear, nextMonth - 1, safeDay);

        if (nextDate > today) {
            onChange(new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate(),
            ));
            return;
        }

        onChange(nextDate);
    };

    return (
        <S.Picker>
            <WheelColumn
                items={years}
                value={year}
                onChange={(nextYear) =>
                    updateDate(nextYear, month, day)
                }
            />

            <WheelColumn
                items={months}
                value={month}
                formatter={(item) => `${String(item).padStart(2, '0')}`}
                onChange={(nextMonth) =>
                    updateDate(year, nextMonth, day)
                }
            />

            <WheelColumn
                items={days}
                value={day}
                formatter={(item) => String(item).padStart(2, '0')}
                onChange={(nextDay) =>
                    updateDate(year, month, nextDay)
                }
            />
        </S.Picker>
    );
};

export default DateWheelPicker;
