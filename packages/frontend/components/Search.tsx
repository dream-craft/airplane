'use client';

import React, { ReactNode, useState } from 'react';

import { Input, Space, List } from 'antd';
import { QuestionCircleTwoTone } from '@ant-design/icons';
import SearchNavDesc from './SearchNavDesc';
import Description from './Description';

import styles from './search.module.css';

const { Search } = Input;

const onSearch = (value: string) => console.log(value);


  interface SearchComponentProps {
    data: {
        id: number;
        name: string;
        description: string;
        updatedAt: string;
    }[];
    helpMessage: string;
  }

const SearchCompenent: ({ data, helpMessage }: SearchComponentProps) => JSX.Element = ({data, helpMessage}: SearchComponentProps) => {
    const [currentMockServerId, setCurrentMockServerId] = useState(0);
    const handleComponentClick = (mockServerId: number) => {
        setCurrentMockServerId(mockServerId);
    };
    return (
        <div className={styles.container}>
            <div className={styles.searchBox}>
                <p className={styles.list}>List</p>
                <Space 
                    direction="vertical"
                    
                >
                <div className={styles.helpMessage}>
                    <QuestionCircleTwoTone rev={undefined} />   
                    <p>{helpMessage}</p>
                </div>
                <Search
                    placeholder="input search text"
                    allowClear
                    onSearch={onSearch}
                    style={{ width: 304 }}
                    
                />      
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
                                <SearchNavDesc mockServerId={item.id} onClick={handleComponentClick}>{item.name}</SearchNavDesc>
                            }
                            description={<p className={styles.descriptionItem}>{item.description}</p>}
                        />
                        </List.Item>
                    )}
                    bordered
                />
                </Space>
            </div>
            <div className={styles.descriptionContainer}>
                <Description mockServerId={currentMockServerId} />
            </div>
        </div>
    );
};
  
export default SearchCompenent;