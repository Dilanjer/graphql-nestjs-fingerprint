<p align="center">
    <img src="" alt="Nestjs Fingerprint"/>
</p>


**Server-side fingerprinting library for framework NestJs & Graphql**

this package is based on another package:
[nestjs-fingerprint](https://www.npmjs.com/package/nestjs-fingerprint) author [l1ttps](https://github.com/l1ttps)

## Features
- Generate fingerprint for each browser or device
- Function decorator support
- Auto set cookie



## Installation

Start by installing the necessary packages using your package manager:

```
npm install --save @nestjs/graphql @nestjs/apollo @apollo/server graphql

yarn add @nestjs/graphql @nestjs/apollo @apollo/server graphql

pnpm add @nestjs/graphql @nestjs/apollo @apollo/server graphql
```

``` 
npm install --save graphql-nestjs-fingerprint

yarn add graphql-nestjs-fingerprint

pnpm add graphql-nestjs-fingerprint

```



## Usage
app.module.ts
```typescript
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { join } from 'node:path';

import { NestjsFingerprintModule } from 'nestjs-fingerprint';
import { AppResolver } from './AppResolver';
import { AppService } from './app.service';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({req, res}) => ({req, res}) // important
    }),
    NestjsFingerprintModule.forRoot({
      params: ['headers', 'userAgent', 'ipAddress'],
      cookieOptions: {
        name: 'your_cookie_name', // optional
        httpOnly: true, // optional
      },
    }),
  ],
  providers: [AppService, AppResolver],
})

export class AppModule {}
```

app.resolver.ts
```typescript
import { Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { Fingerprint, IFingerprint, RealIp } from 'graphql-nestjs-fingerprint';

@Resolver()
export class AppResolver {

  @Query(() => String)
  getFingerPrint(@Fingerprint() fp: IFingerprint): IFingerprint {
    return fp;
  }

  @Query(() => String)
  getMyIpAddress(@RealIp() ipAddress: string): string {
    return ipAddress;
  }
}

```

Fingerprint example: 
```json
{
  "id": "79c0678d8672fafb932a97a1368d7bf3",
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "language": "en-US,en;q=0.9"
  },
  "userAgent": {
    "browser": {
      "family": "Chrome",
      "version": "xxx"
    },
    "device": {
      "family": "Other",
      "version": "0"
    },
    "os": {
      "family": "Windows",
      "major": "10",
      "minor": "0"
    }
  },
  "ipAddress": {
    "value": "xxx.xxx.xxx.xxx"
  }
}
```

  
## License

MIT © [dilanjer](https://github.com/Dilanjer)
