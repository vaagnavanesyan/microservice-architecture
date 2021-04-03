import { RemoveImagePayload } from '../../payloads';

export class RemoveImageCommand {
  constructor(public readonly payload: RemoveImagePayload) {}
}
