/**
 * Cliente de Anthropic para el chat de Brievify.
 *
 * Integración (paso 8 del plan):
 * - Instalar @anthropic-ai/sdk
 * - Route handler en src/app/api/chat/route.ts con streaming
 * - Modelo: claude-sonnet-4-6, siempre con stream: true
 * - Tools definidas en ./tools.ts, system prompt en ./system-prompt.ts
 *
 * Requiere ANTHROPIC_API_KEY en .env.local.
 */
export const AI_MODEL = "claude-sonnet-4-6";

export function getAnthropicApiKey(): string {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    throw new Error("ANTHROPIC_API_KEY no está configurada en .env.local");
  }
  return key;
}
