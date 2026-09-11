type EnvironmentVarKeys = 'MODE' | 'DEV' | 'PROD' | 'SSR' | 'BASE_URL';
type EnvKey = keyof ImportMetaEnv | EnvironmentVarKeys;

export function useEnvVars<K extends EnvKey>(key: K): string | boolean {
    const value = import.meta.env[key as keyof ImportMetaEnv] ?? (key === 'MODE' ? import.meta.env.MODE : undefined);

    if (value === undefined) {
        throw new Error(`Environment variable ${key} is not defined`);
    }

    return value;
}