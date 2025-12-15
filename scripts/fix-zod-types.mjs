/**
 * Post-generate script to fix zod-prisma-types compatibility issues.
 * 
 * The zod-prisma-types generator creates WhereUniqueInput schemas with
 * explicit type annotations (z.ZodType<Prisma.XxxWhereUniqueInput>) that
 * are incompatible with Prisma's complex union types in newer versions.
 * 
 * This script removes those type annotations to allow TypeScript to infer
 * the types automatically, which resolves the build errors.
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const zodFilePath = join(__dirname, '..', 'prisma', 'zod', 'index.ts');

try {
  let content = readFileSync(zodFilePath, 'utf-8');
  
  // Remove explicit type annotations from WhereUniqueInputSchema exports
  // These cause type incompatibility with Prisma's complex union types
  const pattern = /export const (\w+WhereUniqueInputSchema): z\.ZodType<Prisma\.\w+WhereUniqueInput> =/g;
  const newContent = content.replace(pattern, 'export const $1 =');
  
  if (content !== newContent) {
    writeFileSync(zodFilePath, newContent, 'utf-8');
    console.log('Fixed zod-prisma-types WhereUniqueInput type annotations');
  } else {
    console.log('No zod-prisma-types fixes needed');
  }
} catch (error) {
  console.error('Error fixing zod types:', error.message);
  process.exit(1);
}
