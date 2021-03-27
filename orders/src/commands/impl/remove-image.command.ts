import { RemoveImagePayload } from '../../interfaces/remove-image.payload';

export class RemoveImageCommand {
  constructor(public readonly payload: RemoveImagePayload) {}
}
