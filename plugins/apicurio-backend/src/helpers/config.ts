import { Config } from '@backstage/config';
import {
  ApicurioConfig,
  APICURIO_PREFIX,
} from '@janus-idp/backstage-plugin-apicurio-common';

const isValidUrl = (url: string): boolean => {
  try {
    // eslint-disable-next-line no-new
    new URL(url);
  } catch (error) {
    return false;
  }
  return true;
};

const getFromApicurioConfig = (config: Config): Config => {
  // Check if required values are valid
  const requiredValues = ['url'];
  requiredValues.forEach(key => {
    if (!config.has(key)) {
      throw new Error(
        `Value must be specified in config at '${APICURIO_PREFIX}.${key}'`,
      );
    }
  });
  return config;
};

const getHubClusterFromConfig = (config: Config): ApicurioConfig => {
  const hub = getFromApicurioConfig(config);

  const url = hub.getString('url');
  if (!isValidUrl(url)) {
    throw new Error(`"${url}" is not a valid url`);
  }

  return {
    url,
    serviceAccountToken: hub.getOptionalString('serviceAccountToken'),
    skipTLSVerify: hub.getOptionalBoolean('skipTLSVerify') || false,
  };
};

export const readApicurioConfigs = (config: Config): ApicurioConfig => {
  const apicurioConfigs = config.getConfig(APICURIO_PREFIX);
  return getHubClusterFromConfig(apicurioConfigs);
};
