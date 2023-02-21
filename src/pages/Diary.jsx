import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { AiFillFileAdd } from 'react-icons/ai';

import { __getDiary } from '../redux/module/diary/diarySlice';
import { deleteDiary } from '../redux/module/diary/diarySlice';

import styled from 'styled-components';
import Button from '../element/Button';
import DiaryItem from '../components/DiaryItem';
import Loading from '../components/Loading';

export default function Diary() {
  const { date } = useParams();
  const dispatch = useDispatch();

  const { isLoading, diary, isError } = useSelector(state => state.getDiary);

  useEffect(() => {
    dispatch(__getDiary());
  }, [dispatch]);

  const handleDeleteDiary = async id => {
    deleteDiary(id, () => {
      dispatch(__getDiary());
    });
  };

  // return <Loading />;
  if (isLoading) return <Loading />;
  if (isError) return <div>에러</div>;
  return (
    <>
      <Ul>
        {diary
          .filter(item => item.date === date)
          .map((item, index) => (
            <Container key={index}>
              <Link to={`/diary/${date}/${item.id}`} state={{ ...item }}>
                <DiaryItem diary={item} />
              </Link>
              <BtnBox>
                <Button
                  width='3rem'
                  height='1.5rem'
                  click={() => {
                    handleDeleteDiary(item.id);
                  }}
                >
                  삭제
                </Button>
              </BtnBox>
            </Container>
          ))}
        <ItemAdd>
          <Link to={`/diary/${date}/add`} state={{ date }}>
            <Button width='100%' height='15rem' fontSize='4rem'>
              <AiFillFileAdd />
            </Button>
          </Link>
        </ItemAdd>
      </Ul>
    </>
  );
}

const Ul = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  width: 100%;
  height: 65vh;
  padding: 1rem;
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 0 0 1rem 1rem;
  overflow-y: scroll;
`;

const Container = styled.div`
  position: relative;
`;

const BtnBox = styled.div`
  position: absolute;
  right: 10px;
  display: flex;
  justify-content: end;
  transform: translateY(-2rem);
`;

const ItemAdd = styled.div`
  height: 15rem;
`;
