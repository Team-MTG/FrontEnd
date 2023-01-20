import { useLocation, useNavigate } from 'react-router-dom';
import { ResponsiveLine } from '@nivo/line';
import { TestChart } from './mocks/testChart.json';
import nextBtn from './assets/nextBtn.png';
import roundIcon from './assets/round.png';
import { ReactComponent as RoundPin } from './assets/roundPin.svg';
import flagBg from './assets/flagBg.svg';
import { ReactComponent as Plane } from './assets/plane.svg';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { gameRoundState, roundLogState } from './atoms/game';
import { MAX_PHASE } from './config';
import { stockState } from './atoms/stocks';
import { useEffect, useState } from 'react';

export default function SemiResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const [round, setRound] = useRecoilState(gameRoundState);
  const [enableBtn, setEnableBtn] = useState(false);
  const setRoundLog = useSetRecoilState(roundLogState);
  const currStock = useRecoilValue(stockState)[round];

  useEffect(() => {
    setTimeout(() => setEnableBtn(true), 1000);
  }, []);

  /* 포인트 찍기 */
  const customPoint = ({ size, color, borderWidth, borderColor, datum }) => {
    if (datum.label != undefined) {
      return <Plane width={size} height={size} fill={color} x={-size / 2} y={-size / 2} />;
    }
  };

  return (
    <div className="h-[38rem] max-w-xs mx-auto flex flex-col justify-between items-center mt-[8vh]">
      <span className="w-[20rem] flex">
        <div className="w-fit relative top-2 left-2">
          <img className="relative" src={flagBg} />
          <div className="absolute top-5 left-0 right-0 font-tn text-lg leading-none text-white text-center">
            {round + 1}/{MAX_PHASE}
          </div>
        </div>
        <div className="w-[20rem] h-36 absolute left-0 right-0 mx-auto mt-8">
          <img className="relative top-2 left-0 right-0 mx-auto" src={roundIcon} width={140} />
          <RoundPin
            className="absolute top-0 left-0 right-0 mx-auto"
            fill={location.state.profit > 0 ? '#EF3C3C' : '#5A75E5'}
          />
        </div>
      </span>
      <div className="h-28"></div>
      <div className="font-tn text-3xl leading-none">{currStock.stockName}</div>
      <div className="font-sc text-base leading-none font-medium">
        수익률 {(location.state.profit * 100).toFixed(2)}%
      </div>
      <div className="font-sc text-sm leading-none font-medium mt-3">다른 사람들은...</div>
      <div className="font-sc text-sm align-text-bottomfont-medium">
        {currStock.avgProfit.toFixed(2)}%
      </div>
      <div className="w-9/12 h-60 overflow-x-auto mb-1">
        <ResponsiveLine
          xScale={{ format: '%Y-%m-%dT%H:%M:%S.%L%Z', type: 'time' }}
          xFormat="time:%Y-%m-%d"
          axisBottom={{
            tickValues: [
              new Date(currStock.datas[0].date),
              new Date(currStock.datas[currStock.datas.length - 1].date),
            ],
            format: '%y-%m-%d',
          }}
          data={[
            {
              id: 'buy',
              data: currStock.datas.map(({ date, price }) => {
                const buyLog = location.state.tradeLog.buy;
                return {
                  x: new Date(date),
                  y: buyLog.find((buyDate) => buyDate == date) === undefined ? null : price,
                  label: '매수',
                };
              }),
            },
            {
              id: 'sell',
              data: currStock.datas.map(({ date, price }) => {
                const sellLog = location.state.tradeLog.sell;
                return {
                  x: new Date(date),
                  y: sellLog.find((sellDate) => sellDate == date) === undefined ? null : price,
                  label: '매도',
                };
              }),
            },
            {
              id: 'stock',
              data: currStock.datas.map(({ date, price }) => ({
                x: new Date(date),
                y: price,
              })),
            },
          ]}
          colors={['#EF3C3C', '#5A75E5', '#000000']}
          width={240} //테스트 용
          margin={{ top: 30, right: 25, bottom: 40, left: 50 }}
          pointSymbol={customPoint}
          pointSize={14}
        />
      </div>
      <button
        className="mb-1"
        disabled={!enableBtn}
        onClick={() => {
          setRoundLog((prevLog) => [
            ...prevLog,
            {
              stockName: location.state.stockName,
              profit: location.state.profit,
              yield: location.state.yield,
            },
          ]);
          if (round + 1 === MAX_PHASE) {
            navigate('/result', { replace: true });
          } else {
            setRound((prev) => prev + 1);
            navigate('/game', { replace: true });
          }
        }}
      >
        <img src={nextBtn} />
      </button>
    </div>
  );
}
