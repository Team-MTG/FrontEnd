import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userCashState, userRateState } from './atoms/user';
import { SEED_MONEY } from './config';

const Result = () => {
  const navigate = useNavigate();
  const userCash = useRecoilValue(userCashState);
  const userRate = useRecoilValue(userRateState);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '320px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          flexGrow: 7,
        }}
      >
        <Typography>
          시드머니
          <Typography component={'span'} sx={{ fontSize: '50px' }}>
            {`${SEED_MONEY}`}
          </Typography>
        </Typography>
        <Typography>
          평가손익
          <Typography component={'span'} sx={{ fontSize: '50px' }}>
            {userCash - SEED_MONEY}
          </Typography>
        </Typography>
        <Typography>
          잔고평가
          <Typography component={'span'} sx={{ fontSize: '50px' }}>
            {userCash}
          </Typography>
        </Typography>
        <Typography>
          총수익률
          <Typography component={'span'} sx={{ fontSize: '50px' }}>
            {`${(userRate * 100).toFixed(2)}%`}
          </Typography>
        </Typography>
      </Box>
      <Button
        sx={{ width: '100%', flexGrow: 3 }}
        variant="contained"
        onClick={() => {
          navigate('/rankings', {
            replace: true,
          });
        }}
      >
        <Typography sx={{ fontSize: '30px' }}>랭킹확인!</Typography>
      </Button>
    </Box>
  );
};

export default Result;
