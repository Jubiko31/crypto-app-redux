import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const CryptoCurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const {data: cryptoList, isFetching} = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searhTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searhTerm.toLowerCase()))
    setCryptos(filteredData)

  }, [cryptoList, searhTerm])

  if (isFetching) return <Loader />
  
  return (
    <>
    {!simplified && (
      <div className='search-crypto'>
        <Input 
          placeholder='Search currency...' 
          onChange={({ target }) => {
            setSearchTerm(target.value)
          }}
        />
      </div>
    )}
      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptos?.map((currency) => (
          <Col key={currency.uuid} xs={25} sm={12} lg={6} className='crypto-card'>
            <Link to={`/crypto/${currency.uuid}`}>
                <Card
                  title={`${currency.rank}. ${currency.name}`}
                  extra={<img className='crypto-image' src={currency.iconUrl} alt='cryptoimage'/>}
                  hoverable
                >
                  <p>Price: {millify(currency.price)}</p>
                  <p>Market Cap: {millify(currency.marketCap)}</p>
                  <p>Daily Change: {millify(currency.change)}%</p>
                </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default CryptoCurrencies