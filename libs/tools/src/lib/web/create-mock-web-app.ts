import { getProjects, Tree } from '@nx/devkit'
import { Linter } from '@nx/eslint'
import { applicationGenerator, componentGenerator, libraryGenerator } from '@nx/react'

export async function createMockWebApp(tree: Tree, app: string) {
  // Build the mock app and core libs
  await applicationGenerator(tree, {
    directory: `apps/${app}`,
    e2eTestRunner: 'none',
    linter: Linter.EsLint,
    name: app,
    routing: true,
    skipFormat: true,
    style: 'css',
  })
  // Create the core data access lib
  await libraryGenerator(tree, {
    directory: `libs/${app}/core/data-access`,
    linter: Linter.EsLint,
    name: `${app}-core-data-access`,
    skipFormat: true,
    style: 'css',
  })

  // Create the core feature lib
  await libraryGenerator(tree, {
    directory: `libs/${app}/core/feature`,
    linter: Linter.EsLint,
    name: `${app}-core-feature`,
    skipFormat: true,
    style: 'css',
  })

  // Create the core feature lib
  await createMockComponent(tree, `${app}-core-feature`, `${app}-core-feature`)

  // Create the core routes libs
  await createMockComponent(tree, `${app}-core-feature`, `web-core-routes`)
  await createMockComponent(tree, `${app}-core-feature`, `web-core-routes-admin`)
  await createMockComponent(tree, `${app}-core-feature`, `web-core-routes-user`)
}

function createMockComponent(tree: Tree, project: string, name: string) {
  const config = getProjects(tree).get(project)
  return componentGenerator(tree, {
    name,
    path: `${config.sourceRoot}/lib/${name}`,
    style: 'none',
    skipTests: true,
    skipFormat: true,
  })
}
