import { scryptSync } from "crypto";

import { APP_SECRET } from "../config";

export class Hash {
  static hash(password: string): string {
    return scryptSync(password, APP_SECRET, 32, {
      r: 8
    }).toString('hex')
  }
}