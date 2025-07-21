import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs'
import { getAIServerUrl } from './app.util'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly httpService: HttpService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('ping-proxy')
  async getPingProxy() {
    const aiServerUrl = getAIServerUrl()
    const observable = this.httpService.get<{ message: string }>(aiServerUrl)
    const response = await lastValueFrom(observable)
    return {
      server: 'NestJS',
      fastApiMessage: response.data?.message,
    }
  }
}
