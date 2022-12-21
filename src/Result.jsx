import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userCashState, userNameState, userRankState, userRateState } from './atoms/user';

const Result = () => {
  const navigate = useNavigate();
  const userCash = useRecoilValue(userCashState);
  const userRate = useRecoilValue(userRateState);
  const userRank = useRecoilValue(userRankState);

  return (
    <Box>
      <Typography>시드머니: {5000000}</Typography>
      <Typography>평가손익: {userCash - 5000000}</Typography>
      <Typography>잔고평가: {userCash}</Typography>
      <Typography>총수익률: {(userRate * 100).toFixed(2)}</Typography>
      <Button
        variant="contained"
        onClick={() => {
          navigate('/rankings', {
            replace: true,
          });
        }}
      >
        <Typography>랭킹확인!</Typography>
      </Button>
    </Box>
  );
};

export default Result;
