'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

import backgroundPattern from '@documenso/assets/images/background-pattern.png';
import { cn } from '@documenso/ui/lib/utils';
import { Button } from '@documenso/ui/primitives/button';

export type NotFoundPartialProps = {
  children?: React.ReactNode;
};

export default function NotFoundPartial({ children }: NotFoundPartialProps) {
  const router = useRouter();

  return (
    <div style={{color:"black"}}>
      ERROR 404, página no encontrada
    </div>
  );
}
