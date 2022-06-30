import { useState } from 'react'
import { useMutation } from 'urql'
import { Box } from '@chakra-ui/layout'
import { CountSelection } from './CountSelection'
import { DonationDetail } from './DonationDetail'

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
    <Box boxShadow="xl" p={8} bg="white" borderRadius="xl" minW="sm">
      {showConfirmation ? (
        <div>
          Thank you for your donation of $
          {donationResult?.data.createDonation?.count}!!
        </div>
      ) : (
        pages[step]
      )}
    </Box>
  )
}
