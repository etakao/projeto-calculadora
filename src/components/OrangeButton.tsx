import { ButtonHTMLAttributes } from 'react';

export function OrangeButton({
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className='key-box | w-16 h-16 flex items-center justify-center text-xl bg-orange-600 rounded-full hover:bg-orange-500 duration-200'
      {...rest}
    >
      {children}
    </button>
  );
}
