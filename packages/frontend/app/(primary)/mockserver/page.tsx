'use client';

import React, { useState, useEffect } from 'react';
import SeachComponent from '@/components/Search'
import { fetchData } from '@/apis/mockServer';


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
  return (
    <div>
    {data && (
        <SeachComponent data={data} helpMessage={'Click the mock server name to view details'} />
      )}
    </div>      
  );
};
export default MockServer;
