'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Descriptions, Tag } from 'antd';
import type { DescriptionsProps } from 'antd';


import styles from './description.module.css';
import NoAccess from './NoAccess';
import { fetchData } from '@/apis/description';
import { MockServerDto } from '@airplane/api-types';



function parseDefault(data : MockServerDto) {
  let items: DescriptionsProps['items'] = [];
  
  items.push({key: 'description', label: 'Description', children: `${data.description}`, span: 3});
  items.push({key: 'createdAt', label: 'CreatedAt', children: `${data.createdAt}`});
  items.push({key: 'updatedAt', label: 'UpdatedAt', children: `${data.updatedAt}`});
  items.push({key: 'deletedAt', label: 'DeletedAt', children: `${data.deletedAt}`});
  return items
}

function parseHttpMock(data : NonNullable<MockServerDto['httpMock']>) {
  let items: DescriptionsProps['items'] = [];
  items.push({key: 'baseUrl', label: 'BaseUrl', children: `${data.baseUrl}`, span: 3});
  items.push({key: 'createdAt', label: 'CreatedAt', children: `${data.createdAt}`});
  items.push({key: 'updatedAt', label: 'UpdatedAt', children: `${data.updatedAt}`});
  items.push({key: 'deletedAt', label: 'DeletedAt', children: `${data.deletedAt}`});
  return items
}


interface DescriptionProps {
  mockServerId: number;
}

const Description = ({ mockServerId }: DescriptionProps) => {
  console.log(mockServerId);
  if (mockServerId == 0) {
    return (
      <div className={styles.container}>
        <Image width={80} height={80} src="/LighBlueHeart.png" alt="light blue heart emoji" />
        <p>
          Airplane helps you to create and manage mock servers.
          <br />
          To view existing mock servers, select Mock Servers in the sidebar.
        </p>
      </div>
)
  } else {
    const [data, setData] = useState<MockServerDto | null>(null);

    useEffect(() => {
      const getData = async () => {
        try {
          const responseData = await fetchData(mockServerId);
          setData(responseData);
        } catch (error) {
          console.error('Error:', error);
        }
      };
      getData();
    }, []);

    if (data == null) {
      return (
      <div className={styles.container}>
        <Image width={80} height={80} src="/PleadingFace.png" alt="pleading face emoji" />
        <p>
        Oops! Something went wrong!<br />Failed to fetch data (mockServerId={mockServerId})
        </p>
      </div>
      )
    } else {
      console.log(data);
      let defaultItems = parseDefault(data);

      let httpMock = data.httpMock;
      let httpMockItems : DescriptionsProps['items'] = [];
      if (httpMock) {
        httpMockItems = parseHttpMock(httpMock);
      }

      let wsMock = null;
      return (
        <div>
          <p className={styles.header}>
            <span className={styles.mockServerName}>{data.name}</span>
            <Tag bordered={false} color="blue">id: {data.id}</Tag>
          </p>
          <Descriptions layout="vertical" bordered items={defaultItems} />
          <div>
          <p className={styles.header2}>Http Mock Server</p>
          {httpMock ? (
            <Descriptions layout="vertical" bordered items={httpMockItems} />
            ) : (
            <NoAccess />
          )}
          <p className={styles.header2}>WebSocket Mock Server</p>
          {wsMock ? (
              <p>This content will be rendered if the condition is true.</p>
            ) : (
              <NoAccess />
          )}
          </div>
        </div>
      )
    }
  }
};

export default Description;