import { NavBar, DatePicker } from 'antd-mobile';
import './index.scss';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import _ from 'lodash';
import DailyBill from './components/DayBill';

const Month = () => {
  const [dateVisible, setDateVisible] = useState(false);

  //date data
  const [currentdate, setCurrentDate] = useState(() => {
    return dayjs(new Date()).format('YYYY-MM');
  });

  //billList
  const billList = useSelector((state) => state.bill.billList);
  const monthGroup = useMemo(() => {
    //return the calculated value
    return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY-MM'));
  }, [billList]);

  const [currentMonthList, setCurrentMonthList] = useState([]);

  const monthBalance = useMemo(() => {
    //pay, income, balance
    const pay = currentMonthList
      .filter((item) => item.type === 'pay')
      .reduce((a, c) => a + c.money, 0);
    const income = currentMonthList
      .filter((item) => item.type === 'income')
      .reduce((a, c) => a + c.money, 0);
    return {
      pay,
      income,
      balance: pay + income,
    };
  }, [currentMonthList]);

  //Display initial data during initialization
  useEffect(() => {
    const now = dayjs().format('YYYY-MM');
    if (monthGroup[now]) {
      setCurrentMonthList(monthGroup[now]);
    }
  }, [monthGroup]);

  //confirm
  const clickConfirm = (date) => {
    setDateVisible(false);
    const formatDate = dayjs(date).format('YYYY-MM');
    setCurrentMonthList(monthGroup[formatDate] || []);
    setCurrentDate(formatDate);
  };

  return (
    <div className='monthlyBill'>
      <NavBar className='nav' backArrow={false}>
        月度收支
      </NavBar>
      <div className='content'>
        <div className='header'>
          {/* 时间切换区域 */}
          <div className='date' onClick={() => setDateVisible(true)}>
            <span className='text'>{currentdate + ''}月账单</span>
            <span className={dateVisible ? 'arrow expand' : 'arrow'}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className='item'>
              <span className='money'>{monthBalance.pay.toFixed(2)}</span>
              <span className='type'>支出</span>
            </div>
            <div className='item'>
              <span className='money'>{monthBalance.income.toFixed(2)}</span>
              <span className='type'>收入</span>
            </div>
            <div className='item'>
              <span className='money'>{monthBalance.balance.toFixed(2)}</span>
              <span className='type'>结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className='kaDate'
            title='记账日期'
            precision='month'
            visible={dateVisible}
            onCancel={() => setDateVisible(false)}
            onConfirm={clickConfirm}
            onClose={() => setDateVisible(false)}
            max={new Date()}
          />
        </div>
        {/*当日列表*/}
        <DailyBill />
      </div>
    </div>
  );
};

export default Month;
