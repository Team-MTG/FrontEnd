import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { userBalanceState, userNameState } from './atoms/user';
import { MAX_PHASE, URL_GITHUB, URL_NOTION } from './config';
import { totalStockCountState, totalUserCountState } from './atoms/info';
import LOGO from './assets/logo.png';
import BARCODE from './assets/barcode.png';
import { gameRoundState, gameSeedState, roundLogState } from './atoms/game';
import genSeeds from './utils/genSeeds';

function MainPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useRecoilState(userNameState);
  const stockCount = useRecoilValue(totalStockCountState);
  const setGameSeeds = useSetRecoilState(gameSeedState);
  const resetBalance = useResetRecoilState(userBalanceState);
  const resetRoundLog = useResetRecoilState(roundLogState);
  const resetRound = useResetRecoilState(gameRoundState);
  const totalUserCount = useRecoilValue(totalUserCountState);

  return (
    <div className="bg-[url('./assets/bg-mainpage.svg')] font-sc bg-no-repeat bg-center bg-auto h-[38rem] w-[24rem] mt-[8vh] mx-auto flex flex-col items-center">
      <div className="ml-14 mt-1 mr-auto font-tn align-baseline">
        <p className="text-[#757575] text-lg">AIR TICKET</p>
        <p className="text-lg -translate-y-2">FIRST - CLASS</p>
      </div>
      <img className="mt-12" alt="귀여운 커비는 오늘도 달린다." src={LOGO} />
      <form
        className="w-40 text-2xl flex flex-col items-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="text-center mt-6">
          <p className="text-xs">Passenger | 탑승객</p>
          <input
            className="text-center text-lg placeholder:text-xs w-full my-1 border-[1px] rounded-full border-gray-700 border-solid"
            type="text"
            maxLength="4"
            placeholder="이름을 입력하세요"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <button
          className="mt-4 w-full font-tn text-xl text-white bg-[#63C9EF] disabled:bg-gray-300 rounded-2xl"
          type="submit"
          disabled={!userName}
          onClick={(e) => {
            e.preventDefault();
            setGameSeeds(genSeeds(MAX_PHASE, stockCount));
            resetRound();
            resetBalance();
            resetRoundLog();
            navigate('/game');
          }}
        >
          <p className="translate-y-1">게임 시작하기</p>
        </button>
      </form>
      <p className="text-xs mt-8">
        지금까지 <strong>{totalUserCount.toLocaleString('ko-kr')}</strong>명이 참여했어요.
      </p>
      <hr className="mt-10 border-t-[1px] border-black w-[18rem]" />
      <footer className="flex flex-row text-sm mt-2 ml-4">
        <div>
          <img alt="이것은 바코드다." src={BARCODE} />
          {/* <nav className="font-bold text-[#757575]">
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
          </nav> */}
        </div>
        <div className="ml-2 mt-1 text-center font-tn">
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
