import { useLocation, useNavigate } from 'react-router-dom';
import { ResponsiveLine } from '@nivo/line';
import { TestChart } from './mocks/testChart.json';
import theme from './theme';
import nextBtn from './assets/nextBtn.png';
import roundIcon from './assets/round.png';
import { ReactComponent as RoundPin } from './assets/roundPin.svg';
import flagBg from './assets/flagBg.svg';
import { ReactComponent as Plane } from './assets/plane.svg';
import { ReactComponent as Dot } from './assets/dot.svg';
import { useSetRecoilState } from 'recoil';
import { gameRoundState } from './atoms/game';

export default function SemiResult({ round }) {
  const navigate = useNavigate();

  const setRound = useSetRecoilState(gameRoundState);

  /* 포인트 찍기 */
  const customPoint = ({ size, color, borderWidth, borderColor, datum }) => {
    if (datum.label != undefined) {
      return <Plane width={size} height={size} fill={color} x={-size / 2} y={-size / 2} />;
    } else {
      return <Dot fill={color} />;
    }
  };

  /* 매수/매도 데이터 */
  const userData = [{}, {}];

  return (
    <div className="h-[38rem] w-96 mx-auto flex flex-col justify-between items-center mt-[8vh]">
      <span className="w-96 flex">
        <div className="w-fit relative top-2 left-2">
          <img className="relative" src={flagBg} />
          <div className="absolute top-5 left-0 right-0 font-tn text-lg leading-none text-white text-center">
            {round}/5
          </div>
        </div>
        <div className="w-96 h-36 absolute left-0 right-0 mx-auto mt-8">
          <img className="relative top-2 left-0 right-0 mx-auto" src={roundIcon} width={140} />
          <RoundPin
            className="absolute top-0 left-0 right-0 mx-auto"
            fill={theme.colors.blue}
          />{' '}
          {/*수정*/}
        </div>
      </span>
      <div className="h-28"></div>
      <div className="font-tn text-3xl leading-none">삼성전자</div>
      <div className="font-sc text-base leading-none font-medium">수익률 -3.88 %</div>
      <div className="font-sc text-sm leading-none font-medium mt-3">다른 사람들은...</div>
      <div className="font-sc text-sm align-text-bottomfont-medium">0.00 %</div>
      <div className="w-9/12 h-60 overflow-x-auto mb-1">
        <></>
        <ResponsiveLine
          data={[
            {
              id: 'buy',
              data: [null, null, 32, null].map((y, i) => ({
                x: i,
                y,
                label: '매수',
              })),
            },
            {
              id: 'sell',
              data: [null, null, null, 12].map((y, i) => ({
                x: i,
                y,
                label: '매도',
              })),
            },
            TestChart[0],
          ]}
          colors={[theme.colors.red, theme.colors.blue, theme.colors.black]}
          width={400} //테스트 용
          margin={{ top: 30, right: 20, bottom: 40, left: 30 }}
          pointSymbol={customPoint}
          pointSize={32}
        />
      </div>
      <button
        className="mb-1"
        onClick={() => {
          setRound((prev) => prev + 1);
          navigate('/game');
        }}
      >
        <img src={nextBtn} />
      </button>
    </div>
  );
}
