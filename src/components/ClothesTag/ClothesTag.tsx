import React, {
  useState,
  useEffect,
  ReactSVG,
  MouseEvent,
  MouseEventHandler,
} from 'react';
import { Form } from 'react-bootstrap';
import './clothesTag.css';
import HashtagRepository from './../../service/hashtagRepository';

interface ClothesTagProps {
  hashArr: [] | string[];
  setHashArr: React.Dispatch<React.SetStateAction<[] | string[]>>;
  hashtagRepository: HashtagRepository;
  allHashtags: string[] | [];
}

const ClothesTag: React.FC<ClothesTagProps> = ({
  hashArr,
  setHashArr,
  hashtagRepository,
  allHashtags,
}) => {
  const [hashtag, setHashtag] = useState<string>('');

  const [allHashtag, setAllHashtag] = useState<string[] | []>([]);
  const [error, setError] = useState('');

  const onChangeClothes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHashtag(e.target.value);
  };

  // hashtags get
  useEffect(() => {
    hashtagRepository.syncHashtags((tags: any) => {
      setAllHashtag(tags);
    });
  }, [hashtagRepository]);

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
      <div className='form-control mb-1'>
        <div className='d-flex'>
          <ul className='d-flex flex-wrap'>
            {hashArr.map((tag, index) => (
              <li
                key={index}
                className='d-flex me-2 border rounded-pill px-3 py-1'
              >
                {tag}
                <button
                  type='button'
                  className='border-0 bg-transparent ms-2 delete-tag-btn'
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
            className='border border-0 outline-none'
            placeholder='옷'
            value={hashtag}
            onChange={onChangeClothes}
          />
        </div>
      </div>
      <span>{error}</span>
      <div className='border rounded all-tag-box w-100 d-flex align-items-self flex-wrap'>
        {allHashtags.map((tag, index) => (
          <div
            key={index}
            className='me-2 border rounded-pill px-3 py-1 hashtag-button btn-outline-info btn'
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
