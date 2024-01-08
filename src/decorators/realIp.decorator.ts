import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { IFingerprint } from "src/type";
import { GqlExecutionContext } from '@nestjs/graphql'

export const RealIp = createParamDecorator(
  (_, ctx: ExecutionContext): string => {
    const request: Request & { fp: IFingerprint } = GqlExecutionContext.create(ctx).getContext().req;
    return request.fp.ipAddress.value;
  }
);
