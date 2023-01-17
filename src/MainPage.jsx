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
import LOGO from './assets/logo.png';
import BARCODE from './assets/barcode.png';

function MainPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useRecoilState(userNameState);
  const totalRankedUser = useRecoilValue(totalRankedUserState);

  return (
    <div className="bg-[url('./assets/bg-mainpage.svg')] bg-no-repeat bg-center bg-auto h-[38rem] w-[24rem] mt-[8vh] mx-auto flex flex-col items-center">
      <div className="ml-16 mr-auto">
        <p className="text-lg">AIR TICKET</p>
        <p className="text-xs">FIRST - CLASS</p>
      </div>
      <img className="mt-16" alt="귀여운 커비는 오늘도 달린다." src={LOGO} />
      <form
        className="w-40 text-2xl flex flex-col items-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="text-center mt-2">
          <p className="text-xs">Passenger | 탑승객</p>
          <input
            className="text-center text-lg w-full my-1 border-[1px] rounded-full border-gray-700 border-solid"
            type="text"
            maxLength="10"
            placeholder="이름을 입력하세요"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <button
          className="mt-4 w-full text-xl text-white bg-[#63C9EF] disabled:bg-gray-300 rounded-2xl"
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
          게임 시작하기
        </button>
      </form>
      <p className="text-xs mt-8">
        지금까지 <strong>{totalRankedUser.toLocaleString('ko-KR')}</strong>명이 참여했어요.
      </p>
      <hr className="mt-14 border-t-[1px] border-black w-[18rem]" />
      <footer className="flex flex-row text-sm mt-2 ml-4">
        <div className="">
          <img alt="이것은 바코드다." src={BARCODE} />
          <nav>
            <a href={URL_GITHUB} target="_blank" rel="external noreferrer noopener">
              Team MTG
            </a>
            <a
              className="mx-4"
              href={URL_NOTION}
              target="_blank"
              rel="external noreferrer noopener"
            >
              Notion
            </a>
            <a href={URL_GITHUB} target="_blank" rel="external noreferrer noopener">
              Github
            </a>
          </nav>
        </div>
        <div className="ml-2 text-center">
          <p className="text-xl">
            <span className="text-[#63C9EF]">9C</span> GATE
          </p>
          <p className="text-xl">SEAT</p>
          <p className="text-3xl text-[#63C9EF]">23</p>
        </div>
      </footer>
    </div>
  );
}

export default MainPage;
