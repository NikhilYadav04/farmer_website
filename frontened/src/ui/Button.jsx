import { Link } from 'react-router-dom';

export default function Button({ children, type, to, onClick }) {
  const base =
    'transition-all duration-500 ease-in-out hover:scale-105 rounded-full bg-gradient-to-r from-green-900 to-green-700';

  const styles = {
    primary:
      'flex h-12 w-36 cursor-pointer items-center justify-center rounded-xl bg-green-700 hover:bg-green-800 text-base',

    secondary:
      base +
      ' flex items-center justify-between px-[0.1rem] py-[0.1rem] text-white ',

    rounded:
      base +
      ' mx-3 flex items-center justify-between gap-3 py-3 pl-5 pr-3 text-white lg:py-4 lg:pl-10 lg:pr-8',

    sidebar:
      base +
      ' mt-6 mb-3 flex items-center justify-between gap-2 py-4 px-4 text-white',
  };

  // px-6 py-3 text-base text-[#fff] hover:bg-green-500/10

  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button className={styles[type]} onClick={onClick}>
        {children}
      </button>
    );

  return <button className={styles[type]}>{children}</button>;
}
