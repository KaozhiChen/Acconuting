import { Button, Modal, DatePicker, Input, Toast, NavBar } from 'antd-mobile';

import Icon from '../../components/Icon';
import './index.scss';
import classNames from 'classnames';
import { billListData } from '../../contants';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { addBillList } from '../../store/modules/billStore';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';

const New = () => {
  const navigate = useNavigate();

  //control the bill types
  const [billType, setBillType] = useState('pay');
  const dispatch = useDispatch();

  const [money, setMoney] = useState();
  const moneyChange = (value) => {
    setMoney(value);
  };

  const [useFor, setUseFor] = useState('');

  //collect bill data
  const saveBill = () => {
    const data = {
      //1.bill type
      type: billType,
      //2.money
      money: billType === 'pay' ? -money : +money,
      //date
      date: date,
      //useFor
      useFor: useFor,
    };

    // submit form
    if (data.type && data.money && data.date && data.useFor) {
      dispatch(addBillList(data));
      // Modal.alert({
      //   title: '添加成功！',
      //   showCloseButton: true,
      //   onConfirm: () => {
      //     setMoney('');
      //     setUseFor('');
      //   },
      // });
      Modal.confirm({
        content: '是否提交申请',
        onConfirm: () => {
          setTimeout(() => {
            Toast.show({
              icon: 'success',
              content: '提交成功',
              position: 'bottom',
            });
          }, 1000);
          // setMoney('');
          // setUseFor('');
        },
      });
    } else {
      Modal.alert({
        title: '添加失败！请填入金额以及选择相应类型',
        showCloseButton: true,
      });
    }
  };

  //confirm selceted date
  const [date, setDate] = useState();

  //dateVisible
  const [dateVisible, setDateVisible] = useState(false);
  // dateConfirm
  const dateConfirm = (value) => {
    setDate(value);
    setDateVisible(false);
  };

  return (
    <div className='keepAccounts'>
      <NavBar className='nav' onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className='header'>
        <div className='kaType'>
          <Button
            shape='rounded'
            className={classNames(billType === 'pay' ? 'selected' : '')}
            onClick={() => {
              setBillType('pay');
            }}
          >
            支出
          </Button>
          <Button
            className={classNames(billType === 'income' ? 'selected' : '')}
            shape='rounded'
            onClick={() => {
              setBillType('income');
            }}
          >
            收入
          </Button>
        </div>

        <div className='kaFormWrapper'>
          <div className='kaForm'>
            {/* date selector */}
            <div className='date'>
              <Icon type='calendar' className='icon' />
              <span
                className='text'
                onClick={() => {
                  setDateVisible(true);
                }}
              >
                {dayjs(date).format('YYYY-MM-DD')}
              </span>
              <DatePicker
                className='kaDate'
                title='记账日期'
                max={new Date()}
                visible={dateVisible}
                onConfirm={dateConfirm}
              />
            </div>
            <div className='kaInput'>
              <Input
                className='input'
                placeholder='0.00'
                type='number'
                value={money}
                onChange={moneyChange}
              />
              <span className='iconYuan'>¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className='kaTypeList'>
        {/* data */}
        {billListData[billType].map((item) => {
          return (
            <div className='kaType' key={item.type}>
              <div className='title'>{item.name}</div>
              <div className='list'>
                {item.list.map((item) => {
                  return (
                    <div
                      className={classNames(
                        'item',
                        useFor === item.type ? 'selected' : ''
                      )}
                      key={item.type}
                      onClick={() => {
                        setUseFor(item.type);
                      }}
                    >
                      <div className='icon'>
                        <Icon type={item.type} />
                      </div>
                      <div className='text'>{item.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className='btns'>
        <Button className='btn save' onClick={saveBill}>
          保 存
        </Button>
      </div>
    </div>
  );
};

export default New;
