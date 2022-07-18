/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/alt-text */
import '@fontsource/montserrat/700.css'
import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/300.css'

import { useQuery, useSubscription } from 'urql'
import {
  ChakraProvider,
  Box,
  extendTheme,
  HTMLChakraProps,
  ThemingProps,
  useColorModeValue,
  VStack,
  HStack,
  Flex,
  Divider,
  Link,
  Text,
  Heading,
  Container,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels
} from '@chakra-ui/react'
import { Counter } from './donation/Counter'
import { DonationWizard } from './donation/DonationWizard'
import { StyleConfig } from '@chakra-ui/theme-tools'
import { Leaderboard } from './leaderboard/Leaderboard'
import { LeaderboardItem } from './leaderboard/LeaderboardItem'

const TotalDonationsQuery = `
  query Query {
    totalDonations
  }
`

const TotalUpdatedQuery = `
  subscription Subscription {
    totalUpdated {
      total
    }
  }
`

const handleSubscription = (previous: any, newTotal: any) => {
  return newTotal?.totalUpdated?.total
}

// 1. define component configuration
const components: Record<string, StyleConfig> = {
  CustomBadge: {
    baseStyle: ({ colorMode }) => ({
      bg: colorMode === 'dark' ? 'green.300' : 'green.500',
      color: colorMode === 'dark' ? 'gray.800' : 'white',
      textTransform: 'uppercase',
      fontWeight: 'semibold',
      letterSpacing: '0.02em',
      padding: '4px',
      borderRadius: '2px',
      fontSize: '12px'
    }),
    variants: {
      custom: ({ colorMode }) => ({
        bg: colorMode === 'dark' ? 'blue.200' : 'blue.500',
        padding: '8px'
      })
    }
  }
}

export interface CustomBadgeProps
  extends HTMLChakraProps<'span'>,
    ThemingProps {}

// 3. Use it in your components
/* const CustomBadge = forwardRef<CustomBadgeProps, 'span'>((props, ref) => {
  const { size, variant, ...rest } = props
  const styles = useStyleConfig('CustomBadge', { size, variant })

  return <chakra.span ref={ref} __css={styles} {...rest} />
}) */

const theme = extendTheme({
  components,
  fonts: {
    heading: 'Montserrat',
    body: 'Montserrat'
  },
  colors: {
    brand: {
      100: '#f7fafc',
      // ...
      900: '#1a202c'
    }
  }
})

export const App = () => {
  const bgColor = useColorModeValue('gray.400', 'gray.500')

  const [res] = useSubscription(
    { query: TotalUpdatedQuery },
    handleSubscription
  )
  const [{ data, fetching, error }] = useQuery({
    query: TotalDonationsQuery
  })

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <ChakraProvider theme={theme}>
      <Header data={data} res={res} />
      <Main />
    </ChakraProvider>
  )
}

function Header({ data, res }: any) {
  return (
    <header id="header">
      <div className="bg-elements">
        <span className="cloud-1"></span>
        <span className="cloud-2"></span>
        <span className="cloud-3"></span>
        <span className="bird-1"></span>
        <span className="bird-2"></span>
        <span className="bird-3"></span>
        <span className="bird-4"></span>
      </div>

      <div id="navbar-header" className="navbar">
        <div id="menuBar" className="w-100">
          <div className="navbar-logo show">
            <img
              src="https://assets01.teamassets.net/assets/images/teamseas-logo.png"
              className="w-100"
            />
          </div>
          <div className="navbar-menu-button">
            <button
              type="button"
              className="navbar-button"
              data-toggle="modal"
              data-target="#menuMain"
            >
              <img src="https://assets01.teamassets.net/assets/svg/hamburger.svg" />
            </button>
          </div>
        </div>
      </div>

      <div className="section-inner">
        <div className="container text-center">
          <div className="brand-wrapper">
            <div className="brand-inner">
              <a href="/">
                <img
                  src="https://assets01.teamassets.net/assets/images/teamseas-tm-logo.png"
                  className="brand-logo"
                />
              </a>
              <h4 className="text-blue-dark font-weight-light page-headline">
                We did it! Now let’s keep going. Come back anytime you feel like
                removing some trash!
              </h4>
            </div>
          </div>
          <div className="container live-counter-container ">
            <Heading className=" live-counter  ">
              <Counter from={res.data} to={data.totalDonations} />
            </Heading>
            <Text textTransform="uppercase">pounds removed</Text>
          </div>
        </div>
        <div id="videoThumb" className="mt-3 text-center mt-md-0">
          <a
            href="https://teamseas.org/big-news"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://assets01.teamassets.net/assets/images/removal-update-goal-reached.png"
              width="315"
            />
          </a>
        </div>
      </div>
    </header>
  )
}

