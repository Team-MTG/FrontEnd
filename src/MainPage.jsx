import { Button, TextField, Box, Typography, Modal } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useRecoilState } from 'recoil';
import { userNameState } from './atoms/user';
import { generateRandomNumList } from './utils/random';
import { MAX_PHASE, STOCKS_NUMBER } from './config';

function MainPage() {
  const [userName, setUserName] = useRecoilState(userNameState);
  const [num, setNum] = useState(100000);
  //모달 창
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const result = num.toLocaleString('ko-KR');
    setNum(result);
  }, []);

  const handleChange = (e) => {
    setUserName(e.target.value);
  };

  const onClick = () => {
    if (userName === '') {
      setOpen(true);
      setTimeout(function () {
        setOpen(false);
      }, 2000); // 2000ms(2초)가 경과하면 이 함수가 실행됩니다.
    } else {
      navigate('/game', {
        state: {
          stockIndexList: generateRandomNumList(MAX_PHASE, STOCKS_NUMBER),
        },
      });
    }
  };

  const navMTG = () => {
    window.open('https://github.com/Team-MTG', '_blank');
  };
  const navNotion = () => {
    window.open('https://www.notion.so/e2de89087a894ccbbd58b8a395ba1355', '_blank');
  };
  const navGit = () => {
    window.open('https://github.com/Team-MTG', '_blank');
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '320px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <Typography
        sx={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '40px',
        }}
      >
        모두의 투자 게임
      </Typography>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
          marginTop: '60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextField
          id="outlined-basic"
          label="이름"
          variant="outlined"
          value={userName}
          onChange={handleChange}
        />
      </Box>
      <Box
        sx={{
          marginTop: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          variant="contained"
          sx={{
            width: '25ch',
          }}
          onClick={onClick}
        >
          시작하기
        </Button>
      </Box>
      <Box
        sx={{
          marginTop: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        지금까지 {num}명이 참여했어요
      </Box>
      <Box
        sx={{
          marginTop: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            marginTop: '10px',
            position: 'absolute',
            bottom: '0',
          }}
        >
          <Button onClick={navMTG}>Team MTG</Button>
          <Button onClick={navNotion}>Notion</Button>
          <Button onClick={navGit}>Github</Button>
        </Box>
      </Box>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 250,
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: '30px',
            p: 4,
          }}
        >
          <SentimentVeryDissatisfiedIcon sx={{ color: 'red' }} />
          <Typography id="modal-modal-description">이름을 입력해주십시오.</Typography>
        </Box>
      </Modal>
    </Box>
  );
}

export default MainPage;
