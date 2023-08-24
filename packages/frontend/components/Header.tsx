import Image from 'next/image';
import Link from 'next/link';
import HeaderNavLink from './HeaderNavLink';

import styles from './header.module.css';

const menuItems: { label: string; url: string }[] = [
  { label: 'Home', url: '/' },
  { label: 'Mock Server', url: '/mockserver' },
  { label: 'Docs', url: '/docs' },
  { label: 'Manage', url: '/manage' },
  { label: 'Guide', url: '/guide' },
];

const Header = () => {
  return (
    <header className={`${styles.header} ${styles.flexCol} ${styles.gap5}`}>
      <div className="py-4 flex items-center">
        <Link href="/">
          <div className={styles.container}>
            <Image width={36} height={36} src="/airplane-departure.png" alt="logo" />
            <div className={styles.textContainer}>
              <h1 className={styles.logoText}>Airplane</h1>
            </div>
          </div>
        </Link>
        <nav className={styles.menuNav}>
          <ul className={styles.menuText}>
            {menuItems.map(({ url, label }, index) => (
              <li key={index}>
                <HeaderNavLink href={url}>{label}</HeaderNavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex ml-20 gap-6">
          <Link href="/">
            <div>
              <Image width={36} height={36} src="/bar_chart_3d.png" alt="statistics" />
            </div>
          </Link>
          <Link href="/">
            <div>
              <Image width={36} height={36} src="/cat_face_3d.png" alt="github" />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};
export default Header;
