import { VStack, Button, Heading, Box, Text } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import * as yup from 'yup'
import { InputField } from '../form/InputField'
import { TextareaField } from '../form/TextAreaField'

const detailsSchema = yup.object().shape({
  displayName: yup.string().required('Please enter a display name').min(3),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Please enter an email'),
  mobile: yup.string().nullable(),
  team: yup.string().nullable(),
  message: yup.string().nullable()
})

interface Props {
  next: (values: any) => void
  previous: () => void
}

export const DonationDetail = ({ next, previous }: Props) => {
  const submit = (values: any) => {
    next(values)
  }

  return (
    <Formik
      initialValues={{
        displayName: '',
        email: '',
        mobile: '',
        team: '',
        message: ''
      }}
      onSubmit={submit}
      validationSchema={detailsSchema}
    >
      {(formikProps: any) => (
        <Box
          bg="white"
          py={3}
          px={4}
          borderRadius="xl"
          borderTopRadius={0}
          gap={4}
        >
          <Form>
            <InputField
              label="Display Name"
              name="displayName"
              placeholder="Display Name"
            />
            <InputField
              label="Team"
              name="team"
              placeholder="Team name (Optional)"
            />
            <InputField
              label="Email Address"
              name="email"
              placeholder="Email"
            />
            <InputField
              label="Mobile Phone"
              name="mobile"
              placeholder="Mobile Phone (Optional)"
            />
            <TextareaField
              label="Message"
              name="message"
              placeholder="Message (140 characters max)"
            />
            <hr />
            <Text> *indicates a required field</Text>
            <Text>YES! Keep me posted with #TeamSeas updates</Text>
            <Text>Please keep my donation anonymous</Text>
            <Text>
              My donation is a gift for someone We’ll send a certificate to your
              email address, which you can forward along or print. (here's an
              example)
            </Text>

            <VStack spacing={2}>
              <Button
                w="100%"
                colorScheme="orange"
                size="lg"
                borderRadius="full"
                type="submit"
              >
                Submit
              </Button>
              <Button
                w="100%"
                size="lg"
                borderRadius="full"
                variant="ghost"
                fontSize="sm"
                color="gray.700"
                onClick={previous}
              >
                Previous
              </Button>
            </VStack>
          </Form>
        </Box>
      )}
    </Formik>
  )
}
