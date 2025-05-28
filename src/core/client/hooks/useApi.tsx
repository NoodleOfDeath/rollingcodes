import React from 'react';

import axios from 'axios';

import { UserData } from '../../types';

import { API_ENDPOINT } from '~/api';
import {
  Api,
  BadRequest,
  RequestParams,
} from '~/gen/Api';
import { getUserAgent } from '~/utils';

export type ApiV1 = typeof Api['prototype']['v1'];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FunctionWithRequestParams<T extends any[], R> = ((...args: [...T, RequestParams]) => R);

export type Methods = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k in keyof ApiV1]: ApiV1[k] extends (...args: [...Parameters<ApiV1[k]>, RequestParams | undefined]) => infer R ? 
  (...args: Parameters<ApiV1[k]>) => R : never;
};

export type UserBasedState = {
  userData?: UserData;
};

export const ENDPOINTS = {
  dev: API_ENDPOINT,
  prod: 'https://api.drunkmode.app',
  staging: 'https://api.dev.drunkmode.app',
} as const;

export type Environment = keyof typeof ENDPOINTS;

export type UseApiProps= {
  state: UserBasedState;
  nonce: string;
  refreshNonce?: () => Promise<string>;
  onAuthError?: (e?: BadRequest) => Promise<void>;
};

export const useApi = ({
  state,
  nonce,
  refreshNonce,
  onAuthError,
}: UseApiProps) => {

  const [environment, setEnvironment] = React.useState<Environment>(__DEV__ ? 'dev' : 'prod');
  const [endpoint, setEndpoint] = React.useState(ENDPOINTS[environment]);
  const [version, setVersion] = React.useState(getUserAgent().currentVersion);
  const [locale, setLocale] = React.useState(getUserAgent().locale);
  const [os, setOS] = React.useState(getUserAgent().OS);

  const API = React.useMemo(() => new Api({ baseUrl: endpoint }).v1, [endpoint]);

  /** for development only, check for localhost, otherwise use staging */
  React.useEffect(() => {
    if (__DEV__) {
      (async () => {
        if (environment === 'dev') {
          try {
            await axios.get(`${endpoint}/v1/healthz`);
            setEndpoint(ENDPOINTS.dev);
          } catch (e) {
            setEnvironment('staging');
          }
        } else {
          if (!nonce) {
            await refreshNonce?.();
          }
          setEndpoint(ENDPOINTS[environment]);
        }
      })();
    }
  }, [endpoint, environment, nonce, refreshNonce]);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const withHeaders = React.useCallback(<T extends any[], R>(fn: FunctionWithRequestParams<T, R>): ((...args: T) => Promise<R> | R) => {
    const headers: RequestParams['headers'] = { 
      'x-app-version': version,
      'x-drunk': new Date().toISOString(),
      'x-locale': locale,
      'x-nonce': nonce,
      'x-platform': os,
    };
    if (state.userData?.token) {
      headers.authorization = `Bearer ${state.userData.token.signed}`;
    }
    return async (...args: T) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await fn(...args, { headers }) as { data: any, error: Error };
        if (response.error) {
          throw response.error;
        }
        return response as R;
      } catch (error) {
        const e = error as BadRequest;
        if (typeof e.errorKey === 'string') {
          const error = e as BadRequest;
          const nonce = await refreshNonce?.() ?? '';
          switch (error.errorKey) {
          case 'OLD_NONCE':
            return fn(...args, { headers: { ...headers, 'x-nonce': nonce } });
          case 'EXPIRED_CREDENTIALS':
          case 'UNKNOWN_ALIAS':
            await onAuthError?.(error);
            return undefined as R;
          }
        }
        throw e;
      }
    };
  }, [nonce, state.userData?.token, refreshNonce, onAuthError, version, locale, os]);

  const api = React.useMemo(() => {
    const guts = Object.fromEntries(Object.entries(API ?? {})
      .filter(([, f]) => f instanceof Function)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map(([k, f]) => [k, withHeaders(f as (...args: [...Parameters<typeof f>, RequestParams | undefined]) => ReturnType<typeof f>)])) as unknown as Methods;
    return guts;
  }, [API, withHeaders]);

  return {
    api, 
    environment, 
    locale, 
    os,
    setEnvironment,
    setLocale,
    setOS,
    setVersion,
    version,
  };

};