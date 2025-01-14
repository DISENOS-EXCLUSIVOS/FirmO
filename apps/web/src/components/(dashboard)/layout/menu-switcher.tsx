'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { motion } from 'framer-motion';
import { CheckCircle2, ChevronsUpDown, Plus, Settings2 } from 'lucide-react';
import { signOut } from 'next-auth/react';

import { NEXT_PUBLIC_WEBAPP_URL } from '@documenso/lib/constants/app';
import { TEAM_MEMBER_ROLE_MAP, TEAM_URL_REGEX } from '@documenso/lib/constants/teams';
import { isAdmin } from '@documenso/lib/next-auth/guards/is-admin';
import type { GetTeamsResponse } from '@documenso/lib/server-only/team/get-teams';
import { extractInitials } from '@documenso/lib/utils/recipient-formatter';
import { canExecuteTeamAction } from '@documenso/lib/utils/teams';
import type { User } from '@documenso/prisma/client';
import { trpc } from '@documenso/trpc/react';
import { cn } from '@documenso/ui/lib/utils';
import { AvatarWithText } from '@documenso/ui/primitives/avatar';
import { Button } from '@documenso/ui/primitives/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@documenso/ui/primitives/dropdown-menu';

const MotionLink = motion(Link);

export type MenuSwitcherProps = {
  user: User;
  teams: GetTeamsResponse;
};

