import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { gameOverState } from './atoms/game';
import { stocksState } from './atoms/stocks';
import { userCashState, userTradingLogListState } from './atoms/user';
import { SEED_MONEY } from './config';
import useTimer from './hooks/useTimer';
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

const useUser = (initCash) => {
  const [cash, setCash] = useRecoilState(userCashState);
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

  return { cash, shareNum, buyPrice, buy, sell };
};

export default function Game({ maxSec, maxPhase }) {
  const navigate = useNavigate();
  const stocks = useRecoilValue(stocksState(generateRandomNumList(maxPhase, 27)));
  const resetUserCash = useResetRecoilState(userCashState);
  const { phase, time, turnOver, setNextPhase, gameOver } = useGame(maxSec, maxPhase);
  const [phaseStartCash, setPhaseStartCash] = useState(SEED_MONEY);
  const { time: tick, resetTimer: resetTick } = useTimer(
    stocks[phase].datas.length - 1,
    (maxSec * 1000) / stocks[phase].datas.length
  );
  const { cash, shareNum, buyPrice, buy, sell } = useUser(SEED_MONEY);
  const price = stocks[phase].datas[tick].price;
  const gain = (price - buyPrice) * shareNum;

  useEffect(() => {
    resetUserCash();
  }, []);

  useEffect(() => {
    if (turnOver && shareNum) {
      sell(price);
    }
  }, [turnOver, shareNum, sell]);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '320px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography>
            {phase + 1}/{maxPhase}
          </Typography>
          <Typography>
            00:{maxSec - time < 10 && '0'}
            {maxSec - time}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          flexGrow: 9,
        }}
      >
        {turnOver ? (
          <>
            <Box sx={{ marginTop: '20px' }}>
              <Typography sx={{ fontSize: '40px' }}>{stocks[phase].stockName}</Typography>
            </Box>
            <Box sx={{ marginTop: '20px' }}>
              <Typography>수익률</Typography>
              <Typography sx={{ fontSize: '40px' }}>
                {((cash / phaseStartCash - 1) * 100).toFixed(2)}
              </Typography>
            </Box>
          </>
        ) : (
          <>
            <Box sx={{ marginTop: '20px' }}>
              <Typography>주가</Typography>
              <Typography sx={{ fontSize: '40px' }}>{price}</Typography>
            </Box>
            <Box sx={{ marginTop: '20px' }}>
              <Typography>매입단가</Typography>
              <Typography sx={{ fontSize: '40px' }}>{buyPrice}</Typography>
            </Box>
            <Box sx={{ marginTop: '20px' }}>
              <Typography>평가손익</Typography>
              <Typography
                sx={{ fontSize: '40px', color: gain === 0 ? 'black' : gain > 0 ? 'red' : 'blue' }}
              >
                {gain}
              </Typography>
            </Box>
            <Box sx={{ marginTop: '20px' }}>
              <Typography>총자산</Typography>
              <Typography sx={{ fontSize: '40px' }}>{cash + price * shareNum}</Typography>
            </Box>
          </>
        )}
      </Box>
      {!turnOver ? (
        <Button
          sx={{ flexGrow: 1 }}
          variant="contained"
          onClick={() => (shareNum ? sell(price) : buy(price))}
        >
          <Typography sx={{ fontSize: '40px', margin: '10px' }}>
            {shareNum ? '매도' : '매수'}
          </Typography>
        </Button>
      ) : gameOver ? (
        <Button
          sx={{ flexGrow: 1 }}
          variant="contained"
          onClick={() => {
            navigate('/result', {
              replace: true,
            });
          }}
        >
          <Typography sx={{ fontSize: '40px', margin: '10px' }}>결과보기</Typography>
        </Button>
      ) : (
        <Button
          sx={{ flexGrow: 1 }}
          variant="contained"
          onClick={() => {
            resetTick();
            setPhaseStartCash(cash);
            setNextPhase();
          }}
        >
          <Typography sx={{ fontSize: '40px', margin: '10px' }}>다음턴!</Typography>
        </Button>
      )}
    </Box>
  );
}
