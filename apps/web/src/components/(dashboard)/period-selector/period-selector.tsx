'use client';

import { useMemo } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@documenso/ui/primitives/select';

import { isPeriodSelectorValue } from './types';

export const PeriodSelector = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const router = useRouter();

  const period = useMemo(() => {
    const p = searchParams?.get('period') ?? 'all';

    return isPeriodSelectorValue(p) ? p : 'all';
  }, [searchParams]);

  const onPeriodChange = (newPeriod: string) => {
    if (!pathname) {
      return;
    }

    const params = new URLSearchParams(searchParams?.toString());

    params.set('period', newPeriod);

    if (newPeriod === '' || newPeriod === 'all') {
      params.delete('period');
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Select defaultValue={period} onValueChange={onPeriodChange}>
      <SelectTrigger className="text-muted-foreground max-w-[200px]">
        <SelectValue />
      </SelectTrigger>

      <SelectContent position="popper">
        <SelectItem value="all">Todo el tiempo</SelectItem>
        <SelectItem value="7d">últimos 7 días</SelectItem>
        <SelectItem value="14d">últimos 14 días</SelectItem>
        <SelectItem value="30d">últimos 30 días</SelectItem>
      </SelectContent>
    </Select>
  );
};
