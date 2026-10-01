type EnvironmentVarKeys = 'MODE' | 'DEV' | 'PROD' | 'SSR' | 'BASE_URL';
type EnvKey = keyof ImportMetaEnv | EnvironmentVarKeys;

export function useEnvVars<K extends EnvKey>(key: K, defaultValue?: string | boolean): string | boolean {
    const envValue = key === 'MODE' ? import.meta.env.MODE : import.meta.env[key as keyof ImportMetaEnv];
    const value = envValue !== undefined ? envValue : defaultValue;

    if (value === undefined) {
        throw new Error(`Environment variable ${key} is not defined`);
    }

    return value;
}