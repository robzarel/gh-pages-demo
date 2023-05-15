import React, { useEffect, useState, useCallback } from 'react';

import api from './api';
import type { RESPONSE_DATA } from './api';

import Pagination from './components/pagination';

import './App.css';


import options from './components/select/options.json';
import Select from './components/select';

const ROWS_PER_PAGE = 10;

const getTotalPageCount = (rowCount: number): number =>
  Math.ceil(rowCount / ROWS_PER_PAGE);

function App() {
  const [data, setData] = useState<RESPONSE_DATA | null>(null);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const response = await api.get.data(page);
        setData(response);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Unknown Error: api.get.data'
        );
        setData(null);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [page]);

  const handleNextPageClick = useCallback(() => {
    const current = page;
    const next = current + 1;
    const total = data ? getTotalPageCount(data.count) : current;

    setPage(next <= total ? next : current);
  }, [page, data]);

  const handlePrevPageClick = useCallback(() => {
    const current = page;
    const prev = current - 1;

    setPage(prev > 0 ? prev : current);
  }, [page]);

  const [month, setMonthValue] = useState('');
  const handleMonthSelect = (value: string) => { setMonthValue(value); };
  const selectedMonth = options.find((item) => item.value === month);

  return (
    <div className="App">
      <div className="Select">
        <Select
          mode='cells'
          options={options}
          selected={selectedMonth || null}
          onChange={handleMonthSelect}
          placeholder="Выберите месяц"
        />
      </div>
      {data?.list ? <ul>{ data.list.map((item, index) => <li key={index}>{`${item.name}`}</li>)}</ul>: "no data"}
      {data &&
        <Pagination
          onNextPageClick={handleNextPageClick}
          onPrevPageClick={handlePrevPageClick}
          disable={{
            left: page === 1,
            right: page === getTotalPageCount(data.count),
          }}
          nav={{ current: page, total: getTotalPageCount(data.count) }}
        />
      }
    </div>
  );
}

export default App;
