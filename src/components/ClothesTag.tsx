import React, { useState, useEffect } from 'react';

type Props = {
  hashArr: [] | string[];
  setHashArr: React.Dispatch<React.SetStateAction<[] | string[]>>;
  allHashtags: string[] | [];
};

const ClothesTag = ({ hashArr, setHashArr, allHashtags }: Props) => {
  const [hashtag, setHashtag] = useState<string>('');
  const [error, setError] = useState('');

  const onChangeClothes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHashtag(e.target.value);
  };

  // clothes에 쉼표 입력시 hashtag로 바꿔줌
  useEffect(() => {
    if (hashtag.includes(',')) {
      setHashArr((cur: string[]) => {
        const arr = hashtag.split(',');
        if (cur.includes(arr[0])) {
          return [...cur];
        }
        return [...cur, arr[0]];
      });
      setHashtag((cur: string) => {
        const arr = cur.split(',');
        return arr[1];
      });
    }
  }, [hashtag, setHashArr]);

  // hashtag 10개 넘지 못하게 하는 함수
  useEffect(() => {
    if (hashArr.length > 10) {
      setHashArr((cur: string[]) => {
        const arr = [...cur].slice(0, -1);
        return arr;
      });
      setHashtag('');
      setError('10가지를 초과할 수 없습니다.');
    }
  }, [hashArr, setHashArr]);

  const onDeleteHashTag = (index: number) => {
    setHashArr((cur: string[]) => {
      const arr = [...cur];
      arr.splice(index, 1);
      return arr;
    });
  };

  const onClickHashtag = (e: any) => {
    const selected = e.target.innerHTML;

    setHashArr((cur: string[]) => {
      return [...cur, selected];
    });
  };

  return (
    <>
      <div className='mb-1'>
        <div className='sm:flex w-full border rounded-md p-2 gap-2'>
          <ul className='flex flex-wrap gap-2 selected-tag-list'>
            {hashArr.map((tag, index) => (
              <li key={index} className='flex border rounded-full px-3 py-1'>
                {tag}
                <button
                  type='button'
                  className='ms-2'
                  onClick={() => {
                    onDeleteHashTag(index);
                  }}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          <input
            className='outline-none'
            placeholder={hashArr.length >= 1 ? '' : '옷'}
            value={hashtag}
            onChange={onChangeClothes}
          />
        </div>
      </div>
      <span>{error}</span>
      <div className='border rounded-md w-full flex  flex-wrap'>
        {allHashtags
          .sort((a, b) => {
            return a.localeCompare(b);
          })
          .map((tag, index) => (
            <div
              key={index}
              className='px-3 py-1 m-1 border text-sky-500 w-fit rounded-full hover:bg-sky-500 hover:text-white hover:border-sky-500'
              onClick={onClickHashtag}
            >
              {tag}
            </div>
          ))}
      </div>
    </>
  );
};

export default ClothesTag;
