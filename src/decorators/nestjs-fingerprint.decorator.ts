import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { IFingerprint } from "src/type";
import { GqlExecutionContext } from '@nestjs/graphql';
/**
 * Get fingerprint by graphql request
 */
export const Fingerprint = createParamDecorator(
  (_, ctx: ExecutionContext): IFingerprint => {
    const request: Request & { fp: IFingerprint }  = GqlExecutionContext.create(ctx).getContext().req;
    return request.fp;
  }
);
