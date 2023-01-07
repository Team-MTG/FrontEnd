import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { gameOverState } from './atoms/game';
import { stocksState } from './atoms/stocks';
import { userCashState, userNameState, userTradingLogListState } from './atoms/user';
import { SEED_MONEY } from './config';
import useTimer from './hooks/useTimer';
import prettyKorNum from './utils/prettyKorNum';
import { generateRandomNumList } from './utils/random';

const useGame = (phaseSec, phaseMax) => {
  const { time, timeOver, resetTimer } = useTimer(phaseSec, 1000);
  const [phase, setPhase] = useState(0);
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

export default function Game({ maxSec, maxPhase }) {
  const navigate = useNavigate();
  const location = useLocation();
  const stocks = useRecoilValue(stocksState(location.state.stockIndexList));
  const resetUserCash = useResetRecoilState(userCashState);
  const resetGameOver = useResetRecoilState(gameOverState);
  const { phase, time, turnOver, setNextPhase, gameOver } = useGame(maxSec, maxPhase);
  const [phaseStartCash, setPhaseStartCash] = useState(SEED_MONEY);
  const { time: tick, resetTimer: resetTick } = useTimer(
    stocks[phase].datas.length - 1,
    (maxSec * 1000) / stocks[phase].datas.length
  );
  const { userName, cash, shareNum, buyPrice, buy, sell } = useUser(SEED_MONEY);
  const price = stocks[phase].datas[tick].price;
  const gain = (price - buyPrice) * shareNum;

  useEffect(() => {
    resetUserCash();
    resetGameOver();
  }, []);

  useEffect(() => {
    if (turnOver && shareNum) {
      sell(price);
    }
  }, [turnOver, shareNum, sell]);

  return (
    <div className="h-screen max-w-sm mx-auto flex flex-col justify-center items-center">
      <header className="flex flex-row justify-between w-10/12 border-2">
        <span>{`${phase + 1}/${maxPhase}\xa0\xa0\xa0`}</span>
        <span>{userName}</span>
        <span>
          00:{maxSec - time < 10 && '0'}
          {maxSec - time}
        </span>
      </header>
      <div className="text-center h-80 w-10/12">
        {turnOver ? (
          <>
            <p className="text-5xl my-4">{stocks[phase].stockName}</p>
            <div className="text-3xl">
              <span className="text-sm">당신의 수익률은...</span>
              <p>{`${((cash / phaseStartCash - 1) * 100).toFixed(2)}%`}</p>
            </div>
            <div className="text-3xl">
              <span className="text-sm">다른사람들은...</span>
              <p>{`${((cash / phaseStartCash - 1) * 100).toFixed(2)}%`}</p>
            </div>
          </>
        ) : (
          <>
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
                  gain == 0
                    ? 'text-3xl'
                    : gain < 0
                    ? 'text-3xl text-blue-400'
                    : 'text-3xl text-red-400'
                }
              >
                {prettyKorNum(gain) || '0'}원
              </p>
            </div>
            <div className="my-4">
              <span className="text-sm">총자산</span>
              <p
                className={
                  gain == 0
                    ? 'text-3xl'
                    : gain < 0
                    ? 'text-3xl text-blue-400'
                    : 'text-3xl text-red-400'
                }
              >
                {prettyKorNum(cash + price * shareNum)}원
              </p>
            </div>
          </>
        )}
      </div>
      {!turnOver ? (
        <button
          className={
            shareNum
              ? 'w-10/12 text-2xl my-10 bg-blue-400 border-2 rounded-2xl border-gray-800 border-solid'
              : 'w-10/12 text-2xl my-10 bg-red-400 border-2 rounded-2xl border-gray-800 border-solid'
          }
          variant="contained"
          onClick={() => (shareNum ? sell(price) : buy(price))}
        >
          <span>{shareNum ? '매도' : '매수'}</span>
        </button>
      ) : gameOver ? (
        <button
          className="w-10/12 text-2xl my-10 bg-orange-400 border-2 rounded-2xl border-gray-800 border-solid"
          variant="contained"
          onClick={() => {
            navigate('/result', {
              replace: true,
            });
          }}
        >
          <span>결과보기</span>
        </button>
      ) : (
        <button
          className="w-10/12 text-2xl my-10 bg-orange-400 border-2 rounded-2xl border-gray-800 border-solid"
          variant="contained"
          onClick={() => {
            resetTick();
            setPhaseStartCash(cash);
            setNextPhase();
          }}
        >
          <span>다음턴!</span>
        </button>
      )}
    </div>
  );
}
