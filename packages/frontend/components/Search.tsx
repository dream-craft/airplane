'use client';

import React, { ReactNode, useState } from 'react';

import Link from 'next/link';
import { Input, List } from 'antd';
import { QuestionCircleTwoTone } from '@ant-design/icons';
import SearchNavDesc from './SearchNavDesc';

import styles from './search.module.css';

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

const SearchCompenent: ({ data, helpMessage }: SearchComponentProps) => JSX.Element = ({ data, helpMessage }: SearchComponentProps) => {
  const [currentMockServerId, setCurrentMockServerId] = useState<null | number>(null);
  const handleComponentClick = (mockServerId: null | number) => {
    console.log(`from ${currentMockServerId} set ${mockServerId}`);
    setCurrentMockServerId(mockServerId);
  };
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
                    <Link href="/mockserver" className={styles.serverName}>
                      {item.name}
                    </Link>
                    // <SearchNavDesc mockServerId={item.id} onClick={handleComponentClick}>
                    //   {item.name}
                    // </SearchNavDesc>
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

export default SearchCompenent;
