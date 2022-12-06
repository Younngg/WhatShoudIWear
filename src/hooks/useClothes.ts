const useClothes = (temp?: number) => {
  if (temp) {
    switch (true) {
      case temp >= 28:
        return '민소매, 반팔, 반바지, 린넨 의류';
      case temp >= 23:
        return '반팔, 얇은 셔츠, 반바지, 면바지';
      case temp >= 20:
        return '얇은 가디건, 긴팔티, 면바지, 청바지';
      case temp >= 17:
        return '얇은 니트, 가디건, 맨투맨, 얇은 자켓, 면바지, 청바지';
      case temp >= 12:
        return '자켓, 가디건, 야상, 맨투맨, 니트, 스타킹, 청바지, 면바지';
      case temp >= 9:
        return '자켓, 트렌치코트, 야상, 니트, 스타킹, 청바지, 면바지';
      case temp >= 5:
        return '코트, 히트텍/내복, 니트, 청바지, 레깅스';
      case temp <= 4:
        return '패딩, 두꺼운 코트, 기모제품, 목도리, 히트텍/내복';
      default:
        return '데이터를 불러오지 못했습니다.';
    }
  }
  return '민소매, 반팔, 반바지, 린넨 의류, 셔츠, 면바지, 가디건, 긴팔티, 청바지, 맨투맨, 자켓, 니트, 야상, 트렌치코트, 스타킹, 코트, 히트텍/내복, 레깅스, 패딩, 목도리'.split(
    ', '
  );
};

export default useClothes;
