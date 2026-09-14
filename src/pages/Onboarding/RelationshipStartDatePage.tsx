import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button/Button';
import DateWheelPicker from '../../components/DateWheelPicker/DateWheelPicker';
import OnboardingLayout from '../../components/OnboardingLayout/OnboardingLayout';
import * as S from './RelationshipStartDatePage.styles';

const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

const RelationshipStartDatePage = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(() => {
        const savedDate = sessionStorage.getItem(
            'onboardingRelationshipStartedOn',
        );

        if (!savedDate) return new Date();

        const [year, month, day] = savedDate.split('-').map(Number);
        return new Date(year, month - 1, day);
    });

    const handleNext = () => {
        sessionStorage.setItem(
            'onboardingRelationshipStartedOn',
            formatDate(selectedDate),
        );

        navigate('/onboarding/invite');
    };

    return (
        <OnboardingLayout onBack={() => navigate('/home')}>
            <S.Content>
                <S.Title>
                    {'연인과\n언제부터 만나셨나요?'}
                </S.Title>

                <S.Description>
                    나중에 언제든 바꿀 수 있어요
                </S.Description>

                <S.PickerArea>
                    <DateWheelPicker
                        value={selectedDate}
                        onChange={setSelectedDate}
                    />
                </S.PickerArea>
            </S.Content>

            <S.Bottom>
                <Button
                    type="button"
                    onClick={handleNext}
                >
                    설정완료
                </Button>
            </S.Bottom>
        </OnboardingLayout>
    );
};

export default RelationshipStartDatePage;
