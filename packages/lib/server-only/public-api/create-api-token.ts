import type { Duration } from 'luxon';
import { DateTime } from 'luxon';

import { prisma } from '@documenso/prisma';
import { TeamMemberRole } from '@documenso/prisma/client';

// temporary choice for testing only
import * as timeConstants from '../../constants/time';
import { alphaid } from '../../universal/id';
import { hashString } from '../auth/hash';

type TimeConstants = typeof timeConstants & {
  [key: string]: number | Duration;
};

type CreateApiTokenInput = {
  userId: number;
  teamId?: number;
  tokenName: string;
  expiresIn: string | null;
};

export const createApiToken = async ({
  userId,
  teamId,
  tokenName,
  expiresIn,
}: CreateApiTokenInput) => {
  const apiToken = `api_${alphaid(16)}`;

  const hashedToken = hashString(apiToken);

  const timeConstantsRecords: TimeConstants = timeConstants;

  if (teamId) {
    const member = await prisma.teamMember.findFirst({
      where: {
        userId,
        teamId,
        role: TeamMemberRole.ADMIN,
      },
    });

    if (!member) {
      throw new Error('No tienes permiso para crear un token para este equipo');
    }
  }

  const storedToken = await prisma.apiToken.create({
    data: {
      name: tokenName,
      token: hashedToken,
      expires: expiresIn ? DateTime.now().plus(timeConstantsRecords[expiresIn]).toJSDate() : null,
      userId: teamId ? null : userId,
      teamId,
    },
  });

  if (!storedToken) {
    throw new Error('No se pudo crear el token API');
  }

  return {
    id: storedToken.id,
    token: apiToken,
  };
};
