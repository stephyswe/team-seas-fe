import { Avatar } from '@chakra-ui/avatar'
import { Badge, Flex, Text } from '@chakra-ui/layout'
import { Box, Divider } from '@chakra-ui/react'
import { Donation } from '../donation/types'
import formatDate from '../utils/formatDate'

interface Props {
  donation: Donation
}

export const LeaderboardItem = ({ donation }: Props) => {
  return (
    <Flex p={3} borderRadius="lg" maxWidth="xl" w="100%">
      <Avatar size="md" />
      <Box flex="1" ml={4}>
        <Flex mb="3" justifyContent="space-between" h="100%">
          <Flex flexDirection="column" justifyContent="center" textAlign="left">
            <Text color="#ee7516" fontSize="sm" textTransform="uppercase">
              {donation.team}
            </Text>
            <Text color="#07aacd" fontWeight="bold">
              {donation.displayName}
            </Text>
            <Text mr="1" fontSize="sm">
              {donation.message}
            </Text>
          </Flex>

          <Flex
            flexDirection="column"
            justifyContent="flex-end"
            textAlign="right"
            minWidth="135px"
          >
            <Badge
              alignSelf="end"
              maxWidth="fit-content"
              bg="#01abcd"
              color="white"
              borderRadius="md"
              textTransform="lowercase"
              py={1}
              px={3}
              as="div"
            >
              {donation.count.toLocaleString()} pounds
            </Badge>
            <Text fontSize="xs">{formatDate(donation.createdAt)}</Text>
          </Flex>
        </Flex>
        <Divider />
      </Box>
    </Flex>
  )
}
