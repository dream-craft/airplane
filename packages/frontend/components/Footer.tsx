import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.container}>
      <span className={styles.text}>Made with ❤️ by DreamCraft</span>
      <span className={styles.text}>&copy; {new Date().getFullYear().toString()}</span>
    </footer>
  );
};
export default Footer;
