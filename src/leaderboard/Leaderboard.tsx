import { useState } from 'react'
import { useQuery } from 'urql'
import { Box, Heading, Stack, VStack } from '@chakra-ui/layout'
import {
  Divider,
  Radio,
  RadioGroup,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from '@chakra-ui/react'
import { Donation } from '../donation/types'
import { LeaderboardItem } from './LeaderboardItem'

const DonationsQuery = `
  query Query($orderBy: OrderByParams) {
    donations(orderBy: $orderBy) {
      count
      id
      displayName
      createdAt
      message
      team
    }
  }
`

type DonationsQueryRes = {
  donations: Donation[]
}

export const Leaderboard = () => {
  const [field, setOrderByField] = useState('createdAt')

  const [{ data, fetching, error }] = useQuery<DonationsQueryRes>({
    query: DonationsQuery,
    variables: {
      orderBy: {
        field,
        direction: 'desc'
      }
    }
  })

  if (error) return <p>Something went wrong...</p>
  if (fetching || !data) return <p>Loading...</p>

  return (
    <Box bg="white" borderRadius="xl" p="3">
      <Tabs variant="soft-rounded">
        <TabList
          bg="var(--seafoam)"
          justifyContent="space-around"
          p="1"
          borderRadius="xl"
        >
          <Tab
            _focus={{ bg: 'white' }}
            bg="var(--seafoam)"
            onClick={() => setOrderByField('createdAt')}
          >
            MOST RECENT
          </Tab>
          <Tab
            _focus={{ bg: 'white' }}
            bg="var(--seafoam)"
            onClick={() => setOrderByField('count')}
          >
            MOST TRASH
          </Tab>
        </TabList>
        <TabPanels maxW="400" minW="400">
          <TabPanel>
            <Box>
              {data.donations.slice(0, 10).map((donation) => (
                <LeaderboardItem key={donation.id} donation={donation} />
              ))}
            </Box>
          </TabPanel>
          <TabPanel>
            <Box>
              {data.donations.slice(0, 10).map((donation) => (
                <LeaderboardItem key={donation.id} donation={donation} />
              ))}
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* <VStack spacing={4}>
        <RadioGroup onChange={setOrderByField} value={field}>
          <Stack direction="row">
            <Radio value="createdAt">Most Recent</Radio>
            <Radio value="count">Most Pounds</Radio>
          </Stack>
        </RadioGroup>
        <Box>
          {data.donations.map((donation) => (
            <LeaderboardItem key={donation.id} donation={donation} />
          ))}
        </Box>
      </VStack> */}
    </Box>
  )
}
