import React from 'react';

type Props = {
  dates: string[] | [];

  setFilter: React.Dispatch<
    React.SetStateAction<{
      date: string;
      city: string;
      temp: string;
    }>
  >;
};

type FilterState = {
  date: string;
  city: string;
  temp: string;
};

const SELECT_STYLE = 'border border-blue-400 p-1 rounded-sm outline-none';

const Filter = ({ dates, setFilter }: Props) => {
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

  const onResetFilter = () => {
    setFilter((cur: FilterState) => ({ ...cur, date: '', city: '', temp: '' }));
  };

  return (
    <div className='flex items-center mb-3 gap-3'>
      <select
        onChange={onChangeFilter}
        id='dateFilter'
        className={SELECT_STYLE}
      >
        <option value=''>날짜</option>
        {dates.map((date, index) => (
          <option key={index} value={date}>
            {date}
          </option>
        ))}
      </select>
      <select
        onChange={onChangeFilter}
        id='cityFilter'
        className={SELECT_STYLE}
      >
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
      <select
        onChange={onChangeFilter}
        id='tempFilter'
        className={SELECT_STYLE}
      >
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
      <button
        onClick={onResetFilter}
        className='px-3 py-1 bg-blue-500 text-white rounded-sm'
      >
        초기화
      </button>
    </div>
  );
};

export default Filter;
