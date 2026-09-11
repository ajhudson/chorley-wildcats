import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useEnvVars } from './useEnvVars';

describe('useEnvVars hook', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe('standard Vite environment variables', () => {
    it('returns the current MODE', () => {
      const { result } = renderHook(() => useEnvVars('MODE'));
      expect(result.current).toBe('test');
    });

    it('returns custom stubbed MODE', () => {
      vi.stubEnv('MODE', 'staging');
      const { result } = renderHook(() => useEnvVars('MODE'));
      expect(result.current).toBe('staging');
    });

    it('returns boolean DEV correctly when true or false', () => {
      vi.stubEnv('DEV', true);
      const { result: resTrue } = renderHook(() => useEnvVars('DEV'));
      expect(resTrue.current).toBe(true);

      vi.stubEnv('DEV', false);
      const { result: resFalse } = renderHook(() => useEnvVars('DEV'));
      expect(resFalse.current).toBe(false);
    });

    it('returns boolean PROD correctly when true or false', () => {
      vi.stubEnv('PROD', false);
      const { result: resFalse } = renderHook(() => useEnvVars('PROD'));
      expect(resFalse.current).toBe(false);

      vi.stubEnv('PROD', true);
      const { result: resTrue } = renderHook(() => useEnvVars('PROD'));
      expect(resTrue.current).toBe(true);
    });

    it('returns boolean SSR correctly', () => {
      vi.stubEnv('SSR', false);
      const { result: resFalse } = renderHook(() => useEnvVars('SSR'));
      expect(resFalse.current).toBe(false);

      vi.stubEnv('SSR', true);
      const { result: resTrue } = renderHook(() => useEnvVars('SSR'));
      expect(resTrue.current).toBe(true);
    });

    it('returns BASE_URL correctly', () => {
      const { result } = renderHook(() => useEnvVars('BASE_URL'));
      expect(result.current).toBe('/');

      vi.stubEnv('BASE_URL', '/custom-base/');
      const { result: customResult } = renderHook(() => useEnvVars('BASE_URL'));
      expect(customResult.current).toBe('/custom-base/');
    });
  });

  describe('application-specific environment variables', () => {
    it('returns VITE_POSTHOG_PROJECT_TOKEN when defined', () => {
      vi.stubEnv('VITE_POSTHOG_PROJECT_TOKEN', 'phc_test_token_12345');
      const { result } = renderHook(() => useEnvVars('VITE_POSTHOG_PROJECT_TOKEN'));
      expect(result.current).toBe('phc_test_token_12345');
    });

    it('returns VITE_POSTHOG_HOST when defined', () => {
      vi.stubEnv('VITE_POSTHOG_HOST', 'https://test.posthog.com');
      const { result } = renderHook(() => useEnvVars('VITE_POSTHOG_HOST'));
      expect(result.current).toBe('https://test.posthog.com');
    });
  });

  describe('missing and undefined environment variables', () => {
    it('throws an error when an unknown environment variable is requested', () => {
      expect(() => {
        renderHook(() => useEnvVars('NON_EXISTENT_VAR' as unknown as 'MODE'));
      }).toThrow('Environment variable NON_EXISTENT_VAR is not defined');
    });

    it('throws an error when an expected variable is undefined', () => {
      vi.stubEnv('VITE_POSTHOG_PROJECT_TOKEN', undefined as unknown as string);
      expect(() => {
        renderHook(() => useEnvVars('VITE_POSTHOG_PROJECT_TOKEN'));
      }).toThrow('Environment variable VITE_POSTHOG_PROJECT_TOKEN is not defined');
    });

    it('throws an error if MODE is undefined', () => {
      vi.stubEnv('MODE', undefined as unknown as string);
      expect(() => {
        renderHook(() => useEnvVars('MODE'));
      }).toThrow('Environment variable MODE is not defined');
    });
  });

  describe('hook lifecycle and re-rendering', () => {
    it('updates returned value when key prop changes on re-render', () => {
      vi.stubEnv('VITE_POSTHOG_PROJECT_TOKEN', 'token-abc');
      vi.stubEnv('VITE_POSTHOG_HOST', 'https://eu.posthog.com');

      type AllowedKey = 'VITE_POSTHOG_PROJECT_TOKEN' | 'VITE_POSTHOG_HOST';
      const { result, rerender } = renderHook(
        ({ key }: { key: AllowedKey }) => useEnvVars(key),
        {
          initialProps: { key: 'VITE_POSTHOG_PROJECT_TOKEN' as AllowedKey },
        }
      );

      expect(result.current).toBe('token-abc');

      rerender({ key: 'VITE_POSTHOG_HOST' });
      expect(result.current).toBe('https://eu.posthog.com');
    });
  });
});
