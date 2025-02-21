import { Link } from 'react-router-dom';

export default function NavList({ children, to, onClick, type }) {
  const base =
    'transition duration-500 ease-in-out hover:scale-105 hover:bg-green-500/10';

  const style = {
    nav: base + ' rounded-full px-8 py-3 hover:text-green-400',
    primary:
      base +
      ' rounded-md bg-gradient-to-r from-green-900 to-green-700 px-8 py-3 text-base text-[#fff]',
    secondary: base + ' rounded-md px-8 py-3 text-base hover:text-green-400 ',
  };

  if (onClick && to)
    return (
      <Link className={style[type]} onClick={onClick} to={to}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <Link className={style[type]} onClick={onClick}>
        {children}
      </Link>
    );
  if (to)
    return (
      <Link className={style[type]} to={to}>
        {children}
      </Link>
    );
}
