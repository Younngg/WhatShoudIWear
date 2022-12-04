import React, { useState, useEffect, ComponentProps, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import ClothesTag from '../ClothesTag/ClothesTag';
import './addPostForm.css';
import { getGeoWeather } from './../../service/weatherAPI';
import PostRepository from './../../service/postsRepository';
import HashtagRepository from './../../service/hashtagRepository';

const hashtagRepository = new HashtagRepository();

interface AddPostFormProps {
  postRepository: PostRepository;
  allHashtags: string[] | [];
}

const AddPostForm: React.FC<AddPostFormProps> = ({
  postRepository,
  allHashtags,
}) => {
  const [weather, setWeather] = useState<any>({
    weather: '',
    temp: 0,
  });
  const [tempInput, setTempInput] = useState('');
  const [hashArr, setHashArr] = useState<string[] | []>([]);
  const [error, setError] = useState('');

  const cityRef = useRef<HTMLSelectElement>(null);
  const weatherRef = useRef<HTMLSelectElement>(null);

  // 날씨 정보 get
  useEffect(() => {
    getGeoWeather((data: any) => {
      setWeather({
        weather: data.weather[0].description,
        temp: data.main.temp,
      });
      setTempInput(data.main.temp);
    });
  }, []);

  const onChangeTempInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempInput(e.target.value);
  };

  const onSubmitPost: ComponentProps<'form'>['onSubmit'] = (e) => {
    e.preventDefault();
    if (
      !hashArr.length ||
      !tempInput ||
      (cityRef.current && cityRef.current.value === '시/도')
    ) {
      setError('전체 항목을 입력해주세요');
      return;
    } else if (cityRef.current && weatherRef.current) {
      const date = new Date();
      const post = {
        id: Date.now(),
        hashtag: hashArr,
        city: cityRef.current.value,
        weather: weatherRef.current.value,
        temp: tempInput,
        date: date.toLocaleDateString('ko-kr'),
        userId: '',
      };
      postRepository.savePost(post);
      setHashArr([]);
      setError('');
    }
  };

  return (
    <Form className='add-post-form mb-5' onSubmit={onSubmitPost}>
      <div className='d-flex mb-3'>
        <div className='col-sm-1.5'>
          <Form.Select ref={cityRef}>
            <option value='시/도'>시/도</option>
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
          </Form.Select>
        </div>
        <div className='col-sm-1'>
          <Form.Control
            type='number'
            placeholder='기온'
            value={tempInput}
            onChange={onChangeTempInput}
          />
        </div>
        <div className='col-sm-2.5'>
          <Form.Select ref={weatherRef}>
            <option value={weather.weather}>{weather.weather}</option>
            <option value='맑음'>맑음</option>
            <option value='비'>비</option>
            <option value='눈'>눈</option>
            <option value='안개'>안개</option>
          </Form.Select>
        </div>
      </div>
      <ClothesTag
        hashArr={hashArr}
        setHashArr={setHashArr}
        hashtagRepository={hashtagRepository}
        allHashtags={allHashtags}
      />
      <Button className='mt-3' type='submit'>
        Submit
      </Button>
      {error && <span>{error}</span>}
    </Form>
  );
};

export default AddPostForm;
