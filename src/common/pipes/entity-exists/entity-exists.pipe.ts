import { Inject, Injectable, PipeTransform, Type } from '@nestjs/common';

export function EntityExistsPipe(entityCls: Type): Type<PipeTransform> {
  @Injectable()
  class EntityExistsPipeCls implements PipeTransform {
    constructor(
      @Inject(entityCls)
      private entityRepository: {
        checkIFExits: (id: string) => Promise<any>;
      },
    ) {}

    async transform(value: { id: string }) {
      await this.entityRepository.checkIFExits(value.id);
    }
  }

  return EntityExistsPipeCls;
}
