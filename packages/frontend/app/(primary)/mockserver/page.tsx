'use client';

import React, { useState, useEffect } from 'react';
import { fetchData } from '@/apis/mockServer';

import Link from 'next/link';
import { Input, List } from 'antd';
import { QuestionCircleTwoTone } from '@ant-design/icons';

import styles from './mockserver.module.css';

const { Search } = Input;

const onSearch = (value: string) => console.log(value);

interface SearchComponentProps {
  data: {
    id: null | number;
    name: string;
    description: string;
    updatedAt: string;
  }[];
  helpMessage: string;
}

const SearchComponent: ({ data, helpMessage }: SearchComponentProps) => JSX.Element = ({ data, helpMessage }: SearchComponentProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <p className={styles.list}>Mock Server List</p>
        <div className={styles.helpMessage}>
          <QuestionCircleTwoTone rev={undefined} />
          <p>{helpMessage}</p>
        </div>
        <div className={styles.searchBox}>
          <Search placeholder="input search text" allowClear onSearch={onSearch} />
        </div>
        <div className={styles.antdList}>
          <List
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 10,
            }}
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <Link href={`/mockserver/${item.id}`} className={styles.serverName}>
                      {item.name}
                    </Link>
                  }
                  description={<p className={styles.descriptionItem}>{item.description}</p>}
                />
              </List.Item>
            )}
            bordered
          />
        </div>
      </div>
    </div>
  );
};

const MockServer = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const responseData = await fetchData();
        setData(responseData);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    getData();
  }, []);
  console.log(data);
  return <div>{data && <SearchComponent data={data} helpMessage={'Click the mock server name to view details'} />}</div>;
};
export default MockServer;
