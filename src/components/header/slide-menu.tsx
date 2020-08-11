import Link from 'next/link';
import { push as Menu } from 'react-burger-menu';
// import burgerBarsIcon from 'src/svg/icon-burger-bars.svg';

const menuStyles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    right: '0',
    top: '0',
  },
  bmBurgerBars: {
    background: '#ffcc33',
  },
  bmBurgerBarsHover: {
    background: '#000',
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
  },
  bmCross: {
    background: '#bdc3c7',
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
  },
  bmMorphShape: {
    fill: '#373a47',
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em',
  },
  bmItem: {
    display: 'inline-block',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
  },
};

export default function SlideMenu() {
  return (
    <Menu
      customBurgerIcon={<img src="/images/icon-burger-bars.svg" />}
      styles={menuStyles}
      pageWrapId="page-wrap"
      outerContainerId="layout-wrapper"
      right
    >
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/course">
        <a>Courses</a>
      </Link>
      <Link href="/question">
        <a>Question Bank</a>
      </Link>
    </Menu>
  );
}
