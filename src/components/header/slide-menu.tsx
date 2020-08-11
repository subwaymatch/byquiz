import Link from 'next/link';
import { push as Menu } from 'react-burger-menu';

export default function SlideMenu() {
  return (
    <>
      <Menu
        customBurgerIcon={<img src="/images/icon-burger-bars.svg" />}
        pageWrapId="page-wrap"
        outerContainerId="layout-wrapper"
        right
      >
        <Link href="/">
          <a className="menu-item">Home</a>
        </Link>
        <Link href="/course">
          <a className="menu-item">Courses</a>
        </Link>
        <Link href="/question">
          <a className="menu-item">Question Bank</a>
        </Link>
      </Menu>

      <style jsx global>
        {`
          /* Position and sizing of burger button */
          .bm-burger-button {
            position: fixed;
            width: 40px;
            height: 30px;
            top: 0rem;
            right: 0rem;
            background: #fc3;
            padding: 5px;
          }

          .bm-burger-button button {
            outline: none;
          }

          /* Position and sizing of clickable cross button */
          .bm-cross-button {
            height: 24px;
            width: 24px;
          }

          /* Color/shape of close button cross */
          .bm-cross {
            background: #bdc3c7;
          }

          /*
Sidebar wrapper styles
Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
*/
          .bm-menu-wrap {
            position: fixed;
            height: 100%;
          }

          /* General sidebar styles */
          .bm-menu {
            background: white;
            padding: 2.5em 1.5em 0;
            font-size: 1.1rem;
          }

          /* Morph shape necessary with bubble or elastic */
          .bm-morph-shape {
            fill: #373a47;
          }

          /* Wrapper for item list */
          .bm-item-list {
            color: #b8b7ad;
            padding: 0.8em;
          }

          /* Individual item */
          .menu-item {
            display: block;
          }

          /* Styling of overlay */
          .bm-overlay {
            background: rgba(0, 0, 0, 0.3);
          }
        `}
      </style>
    </>
  );
}
