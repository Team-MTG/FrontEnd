import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { generateRandomNumList } from './utils/random';
import { MAX_PHASE } from './config';
import { rankingsState } from './atoms/rankings';
import { useEffect } from 'react';
import { userBalanceState, userNameState, userRankState, userRateState } from './atoms/user';
import replayBtn from './assets/replayBtn.svg';

function RankItem({ nickName, profit, total, rank }) {
  return (
    <div
      className={
        rank % 2 === 0
          ? 'w-full bg-zinc-500 h-[60px] p-2 flex'
          : 'w-full bg-zinc-700 h-[60px] p-2 flex'
      }
    >
      <p className="basis-1/5 ml-2 text-white">{rank}위</p>
      <p className="basis-1/5 ml-2 text-amber-300">{nickName}</p>
      <div className="basis-1/2 grid justify-items-end text-white">
        <p>{total.toLocaleString('ko-KR')}원</p>
        <p className="text-sm">{profit} %</p>
      </div>
    </div>
  );
}

function SharePage() {
  const navigate = useNavigate();
  const params = useParams();
  const [userName, setUserName] = useRecoilState(userNameState);

  useEffect(() => {
    setUserName(params.nickname);
  }, []);

  const rankings = useRecoilValue(rankingsState);
  const userCash = useRecoilValue(userBalanceState);
  const userRate = useRecoilValue(userRateState);
  const userRank = useRecoilValue(userRankState);

  //게임하기 버튼 클릭 시
  const gamePlay = () => {
    navigate('/', {
      state: {
        stockIndexList: generateRandomNumList(MAX_PHASE, 27),
      },
    });
  };

  return (
    <div className="bg-[url('../src/assets/bg-rankpage.svg')] bg-no-repeat bg-center h-[38rem] mt-[8vh] max-w-sm mx-auto flex flex-col items-center">
      <div className="static">
        <div className="bg-gray-500 w-[500px] h-[500px]">
          <div className="absolute top-0 left-0 border-[1px] border-gray-700  w-[280px] h-[70px]  mt-[3vh] p-1 bg-white">
            <div className="p-1 w-[268px] h-[58px] bg-amber-300">
              <p className="ml-2">나의 순위 : {userRank}위</p>
              <div className="flex ml-2">
                <p>{userCash.toLocaleString('ko-KR')} 원</p>
                <span className="text-xs inline-block align-baseline">
                  &nbsp; &#40;{(userRate * 100).toFixed(2)}&#41;%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-1 border-[1px] border-gray-700 w-[280px] h-[400px] p-1 bg-white">
        <div className="p-1 w-[268px] h-[58px] bg-amber-300">
          <p className="ml-2 text-lg">전체 순위</p>
          <div className="flex">
            <p className="basis-1/5 ml-2">순위</p>
            <p className="basis-1/5 ml-2">탑승객</p>
            <p className="basis-1/2 ml-2 grid justify-items-end">금액 &#40;수익률&#41;</p>
          </div>
        </div>
        <div className="h-[310px] overflow-y-scroll mt-1">
          {rankings.map((rank) => (
            <RankItem
              key={rank.nickName}
              rank={rank.ranking}
              nickName={rank.nickName}
              profit={rank.profit.toFixed(2)}
              total={rank.totalYield}
            />
          ))}
        </div>
      </div>
      <div className="overflow-y-scroll w-full"></div>
      <button className="mt-1 bg-[url('../src/assets/replayBtn.svg')]" onClick={gamePlay}>
        <img src={replayBtn} />
      </button>
    </div>
  );
}

export default SharePage;
