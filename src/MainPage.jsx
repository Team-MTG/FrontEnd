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
import { totalRankedUserState } from './atoms/info';
import KIRBY_LOGO from './assets/kirby-mtg.gif';

function MainPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useRecoilState(userNameState);
  const totalRankedUser = useRecoilValue(totalRankedUserState);

  return (
    <div className="h-screen max-w-sm mx-auto flex flex-col justify-center items-center">
      <h1 className="text-4xl ">모두의 투자 게임</h1>
      <img alt="귀여운 커비는 오늘도 달린다." src={KIRBY_LOGO} />
      <form className="w-10/12 text-2xl" onSubmit={(e) => e.preventDefault()}>
        <input
          className="text-center w-full my-10 border-2 rounded-lg border-gray-700 border-solid"
          type="text"
          maxLength="10"
          placeholder="닉네임"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button
          className="my-10 w-full bg-orange-400 disabled:bg-gray-300 border-2 rounded-2xl border-gray-800 border-solid"
          type="submit"
          disabled={!userName}
          onClick={(e) => {
            e.preventDefault();
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
      </form>
      <p className="">
        지금까지 <strong>{totalRankedUser.toLocaleString('ko-KR')}</strong>명이 참여했어요.
      </p>
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
