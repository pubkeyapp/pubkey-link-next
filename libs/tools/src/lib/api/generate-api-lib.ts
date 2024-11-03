import { Tree } from '@nx/devkit'
import { libraryGenerator } from '@nx/nest'

import { ApiLibType } from '../types/api-feature'
import { generateApiLibDataAccess } from './generate-api-lib-data-access'
import { generateApiLibFeature } from './generate-api-lib-feature'
import { NormalizedApiFeatureSchema } from './normalized-api-feature-schema'

export async function generateApiLib(tree: Tree, type: ApiLibType, options: NormalizedApiFeatureSchema) {
  const generated = await libraryGenerator(tree, {
    name: `${options.app}-${options.model}-${type}`,
    directory: `libs/${options.app}/${options.model}/${type}`,
    tags: `app:${options.app},type:${type}`,
    skipFormat: true,
  })
  if (!generated) {
    throw new Error(`Failed to generate ${type} library`)
  }

  switch (type) {
    case 'data-access':
      await generateApiLibDataAccess(tree, options)
      break
    case 'feature':
      await generateApiLibFeature(tree, options)
      break
  }

  return generated
}
