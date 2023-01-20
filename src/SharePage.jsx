import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { generateRandomNumList } from './utils/random';
import { MAX_PHASE, SEED_MONEY } from './config';
import { useEffect, useState } from 'react';
import replayBtn from './assets/sharePlay.svg';

import { sharingsState, shareList } from './atoms/sharings';
import prettyKorNum from './utils/prettyKorNum';

function RankItem({ nickname, profit, total, rank }) {
  if (rank % 2 != 0) {
    return (
      <div className="w-full bg-zinc-700 h-16 p-2 flex">
        <p className="basis-1/5 ml-2 text-white">{rank}위</p>
        <p className="basis-1/5 ml-2 text-amber-300">{nickname}</p>
        <div className="basis-1/2 grid justify-items-end text-white">
          <div>{prettyKorNum(total)}원</div>
          <div className="text-sm">{profit}%</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full bg-zinc-500 h-16 p-2 flex">
        <p className="basis-1/5 ml-2 text-white">{rank}위</p>
        <p className="basis-1/5 ml-2 text-amber-300">{nickname}</p>
        <div className="basis-1/2 grid justify-items-end text-white">
          <div>{prettyKorNum(total)}원</div>
          <div className="text-sm">{profit} %</div>
        </div>
      </div>
    );
  }
}

function SharePage() {
  const navigate = useNavigate();

  let params = useParams();

  const sharing = useRecoilValue(sharingsState(params.sharedNumber));

  const [list, setList] = useRecoilState(shareList);

  const myNickname = sharing.nickname;
  const [myRank, setMyRank] = useState(sharing.myRank);
  const [myProfit, setMyProfit] = useState(sharing.myProfit);
  const [myYield, setMyYield] = useState(sharing.myYield);

  useEffect(() => {
    setList(sharing.otherRanking);
  }, []);

  //게임하기 버튼 클릭 시
  const gamePlay = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className="bg-[url('../src/assets/bg-rankpage.svg')] relative bg-no-repeat bg-center h-[38rem] mt-[8vh] max-w-sm mx-auto flex flex-col items-center">
      <div className=" top-0 left-0 border-[1px] border-gray-700  w-[280px] h-[70px]  mt-[3vh] p-1 bg-white">
        <div className="p-1 w-full h-full bg-amber-300">
          <p className="ml-2">
            {myNickname}&nbsp;님의 순위 : {myRank}위
          </p>
          <div className="flex ml-2">
            <p>
              {prettyKorNum(myYield + SEED_MONEY)}원
              <span className="text-xs">&nbsp; &#40;{myProfit.toFixed(2)}&#41;%</span>
            </p>
          </div>
        </div>
      </div>
      <div className=" mt-1 border-[1px] border-gray-700 w-[280px] h-[24rem] p-1 bg-white">
        <div className="p-1 w-full h-14 bg-amber-300">
          <p className="ml-2 text-lg">전체 순위</p>
          <div className="flex">
            <p className="basis-1/5 ml-2">순위</p>
            <p className="basis-1/5 ml-2">탑승객</p>
            <p className="basis-1/2 ml-2 grid justify-items-end">금액 &#40;수익률&#41;</p>
          </div>
        </div>
        <div className="h-[19.5rem] overflow-y-scroll mt-1 no-scrollbar">
          {list.map((rank) => (
            <RankItem
              key={rank.idx}
              nickname={rank.nickname}
              profit={rank.profit.toFixed(2)}
              total={rank.yield + SEED_MONEY}
              rank={rank.rank}
            />
          ))}
        </div>
      </div>
      <button className="mt-2 bg-[url('../src/assets/replayBtn.svg')]" onClick={gamePlay}>
        <img src={replayBtn} />
      </button>
    </div>
  );
}

export default SharePage;