export const MenuSwitcher = ({ user, teams: initialTeamsData }: MenuSwitcherProps) => {
  const pathname = usePathname();

  const isUserAdmin = isAdmin(user);

  const { data: teamsQueryResult } = trpc.team.getTeams.useQuery(undefined, {
    initialData: initialTeamsData,
  });

  const teams = teamsQueryResult && teamsQueryResult.length > 0 ? teamsQueryResult : null;

  const isPathTeamUrl = (teamUrl: string) => {
    if (!pathname || !pathname.startsWith(`/t/`)) {
      return false;
    }

    return pathname.split('/')[2] === teamUrl;
  };

  const selectedTeam = teams?.find((team) => isPathTeamUrl(team.url));

  const formatAvatarFallback = (teamName?: string) => {
    if (teamName !== undefined) {
      return teamName.slice(0, 1).toUpperCase();
    }

    return user.name ? extractInitials(user.name) : user.email.slice(0, 1).toUpperCase();
  };

  const formatSecondaryAvatarText = (team?: typeof selectedTeam) => {
    if (!team) {
      return 'Cuenta personal';
    }

    if (team.ownerUserId === user.id) {
      return 'Dueño';
    }

    return TEAM_MEMBER_ROLE_MAP[team.currentTeamMember.role];
  };

  /**
   * Formats the redirect URL so we can switch between documents and templates page
   * seemlessly between teams and personal accounts.
   */
  const formatRedirectUrlOnSwitch = (teamUrl?: string) => {
    const baseUrl = teamUrl ? `/t/${teamUrl}/` : '/';

    const currentPathname = (pathname ?? '/').replace(TEAM_URL_REGEX, '');

    if (currentPathname === '/templates') {
      return `${baseUrl}templates`;
    }

    return baseUrl;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          data-testid="menu-switcher"
          variant="none"
          className="relative flex h-12 flex-row items-center px-0 py-2 ring-0 focus:outline-none focus-visible:border-0 focus-visible:ring-0 focus-visible:ring-transparent md:px-2"
        >
          <AvatarWithText
            avatarSrc={`${NEXT_PUBLIC_WEBAPP_URL()}/api/avatar/${
              selectedTeam ? selectedTeam.avatarImageId : user.avatarImageId
            }`}
            avatarFallback={formatAvatarFallback(selectedTeam?.name)}
            primaryText={selectedTeam ? selectedTeam.name : user.name}
            secondaryText={formatSecondaryAvatarText(selectedTeam)}
            rightSideComponent={
              <ChevronsUpDown className="text-muted-foreground ml-auto h-4 w-4" />
            }
            textSectionClassName="hidden lg:flex"
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className={cn('z-[60] ml-6 w-full md:ml-0', teams ? 'min-w-[20rem]' : 'min-w-[12rem]')}
        align="end"
        forceMount
      >
        {teams ? (
          <>
            <DropdownMenuLabel>Personal</DropdownMenuLabel>

            <DropdownMenuItem asChild>
              <Link href={formatRedirectUrlOnSwitch()}>
                <AvatarWithText
                  avatarSrc={
                    user.avatarImageId
                      ? `${NEXT_PUBLIC_WEBAPP_URL()}/api/avatar/${user.avatarImageId}`
                      : undefined
                  }
                  avatarFallback={formatAvatarFallback()}
                  primaryText={user.name}
                  secondaryText={formatSecondaryAvatarText()}
                  rightSideComponent={
                    !pathname?.startsWith(`/t/`) && (
                      <CheckCircle2 className="ml-auto fill-black text-white dark:fill-white dark:text-black" />
                    )
                  }
                />
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="mt-2" />

            <DropdownMenuLabel>
              <div className="flex flex-row items-center justify-between">
                <p>Equipos</p>

                <div className="flex flex-row space-x-2">
                  <DropdownMenuItem asChild>
                    <Button
                      title="Gestionar equipos"
                      variant="ghost"
                      className="text-muted-foreground flex h-5 w-5 items-center justify-center p-0"
                      asChild
                    >
                      <Link href="/settings/teams">
                        <Settings2 className="h-4 w-4" />
                      </Link>
                    </Button>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Button
                      title="Crear equipo"
                      variant="ghost"
                      className="text-muted-foreground flex h-5 w-5 items-center justify-center p-0"
                      asChild
                    >
                      <Link href="/settings/teams?action=add-team">
                        <Plus className="h-4 w-4" />
                      </Link>
                    </Button>
                  </DropdownMenuItem>
                </div>
              </div>
            </DropdownMenuLabel>

            <div className="custom-scrollbar max-h-[40vh] overflow-auto">
              {teams.map((team) => (
                <DropdownMenuItem asChild key={team.id}>
                  <MotionLink
                    initial="initial"
                    animate="initial"
                    whileHover="animate"
                    href={formatRedirectUrlOnSwitch(team.url)}
                  >
                    <AvatarWithText
                      avatarSrc={
                        team.avatarImageId
                          ? `${NEXT_PUBLIC_WEBAPP_URL()}/api/avatar/${team.avatarImageId}`
                          : undefined
                      }
                      avatarFallback={formatAvatarFallback(team.name)}
                      primaryText={team.name}
                      secondaryText={
                        <div className="relative w-full">
                          <motion.span
                            className="overflow-hidden"
                            variants={{
                              initial: { opacity: 1, translateY: 0 },
                              animate: { opacity: 0, translateY: '100%' },
                            }}
                          >
                            {formatSecondaryAvatarText(team)}
                          </motion.span>

                          <motion.span
                            className="absolute inset-0"
                            variants={{
                              initial: { opacity: 0, translateY: '100%' },
                              animate: { opacity: 1, translateY: 0 },
                            }}
                          >{`/t/${team.url}`}</motion.span>
                        </div>
                      }
                      rightSideComponent={
                        isPathTeamUrl(team.url) && (
                          <CheckCircle2 className="ml-auto fill-black text-white dark:fill-white dark:text-black" />
                        )
                      }
                    />
                  </MotionLink>
                </DropdownMenuItem>
              ))}
            </div>
          </>
        ) : (
          <DropdownMenuItem className="text-muted-foreground px-4 py-2" asChild>
            <Link
              href="/settings/teams?action=add-team"
              className="flex items-center justify-between"
            >
              Crear Equipo
              <Plus className="ml-2 h-4 w-4" />
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        {isUserAdmin && (
          <DropdownMenuItem className="text-muted-foreground px-4 py-2" asChild>
            <Link href="/admin"> Panel Administrador</Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem className="text-muted-foreground px-4 py-2" asChild>
          <Link href="/settings/profile">Configuración</Link>
        </DropdownMenuItem>

        {selectedTeam &&
          canExecuteTeamAction('MANAGE_TEAM', selectedTeam.currentTeamMember.role) && (
            <DropdownMenuItem className="text-muted-foreground px-4 py-2" asChild>
              <Link href={`/t/${selectedTeam.url}/settings/`}>Configuración de equipo</Link>
            </DropdownMenuItem>
          )}

        <DropdownMenuItem
          className="text-destructive/90 hover:!text-destructive px-4 py-2"
          onSelect={async () =>
            signOut({
              callbackUrl: '/',
            })
          }
        >
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
