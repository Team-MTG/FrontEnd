import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { generateRandomNumList } from './utils/random';
import { MAX_PHASE } from './config';
import { rankingsState } from './atoms/rankings';
import { useEffect } from 'react';
import { userCashState, userNameState, userRankState, userRateState } from './atoms/user';

function RankItem({ nickName, profit, total, rank }) {
  return (
    <div className="w-full rounded-lg border-2 border-gray-500 mt-3 p-4 flex">
      <div className="basis-1/4 ">{rank}</div>
      <div className="basis-1/4">
        <p>{nickName}</p>
        <p className="text-gray-500">{profit} %</p>
      </div>
      <p className="basis-1/2 grid justify-items-end">{total.toLocaleString('ko-KR')}원</p>
    </div>
  );
}

function SharePage() {
  const navigate = useNavigate();

  let { params } = useParams();

  const [userName, setUserName] = useRecoilState(userNameState);

  useEffect(() => {
    setUserName(params);
  }, []);

  const rankings = useRecoilValue(rankingsState);
  const userCash = useRecoilValue(userCashState);
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
    <div className="h-screen max-w-sm mx-auto flex flex-col justify-center items-center">
      <div className="w-full rounded-lg border-4 border-orange-300 p-4 flex">
        <div className="basis-1/4 ">{userRank}</div>
        <div className="basis-1/4">
          <p>{userName}</p>
          <p className="text-gray-500">{profit} %</p>
        </div>
        <p className="basis-1/2 grid justify-items-end">{total.toLocaleString('ko-KR')} 원</p>
      </div>
      <div className="overflow-y-scroll w-full">
        {rankings.map((rank) => (
          <RankItem
            key={rank.id}
            rank={rank.rank}
            nickName={rank.name}
            profit={rank.rate.toFixed(2)}
            total={rank.totalCash}
          />
        ))}
      </div>
      <button
        className="my-10 w-full bg-orange-400 disabled:bg-gray-300 border-2 rounded-2xl border-gray-800 border-solid"
        onClick={gamePlay}
      >
        게임하러 고고!
      </button>
    </div>
  );
}

export default SharePage;
