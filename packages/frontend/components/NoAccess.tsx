import Image from 'next/image';
import styles from './noaccess.module.css';


const NoAccess = () => {
  return (
    <div className={styles.container}>
        <Image width={80} height={80} src="/NoEntry.png" alt="no entry emoji" />
        <p>
        Server Not Exists!
        </p>
    </div>
  );
};
export default NoAccess;
