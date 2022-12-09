import { Box, Button, Divider, List, ListItem, ListItemText } from '@mui/material';
import { useState } from 'react';

const RANKING = [
  {
    name: 'hsmroof',
    rank: 1,
    profit: 90,
    total: 90000,
  },
  {
    name: 'hacho',
    rank: 2,
    profit: 30,
    total: 30000,
  },
  {
    name: 'hyeonzii',
    rank: 3,
    profit: 20,
    total: 10000,
  },
  {
    name: 'hyeonzii',
    rank: 3,
    profit: 20,
    total: 10000,
  },
  {
    name: 'hyeonzii',
    rank: 3,
    profit: 20,
    total: 10000,
  },
  {
    name: 'hyeonzii',
    rank: 3,
    profit: 20,
    total: 10000,
  },
  {
    name: 'hyeonzii',
    rank: 3,
    profit: 20,
    total: 10000,
  },
  {
    name: 'hyeonzii',
    rank: 3,
    profit: 20,
    total: 10000,
  },
];

function RankItem({ nickName, profit, total, rank }) {
  return (
    <ListItem sx={{ width: '320px' }} disablePadding={true} component="a">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
        <ListItemText sx={{ marginRight: '20px' }} primary={`${rank}등`} />
        <ListItemText primary={nickName} secondary={`${profit} %`} />
      </Box>
      <ListItemText sx={{ display: 'flex', justifyContent: 'flex-end' }} primary={`${total} KRW`} />
    </ListItem>
  );
}

function RankPage() {
  const [ranks, setRanks] = useState(RANKING);

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <List>
        <RankItem rank={322} nickName={'조하빈'} profit={23} total={923123} />
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
        {ranks.map((rank) => (
          <RankItem
            key={rank.name}
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
          display: 'flex',
          justifyContent: 'space-evenly',
          marginTop: '10px',
        }}
      >
        <Button variant="contained">다시하기</Button>
        <Button variant="contained">공유하기</Button>
      </Box>
    </Box>
  );
}

export default RankPage;
