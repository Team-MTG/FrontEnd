import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { rankingsState, pageNum, rankList } from './atoms/rankings';
import { userCashState, userNameState, userRankState, userRateState } from './atoms/user';
import { generateRandomNumList } from './utils/random';
import { MAX_PHASE } from './config';
import replayBtn from './assets/replayBtn.svg';
import useIntersect from './hooks/useIntersect'; //무한스크롤
import { useRef } from 'react';

function RankItem({ nickName, profit, total, rank }) {
  if (rank % 2 != 0) {
    return (
      <div className="w-full bg-zinc-700 h-[62px] p-2 flex">
        <p className="basis-1/5 ml-2 text-white">{rank}위</p>
        <p className="basis-1/5 ml-2 text-amber-300">{nickName}</p>
        <div className="basis-1/2 grid justify-items-end text-white">
          <div>{total.toLocaleString('ko-KR')}원</div>
          <div className="text-sm">{profit} %</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full bg-zinc-500 h-[62px] p-2 flex">
        <p className="basis-1/5 ml-2 text-white">{rank}위</p>
        <p className="basis-1/5 ml-2 text-amber-300">{nickName}</p>
        <div className="basis-1/2 grid justify-items-end text-white">
          <div>{total.toLocaleString('ko-KR')}원</div>
          <div className="text-sm">{profit} %</div>
        </div>
      </div>
    );
  }
}

function Rankings() {
  const rankings = useRecoilValue(rankingsState);
  const userCash = useRecoilValue(userCashState);
  const userName = useRecoilValue(userNameState);
  const userRate = useRecoilValue(userRateState);
  const userRank = useRecoilValue(userRankState);

  const [pageCount, setPage] = useRecoilState(pageNum);
  const [list, setList] = useRecoilState(rankList);
  // const [list, setList] = useState([]);
  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(false);
  const page = useRef(pageCount);

  const [_, setRef] = useIntersect((entry, observer) => {
    console.log('범위탈출~~');
    observer.unobserve(entry.target);
    setPage(pageCount + 1);
    setIsLoaded(true);
    setOpen(true);
    setTimeout(function () {
      setIsLoaded(false);
    }, 5000); // 2000ms(2초)가 경과하면 이 함수가 실행됩니다
    observer.observe(entry.target);
  }, {});

  useEffect(() => {
    // console.log(rankings.length);
    // console.log(rankings);
    setList(rankings);
    //rankings.map((rank) => setList([...list, rank]));
  }, []);

  useEffect(() => {
    console.log(list);
    //  console.log(rankings);

    /* for (let i = 0; i < rankings.length; i++) {
      //console.log('i: ', rankings[i]);
      const newData = rankings[i];
      console.log('i: ', newData);
      setList([newData, ...list]);
    }*/
    rankings.map((rank) => setList([...list, rank]));
    // console.log(list);
  }, [pageCount]);

  //현재 주소 가져옴
  //const url = encodeURI(window.location.href);
  //테스트용으로 가능한 주소인 노션 주소 넣음
  const url = 'http://localhost:5173/share' + '/' + userName; //url에는 현재 주소값을 넣어줌;

  //url 복사
  const copyURL = () => {
    const textarea = document.createElement('textarea');

    document.body.appendChild(textarea); //</body> 바로 위에 textarea를 추가(임시 공간이라 위치는 상관 없음)

    textarea.value = url; // textarea 값에 url를 넣어줌
    textarea.select(); //textarea를 설정
    document.execCommand('copy'); // 복사
    document.body.removeChild(textarea); //extarea 요소를 없애줌s
  };

  //다시하기 버튼 클릭 시
  const replay = () => {
    navigate('/game', {
      state: {
        stockIndexList: generateRandomNumList(MAX_PHASE, 27),
      },
    });
  };

  return (
    <div className="bg-[url('../src/assets/bg-rankpage.svg')] bg-no-repeat bg-center h-[38rem] mt-[8vh] max-w-sm mx-auto flex flex-col items-center">
      <div className=" border-[1px] border-gray-600  w-[280px] h-[70px]  mt-[3vh] p-1 bg-white">
        <div className="p-1 w-[268px] h-[58px] bg-amber-300">
          <p className="ml-2">나의 순위 : {userRank}위</p>
          <div className="grid grid-rows-3 grid-flow-col gap-4 ml-2">
            <p className="row-span-3">{userCash.toLocaleString('ko-KR')} 원</p>
            <p className="text-xs row-span-2 col-span-2">
              &nbsp; &#40;{(userRate * 100).toFixed(2)}&#41;%
            </p>
          </div>
        </div>
      </div>
      <div className=" mt-1 border-[1px] border-gray-600 w-[280px] h-[400px] p-1 bg-white">
        <div className="p-1 w-[268px] h-[58px] bg-amber-300">
          <p className="ml-2 text-lg">전체 순위</p>
          <div className="flex">
            <p className="basis-1/5 ml-2">순위</p>
            <p className="basis-1/5 ml-2">탑승객</p>
            <p className="basis-1/2 ml-2 grid justify-items-end">금액 &#40;수익률&#41;</p>
          </div>
        </div>
        <div className="h-[310px] overflow-y-scroll mt-1">
          {list.map((rank) => (
            <RankItem
              nickName={rank.nickName}
              profit={rank.profit.toFixed(2)}
              total={rank.totalYield}
              rank={rank.ranking}
            />
          ))}
          {isLoaded && <p ref={setRef}>Loading...</p>}
        </div>
      </div>
      <button className="mt-1 bg-[url('../src/assets/replayBtn.svg')]" onClick={replay}>
        <img src={replayBtn} />
      </button>
      <footer className="text-sm text-gray-700 mt-4">
        <button onClick={copyURL}>url 복사</button>
      </footer>
    </div>
  );
}

export default Rankings;
