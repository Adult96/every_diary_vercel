import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CalendarContainer from '../styles/calendarStyle';

import moment from 'moment';
import styled from 'styled-components';

import { __getDiary } from '../redux/module/diary/diarySlice';
import Loading from '../components/Loading';

function CalendarPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [value, onChange] = useState(new Date());
  const [mark, setMark] = useState([]);

  const { isLoading, diary, isError } = useSelector(state => state.getDiary);

  useEffect(() => {
    dispatch(__getDiary());
  }, [dispatch]);

  useEffect(() => {
    const setDate = [...new Set(diary.map(v => v.date))];
    diary && setMark(setDate);
  }, [diary]);

  const handleCalendarDay = e => {
    const day = moment(e).format('YYYY-MM-DD');
    navigate(`/diary/${day}`);
  };

  //컴포넌트로 분리 하기
  const show = ({ date, view }) => {
    if (view === 'month') {
      if (mark.find(x => x === moment(date).format('YYYY-MM-DD'))) {
        return (
          <DotBox className='dotBox'>
            <Dot className='dot'></Dot>
          </DotBox>
        );
      }
    }
    return null;
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>에러</div>;
  return (
    <CalendarContainer>
      <Calendar
        onChange={onChange}
        onClickDay={handleCalendarDay}
        formatDay={(locale, date) => moment(date).format('DD')}
        value={value}
        tileContent={show}
      />
    </CalendarContainer>
  );
}

const DotBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dot = styled.div`
  position: absolute;
  top: 1px;
  height: 8px;
  width: 8px;
  background-color: #f87171;
  border-radius: 50%;
  display: flex;
  margin-left: 1px;
`;

export default CalendarPage;
