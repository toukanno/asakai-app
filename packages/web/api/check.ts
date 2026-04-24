import type { VercelRequest, VercelResponse } from '@vercel/node'
import { hasAnthropicKey } from './_anthropic'

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json({ available: hasAnthropicKey() })
}
