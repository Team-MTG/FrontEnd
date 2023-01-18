import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { rankingsState } from './atoms/rankings';
import { userBalanceState, userNameState, userRankState, userRateState } from './atoms/user';
import { generateRandomNumList } from './utils/random';
import { MAX_PHASE } from './config';
import replayBtn from './assets/replayBtn.png';

function RankItem({ nickName, profit, total, rank }) {
  const [st, setSt] = useState('w-full bg-zinc-500 h-[60px] p-2 flex');

  if (rank % 2 != 0) {
    setSt('w-full bg-zinc-700 h-[60px] p-2 flex');
  }

  return (
    <div className={st}>
      <p className="basis-1/5 ml-2 text-white">{rank}위</p>
      <p className="basis-1/5 ml-2 text-amber-300">{nickName}</p>
      <div className="basis-1/2 grid justify-items-end text-white">
        <p>{total.toLocaleString('ko-KR')}원</p>
        <p className="text-sm">{profit} %</p>
      </div>
    </div>
  );
}

function Rankings() {
  const rankings = useRecoilValue(rankingsState);
  const userCash = useRecoilValue(userBalanceState);
  const userName = useRecoilValue(userNameState);
  const userRate = useRecoilValue(userRateState);
  const userRank = useRecoilValue(userRankState);

  console.log(rankings);

  const navigate = useNavigate();

  //현재 주소 가져옴
  //const url = encodeURI(window.location.href);
  //테스트용으로 가능한 주소인 노션 주소 넣음
  const url = 'http://localhost:5173/share' + '/username=' + userName; //url에는 현재 주소값을 넣어줌;

  //url 복사
  const copyURL = () => {
    const textarea = document.createElement('textarea');

    document.body.appendChild(textarea); //</body> 바로 위에 textarea를 추가(임시 공간이라 위치는 상관 없음)

    textarea.value = url; // textarea 값에 url를 넣어줌
    textarea.select(); //textarea를 설정
    document.execCommand('copy'); // 복사
    document.body.removeChild(textarea); //extarea 요소를 없애줌
    /* setOpen(true);
    setTimeout(function () {
      setOpen(false);
    }, 2000); // 2000ms(2초)가 경과하면 이 함수가 실행됩니다.*/
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
      <div className="border-[1px] border-gray-700  w-[280px] h-[70px]  mt-[3vh] p-1 bg-white">
        <div className="p-1 w-[268px] h-[58px] bg-amber-300">
          <p className="ml-2">나의 순위 : {userRank}위</p>
          <div className="flex ml-2">
            <p>{userCash.toLocaleString('ko-KR')} 원</p>
            <span className="text-xs inline-block align-bottom">
              &nbsp; &#40;{(userRate * 100).toFixed(2)}&#41;%
            </span>
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
              key={rank.id}
              rank={rank.rank}
              nickName={rank.name}
              profit={rank.rate.toFixed(2)}
              total={rank.totalCash}
            />
          ))}
        </div>
      </div>
      <img className="mt-1" src={replayBtn} onClick={replay} />
      <footer className="text-sm text-gray-700 mt-4">
        <button onClick={copyURL}>url 복사</button>
      </footer>
    </div>
  );
}

export default Rankings;
