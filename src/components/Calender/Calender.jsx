import React, { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Box, IconButton } from '@mui/material';
import DownArrow from '../../assets/icons/DownArrow'; // Giữ icon cũ
import format from 'date-fns/format';

const Calender = ({ dateChange }) => {
  const [startDate, setDate] = useState(new Date());
  const today = new Date();

  const CustomInput = forwardRef(({ onClick }, ref) => (
    <IconButton onClick={onClick} ref={ref} sx={{ ml: 1 }}>
      <DownArrow />
    </IconButton>
  ));

  const selectDateHandler = (d) => {
    setDate(d);
    dateChange(format(d, 'yyyy/MM/dd'));
  };

  return (
    <Box
      className="date-picker-wrapper"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        '& .react-datepicker-wrapper': {
          width: 'auto',
        },
        '& .react-datepicker__input-container': {
          display: 'none', // Ẩn ô input mặc định
        },
        '& .react-datepicker-popper': {
          zIndex: 1500, // đảm bảo hiển thị trên các layer khác
        },
      }}
    >
      <DatePicker
        dateFormat="yyyy/MM/dd"
        selected={startDate}
        onChange={selectDateHandler}
        customInput={<CustomInput />}
        minDate={today}
        todayButton="Today"
        popperPlacement="bottom"
        popperModifiers={[
          {
            name: 'flip',
            options: {
              fallbackPlacements: ['bottom'],
            },
          },
        ]}
      />
    </Box>
  );
};

export default Calender;
