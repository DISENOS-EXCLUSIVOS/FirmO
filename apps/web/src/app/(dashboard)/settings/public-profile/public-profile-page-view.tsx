'use client';

import { useEffect, useMemo, useState } from 'react';

import type { FindTemplateRow } from '@documenso/lib/server-only/template/find-templates';
import type {
  Team,
  TeamProfile,
  TemplateDirectLink,
  User,
  UserProfile,
} from '@documenso/prisma/client';
import { TemplateType } from '@documenso/prisma/client';
import { trpc } from '@documenso/trpc/react';
import { cn } from '@documenso/ui/lib/utils';
import { Button } from '@documenso/ui/primitives/button';
import { Switch } from '@documenso/ui/primitives/switch';
import { Tooltip, TooltipContent, TooltipTrigger } from '@documenso/ui/primitives/tooltip';
import { useToast } from '@documenso/ui/primitives/use-toast';

import { SettingsHeader } from '~/components/(dashboard)/settings/layout/header';
import type { TPublicProfileFormSchema } from '~/components/forms/public-profile-form';
import { PublicProfileForm } from '~/components/forms/public-profile-form';
import { ManagePublicTemplateDialog } from '~/components/templates/manage-public-template-dialog';

import { PublicTemplatesDataTable } from './public-templates-data-table';

export type PublicProfilePageViewOptions = {
  user: User;
  team?: Team;
  profile: UserProfile | TeamProfile;
};

type DirectTemplate = FindTemplateRow & {
  directLink: Pick<TemplateDirectLink, 'token' | 'enabled'>;
};

const userProfileText = {
  settingsTitle: 'Perfil público',
  settingsSubtitle: 'Puede optar por habilitar o deshabilitar su perfil para la vista pública.',
  templatesTitle: 'Mis plantillas',
  templatesSubtitle:
    'Muestre plantillas en su perfil público para que su audiencia las firme y comience rápidamente',
};

const teamProfileText = {
  settingsTitle: 'Perfil público del equipo',
  settingsSubtitle:
    'Puede optar por habilitar o deshabilitar el perfil de su equipo para la vista pública.',
  templatesTitle: 'Plantillas de equipo',
  templatesSubtitle:
    'Muestre plantillas en el perfil público de su equipo para que su audiencia las firme y comience rápidamente',
};

export const PublicProfilePageView = ({ user, team, profile }: PublicProfilePageViewOptions) => {
  const { toast } = useToast();

  const [isPublicProfileVisible, setIsPublicProfileVisible] = useState(profile.enabled);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const { data } = trpc.template.findTemplates.useQuery({
    perPage: 100,
    teamId: team?.id,
  });

  const { mutateAsync: updateUserProfile, isLoading: isUpdatingUserProfile } =
    trpc.profile.updatePublicProfile.useMutation();

  const { mutateAsync: updateTeamProfile, isLoading: isUpdatingTeamProfile } =
    trpc.team.updateTeamPublicProfile.useMutation();

  const isUpdating = isUpdatingUserProfile || isUpdatingTeamProfile;
  const profileText = team ? teamProfileText : userProfileText;

  const enabledPrivateDirectTemplates = useMemo(
    () =>
      (data?.templates ?? []).filter(
        (template): template is DirectTemplate =>
          template.directLink?.enabled === true && template.type !== TemplateType.PUBLIC,
      ),
    [data],
  );

  const onProfileUpdate = async (data: TPublicProfileFormSchema) => {
    if (team) {
      await updateTeamProfile({
        teamId: team.id,
        ...data,
      });
    } else {
      await updateUserProfile(data);
    }

    if (data.enabled === undefined && !isPublicProfileVisible) {
      setIsTooltipOpen(true);
    }
  };

  const togglePublicProfileVisibility = async (isVisible: boolean) => {
    setIsTooltipOpen(false);

    if (isUpdating) {
      return;
    }

    if (isVisible && !user.url) {
      toast({
        title: 'Debes configurar una URL de perfil antes de habilitar tu perfil público.',
        variant: 'destructive',
      });

      return;
    }

    setIsPublicProfileVisible(isVisible);

    try {
      await onProfileUpdate({
        enabled: isVisible,
      });
    } catch {
      toast({
        title: 'Algo salió mal',
        description: 'No pudimos configurar su perfil público como público. Inténtalo de nuevo.',
        variant: 'destructive',
      });

      setIsPublicProfileVisible(!isVisible);
    }
  };

  useEffect(() => {
    setIsPublicProfileVisible(profile.enabled);
  }, [profile.enabled]);

  return (
    <div className="max-w-2xl">
      <SettingsHeader title={profileText.settingsTitle} subtitle={profileText.settingsSubtitle}>
        <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
          <TooltipTrigger asChild>
            <div
              className={cn(
                'text-muted-foreground/50 flex flex-row items-center justify-center space-x-2 text-xs',
                {
                  '[&>*:first-child]:text-muted-foreground': !isPublicProfileVisible,
                  '[&>*:last-child]:text-muted-foreground': isPublicProfileVisible,
                },
              )}
            >
              <span>ocultar</span>
              <Switch
                disabled={isUpdating}
                checked={isPublicProfileVisible}
                onCheckedChange={togglePublicProfileVisibility}
              />
              <span>Mostrar</span>
            </div>
          </TooltipTrigger>

          <TooltipContent className="text-muted-foreground max-w-[40ch] space-y-2 py-2">
            {isPublicProfileVisible ? (
              <>
                <p>
                  El perfil es actualmente <strong>visible</strong>.
                </p>

                <p>Mueva el interruptor para ocultar su perfil al público</p>
              </>
            ) : (
              <>
                <p>
                  El perfil es actualmente <strong>oculto</strong>.
                </p>

                <p>Mueva el interruptor para mostrar su perfil al público.</p>
              </>
            )}
          </TooltipContent>
        </Tooltip>
      </SettingsHeader>

      <PublicProfileForm
        profileUrl={team ? team.url : user.url}
        teamUrl={team?.url}
        profile={profile}
        onProfileUpdate={onProfileUpdate}
      />

      <div className="mt-4">
        <SettingsHeader
          title={profileText.templatesTitle}
          subtitle={profileText.templatesSubtitle}
          hideDivider={true}
          className="mt-8 [&>*>h3]:text-base"
        >
          <ManagePublicTemplateDialog
            directTemplates={enabledPrivateDirectTemplates}
            trigger={<Button variant="outline">Link de Plantilla</Button>}
          />
        </SettingsHeader>

        <div className="mt-6">
          <PublicTemplatesDataTable />
        </div>
      </div>
    </div>
  );
};
