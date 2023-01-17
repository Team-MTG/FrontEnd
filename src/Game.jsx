import { useCallback, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { gameOverState } from './atoms/game';
import { stocksState } from './atoms/stocks';
import { userCashState, userNameState, userTradingLogListState } from './atoms/user';
import { MAX_PHASE, SEED_MONEY } from './config';
import useTimer from './hooks/useTimer';
import prettyKorNum from './utils/prettyKorNum';
import { generateRandomNumList } from './utils/random';

const useGame = (phaseSec, phaseMax) => {
  const { time, timeOver, resetTimer } = useTimer(phaseSec, 1000);
  const [phase, setPhase] = useState(3);
  const [gameOver, setGameOver] = useRecoilState(gameOverState);

  useEffect(() => {
    if (phase + 1 === phaseMax) {
      setGameOver(true);
    }
  }, [phase]);

  const setNextPhase = () => {
    setPhase((prevPhase) => prevPhase + 1);
    resetTimer();
  };

  return { time, turnOver: timeOver, phase, setNextPhase, gameOver };
};

const useStocks = (maxPhase) => {
  const [indexList, setIndexList] = useState([]);

  useEffect(() => {
    const randList = generateRandomNumList(maxPhase, 27);
    setIndexList(randList);
  }, []);
  const stocks = useRecoilValue(stocksState(indexList));
  console.log('why??');

  return stocks;
};

const useUser = (initCash) => {
  const [cash, setCash] = useRecoilState(userCashState);
  const userName = useRecoilValue(userNameState);
  const [shareNum, setShareNum] = useState(0);
  const [buyPrice, setBuyPrice] = useState(0);
  const setUserTradingLogList = useSetRecoilState(userTradingLogListState);

  const buy = (price) => {
    if (cash > price) {
      setBuyPrice(price);
      const remainder = cash % price;
      setShareNum((cash - remainder) / price);
      setCash(remainder);
    }
  };

  const sell = useCallback(
    (price) => {
      setBuyPrice(0);
      setCash((oldCash) => price * shareNum + oldCash);
      setShareNum(0);
    },
    [shareNum]
  );

  return { userName, cash, shareNum, buyPrice, buy, sell };
};

const background = {
  0: "bg-[#7A8799] bg-[url('../src/assets/morning.png')] bg-no-repeat bg-center h-[38rem] max-w-xs mt-[8vh] mx-auto flex flex-col items-center",
  1: "bg-[#A58484] bg-[url('../src/assets/sunset.png')] bg-no-repeat bg-center h-[38rem] max-w-xs mt-[8vh] mx-auto flex flex-col items-center",
  2: "bg-[#A58484] bg-[url('../src/assets/sunset.png')] bg-no-repeat bg-center h-[38rem] max-w-xs mt-[8vh] mx-auto flex flex-col items-center",
  3: "bg-[#545454] bg-[url('../src/assets/midnight.png')] bg-no-repeat bg-center h-[38rem] max-w-xs mt-[8vh] mx-auto flex flex-col items-center",
  4: "bg-[#545454] bg-[url('../src/assets/midnight.png')] bg-no-repeat bg-center h-[38rem] max-w-xs mt-[8vh] mx-auto flex flex-col items-center",
};

export default function Game({ maxSec, maxPhase }) {
  // utils
  const navigate = useNavigate();
  const location = useLocation();
  const resetUserCash = useResetRecoilState(userCashState);
  const resetGameOver = useResetRecoilState(gameOverState);

  // game info
  const stocks = useRecoilValue(stocksState(location.state.stockIndexList));
  const timer = useTimer(maxSec, 1000);
  const tick = useTimer(
    stocks[round - 1].datas.length - 1,
    (maxSec * 1000) / stocks[round - 1].datas.length
  );
  // const { phase, time, turnOver, setNextPhase, gameOver } = useGame(maxSec, maxPhase);
  const [roundStartCash, setRoundStartCash] = useState(SEED_MONEY);
  const { userName, cash, shareNum, buyPrice, buy, sell } = useUser(SEED_MONEY);
  const price = stocks[round - 1].datas[stocks[round - 1].datas.length - tick].price;
  const gain = (price - buyPrice) * shareNum;

  useEffect(() => {
    resetUserCash();
    resetGameOver();
  }, []);

  useEffect(() => {
    if (turnOver && shareNum) {
      sell(price);
      navigate('/game/result');
    }
  }, [turnOver, shareNum, sell]);

  return timer.time === 0 ? (
    <Navigate
      to="/game/result"
      state={{
        round,
        profit: cash / roundStartCash,
        averageProfit: stocks[round - 1].averageProfit,
      }}
    />
  ) : (
    <div className={background[round]}>
      <header className="bg-[url('../src/assets/gameRoundBar.png')] bg-no-repeat bg-center h-[102px] w-full relative">
        <p className="absolute top-9 left-7 text-lg">
          {round}/{maxPhase}
        </p>
        <div className="bg-[url('../src/assets/timerCurtain.svg')] h-[60px] w-[43px] absolute top-[94px] text-center">
          <p className="mt-2 text-white">{timer.time}</p>
        </div>
      </header>
      <div className="text-center h-80 mt-8">
        <div className="my-4">
          <span className="text-sm">주가</span>
          <p className="text-3xl">{prettyKorNum(price)}원</p>
        </div>
        <div className="my-4">
          <span className="text-sm">매입단가</span>
          <p className="text-3xl">{prettyKorNum(buyPrice) || '0'}원</p>
        </div>
        <div className="my-4">
          <span className="text-sm">평가손익</span>
          <p
            className={
              gain == 0 ? 'text-3xl' : gain < 0 ? 'text-3xl text-blue-400' : 'text-3xl text-red-400'
            }
          >
            {prettyKorNum(gain) || '0'}원
          </p>
        </div>
        <div className="my-4">
          <span className="text-sm">총자산</span>
          <p
            className={
              gain == 0 ? 'text-3xl' : gain < 0 ? 'text-3xl text-blue-400' : 'text-3xl text-red-400'
            }
          >
            {prettyKorNum(cash + price * shareNum)}원
          </p>
        </div>
      </div>
      <button
        className={
          shareNum === 0
            ? "bg-[url('../src/assets/buyBtn.png')] h-[82px] w-[296px] mt-16"
            : "bg-[url('../src/assets/sellBtn.png')] h-[82px] w-[296px] mt-16"
        }
        onClick={() => (shareNum === 0 ? buy(price) : sell(price))}
      />
    </div>
  );
}
