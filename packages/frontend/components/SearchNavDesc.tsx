'use client';
import { ReactNode } from 'react';

import styles from './search.module.css';

interface SearchNavDescProps {
  mockServerId: number;
  children: ReactNode;
  onClick: (arg: number) => void;
}

const SearchNavDesc = ({ mockServerId, children, onClick }: SearchNavDescProps) => {
  const handleClick = () => {
    onClick(mockServerId); // Pass the id argument to the onClick prop
  };

  return (
    <a className={styles.serverName} onClick={handleClick}>{children}</a>
  );
};
export default SearchNavDesc;
