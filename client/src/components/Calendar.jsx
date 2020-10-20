import React, { useState } from 'react'

import DatePicker from 'react-datepicker'


const MyCalendar = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            isClearable
            placeholderText="Choose date!"
        />
    );
};

export default MyCalendar