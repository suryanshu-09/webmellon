import { Catalogue } from '@/prisma/generated/zod';
import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { everythingAtomLoadable } from '@/store/atoms/everythingAtom';
// import { Website } from '@/lib/generated/prisma';
import { CatalogueWithWebsites } from '@/types/types';

export const websitesAtom = atomFamily((catalogueId: number | undefined) =>
  atom((get) => {
    const result = get(everythingAtomLoadable);

    if (catalogueId === undefined) {
      const allwebsites = get(allWebsitesAtom);
      return allwebsites;
    }

    if (result.state === 'hasData' && Array.isArray(result.data)) {
      const catalogue = result.data.find((c: Catalogue) => c.id === catalogueId);
      return catalogue ? catalogue.websites : [];
    }

    if (result.state === 'loading') return [];
    if (result.state === 'hasError') throw result.error;

    return [];
  })
);


// export const websiteAtomLoadable = atomFamily(
//   (catalogueId: number | undefined, websiteId: number) =>
//     atom((get) => {
//       if (catalogueId === undefined) {
//         return [];
//       }
//       const websites = get(websitesAtom(catalogueId));
//       if (websites) {
//         return websites.find((w: Website) => w.id === websiteId) ?? [];
//       }
//       return [];
//     })
// );

export const allWebsitesAtom = atom((get) => {
  const everything = get(everythingAtomLoadable)

  if (everything.state === 'hasData' && Array.isArray(everything.data)) {
    // Flatten the nested arrays into a single array
    const websites = everything.data.flatMap((cat: CatalogueWithWebsites) => cat.websites)
    return websites;
  }

  if (everything.state === 'loading') return null;
  if (everything.state === 'hasError') throw everything.error;

  return null;
})
