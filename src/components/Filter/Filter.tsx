import React, { useState } from 'react';
import { Posts } from '../../service/postsRepository';

type Props = {
  dates: string[] | [];
  setFilteredPosts: React.Dispatch<React.SetStateAction<Posts | false>>;
  posts: Posts;
};

type FilterState = {
  date: string;
  city: string;
  temp: string;
};

const Filter = ({ dates, setFilteredPosts, posts }: Props) => {
  const [filter, setFilter] = useState({ date: '', city: '', temp: '' });

  const onChangeFilter = (e: { target: { value: any; id: any } }) => {
    switch (e.target.id) {
      case 'dateFilter':
        setFilter((cur: FilterState) => ({ ...cur, date: e.target.value }));
        break;
      case 'cityFilter':
        setFilter((cur: FilterState) => ({ ...cur, city: e.target.value }));
        break;
      case 'tempFilter':
        setFilter((cur: FilterState) => ({
          ...cur,
          temp: e.target.value !== '' ? e.target.value.split('~') : '',
        }));
        break;
      default:
        return;
    }
  };

  const onFilter = () => {
    if (filter.city === '' && filter.date === '' && filter.temp === '') {
      setFilteredPosts(false);
    } else {
      setFilteredPosts(() => {
        const updated = { ...posts };
        Object.keys(updated).forEach((key: any) => {
          if (
            !updated[key]['date'].includes(filter.date) ||
            !updated[key]['city'].includes(filter.city) ||
            !(
              updated[key]['city'].includes(filter.temp) ||
              (updated[key]['temp'] > parseInt(filter.temp[0]) &&
                updated[key]['temp'] <= parseInt(filter.temp[1]))
            )
          ) {
            delete updated[key];
          }
        });
        return updated;
      });
    }
  };

  return (
    <div className='d-flex mb-3 filter'>
      <div className='me-3'>
        <select onChange={onChangeFilter} id='dateFilter'>
          <option value=''>날짜</option>
          {dates
            .sort((a, b) => {
              return new Date(b).valueOf() - new Date(a).valueOf();
            })
            .map((date, index) => (
              <option key={index} value={date}>
                {date}
              </option>
            ))}
        </select>
      </div>
      <div className='me-3'>
        <select onChange={onChangeFilter} id='cityFilter'>
          <option value=''>지역</option>
          <option value='강원도'>강원도</option>
          <option value='경기도'>경기도</option>
          <option value='경상남도'>경상남도</option>
          <option value='경상북도'>경상북도</option>
          <option value='광주'>광주</option>
          <option value='대구'>대구</option>
          <option value='대전'>대전</option>
          <option value='부산'>부산</option>
          <option value='서울'>서울</option>
          <option value='세종'>세종</option>
          <option value='울산'>울산</option>
          <option value='인천'>인천</option>
          <option value='전라남도'>전라남도</option>
          <option value='전라북도'>전라북도</option>
          <option value='제주도'>제주도</option>
          <option value='충청남도'>충청남도</option>
          <option value='충청북도'>충청북도</option>
        </select>
      </div>
      <div className='me-3'>
        <select onChange={onChangeFilter} id='tempFilter'>
          <option value=''>기온(°)</option>
          <option value='25~30'>25~30</option>
          <option value='20~25'>20~25</option>
          <option value='15~20'>15~20</option>
          <option value='10~15'>10~15</option>
          <option value='5~10'>5~10</option>
          <option value='0~5'>0~5</option>
          <option value='-5~0'>-5~0</option>
          <option value='-10~-5'>-10~-5</option>
        </select>
      </div>
      <button onClick={onFilter} className='btn btn-outline-primary'>
        적용하기
      </button>
    </div>
  );
};

export default Filter;
