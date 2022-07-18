import {
  Button,
  Heading,
  NumberInput,
  NumberInputField,
  SimpleGrid,
  useRadioGroup,
  VStack,
  Text,
  Box,
  GridItem
} from '@chakra-ui/react'
import { useState } from 'react'
import RadioCard from './RadioCard'

interface Props {
  initialCount: number
  next: (values: any) => void
}

const options = [5, 20, 50, 100]

export const CountSelection = ({ initialCount, next }: Props) => {
  const [pounds, setPounds] = useState(initialCount)
  const [customAmount, setCustomAmount] = useState(
    '' + (options.includes(pounds) ? '' : pounds)
  )

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'pounds',
    value: pounds,
    onChange: (nextValue) => {
      setCustomAmount('')
      setPounds(parseInt(nextValue))
    }
  })

  const group = getRootProps()

  const nextStep = () => {
    next({ count: pounds })
  }

  return (
    <Box
      p={3}
      bg="white"
      borderRadius="xl"
      borderTopRadius={0}
      textAlign="center"
    >
      <Text fontSize="md">
        Every $1 is one less pound of trash in the ocean
      </Text>
      <SimpleGrid mt={5} columns={3} spacing={2} {...group} height="200px">
        {options.map((value) => {
          const radio = getRadioProps({ value, enterKeyHint: undefined })
          return (
            <RadioCard key={value} {...radio}>
              {value} <p>pounds</p>
            </RadioCard>
          )
        })}
        <GridItem colSpan={2}>
          <NumberInput
            onFocus={() => setPounds(0)}
            onChange={(value) => {
              setPounds(parseInt(value))
              setCustomAmount(value)
            }}
            value={customAmount}
          >
            <NumberInputField placeholder="Other amount" />
          </NumberInput>
        </GridItem>
      </SimpleGrid>

      <hr />

      <Text size="xs">We take crypto! You will see the options on step 3</Text>

      <Button
        my="3"
        colorScheme="orange"
        size="lg"
        borderRadius="full"
        onClick={nextStep}
        fontWeight="normal"
        _hover={{
          bg: 'var(--sunshine)'
        }}
      >
        Next
      </Button>
      <Text size="xs" fontWeight="bold" textDecoration="underline">
        FAQ
      </Text>
    </Box>
  )
}
