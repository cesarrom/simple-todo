import { useDecorators } from "@tsed/core"
import { Injectable, ProviderScope, Service } from "@tsed/di"

export const Transactional = (annotation: CallableFunction = Service, ...args: any[]) => {
  return useDecorators(
    annotation(...args),
    Injectable({
      scope: ProviderScope.REQUEST
    })
  )
}