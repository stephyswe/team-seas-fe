import { useState } from 'react'
import { useMutation } from 'urql'
import { Box } from '@chakra-ui/layout'
import { CountSelection } from './CountSelection'
import { DonationDetail } from './DonationDetail'
import { Heading, Text } from '@chakra-ui/react'

const CreateDonation = `
  mutation Mutation($createDonationInput: CreateDonationInput!) {
    createDonation(createDonationInput: $createDonationInput) {
      count
      createdAt
      id
    }
  }
`

export const DonationWizard = () => {
  const [step, setStep] = useState(0)
  const [donationDetails, setDonationDetails] = useState({
    count: 20
  })
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [donationResult, createDonation] = useMutation(CreateDonation)

  const next = (values: any = {}) => {
    const mergedDetails = { ...donationDetails, ...values }

    if (step === pages.length - 1) {
      submitDonation(mergedDetails)
    } else {
      setStep(step + 1)
      setDonationDetails(mergedDetails)
    }
  }

  const previous = () => {
    setStep(step - 1)
  }

  const submitDonation = async (values: any) => {
    await createDonation({ createDonationInput: values })
    setShowConfirmation(true)
  }

  const pages = [
    <CountSelection next={next} initialCount={donationDetails.count} />,
    <DonationDetail next={next} previous={previous} />
  ]

  return (
    <Box minW="sm">
      {showConfirmation ? (
        <Text textAlign="center">
          Thank you for your donation of $
          {donationResult?.data.createDonation?.count}!!
        </Text>
      ) : (
        <Box maxW="500px">
          <Box
            px={2}
            py={3}
            borderRadius="xl"
            bg="#f7f7f7"
            className="texting"
            borderBottomRadius={0}
          >
            <Heading size="md" textAlign="center" textTransform="uppercase">
              {step === 0 ? 'Join #teamseas' : 'Details'}
            </Heading>
          </Box>

          {pages[step]}
        </Box>
      )}
    </Box>
  )
}
