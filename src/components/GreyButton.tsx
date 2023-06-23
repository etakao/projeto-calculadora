import { ButtonHTMLAttributes } from 'react';

export function GreyButton({
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className='key-box | w-16 h-16 flex items-center justify-center text-xl bg-zinc-800 rounded-full hover:bg-zinc-700 duration-200'
      {...rest}
    >
      {children}
    </button>
  );
}
