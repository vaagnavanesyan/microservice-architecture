import { AddImagePayload } from '../../interfaces/add-image.payload';

export class AddImageCommand {
  constructor(public readonly payload: AddImagePayload) {}
}
