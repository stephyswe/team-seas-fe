import { useRadio, Box, UseRadioProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props extends UseRadioProps {
  children: ReactNode
}

const RadioCard = (props: Props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="0"
        borderRadius="md"
        transition="background-color .5s ease"
        fontSize="lg"
        bg="#f7f7f7"
        _checked={{
          bg: 'var(--bahamas)',
          color: 'white'
        }}
        _hover={{
          bg: 'var(--bahamas)',
          color: 'white'
        }}
        textAlign="center"
        px={1}
        py={2}
      >
        {props.children}
      </Box>
    </Box>
  )
}

export default RadioCard
