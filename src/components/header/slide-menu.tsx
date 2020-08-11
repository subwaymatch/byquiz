import Link from 'next/link';
import { push as Menu } from 'react-burger-menu';

export default function SlideMenu() {
  return (
    <>
      <Menu
        customBurgerIcon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20">
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1-2" data-name="Layer 1">
                <rect width="30" height="2" />
                <rect y="9" width="30" height="2" />
                <rect y="18" width="30" height="2" />
              </g>
            </g>
          </svg>
        }
        pageWrapId="page-wrap"
        outerContainerId="layout-wrapper"
        right
      >
        <div>
          <Link href="/">
            <a className="menu-item">Home</a>
          </Link>
        </div>
        <div>
          <Link href="/course">
            <a className="menu-item">Courses</a>
          </Link>
        </div>
        <div>
          <Link href="/question">
            <a className="menu-item">Question Bank</a>
          </Link>
        </div>
      </Menu>
    </>
  );
}
