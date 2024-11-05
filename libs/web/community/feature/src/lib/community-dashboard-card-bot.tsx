import { Button, SimpleGrid } from '@mantine/core'
import { Community } from '@pubkey-link/sdk'
import { useUserFindOneBot, useUserGetBotServers } from '@pubkey-link/web-bot-data-access'
import { BotUiItem } from '@pubkey-link/web-bot-ui'
import { UiDiscordServerItem } from '@pubkey-link/web-core-ui'
import { UiCard, UiCardTitle, UiGroup, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export function CommunityDashboardCardBot({ community }: { community: Community }) {
  const { item, query } = useUserFindOneBot({ communityId: community.id })

  return (
    <UiCard title="Discord Bot">
      {query.isLoading ? (
        <UiLoader />
      ) : item ? (
        <UiStack>
          <UiCard>
            <BotUiItem bot={item} to="../discord" />
          </UiCard>
          <BotServers botId={item.id} />
        </UiStack>
      ) : (
        <UiInfo
          title="No bot found."
          message={
            <UiGroup>
              <div>This community does not have a bot.</div>
              <Button component={Link} to={'../discord'}>
                Add bot
              </Button>
            </UiGroup>
          }
        />
      )}
    </UiCard>
  )
}

export function BotServers({ botId }: { botId: string }) {
  const query = useUserGetBotServers({ botId })

  return query.isLoading ? (
    <UiLoader />
  ) : query.data?.items?.length ? (
    <UiStack>
      <UiCardTitle>Bot Servers</UiCardTitle>
      <SimpleGrid cols={{ base: 0, xl: 2 }} spacing={20}>
        {query.data?.items?.map((item) => (
          <UiCard key={item.id}>
            <UiDiscordServerItem server={item} to={`../discord/servers/${item.id}`} />
          </UiCard>
        ))}
      </SimpleGrid>
    </UiStack>
  ) : (
    <UiInfo message="No bot servers found." />
  )
}
