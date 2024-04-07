import classNames from 'classnames';
import './index.scss';
import { useMemo, useState } from 'react';

const DailyBill = ({ date, billList }) => {
  const dayBalance = useMemo(() => {
    //pay, income, balance
    const pay = billList
      .filter((item) => item.type === 'pay')
      .reduce((a, c) => a + c.money, 0);
    const income = billList
      .filter((item) => item.type === 'income')
      .reduce((a, c) => a + c.money, 0);
    return {
      pay,
      income,
      balance: pay + income,
    };
  }, [billList]);

  const [visible, setVisible] = useState(false);
  return (
    <div className={classNames('dailyBill')}>
      <div className='header'>
        <div className='dateIcon'>
          <span className='date'>{date}</span>
          <span
            className={classNames('arrow', visible && 'expand')}
            onClick={() => setVisible(!visible)}
          ></span>
        </div>
        <div className='oneLineOverview'>
          <div className='pay'>
            <span className='type'>支出</span>
            <span className='money'>{dayBalance.pay.toFixed(2)}</span>
          </div>
          <div className='income'>
            <span className='type'>收入</span>
            <span className='money'>{dayBalance.income.toFixed(2)}</span>
          </div>
          <div className='balance'>
            <span className='money'>{dayBalance.balance.toFixed(2)}</span>
            <span className='type'>结余</span>
          </div>
        </div>
      </div>
      {/* 单日列表 */}
      <div className='billList' style={{ display: visible ? 'block' : 'none' }}>
        {billList.map((item) => {
          return (
            <div className='bill' key={item.id}>
              <div className='detail'>
                <div className='billType'>{item.useFor}</div>
              </div>
              <div className={classNames('money', item.type)}>
                {item.money.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default DailyBill;
