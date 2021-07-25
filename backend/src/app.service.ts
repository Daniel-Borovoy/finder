import { Injectable } from "@nestjs/common";

@Injectable()
default export class AppService {
  getHello(): string {
    return 'Hello World!'
  }
}