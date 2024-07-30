import type { SVGAttributes } from 'react';

export type BackgroundProps = Omit<SVGAttributes<SVGElement>, 'viewBox'>;

export const Background = ({ ...props }: BackgroundProps) => {
  return (
    <></>
  );
};
