import { errorHandler } from '@backstage/backend-common';
import { Config } from '@backstage/config';
import express, { Request } from 'express';
import { Logger } from 'winston';
import { ApicurioApiImpl } from '../clients';
import { readApicurioConfigs } from '../helpers';

export interface RouterOptions {
  logger: Logger;
  config: Config;
}

export type SearchQuery = {
  annotation: { [key: string]: string };
  name?: string;
};

enum Params {
  groupId = 'groupId',
  id = 'id',
  version = 'version',
}

export const makeRouter = (
  logger: Logger,
  apicurioAPI: ApicurioApiImpl,
): express.Router => {
  const getQuery = (req: Request): string => {
    return Object.keys(req.query)
      .map(k => {
        if (k !== 'properties') {
          return `${k}=${req.query[k]}`;
        }
        const propertiesValue = req.query[k] as string;
        return (propertiesValue as string)
          .split(',')
          .map(value => `${k}=${value}`)
          .join('&');
      })
      .join('&');
  };

  const router = express.Router();
  router.use(express.json());

  router.get('/search/artifacts', async (req, response) => {
    logger.info('Call to Search artifacts');
    const query = getQuery(req);
    apicurioAPI
      .searchArtifacts(query)
      .then(resp => {
        response.status(200).json(resp);
      })
      .catch(err => logger.error(err));
  });

  router.get(
    `/artifact/:${Params.groupId}/:${Params.id}/versions/:${Params.version}`,
    async (req, response) => {
      logger.info(
        'Call to artifact ' +
          `${req.params[Params.groupId]}/${req.params[Params.id]}`,
      );
      apicurioAPI
        .getArtifact(
          req.params[Params.groupId],
          req.params[Params.id],
          req.params[Params.version],
          req.query.properties as string,
        )
        .then(resp => {
          response.status(200).json(resp);
        })
        .catch(err => {
          logger.error(err);
          response.status(404);
        });
    },
  );

  router.use(errorHandler());
  return router;
};

/** @public */
export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger } = options;
  const { config } = options;

  logger.info('Initializing Apicurio backend');

  const apicurio = readApicurioConfigs(config);

  const apicurioAPI = new ApicurioApiImpl({ logger, apicurio });

  return makeRouter(logger, apicurioAPI);
}
