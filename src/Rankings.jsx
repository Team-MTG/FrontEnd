import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState, useRecoilValueLoadable } from 'recoil';
import { rankingsState, pageNum, rankList } from './atoms/rankings';
import { userBalanceState, userNameState, userRankState, userRateState } from './atoms/user';
import { generateRandomNumList } from './utils/random';
import { MAX_PHASE } from './config';
import replayBtn from './assets/replayBtn.svg';
import useIntersect from './hooks/useIntersect'; //무한스크롤
import { useRef } from 'react';
import axios from 'axios';
import Loading from './Loading';
import prettyKorNum from './utils/prettyKorNum';

function RankItem({ nickname, profit, total, rank }) {
  console.log(rank, nickname, profit, total);
  return (
    <div
      className={
        rank % 2 === 0
          ? 'w-full bg-zinc-500 h-[62px] p-2 flex'
          : 'w-full bg-zinc-700 h-[62px] p-2 flex'
      }
    >
      <p className="basis-1/5 ml-2 text-white">{rank}위</p>
      <p className="basis-1/5 ml-2 text-amber-300">{nickname}</p>
      <div className="basis-1/2 grid justify-items-end text-white">
        <div>{prettyKorNum(total)}원</div>
        <div className="text-sm">{profit} %</div>
      </div>
    </div>
  );
}

function Rankings() {
  const rankings = useRecoilValue(rankingsState);
  const userCash = useRecoilValue(userBalanceState);
  const userRank = useRecoilValue(userRankState);

  const [pageCount, setPage] = useRecoilState(pageNum);
  //const pageCount = useRecoilValue(pageNum);
  const [list, setList] = useRecoilState(rankList);
  // const [list, setList] = useState([]);
  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(true);

  //Suspense 대체 위해서
  const loadable = useRecoilValueLoadable(rankingsState);

  useEffect(() => {
    console.log(rankings);
    setList((prevList) => [...prevList, ...rankings]); //변한 아톰 값을 리스트에 추가해서 보여주기
    setIsLoaded(true);
  }, [pageCount, rankings]);

  useEffect(() => {
    setList(rankings);
  }, []);

  const [_, setRef] = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    setIsLoaded(false);
    setPage((prev) => prev + 1); //페이지가 변하면 알아서 아톰으로 값 불러옴
    observer.observe(entry.target);
  }, {});

  //현재 주소 가져옴
  //const url = encodeURI(window.location.href);
  //테스트용으로 가능한 주소인 노션 주소 넣음

  // <Loading msg="랭킹을 서버에 등록하는 중..." />

  return (
    <>
      {loadable.state === 'loading' && pageCount === 1 ? (
        <div className="text-lg">{pageCount}</div>
      ) : (
        <div className="bg-[url('../src/assets/bg-rankpage.svg')] bg-no-repeat bg-center h-[38rem] mt-[8vh] max-w-sm mx-auto flex flex-col items-center">
          <div className=" border-[1px] border-gray-600  w-[280px] h-[70px]  mt-[3vh] p-1 bg-white">
            <div className="p-1 w-[268px] h-[58px] bg-amber-300">
              <p className="ml-2">나의 순위 : {userRank.rank}위</p>
              <div className="flex ml-2">
                <p className="">
                  {prettyKorNum(userCash)}원
                  <span className="text-xs">&nbsp; &#40;{userRank.profit.toFixed(2)}&#41;%</span>
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
              {list.map((rank, index) => (
                <RankItem
                  key={index}
                  nickName={rank.nickname}
                  profit={rank.profit.toFixed(2)}
                  total={rank.totalYield}
                  rank={rank.ranking}
                />
              ))}
              {isLoaded && (
                <p className="mt-3" ref={setRef}>
                  Loading...
                </p>
              )}
            </div>
          </div>
          <button className="mt-1" onClick={() => navigate('/')}>
            <img src={replayBtn} />
          </button>
          <footer className="text-sm text-gray-700 mt-4">
            <button
              onClick={() => {
                const shareUrl = `${window.location.origin}/share?sharedNumber${encodeURIComponent(
                  '123'
                )}`;
                window.navigator.clipboard.writeText(shareUrl).then(() => console.log('복사완료!'));
              }}
            >
              url 복사
            </button>
          </footer>
        </div>
      )}
    </>
  );
}

export default Rankings;
