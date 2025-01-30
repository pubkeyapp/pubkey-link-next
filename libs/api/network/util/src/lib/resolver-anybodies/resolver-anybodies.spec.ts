import { getAnybodiesVaultMap, getAnybodiesVaultResponse, getAnybodiesVaultSnapshot } from './resolver-anybodies'
import { AnybodiesVaultOptions } from './types'

describe.skip('resolverAnybodies', () => {
  const options: AnybodiesVaultOptions = { vault: 'JiZUwqz0ETakNYOIulut' }

  it('getAnybodiesVaultResponse', async () => {
    const results = await getAnybodiesVaultResponse(options)

    expect(results.length).toBeGreaterThan(1)
    expect(results[0].Tokens.length).toBeGreaterThanOrEqual(1)
    expect(results[0].Tokens[0].mintAddress).toBeDefined()
    expect(results[0]._id).toBeDefined()
  })

  it('getAnybodiesVaultMap', async () => {
    const results = await getAnybodiesVaultMap(options)

    expect(results.length).toBeGreaterThan(1)
    expect(results[0].owner).toBeDefined()
    expect(results[0].accounts.length).toBeGreaterThanOrEqual(1)
    expect(results[0].accounts[0]).toBeDefined()
  })

  it('getAnybodiesVaultSnapshot', async () => {
    const results = await getAnybodiesVaultSnapshot(options)

    expect(results.length).toBeGreaterThan(1)
    expect(results[0].account).toBeDefined()
    expect(results[0].owner).toBeDefined()
  })
})
