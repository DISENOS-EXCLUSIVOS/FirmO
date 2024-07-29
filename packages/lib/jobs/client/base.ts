import type { NextApiRequest, NextApiResponse } from 'next';

import type { JobDefinition, SimpleTriggerJobOptions } from './_internal/job';

export abstract class BaseJobProvider {
  // eslint-disable-next-line @typescript-eslint/require-await
  public async triggerJob(_options: SimpleTriggerJobOptions): Promise<void> {
    throw new Error('No se ha implementado');
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public defineJob<N extends string, T>(_job: JobDefinition<N, T>): void {
    throw new Error('No se ha implementado');
  }

  public getApiHandler(): (req: NextApiRequest, res: NextApiResponse) => Promise<Response | void> {
    throw new Error('No se ha implementado');
  }
}
