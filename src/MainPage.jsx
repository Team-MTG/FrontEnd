import { Button, TextField, Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const [name, setName] = useState('');
  const [num, setNum] = useState(100000);
  const navigate = useNavigate();

  useEffect(() => {
    const result = num.toLocaleString('ko-KR');
    setNum(result);
  }, []);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const onClick = () => {
    console.log(name);
    setName('');
    navigate('/game');
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
        <TextField id="outlined-basic" label="이름" variant="outlined" onChange={handleChange} />
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
    </Box>
  );
}

export default MainPage;
