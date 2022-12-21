import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ShareIcon from '@mui/icons-material/Share';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { rankingsState } from './atoms/rankings';
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Modal,
  Typography,
} from '@mui/material';
import { userCashState, userNameState, userRateState } from './atoms/user';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

function RankItem({ nickName, profit, total, rank }) {
  return (
    <ListItem sx={{ width: '320px' }} disablePadding={true} component="a">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
        <ListItemText sx={{ marginRight: '20px' }} primary={`${rank}등`} />
        {rank < 4 ? (
          <Box sx={{ color: 'rgb(81,210,94)', display: 'flex' }}>
            <MilitaryTechIcon sx={{ mt: '13%' }} />
            <ListItemText primary={nickName} secondary={`${profit} %`} />
          </Box>
        ) : (
          <Box sx={{ display: 'flex' }}>
            <MilitaryTechIcon sx={{ visibility: 'hidden' }} />
            <ListItemText primary={nickName} secondary={`${profit} %`} />
          </Box>
        )}
      </Box>
      <ListItemText sx={{ display: 'flex', justifyContent: 'flex-end' }} primary={`${total} KRW`} />
    </ListItem>
  );
}

function Rankings() {
  const rankings = useRecoilValue(rankingsState);
  const userCash = useRecoilValue(userCashState);
  const userName = useRecoilValue(userNameState);
  const userRate = useRecoilValue(userRateState);

  //모달 창
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  //현재 주소 가져옴
  //const url = encodeURI(window.location.href);
  //테스트용으로 가능한 주소인 노션 주소 넣음
  const url = 'https://www.notion.so/e2de89087a894ccbbd58b8a395ba1355';

  //url 복사
  const copyURL = () => {
    let url = ''; // <a>태그에서 호출한 함수인 clip 생성
    const textarea = document.createElement('textarea');
    //url 변수 생성 후, textarea라는 변수에 textarea의 요소를 생성

    document.body.appendChild(textarea); //</body> 바로 위에 textarea를 추가(임시 공간이라 위치는 상관 없음)
    url = window.document.location.href; //url에는 현재 주소값을 넣어줌
    textarea.value = url; // textarea 값에 url를 넣어줌
    textarea.select(); //textarea를 설정
    document.execCommand('copy'); // 복사
    document.body.removeChild(textarea); //extarea 요소를 없애줌
    setOpen(true);
    setTimeout(function () {
      setOpen(false);
    }, 2000); // 2000ms(2초)가 경과하면 이 함수가 실행됩니다.
  };

  /* 참고: https://abangpa1ace.tistory.com/255 */
  // Facebook -> 지금은 주소가 local 이라서 안됨
  const shareFacebook = () => {
    window.open('http://www.facebook.com/sharer/sharer.php?u=' + url);
  };

  // Twitter
  const shareTwitter = () => {
    const text = '나의 모투겜 랭킹은?';
    window.open('https://twitter.com/intent/tweet?text=' + text + '&url=' + url);
  };

  // KaKao -> 아직 구현 X
  const shareKaKao = () => {
    const text = '나의 모투겜 랭킹은?';
    window.open('https://twitter.com/intent/tweet?text=' + text + '&url=' + url);
  };

  //다시하기 버튼 클릭 시
  const replay = () => {
    navigate('/game');
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
      }}
    >
      <List>
        <RankItem
          rank={322}
          nickName={userName}
          profit={(userRate * 100).toFixed(2)}
          total={userCash}
        />
      </List>
      <Divider sx={{ width: '100%', maxWidth: '320px' }} />
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxHeight: '300px',
          overflow: 'auto',
        }}
      >
        {rankings.map((rank) => (
          <RankItem
            key={rank.id}
            rank={rank.rank}
            nickName={rank.name}
            profit={rank.profit}
            total={rank.total}
          />
        ))}
      </List>
      <Box
        sx={{
          width: '100%',
          maxWidth: '320px',
          justifyContent: 'space-evenly',
          marginTop: '10px',
          display: 'flex',
        }}
      >
        <Button variant="contained" onClick={replay}>
          다시하기
        </Button>
      </Box>
      <Box
        sx={{
          width: '100%',
          maxWidth: '320px',
          justifyContent: 'space-evenly',
          marginTop: '10px',
          display: 'flex',
        }}
      >
        <Button onClick={copyURL}>
          <ShareIcon />
        </Button>
        <Button onClick={shareFacebook}>Facebook</Button>
        <Button onClick={shareTwitter}>Twitter</Button>
        <Button onClick={shareTwitter}>KaKao</Button>
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
          <CheckCircleOutlineIcon sx={{ color: 'rgb(56,116,203)' }} />
          <Typography id="modal-modal-description">url 복사를 완료하였습니다.</Typography>
        </Box>
      </Modal>
    </Box>
  );
}

export default Rankings;
