import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { rankingsState } from './atoms/rankings';
import { userCashState, userNameState, userRankState, userRateState } from './atoms/user';
import { generateRandomNumList } from './utils/random';
import { MAX_PHASE } from './config';

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

function Rankings() {
  const rankings = useRecoilValue(rankingsState);
  const userCash = useRecoilValue(userCashState);
  const userName = useRecoilValue(userNameState);
  const userRate = useRecoilValue(userRateState);
  const userRank = useRecoilValue(userRankState);

  const navigate = useNavigate();

  //현재 주소 가져옴
  //const url = encodeURI(window.location.href);
  //테스트용으로 가능한 주소인 노션 주소 넣음
  const url = window.document.location.href + '/username=' + userName; //url에는 현재 주소값을 넣어줌;

  //url 복사
  const copyURL = () => {
    const textarea = document.createElement('textarea');
    //url 변수 생성 후, textarea라는 변수에 textarea의 요소를 생성

    document.body.appendChild(textarea); //</body> 바로 위에 textarea를 추가(임시 공간이라 위치는 상관 없음)
    textarea.value = url; // textarea 값에 url를 넣어줌
    textarea.select(); //textarea를 설정
    document.execCommand('copy'); // 복사
    document.body.removeChild(textarea); //extarea 요소를 없애줌
  };

  /* 참고: https://abangpa1ace.tistory.com/255 */
  // Facebook -> 지금은 주소가 local 이라서 안됨
  const shareFacebook = () => {
    window.open('http://www.facebook.com/sharer/sharer.php?u=' + url);
  };

  // Twitter
  const shareTwitter = () => {
    const text = '나의 모투겜 랭킹은?';
    window.open('https://twitter.com/intent/tweet?text=' + text + '&url=' + url);
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
    <div className="h-screen max-w-sm mx-auto flex flex-col justify-center items-center">
      <div className="w-full rounded-lg border-4 border-orange-300 p-4 flex">
        <RankItem
          rank={userRank}
          nickName={userName}
          profit={(userRate * 100).toFixed(2)}
          total={userCash}
        />
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
        onClick={replay}
      >
        다시하기
      </button>
      <footer className="text-sm text-gray-700 mt-4">
        <button onClick={copyURL}>url 복사</button>
        <button onClick={shareFacebook}>Facebook</button>
        <button onClick={shareTwitter}>Twitter</button>
        <button onClick={shareTwitter}>KaKao</button>
      </footer>
    </div>
  );
}

export default Rankings;
