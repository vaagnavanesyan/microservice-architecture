import { AddImagePayload } from '../../payloads';

export class AddImageCommand {
  constructor(public readonly payload: AddImagePayload) {}
}