function Main() {
  return (
    <main id="main">
      <div className="bg-elements">
        <span className="bg-wave"></span>
        <span className="fish-1"></span>
        <div className="container position-relative">
          <span className="diver-1"></span>
          <span className="diver-2"></span>
          <span className="turtle-1"></span>
          <span className="trash-1"></span>
          <span className="trash-2"></span>
          <span className="trash-3"></span>
          <span className="fish-2"></span>
        </div>
        <span className="coral-1"></span>
        <span className="coral-2"></span>
        <span className="bg-bottom"></span>
      </div>
      <section id="sectionTop">
        <div className="section-inner">
          <Box display="flex" flex="auto" justifyContent="center">
            <DonationWizard />
          </Box>
        </div>
      </section>
      <section id="sectionTop" className="section1">
        <div className="section-inner">
          <div className="container">
            <Flex justifyContent="center" m="4" gap="5">
              <Leaderboard /> <SocialRight />
            </Flex>
          </div>
        </div>
      </section>
      <MiddleSection />

      <Footer />
    </main>
  )
}

function SocialTop() {
  return (
    <div className="mb-4 d-none d-md-block">
      <a href="https://store.teamseas.org" target="_blank" rel="noreferrer">
        <img
          src="https://assets01.teamassets.net/assets/images/shop-teamseas3.png"
          className="w-100"
        />
      </a>
    </div>
  )
}

function SocialRight() {
  return (
    <VStack spacing={4}>
      <SocialTop />

      <Box bg="white" w="100%" p="4">
        <Box border="3px solid #dee3e7" borderTop="0" borderX="0" mb="2" pb="2">
          <Text textTransform="uppercase">#TeamSeas Social</Text>

          <Flex gap="2" ml="4">
            <Socials />
          </Flex>
        </Box>

        <div className="social-card">
          <iframe
            className="tintup"
            src="https://cdn.hypemarks.com/t/ts_landing_page?width=504&amp;cols=1&amp;expand=true&amp;paginate=true&amp;noButtons=true&amp;count=12&amp;personalization_id=1079231"
            scrolling="yes"
            title="Social Feed"
            data-embed-id=""
          ></iframe>
        </div>
        <div className="text-center bg-transparent card-footer text-md-right">
          <a href="/social/" className="btn btn-outline-primary text-uppercase">
            See All
          </a>
        </div>
      </Box>
    </VStack>
  )
}

function Socials() {
  return (
    <>
      <a
        href="https://www.facebook.com/TeamSeas/"
        className="mx-1 social-box social-fb bg-blue"
        target="_blank"
        rel="noreferrer"
      ></a>
      <a
        href="https://www.instagram.com/teamseas/"
        className="mx-1 social-box social-insta bg-blue"
        target="_blank"
        rel="noreferrer"
      ></a>
      <a
        href="https://twitter.com/teamseas"
        className="mx-1 social-box social-twt bg-blue"
        target="_blank"
        rel="noreferrer"
      ></a>
      <a
        href="https://www.reddit.com/r/TeamSeas/"
        className="mx-1 social-box social-redd bg-blue"
        target="_blank"
        rel="noreferrer"
      ></a>
      <a
        href="https://www.tiktok.com/@teamseas"
        className="mx-1 social-box social-tt bg-blue"
        target="_blank"
        rel="noreferrer"
      ></a>
      <a
        href="https://youtube.com/c/teamseas"
        className="mx-1 social-box social-yt bg-blue"
        target="_blank"
        rel="noreferrer"
      ></a>
    </>
  )
}

function Footer() {
  return (
    <footer id="footer">
      <div className="bg-elements">
        <span className="diver-5"></span>
      </div>
      <div className="section-inner">
        <img
          src="https://assets01.teamassets.net/assets/images/angler-fish.png"
          width="370"
        />
        <Flex flexDirection="row" justifyContent="center" gap="10">
          <FooterTopLinks />
        </Flex>
        <Flex flexDirection="row" justifyContent="center" gap="10" mt="20">
          {['Terms', 'Privacy', 'Children’s Privacy Policy'].map((item) => (
            <Link
              textTransform="uppercase"
              color="grey"
              href="/terms-of-use"
              target="_blank"
            >
              {item}
            </Link>
          ))}
        </Flex>
      </div>
    </footer>
  )
}

