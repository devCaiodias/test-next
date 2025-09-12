type ConfigsByEnvs = {
  readonly databaseFile: string
  readonly currentEnv: string
}

type EnvConfigs = typeof envConfigs
type AllowedEnvKey = keyof EnvConfigs

const envConfigs = {
  development: {
    databaseFile: 'dev.db.sqlite3',
    currentEnv: 'development'
  },
  production: {
    databaseFile: 'prod.db.sqlite3',
    currentEnv: 'production'
  },
  test: {
    databaseFile: 'int.test.db.sqlite3',
    currentEnv: 'test'
  },
  e2e: {
    databaseFile: 'e2e.test.db.sqlite3',
    currentEnv: 'e2e'
  },
} as const


function isValidEnv(env: string): env is  AllowedEnvKey {
  return Object.keys(envConfigs).includes(env)
}

export function checkEnv(): AllowedEnvKey {
  const currentEnv = process.env.CURRENT_ENV

  if(!currentEnv || !isValidEnv(currentEnv)) {
    throw new Error('Verifique os .env* e os valores em src/env/configs.ts')
  }

  return currentEnv
}

export function getFullEnv() {
  const currentEnv = checkEnv()
  return envConfigs[currentEnv]
}
