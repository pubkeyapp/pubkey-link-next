import { Tree } from '@nx/devkit'
import { Linter } from '@nx/eslint'
import { getNpmScope } from '@nx/js/src/utils/package-json/get-npm-scope'
import { libraryGenerator } from '@nx/react'

import { WebLibType } from '../types/web-feature'
import { NormalizedWebFeatureSchema } from './normalized-web-feature-schema'

export async function generateWebLib(tree: Tree, type: WebLibType, options: NormalizedWebFeatureSchema) {
  const generated = await libraryGenerator(tree, {
    name: `${options.app}-${options.model}-${type}`,
    directory: `libs/${options.app}/${options.model}/${type}`,
    tags: `app:${options.app},type:${type}`,
    skipFormat: true,
    linter: Linter.EsLint,
    style: 'css',
  })
  if (!generated) {
    throw new Error(`Failed to generate ${type} library`)
  }
  const npmScope = getNpmScope(tree)

  if (!npmScope) {
    throw new Error('Could not find npmScope.')
  }

  return generated
}
