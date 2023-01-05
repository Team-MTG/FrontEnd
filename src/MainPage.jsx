import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userNameState } from './atoms/user';
import { generateRandomNumList } from './utils/random';
import {
  DEBUG,
  DEBUG_STOCKS_INDEX_LIST,
  MAX_PHASE,
  MAX_STOCKS_INDEX,
  URL_GITHUB,
  URL_NOTION,
} from './config';
import { totalRankedUserState } from './atoms/others';
import KIRBY_LOGO from './assets/kirby-mtg.gif';

function MainPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useRecoilState(userNameState);
  const totalRankedUser = useRecoilValue(totalRankedUserState);

  return (
    <div className="bg-slate-50 h-screen max-w-sm mx-auto flex flex-col justify-center items-center ">
      <h1 className="text-4xl ">모두의 투자 게임</h1>
      <img alt="귀여운 커비는 오늘도 달린다." src={KIRBY_LOGO} />
      <input
        className=" w-10/12 text-center my-10 text-2xl border-2 rounded-lg border-gray-700 border-solid"
        maxLength="10"
        placeholder="닉네임"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button
        className="text-2xl w-10/12 my-10 bg-orange-400 border-2 rounded-2xl border-gray-800 border-solid"
        disabled={!userName}
        onClick={() => {
          navigate('/game', {
            state: {
              stockIndexList: DEBUG
                ? DEBUG_STOCKS_INDEX_LIST
                : generateRandomNumList(MAX_PHASE, MAX_STOCKS_INDEX),
            },
          });
        }}
      >
        {!userName ? '닉네임을 입력하세요!' : '게임하러 고고!'}
      </button>
      <p className="">지금까지 {totalRankedUser.toLocaleString('ko-KR')}명이 참여했어요.</p>
      <footer className="text-sm text-gray-700 mt-4">
        <nav>
          <a href={URL_GITHUB} target="_blank" rel="external noreferrer noopener">
            Team MTG
          </a>
          <span> | </span>
          <a href={URL_NOTION} target="_blank" rel="external noreferrer noopener">
            Notion
          </a>
          <span> | </span>
          <a href={URL_GITHUB} target="_blank" rel="external noreferrer noopener">
            Github
          </a>
        </nav>
      </footer>
    </div>
  );
}

export default MainPage;
