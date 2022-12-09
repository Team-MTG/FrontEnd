import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

import { useRef } from 'react';
import { useEffect, useState } from 'react';
import useTimer from './hooks/useTimer';
// import test2 from './testStock.json';
import test2 from './test2.json';

const useGame = (sec) => {};

const useStock = () => {
  const { time: tick, timeOver: tickEnd } = useTimer(test2.length - 1, 30000 / test2.length);

  return test2[tick].Close;
};

const useUserStatus = (initCash) => {
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

export default function Game() {
  const { time, timeOver, resetTimer } = useTimer(30, 1000);
  const price = useStock();
  const { cash, shareNum, buyPrice, buy, sell } = useUserStatus(5000000);

  if (timeOver === true && shareNum) {
    sell(price);
  }

  const gain = (price - buyPrice) * shareNum;

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
          <Typography>1/5</Typography>
          <Typography>00:{30 - time < 10 ? `0${30 - time}` : 30 - time}</Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
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
      <Button
        sx={{ flexGrow: 1 }}
        variant="contained"
        onClick={shareNum ? () => sell(price) : () => buy(price)}
      >
        <Typography sx={{ fontSize: '40px', margin: '10px' }}>
          {shareNum ? '매도' : '매수'}
        </Typography>
      </Button>
    </Box>
  );
}
