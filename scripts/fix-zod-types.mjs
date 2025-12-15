/**
 * Post-generate script to fix zod-prisma-types compatibility issues.
 * 
 * Fixes:
 * 1. WhereUniqueInput schemas with explicit type annotations that are
 *    incompatible with Prisma's complex union types in newer versions.
 * 2. Invalid z.cuid() calls that should be z.string().cuid()
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const zodFilePath = join(__dirname, '..', 'prisma', 'zod', 'index.ts');

try {
  let content = readFileSync(zodFilePath, 'utf-8');
  let modified = false;
  
  // Fix 1: Remove explicit type annotations from WhereUniqueInputSchema exports
  // These cause type incompatibility with Prisma's complex union types
  const typeAnnotationPattern = /export const (\w+WhereUniqueInputSchema): z\.ZodType<Prisma\.\w+WhereUniqueInput> =/g;
  const newContent1 = content.replace(typeAnnotationPattern, 'export const $1 =');
  if (content !== newContent1) {
    content = newContent1;
    modified = true;
    console.log('Fixed WhereUniqueInput type annotations');
  }
  
  // Fix 2: Replace z.cuid() with z.string().cuid()
  // zod-prisma-types incorrectly generates z.cuid() which doesn't exist in Zod v3
  const cuidPattern = /z\.cuid\(\)/g;
  const newContent2 = content.replace(cuidPattern, 'z.string().cuid()');
  if (content !== newContent2) {
    content = newContent2;
    modified = true;
    console.log('Fixed z.cuid() calls');
  }
  
  // Fix 3: Replace z.uuid() with z.string().uuid() (same issue)
  const uuidPattern = /z\.uuid\(\)/g;
  const newContent3 = content.replace(uuidPattern, 'z.string().uuid()');
  if (content !== newContent3) {
    content = newContent3;
    modified = true;
    console.log('Fixed z.uuid() calls');
  }
  
  if (modified) {
    writeFileSync(zodFilePath, content, 'utf-8');
    console.log('zod-prisma-types fixes applied successfully');
  } else {
    console.log('No zod-prisma-types fixes needed');
  }
} catch (error) {
  console.error('Error fixing zod types:', error.message);
  process.exit(1);
}
