import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { OgmaService } from '@ogma/nestjs-module'
import { ApiCoreService, EVENT_APP_STARTED } from '@pubkey-link/api-core-data-access'
import cookieParser from 'cookie-parser'
import { exec } from 'node:child_process'
import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  })
  const ogma = app.get(OgmaService, { strict: false })
  app.useLogger(ogma)
  const core = app.get(ApiCoreService)
  app.setGlobalPrefix(core.config.prefix)
  app.use(cookieParser())

  const host = `http://${core.config.host}:${core.config.port}`
  await app.listen(core.config.port, core.config.host)
  Logger.log(`🚀 RestAPI is running on: ${host}${core.config.prefix}.`)
  Logger.log(`🚀 GraphQL is running on: ${host}/graphql.`)
  Logger.log(`🔋 API_URL: ${core.config.apiUrl}`)
  Logger.log(`🔋 WEB_URL: ${core.config.webUrl}`)
  Logger.log(`🔋 COOKIE_DOMAINS: ${core.config.cookieDomains.join(', ')}`)
  Logger.log(`🔋 FEATURES: ${core.config.appConfig.features.join(', ')}`)
  Logger.log(`🔋 RESOLVERS: ${core.config.appConfig.resolvers.join(', ')}`)
  Logger.log(`🔋 LINK PROVIDERS: ${core.config.appConfig.authLinkProviders.join(', ')}`)
  Logger.log(`🔋 LOGIN PROVIDERS: ${core.config.appConfig.authLoginProviders.join(', ')}`)
  if (core.config.isDevelopment) {
    Logger.warn(`🐞 Application is running in development mode.`)
    exec('prettier --write ./api-schema.graphql ./api-swagger.json', { cwd: process.cwd() })
  }
  core.eventEmitter.emit(EVENT_APP_STARTED)
}

bootstrap()