function FooterTopLinks() {
  return (
    <>
      <p className="text-center">
        <span
          className="btn btn-outline-white"
          data-toggle="modal"
          data-target="#faqModal"
        >
          FAQ
        </span>
      </p>
      <p className="text-center">
        <span
          className="btn btn-outline-white"
          data-toggle="modal"
          data-target="#contactModal"
        >
          Contact Us
        </span>
      </p>
      <p className="text-center">
        <span
          className="btn btn-outline-white"
          data-toggle="modal"
          data-target="#pressModal"
        >
          Press Inquiries
        </span>
      </p>
      <p className="text-center">
        <a
          className="btn btn-outline-white"
          href="https://store.teamseas.org"
          target="_blank"
          rel="noreferrer"
        >
          Store
        </a>
      </p>
      <p className="text-center">
        <a
          className="btn btn-outline-white"
          href="https://teamtrees.org/"
          target="_blank"
          rel="noreferrer"
        >
          #TeamTrees
        </a>
      </p>
    </>
  )
}

function MiddleSection() {
  return (
    <section id="section2">
      <div className="bg-elements">
        <div className="container position-relative">
          <span className="diver-3"></span>
          <span className="diver-4"></span>
          <span className="fish-3"></span>
          <span className="fish-4"></span>
          <span className="fish-5"></span>
          <span className="squid-1"></span>
          <span className="turtle-2"></span>
        </div>
      </div>
      <div className="section-inner">
        <Container>
          <div className="container text-center">
            <Heading textTransform="uppercase" color="white">
            <img src="/assets/images/icon-beaches.png" width="30" height="30" />
              How it Works
            </Heading>
            <Text color="white">
              #TeamSeas will be one of the biggest, baddest, most-impactful
              cleanup projects of all time—and here’s how we’re doing it. Scroll
              on to see our cutting-edge river Interceptors, info on
              locally-organized cleanups, ghost-gear removal efforts and
              professional expeditions to areas where we can have the greatest
              conservation impact!
            </Text>
          </div>
          <div className="container">
            <Tabs variant="soft-rounded">
              <TabList
                bg="var(--seafoam)"
                justifyContent="space-around"
                p="1"
                borderRadius="xl"
              >
                <Tab _focus={{ bg: 'white' }} bg="var(--seafoam)">
                  <img src="./assets/images/icon-beaches.png" width="30" height="30" />
                  Beaches
                </Tab>
                <Tab _focus={{ bg: 'white' }} bg="var(--seafoam)">
                  Rivers
                </Tab>
                <Tab _focus={{ bg: 'white' }} bg="var(--seafoam)">
                  Oceans
                </Tab>
              </TabList>
              <TabPanels maxW="400" minW="400">
                <TabPanel>
                  <Box></Box>
                </TabPanel>
                <TabPanel>
                  <Box></Box>
                </TabPanel>
              </TabPanels>
            </Tabs>

            <Flex flexDirection="column">
              <ul className="nav nav-pills justify-content-center timeline-tabs font-md font-weight-500 text-uppercase mb-3">
                <li className="nav-item">
                  <a
                    className="nav-link link-beaches active"
                    data-toggle="tab"
                    href="#tabBeaches"
                  >
                    Beaches
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link link-rivers"
                    data-toggle="tab"
                    href="#tabRivers"
                  >
                    Rivers
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link link-oceans"
                    data-toggle="tab"
                    href="#tabOceans"
                  >
                    Oceans
                  </a>
                </li>
              </ul>
            </Flex>

            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="tabOceans"
                role="tabpanel"
              >
                <p className="text-center mb-5">
                  <img
                    src="https://assets01.teamassets.net/assets/images/logo-ocean-conservancy.png"
                    width="240"
                  />
                </p>
                <div className="row">
                  <div className="col-8 col-sm-6 offset-sm-3 offset-2">
                    <div className="video-wrapper">
                      <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube-nocookie.com/embed/gAm8eNL8XjQ?rel=0&amp;showinfo=0&amp;modestbranding=1&amp;enablejsapi=1"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      ></iframe>
                    </div>
                  </div>
                </div>
                <div className="timeline-wrapper">
                  <div className="timeline-line-center"></div>

                  <div className="timeline-box timeline-right">
                    <div className="row no-gutters my-4 justify-content-center align-items-strech">
                      <div className="col-md-5 order-md-0 d-none d-md-block text-right">
                        <div className="timeline-box-icon d-inline-flex h-100 align-items-center">
                          <img
                            src="https://assets01.teamassets.net/assets/images/icon-the-big-idea.png"
                            alt="beach cleanups"
                            width="190"
                          />
                        </div>
                      </div>
                      <div className="col-2 col-md-1 order-0 order-md-1">
                        <span className="timeline-box-ball"></span>
                      </div>
                      <div className="col-10 col-md-5 order-2">
                        <h3 className="timeline-box-title font-weight-bolder text-uppercase mb-1">
                          The Big Idea
                        </h3>
                        <div className="card p-4">
                          <p className="m-0">
                            Lost, abandoned and discarded fishing gear – or
                            ghost gear – is some of the deadliest ocean trash,
                            and super tricky to recover. Luckily the experts
                            with Ocean Conservancy’s Global Ghost Gear
                            Initiative® have been removing ghost gear from
                            waters all around the world for years.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="timeline-box timeline-left">
                    <div className="row no-gutters my-4 justify-content-center align-items-strech">
                      <div className="col-10 col-md-5 order-1 order-md-0">
                        <h3 className="timeline-box-title font-weight-bolder text-uppercase mb-1">
                          MAPPING
                        </h3>
                        <div className="card p-4">
                          <p className="m-0">
                            Ocean Conservancy will work with its Global Ghost
                            Gear Initiative® members and partners on the water
                            to identify ghost gear graveyards around the world.
                          </p>
                        </div>
                      </div>
                      <div className="col-2 col-md-1 order-0 order-md-1">
                        <span className="timeline-box-ball"></span>
                      </div>
                      <div className="col-md-5 order-md-2 d-none d-md-block">
                        <div className="timeline-box-icon d-inline-flex h-100 align-items-center">
                          <img
                            src="https://assets01.teamassets.net/assets/images/icon-mapping.png"
                            alt="mapping"
                            width="190"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="timeline-box timeline-right">
                    <div className="row no-gutters my-4 justify-content-center align-items-strech">
                      <div className="col-md-5 order-md-0 d-none d-md-block text-right">
                        <div className="timeline-box-icon d-inline-flex h-100 align-items-center">
                          <img
                            src="https://assets01.teamassets.net/assets/images/icon-extraction.png"
                            alt="removal"
                            width="190"
                          />
                        </div>
                      </div>
                      <div className="col-2 col-md-1 order-0 order-md-1">
                        <span className="timeline-box-ball"></span>
                      </div>
                      <div className="col-10 col-md-5 order-2">
                        <h3 className="timeline-box-title font-weight-bolder text-uppercase mb-1">
                          REMOVAL
                        </h3>
                        <div className="card p-4">
                          <p className="m-0">
                            Specially trained experts will grapple or float the
                            gear to the surface, where the gear will be hooked
                            onto boat cranes and lifted out of the ocean. (Yes,
                            it’s a very cool process.)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="timeline-box timeline-left">
                    <div className="row no-gutters my-4 justify-content-center align-items-strech">
                      <div className="col-10 col-md-5 order-1 order-md-0">
                        <h3 className="timeline-box-title font-weight-bolder text-uppercase mb-1">
                          RECYCLING [if applicable]
                        </h3>
                        <div className="card p-4">
                          <p className="m-0">
                            TeamSeas will work with local authorities to make
                            sure any labeled, working gear is returned to local
                            fishers. Remaining gear will be recycled– when
                            possible – and the remainder properly disposed of.
                          </p>
                        </div>
                      </div>
                      <div className="col-2 col-md-1 order-0 order-md-1">
                        <span className="timeline-box-ball"></span>
                      </div>
                      <div className="col-md-5 order-md-2 d-none d-md-block">
                        <div className="timeline-box-icon d-inline-flex h-100 align-items-center">
                          <img
                            src="https://assets01.teamassets.net/assets/images/icon-recycling.png"
                            alt="recycling"
                            width="190"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 text-center my-5">
                  <a
                    href="https://oceanconservancy.org/blog/2021/10/29/teamseas-will-transformational-ocean-lets-go/"
                    target="_blank"
                    className="btn btn-outline-white learn-more-btn"
                  >
                    Learn More
                  </a>
                </div>
              </div>

              <div className="tab-pane fade" id="tabBeaches" role="tabpanel">
                <p className="text-center mb-5">
                  <img
                    src="https://assets01.teamassets.net/assets/images/logo-ocean-conservancy.png"
                    width="240"
                  />
                </p>
                <div className="row">
                  <div className="col-8 col-sm-6 offset-sm-3 offset-2">
                    <div className="video-wrapper">
                      <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube-nocookie.com/embed/gAm8eNL8XjQ?rel=0&amp;showinfo=0&amp;modestbranding=1&amp;enablejsapi=1"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      ></iframe>
                    </div>
                  </div>
                </div>
                <div className="timeline-wrapper">
                  <div className="timeline-line-center"></div>

                  <div className="timeline-box timeline-right">
                    <div className="row no-gutters my-4 justify-content-center align-items-strech">
                      <div className="col-md-5 order-md-0 d-none d-md-block text-right">
                        <div className="timeline-box-icon d-inline-flex h-100 align-items-center">
                          <img
                            src="https://assets01.teamassets.net/assets/images/icon-the-big-idea.png"
                            alt="capture"
                            width="190"
                          />
                        </div>
                      </div>
                      <div className="col-2 col-md-1 order-0 order-md-1">
                        <span className="timeline-box-ball"></span>
                      </div>
                      <div className="col-10 col-md-5 order-2">
                        <h3 className="timeline-box-title font-weight-bolder text-uppercase mb-1">
                          The Big Idea
                        </h3>
                        <div className="card p-4">
                          <p className="m-0">
                            With YOUR HELP, #TeamSeas will work with Ocean
                            Conservancy and its partners to remove millions of
                            pounds of plastic and trash from beaches all around
                            the world. We’ll also send professional crews to
                            clean up some of the most iconic, vulnerable ocean
                            spaces.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="timeline-box timeline-left">
                    <div className="row no-gutters my-4 justify-content-center align-items-strech">
                      <div className="col-10 col-md-5 order-1 order-md-0">
                        <h3 className="timeline-box-title font-weight-bolder text-uppercase mb-1">
                          Local Collection
                        </h3>
                        <div className="card p-4">
                          <p className="m-0">
                            Here’s where you can get dirty! Fight side-by-side
                            with #TeamSeas for cleaner coastal communities.
                          </p>
                        </div>
                      </div>
                      <div className="col-2 col-md-1 order-0 order-md-1">
                        <span className="timeline-box-ball"></span>
                      </div>
                      <div className="col-md-5 order-md-2 d-none d-md-block">
                        <div className="timeline-box-icon d-inline-flex h-100 align-items-center">
                          <img
                            src="https://assets01.teamassets.net/assets/images/icon-local-collection.png"
                            alt="accumulation"
                            width="190"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="timeline-box timeline-right">
                    <div className="row no-gutters my-4 justify-content-center align-items-strech">
                      <div className="col-md-5 order-md-0 d-none d-md-block text-right">
                        <div className="timeline-box-icon d-inline-flex h-100 align-items-center">
                          <img
                            src="https://assets01.teamassets.net/assets/images/icon-costal-collection.png"
                            alt="extraction"
                            width="190"
                          />
                        </div>
                      </div>
                      <div className="col-2 col-md-1 order-0 order-md-1">
                        <span className="timeline-box-ball"></span>
                      </div>
                      <div className="col-10 col-md-5 order-2">
                        <h3 className="timeline-box-title font-weight-bolder text-uppercase mb-1">
                          The International Coastal Cleanup Network Mapping
                        </h3>
                        <div className="card p-4">
                          <p className="m-0">
                            Ocean Conservancy will use the best available
                            science and work with its International Coastal
                            Cleanup local partners around the world to identify
                            places where cleanups will have the greatest impact.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="timeline-box timeline-left">
                    <div className="row no-gutters my-4 justify-content-center align-items-strech">
                      <div className="col-10 col-md-5 order-1 order-md-0">
                        <h3 className="timeline-box-title font-weight-bolder text-uppercase mb-1">
                          Removal
                        </h3>
                        <div className="card p-4">
                          <p className="m-0">
                            #TeamSeas will partner with volunteers like you to
                            remove millions of pounds of trash from the world’s
                            beaches and weigh the total trash collected at the
                            end of each cleanup.
                          </p>
                        </div>
                      </div>
                      <div className="col-2 col-md-1 order-0 order-md-1">
                        <span className="timeline-box-ball"></span>
                      </div>
                      <div className="col-md-5 order-md-2 d-none d-md-block">
                        <div className="timeline-box-icon d-inline-flex h-100 align-items-center">
                          <img
                            src="https://assets01.teamassets.net/assets/images/icon-extraction.png"
                            alt="recycling"
                            width="190"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="timeline-box timeline-right">
                    <div className="row no-gutters my-4 justify-content-center align-items-strech">
                      <div className="col-md-5 order-md-0 d-none d-md-block text-right">
                        <div className="timeline-box-icon d-inline-flex h-100 align-items-center">
                          <img
                            src="https://assets01.teamassets.net/assets/images/icon-recycling.png"
                            alt="extraction"
                            width="190"
                          />
                        </div>
                      </div>
                      <div className="col-2 col-md-1 order-0 order-md-1">
                        <span className="timeline-box-ball"></span>
                      </div>
                      <div className="col-10 col-md-5 order-2">
                        <h3 className="timeline-box-title font-weight-bolder text-uppercase mb-1">
                          Recycling [if applicable]
                        </h3>
                        <div className="card p-4">
                          <p className="m-0">
                            TeamSeas will work with local authorities to make
                            sure collected trash is properly disposed of and,
                            where local facilities exist, we’ll recycle all
                            accepted materials.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 text-center my-5">
                  <a
                    href="https://oceanconservancy.org/blog/2021/10/29/teamseas-will-transformational-ocean-lets-go/"
                    target="_blank"
                    className="btn btn-outline-white learn-more-btn"
                  >
                    Learn More
                  </a>
                </div>
              </div>

              <div className="tab-pane fade" id="tabRivers" role="tabpanel">
                <p className="text-center mb-5">
                  <img
                    src="https://assets01.teamassets.net/assets/images/TOC_logoTM_Stacked_TOCblue.png"
                    width="240"
                  />
                </p>
                <div className="row">
                  <div className="col-8 col-sm-6 offset-sm-3 offset-2">
                    <div className="video-wrapper">
                      <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube-nocookie.com/embed/pXDx6DjNLDU?rel=0&amp;showinfo=0&amp;modestbranding=1&amp;enablejsapi=1"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      ></iframe>
                    </div>
                  </div>
                </div>
                <div className="timeline-wrapper">
                  <div className="timeline-line-center"></div>

                  <div className="timeline-box timeline-right">
                    <div className="row no-gutters my-4 justify-content-center align-items-strech">
                      <div className="col-md-5 order-md-0 d-none d-md-block text-right">
                        <div className="timeline-box-icon d-inline-flex h-100 align-items-center">
                          <img
                            src="https://assets01.teamassets.net/assets/images/icon-the-big-idea.png"
                            alt="seas cleanups"
                            width="190"
                          />
                        </div>
                      </div>
                      <div className="col-2 col-md-1 order-0 order-md-1">
                        <span className="timeline-box-ball"></span>
                      </div>
                      <div className="col-10 col-md-5 order-2">
                        <h3 className="timeline-box-title font-weight-bolder text-uppercase mb-1">
                          The Big Idea
                        </h3>
                        <div className="card p-4">
                          <p className="m-0">
                            Rivers are a major source of ocean plastic
                            pollution, with research showing that 1% of rivers
                            account for nearly 80% of pollution flowing from
                            rivers. #TeamSeas will work with The Ocean Cleanup
                            to tackle trash from these rivers with their
                            Interceptor technologies.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="timeline-box timeline-left">
                    <div className="row no-gutters my-4 justify-content-center align-items-strech">
                      <div className="col-10 col-md-5 order-1 order-md-0">
                        <h3 className="timeline-box-title font-weight-bolder text-uppercase mb-1">
                          The River Interceptor
                        </h3>
                        <div className="card p-4">
                          <p className="m-0">
                            The Ocean Cleanup has developed technologies for
                            river pollution called Interceptors, which have
                            removed over 2 million pounds to date! One of their
                            key technology solutions, The Interceptor™, is
                            solar-powered and can collect trash autonomously.
                          </p>
                        </div>
                      </div>
                      <div className="col-2 col-md-1 order-0 order-md-1">
                        <span className="timeline-box-ball"></span>
                      </div>
                      <div className="col-md-5 order-md-2 d-none d-md-block">
                        <div className="timeline-box-icon d-inline-flex h-100 align-items-center">
                          <img
                            src="https://assets01.teamassets.net/assets/images/icon-seas-mapping.png"
                            alt="mapping"
                            width="190"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="timeline-box timeline-right">
                    <div className="row no-gutters my-4 justify-content-center align-items-strech">
                      <div className="col-md-5 order-md-0 d-none d-md-block text-right">
                        <div className="timeline-box-icon d-inline-flex h-100 align-items-center">
                          <img
                            src="https://assets01.teamassets.net/assets/images/icon-capture.png"
                            alt="removal"
                            width="190"
                          />
                        </div>
                      </div>
                      <div className="col-2 col-md-1 order-0 order-md-1">
                        <span className="timeline-box-ball"></span>
                      </div>
                      <div className="col-10 col-md-5 order-2">
                        <h3 className="timeline-box-title font-weight-bolder text-uppercase mb-1">
                          Research
                        </h3>
                        <div className="card p-4">
                          <p className="m-0">
                            Every river is unique, and for that reason, together
                            with local partners, The Ocean Cleanup’s team will
                            first conduct research to determine the most
                            efficient solution to clean that specific river.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="timeline-box timeline-right">
                    <div className="row no-gutters my-4 justify-content-center align-items-strech">
                      <div className="col-10 col-md-5 order-1 order-md-0">
                        <h3 className="timeline-box-title font-weight-bolder text-uppercase mb-1">
                          Collect Trash
                        </h3>
                        <div className="card p-4">
                          <p className="m-0">
                            After conducting research and setting up the
                            necessary local partnerships, it’s time to deploy
                            and start intercepting trash!{' '}
                          </p>
                        </div>
                      </div>
                      <div className="col-2 col-md-1 order-0 order-md-1">
                        <span className="timeline-box-ball"></span>
                      </div>
                      <div className="col-md-5 order-md-2 d-none d-md-block">
                        <div className="timeline-box-icon d-inline-flex h-100 align-items-center">
                          <img
                            src="https://assets01.teamassets.net/assets/images/icon-conveyor-belt.png"
                            alt="recycling"
                            width="190"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="timeline-box timeline-right">
                    <div className="row no-gutters my-4 justify-content-center align-items-strech">
                      <div className="col-md-5 order-md-0 d-none d-md-block text-right">
                        <div className="timeline-box-icon d-inline-flex h-100 align-items-center">
                          <img
                            src="https://assets01.teamassets.net/assets/images/icon-shuttle.png"
                            alt="removal"
                            width="190"
                          />
                        </div>
                      </div>
                      <div className="col-2 col-md-1 order-0 order-md-1">
                        <span className="timeline-box-ball"></span>
                      </div>
                      <div className="col-10 col-md-5 order-2">
                        <h3 className="timeline-box-title font-weight-bolder text-uppercase mb-1">
                          Empty and Repeat
                        </h3>
                        <div className="card p-4">
                          <p className="m-0">
                            The collected trash is brought to shore to be
                            properly disposed of by local waste management and
                            then cleanup continues.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="timeline-box timeline-right">
                    <div className="row no-gutters my-4 justify-content-center align-items-strech">
                      <div className="col-10 col-md-5 order-1 order-md-0">
                        <h3 className="timeline-box-title font-weight-bolder text-uppercase mb-1">
                          Going Forward
                        </h3>
                        <div className="card p-4">
                          <p className="m-0">
                            Even though the Interceptors aren’t a permanent
                            solution, they are a safety net until waste
                            management on land improves and we’re able to stop
                            plastic from polluting our rivers. The Interceptors
                            deployed with the help of #TeamSeas will keep
                            cleaning even after the campaign comes to a close.
                          </p>
                        </div>
                      </div>
                      <div className="col-2 col-md-1 order-0 order-md-1">
                        <span className="timeline-box-ball"></span>
                      </div>
                      <div className="col-md-5 order-md-2 d-none d-md-block">
                        <div className="timeline-box-icon d-inline-flex h-100 align-items-center">
                          <img
                            src="https://assets01.teamassets.net/assets/images/icon-dumpster.png"
                            alt="recycling"
                            width="190"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 text-center my-5">
                  <a
                    href="https://theoceancleanup.com/teamseas/"
                    target="_blank"
                    className="btn btn-outline-white learn-more-btn"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}
