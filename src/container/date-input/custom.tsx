import { forwardRef } from "react";

interface ICustomDateInput {
    value?: Date,
    onClick?: () => void,
}

const DateInputCustom = forwardRef<HTMLSpanElement, ICustomDateInput>(({ value, onClick }, ref) => (
    <div className="date-due-input">
        <span
            className="input"
            onClick={ onClick }
            ref={ ref }
        >
            { value }
        </span>
        <span className="date-due-icon input">
            <img width={ 21 } alt="calendar" src="./calendar.svg" />
        </span>
    </div>
));

export default DateInputCustom;
