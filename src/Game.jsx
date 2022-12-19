import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { Suspense, useRef } from 'react';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { stockLogListState } from './atoms/stocks';
import useTimer from './hooks/useTimer';

const useGame = (phaseSec, phaseMax) => {
  const { time, timeOver, resetTimer } = useTimer(phaseSec, 1000);
  const [phase, setPhase] = useState(0);
  const [gameOver, setGameOver] = useState(false);

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
  const [cash, setCash] = useState(initCash);
  const [shareNum, setShareNum] = useState(0);
  const [buyPrice, setBuyPrice] = useState(0);

  const buy = (price) => {
    setBuyPrice(price);
    const remainder = cash % price;
    setShareNum((cash - remainder) / price);
    setCash(remainder);
  };

  const sell = (price) => {
    setBuyPrice(0);
    setCash(price * shareNum + cash);
    setShareNum(0);
  };

  return { cash, shareNum, buyPrice, buy, sell };
};

export default function Game({ maxSec, maxPhase }) {
  const { phase, time, turnOver, setNextPhase, gameOver } = useGame(maxSec, maxPhase);
  const stockLogList = useRecoilValue(stockLogListState);
  const { time: tick, resetTimer: resetTick } = useTimer(
    stockLogList[phase].length - 1,
    (maxSec * 1000) / stockLogList[phase].length
  );
  const { cash, shareNum, buyPrice, buy, sell } = useUser(5000000);

  const price = stockLogList[phase][tick].Close;
  const gain = (price - buyPrice) * shareNum;
  if (turnOver === true && shareNum) {
    sell(price);
  }
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
          <Typography>00:{maxSec - time < 10 ? `0${maxSec - time}` : maxSec - time}</Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
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
      </Box>
      {!turnOver ? (
        <Button
          sx={{ flexGrow: 1 }}
          variant="contained"
          onClick={() => {
            if (shareNum) sell(price);
            else buy(price);
          }}
        >
          <Typography sx={{ fontSize: '40px', margin: '10px' }}>
            {shareNum ? '매도' : '매수'}
          </Typography>
        </Button>
      ) : gameOver ? (
        <Button sx={{ flexGrow: 1 }} variant="contained" onClick={() => {}}>
          <Typography sx={{ fontSize: '40px', margin: '10px' }}>두근두근</Typography>
        </Button>
      ) : (
        <Button
          sx={{ flexGrow: 1 }}
          variant="contained"
          onClick={() => {
            resetTick();
            setNextPhase();
          }}
        >
          <Typography sx={{ fontSize: '40px', margin: '10px' }}>다음턴!</Typography>
        </Button>
      )}
    </Box>
  );
}
