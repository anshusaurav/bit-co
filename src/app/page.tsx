'use client';

import Head from 'next/head';
import Link from 'next/link'
import * as React from 'react';
import '@/lib/env';
// import { PopupWidget } from "react-calendly";
import {RiArrowRightLine, RiCloseLine} from "react-icons/ri";
import { RiArrowRightUpLine } from "react-icons/ri";
import '@/styles/Home.module.css';
// import localFont from '@next/font/local'
// import ArrowLink from '@/components/links/ArrowLink';
// import ButtonLink from '@/components/links/ButtonLink';
// import UnderlineLink from '@/components/links/UnderlineLink';
// import UnstyledLink from '@/components/links/UnstyledLink';
// import Header from '@/components/macro/Header'
/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
// import Logo from '~/svg/Logo.svg';
import NextImage from '@/components/NextImage';
// import Image from 'next/image';
import clsx from 'clsx';
import PrimaryLink from '@/components/links/PrimaryLink';
// import Background from '~/images/background.png';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.
const COMPARISON_DATA = [
  {
    cards: [
      {
        title: 'Equity',
        icon: {
          uri: '/images/equity-icon.png',
          alt_text: 'Equity'
        },
        image_data: {
          uri: '/images/equity.png',
          alt_text: 'Equity'
        }
      },
      {
        title: 'Bitcoin',
        icon: {
          uri: '/images/bitcoin-icon.png',
          alt_text: 'Bitcoin'
        },
        image_data: {
          uri: '/images/bitcoin-1.png',
          alt_text: 'Bitcoin'
        }
      }
    ],
    title: 'Bitcoin has outperformed S&P 500 by ',
    gain: 20
  },
  {
    cards: [
      {
        title: 'Metals',
        icon: {
          uri: '/images/metals-icon.png',
          alt_text: 'Metals'
        },
        image_data: {
          uri: '/images/metals.png',
          alt_text: 'Equity'
        }
      },
      {
        title: 'Bitcoin',
        icon: {
          uri: '/images/bitcoin-icon.png',
          alt_text: 'Bitcoin'
        },
        image_data: {
          uri: '/images/bitcoin-1.png',
          alt_text: 'Bitcoin'
        }
      }
    ],
    title: 'Bitcoin has outperformed precious metals by ',
    gain: 400
  },
  {
    cards: [
      {
        title: 'Real estate',
        icon: {
          uri: '/images/real-estate-icon.png',
          alt_text: 'Real estate'
        },
        image_data: {
          uri: '/images/real-estate.png',
          alt_text: 'Equity'
        }
      },
      {
        title: 'Bitcoin',
        icon: {
          uri: '/images/bitcoin-icon.png',
          alt_text: 'Bitcoin'
        },
        image_data: {
          uri: '/images/bitcoin-1.png',
          alt_text: 'Bitcoin'
        }
      }
    ],
    title: 'Bitcoin has outperformed real estate by ',
    gain: 500
  }
]
const CAPTION_DATA = [
  {
    title: 'Bitcoin is best performing asset, ever!',
    description: 'Buying Bitcoin can be a daunting experience. We will be your partner in building Bitcoin stash with ease!',
    image_data: {
      uri: '/images/caption-3.png',
      alt_text: ''
    }
  },
  {
    title: 'Not your keys, not your coins!',
    description: 'Exchanges make it difficult to withdraw coins. We will be your partner from helping select the right hardware wallet to exporting it.',
    image_data: {
      uri: '/images/caption-1.png',
      alt_text: ''
    }
  },
  {
    title: '100X your security with backup',
    description: 'Multi-sig custody is the ultimate security. We will be your partner in future-proofing your Bitcoin against a single point of failure!',
    image_data: {
      uri: '/images/caption-2.png',
      alt_text: ''
    }
  }]
const PARTNER_DATA = [
  {
    title: 'Zebpay',
    image_data: {
      alt_text: 'zebpay',
      uri: '/images/ZebPay.png'
    },
    description: 'Exchange'
  },
  {
    title: 'Trezor',
    image_data: {
      alt_text: 'trezor',
      uri: '/images/Trezor.png'
    },
    description: 'Hardware Wallet'
  },
  {
    title: 'Liminal',
    image_data: {
      alt_text: 'liminal',
      uri: '/images/Liminal.png'
    },
    description: 'Multisig Custody'
  }
]
const COMMUNITY_DATA = [
  {
    icon: {
      uri: '/images/users.png',
      alt_text: 'user count'
    },
    title: 'Users',
    cta: {
      title: 'Join our community',
      action: {
        type: 'NAVIGATION',
        data: {
          uri: 'https://calendly.com/anshu-saurav/15min'
        }
      }
    },
    countString: '1000+'
  },
  // {
  //   icon: {
  //     uri: '/images/views.png',
  //     alt_text: 'view count'
  //   },
  //   title: 'Views',
  //   cta: {
  //     title: 'Watch our content',
  //     action: {
  //       type: 'NAVIGATION',
  //       data: {
  //         uri: ''
  //       }
  //     }
  //   },
  //   countString: '5M+'
  // },

]
const FOOTER_LINKS = [
  {
    title: 'Privacy',
    uri: ''
  },
  {
    title: 'Terms & Condition',
    uri: ''
  }
]

const SOCIAL_MEDIA_DATA = [
  // {
  //   title: 'Youtube',
  //   image_data: {
  //     uri: '/images/youtube.png',
  //     alt_text: 'Youtube',
  //     width: 110,
  //     height: 30
  //   },
  //   uri: 'https://www.facebook.com/Bitcoincierge'
  // },
  // {
  //   title: 'Instagram',
  //   image_data: {
  //     uri: '/images/instagram.png',
  //     alt_text: 'Instagram',
  //     width: 30,
  //     height: 30
  //   },
  //   https://www.facebook.com/Bitcoincierge
  // },
  {
    title: 'Twitter',
    image_data: {
      uri: '/images/twitter.png',
      alt_text: 'Twitter',
      width: 30,
      height: 30
    },
    uri:'https://www.x.com/bitcoincierge-x/'
  },
  {
    title: 'Facebook',
    image_data: {
      uri: '/images/facebook.png',
      alt_text: 'Facebook',
      width: 30,
      height: 30
    },
    uri:'https://www.facebook.com/Bitcoincierge/'
  },
  {
    title: 'LinkedIn',
    image_data: {
      uri: '/images/linkedin.png',
      alt_text: 'LinkedIn',
      width: 30,
      height: 30
    },
    uri:'https://www.linkedin.com/company/bitcoincierge/'
  }
]
const SIDEBAR_DATA = [
  {
    title: 'About',
    image_data: {
      uri: '/images/about.svg',
      alt_text: 'About',
      width: 30,
      height: 30
    },
    uri: '#about-section'
  },
  {
    title: 'Why Us',
    image_data: {
      uri: '/images/why-us.svg',
      alt_text: 'Why us',
      width: 30,
      height: 30
    },
    uri: '#whyus-section'
  },
  {
    title: 'Client',
    image_data: {
      uri: '/images/client.svg',
      alt_text: 'Client',
      width: 30,
      height: 30
    },
    uri: '#client-section'
  },
  {
    title: 'Features',
    image_data: {
      uri: '/images/features.svg',
      alt_text: 'Features',
      width: 30,
      height: 30
    },
    uri: '#feature-section'
  },
  {
    title: 'Podcast',
    image_data: {
      uri: '/images/podcast.svg',
      alt_text: 'Podcast',
      width: 30,
      height: 30
    },
    uri: '#podcast-section'
  }
]
const SIDEBAR_SOCIAL_DATA = [
  {
    uri: 'https://www.facebook.com/Bitcoincierge/',
    image_data: {
      uri: '/images/facebook-sb.svg',
      alt_text: 'Facebook',
      width: 30,
      height: 30
    }
  },
  {
    uri: 'https://www.linkedin.com/company/bitcoincierge/',
    image_data: {
      uri: '/images/linkedin-sb.svg',
      alt_text: 'Linkedin',
      width: 30,
      height: 30
    }
  },
  {
    uri:'https://www.x.com/bitcoincierge-x/',
    image_data: {
      uri: '/images/twitter-sb.svg',
      alt_text: 'Twitter',
      width: 30,
      height: 30
    }
  },
]
export default function HomePage() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const toggleSidebar = () => {setSidebarOpen(bool => !bool)}
  return (
    <main style={{backgroundImage: `url("/images/background.png")`}} className='bg-contain bg-center bg-repeat-y relative'>
      <Head>
        <title>Hi</title>
      </Head>
      <section className='pt-16 md:pt-0'>
        <div className='mx-8'>
          <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center leading-loose px-5 md:px-auto'>
            <div className='flex flex-row md:flex-row flex-wrap items-center justify-center md:justify-between w-full gap-4'>
              <div className='text-3xl md:text-4xl mlg:text-[42px] lg:text-5xl lxl:text-6xl xl:text-7xl font-polysans font-medium text-yellow-900 drop-shadow-lg text-shadow leading-tight text-center md:text-left w-full md:w-auto' >Simplifying ownership of</div>
              <div style={{backgroundImage: `url("/images/Rectangle1.png")`}} className='bg-cover bg-center bg-no-repeat h-[60px] md:[h-90px] lg:[h-114px] w-[180px] lg:w-[240px] rounded-lg'>
              </div>
            </div>
            <div className='flex flex-row md:flex-row flex-wrap items-center justify-center md:justify-between w-full mt-8 gap-4'>
              <div style={{backgroundImage: `url("/images/Rectangle2.png")`}} className='order-last md:order-first bg-cover bg-center bg-no-repeat h-[60px] md:[h-90px] lg:[h-114px] w-[180px] lg:w-[340px] rounded-lg'>
              </div>
              <div className='text-3xl md:text-4xl mlg:text-[42px] lg:text-5xl lxl:text-6xl xl:text-7xl font-decor font-semibold italic text-slate-900 drop-shadow-md text-center md:text-right order-first md:order-last w-full md:w-auto'>best performing asset</div>
            </div>
            <div className='flex flex-row md:flex-row flex-wrap items-center justify-center md:justify-between w-full mt-8 gap-4'>
              <div className='text-3xl md:text-4xl mlg:text-[42px] lg:text-5xl lxl:text-6xl xl:text-7xl font-polysans font-medium text-yellow-900 drop-shadow-lg text-shadow leading-normal text-center md:text-left w-full md:w-auto'>of the 21st century</div>
              <div style={{backgroundImage: `url("/images/Rectangle3.png")`}} className='bg-cover bg-center bg-no-repeat h-[60px] md:[h-90px] lg:[h-114px] w-[180px] lg:w-[420px] rounded-lg'>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='bg-darkBg font-decor py-12' id='about-section'>
        <div className='py-10'>
          <div className='flex flex-1 justify-center'>
            <div className='bg-greyBg p-3 rounded-md text-white text-lg'>In the last 10 years</div>
          </div>
          <div className='flex justify-center items-center relative mt-8 md:mt-0'>
            <div className='absolute left-0 top-1/2 -translate-y-1/2 mx-10 hidden md:block'>
              <div className='flex flex-col w-2'>
                {
                  Array(COMPARISON_DATA.length).fill(1).map((item, index) => {
                    return (<div key={index} className={clsx('w-2 rounded-md h-4 mt-2 cursor-pointer', index === selectedIndex && 'bg-white h-8', index !== selectedIndex && ' bg-greyBg' )}
                    onClick={() => {setSelectedIndex(index)}}>
                    </div>)
                  })
                }
              </div>
            </div>
            <div className='absolute right-0 top-1/2 -translate-y-1/2 w-[180px] py-6 px-4 bg-greyBg rounded-l-lg hidden md:block'>
              <div className='text-grabniteGrey'>
                {COMPARISON_DATA?.[selectedIndex]?.title } <span>{COMPARISON_DATA?.[selectedIndex]?.gain}%</span>
              </div>
              <div className='flex justify-start items-center mt-2 text-white'>
                <div >Know more</div>
                <RiArrowRightLine className='ml-2'/>
              </div>
            </div>
            <div className='card w-full mx-10'>
              <div className='flex items-center flex-wrap md:flex-nowrap justify-center w-full mt-4'>
                {
                  COMPARISON_DATA?.[selectedIndex]?.cards.map((card, index) => {
                    return (
                      <>
                      <div className={index === 0?'w-4/7':'w-3/7 ml-0 md:ml-6'}>
                        <div className='flex justify-center items-center'>
                          <NextImage
                            className='h-10 w-10 rounded-md'
                            alt={card?.icon?.alt_text}
                            src={card?.icon?.uri}
                            width={40}
                            height={40}/>
                          <div className='text-white font-semibold text-xl ml-5'>{card?.title}</div>
                        </div>
                        <NextImage
                          className='rounded-lg mt-6'
                          alt={card?.image_data?.alt_text}
                          src={card?.image_data?.uri}
                          width={292}
                          height={166}
                          />
                        {
                          index === 0 && <div className='text-white w-full text-center text-2xl font-normal tracking-wide flex flex-col justify-center min-h-full block md:hidden'>vs</div>
                        }
                      </div>
                        {
                          index === 0 && <div className='text-white text-2xl font-normal tracking-wide ml-6 flex flex-col justify-center min-h-full hidden md:block'>vs</div>
                        }
                      </>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <div className='w-full py-6 px-4 bg-greyBg mt-12 visible md:hidden'>
            <div className='text-grabniteGrey text-xl font-normal mx-5'>
              {COMPARISON_DATA?.[selectedIndex]?.title } <span>{COMPARISON_DATA?.[selectedIndex]?.gain}%</span>
            </div>
            <div className='flex justify-end items-center mt-2 text-white'>
              <div >Know more</div>
              <RiArrowRightLine className='ml-2'/>
            </div>
          </div>
        </div>
      </section>
      <section className='bg-darkBg bg-opacity-99 font-content pb-16' id='whyus-section'>
        <div className={clsx('flex flex-col md:flex-row justify-between items-center gap-6 pt-4 px-10')}>
          <div className={clsx('w-full md:w-1/2 order-last md:order-first')}>
            <div className='flex flex-col'>
              <div className='flex flex-col items-start md:items-center'>
                <div className='text-lg md:text-2xl font-normal text-white'>Your Bitcoin Partner from</div>
                <div className='text-xl md:text-3xl font-bold text-white'>Purchase to Custody.</div>
              </div>
            </div>
          </div>
        </div>
        {
          CAPTION_DATA?.map((card,index) => {
            return (
              <div className='py-6 px-10' key={index}>
                <div className='flex flex-col md:flex-row justify-between items-center gap-6 mt-4'>
                  <div className={clsx('w-full md:w-1/2 order-last md:order-first')}>
                    <div className='flex flex-col'>
                      <div className='flex flex-1 p-4 justify-center items-center mt-6'>
                        <NextImage
                          className='flex-1 max-w-[400px]'
                          alt={card?.image_data?.alt_text}
                          src={card?.image_data?.uri}
                          width={400}
                          height={400}/>
                      </div>
                    </div>
                  </div>
                  <div className={clsx('w-full md:w-1/2 order-first md:order-last')}>
                    <div className='text-2xl md:text-3xl font-normal text-white max-w-sm'>{card?.title}</div>
                    <div className='text-md md:text-xl font-normal text-grabniteGrey max-w-md mt-4'>{card?.description}</div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </section>
      <section className='bg-white px-20 py-20 font-content' id='client-section'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4'>
            <div className='text-kobicha text-2xl font-semibold w-full md:w-auto text-center md:text-left'>Powered by</div>
            {
              PARTNER_DATA?.map((item, index) => {
                return (
                  <div key={index} className='w-full md:w-auto self-auto md:self-stretch flex flex-col justify-between items-center'>
                    <NextImage
                      className='flex-1'
                      alt={item?.image_data?.alt_text}
                      src={item?.image_data?.uri}
                      width={166}
                      height={48}/>
                    <div className='text-xs text-grabniteGrey font-light text-center mt-1'>{item?.description}</div>
                  </div>
                )
              })
            }
          <div className='text-md text-kobicha font-normal'>and more...</div>
        </div>
      </section>
      <section className='bg-white bg-opacity-80 font-content'>
        <div className='mx-10'>
          <div className='layout relative flex flex-col md:flex-row min-h-screen items-center justify-center py-12 text-center leading-loose gap-8'>
            <div className='flex flex-wrap items-center justify-between'>
              <div className='text-lg md:text-2xl font-normal text-kobicha text-center md:text-left max-w-full md:max-w-md'>Be a part of our thriving</div>
              <div className='text-xl md:text-3xl font-bold text-kobicha text-center md: text-left max-w-full md:max-w-md'>Bitcoiners community</div>
              <div className='text-md md:text-xl font-normal text-kobichaLight text-left max-w-sm mt-6 tracking-tighter'>Become part of a growing community of individuals who invest in the markets to grow theirwealth over time.</div>
            </div>
            <div className='flex flex-col flex-wrap items-center justify-between w-full mt-6 px-0 md:px-6 gap-12'>
              {
                COMMUNITY_DATA?.map((item, index) => {
                  return (
                    <Link href={item?.cta?.action?.data?.uri} target="_blank" key={index} className='bg-kobicha rounded-lg p-6 flex-1 w-full'>
                      <div className='flex flex-col md:flex-row justify-between items-center md:items-start'>
                        <div>
                          <div className='h-10 w-10 rounded-full bg-bone flex justify-center items-center bg-opacity-30 p-2'>
                            <NextImage alt={item?.icon?.alt_text} src={item?.icon?.uri} width={40} height={40}/>
                          </div>
                          <div className='text-bone text-xs font-light mt-2'>{item?.title}</div>
                        </div>
                        <div className=''>
                          <div className='text-bone text-5xl font-bold'>{item?.countString}</div>
                          <div className='mt-12 text-bone text-sm border-b border-b-bone flex justify-start items-center gap-1'>
                            {item?.cta?.title}
                            <RiArrowRightUpLine/>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })
              }
            </div>
          </div>
        </div>
      </section>
      <section className='bg-black font-content'>
        <div className='py-16 flex flex-col md:flex-row items-center justify-between'>
          <div className='flex-1 flex items-center justify-center p-6'>
            <div>
              <div className='text-white text-2xl md:text-4xl font-normal max-w-sm md:max-w-md tracking-wide leading-relaxed'>To start preserving &
                multiplying your wealth
                now!
              </div>
              <div className='flex justify-start items-center mt-4'>
                <div className='inline-flex justify-start items-center gap-4 text-white rounded-3xl border border-white py-1 px-4 tracking-wider mt-4'>
                <div className='font-normal text-md md:text-lg text-white'>
                  Contact us now
                </div>
                <div className='w-10 h-10 bg-white rounded-full flex items-center justify-center'>
                  <RiArrowRightLine className='text-black'/>
                </div>
              </div>
              </div>
            </div>
          </div>
          <div className='flex-1 flex justify-center items-center relative'>
            <NextImage
              alt='Contact us'
              src='/images/contact-us.png'
              width={282}
              height={380}/>
          </div>
        </div>
      </section>
      <section className='bg-black font-content' id='feature-section'>
        <div className='py-10 w-full flex flex-col md:flex-row items-center justify-between px-10'>
          <div className='w-full md:w-1/2 flex items-center justify-center'>
            <div>
              {/*<NextImage alt={} src={}/>*/}
              <div className='text-white text-opacity-70 text-md md:text-lg font-normal max-w-sm md:max-w-md pr-12'>
                Join the rank of Savy Investor who trust us for their Bitcoins needs.
              </div>
              <div className="relative mt-6 max-w-sm">
                <div className="absolute top-4 left-3">
                  <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
                </div>
                <input type="text" className="block min-w-full pr-20 rounded-lg z-0 focus:shadow focus:outline-none bg-transparent" placeholder="Email"/>
                <div className="absolute top-2 right-2">
                  <button className="px-1 py-1 text-eerieBlack text-xs font-semibold rounded-lg bg-white">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full md:w-1/2 flex justify-center items-center'>
            {/*<div className='flex-1'>*/}
            <div>
              <div className='flex flex-col md:flex-row justify-start items-center gap-6 mt-8 md:mt-0'>
                {
                  FOOTER_LINKS.map((item, index) => {
                    return (
                      <PrimaryLink key={index} href={item?.uri} variant='primary'>{item?.title}</PrimaryLink>
                    )
                  })
                }
              </div>
              <div className='flex flex-col md:flex-row flex-nowrap md:flex-wrap justify-start items-center gap-4 mt-10'>
                <div className='text-white text-opacity-60 text-sm tracking-wide'>Follow us on: </div>
                <div className='flex justify-start items-center gap-4'>
                  {SOCIAL_MEDIA_DATA?.map((item, index) => {
                    return (
                      <PrimaryLink key={index} href={item?.uri} variant='primary'>
                        <NextImage
                        key={index}
                        alt={item?.image_data?.alt_text}
                        src={item?.image_data?.uri}
                        height={item?.image_data?.height}
                        width={item?.image_data?.width}/>
                      </PrimaryLink>
                    )
                  })}
                </div>
              </div>
            </div>
            {/*</div>*/}
          </div>
        </div>
      </section>
      <section className='bg-black border-t border-t-amber-50 py-6 font-content' id='podcast-section'>
        <div className='text-white font-normal text-sm tracking-wide flex justify-center items-center'>
          © 2024 21Towers. All rights reserved
        </div>
      </section>
      {
        sidebarOpen && <div style={{backgroundImage: `url("/images/noise-bg.png")`}} className='bg-contain bg-center bg-repeat-y fixed inset-0 w-full z-50 transition-all duration-300 ease-in-out delay-1000'>
        <div className='relative'>
          <div className='absolute inset-y-0 right-0 max-w-[465px] w-full min-h-screen bg-jet overflow-auto'>
            <div className='flex-1 flex-col'>
              <div className='border-b border-b-bone border-opacity-20'>
                <div className='flex justify-end px-14 py-6 text-bone'>
                  <RiCloseLine size={48} className='cursor-pointer' onClick={toggleSidebar}/>
                </div>
              </div>
              <div className='flex-1 px-14 py-10'>
                <div className='flex flex-col gap-8'>
                  {
                    SIDEBAR_DATA?.map((item, index) => {
                      return (
                        <Link key={index} href={item?.uri} className='flex justify-start items-center gap-3 py-3' onClick={toggleSidebar}>
                          <NextImage alt={item?.image_data?.alt_text} src={item?.image_data?.uri} width={item?.image_data?.width}
                                     height={item?.image_data?.height}/>
                          <div className='text-4xl text-bone font-semibold'>{item?.title}</div>
                        </Link>

                      )
                    })
                  }
                </div>
              </div>
              <div className='px-14 py-6'>
                  <div className='text-bone font-xs font-light'>We are available here</div>
                  <div className='flex justify-start items-center gap-6 mt-1'>
                    {
                      SIDEBAR_SOCIAL_DATA?.map((item, index) => {
                        return (
                          <NextImage key={index} alt={item?.image_data?.alt_text} src={item?.image_data?.uri} width={item?.image_data?.width} height={item?.image_data?.height}/>
                        )
                      })
                    }
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
      <div className='layout absolute top-0 inset-x-0 py-10 z-10'>
        <div className='flex justify-between items-center '>
          <NextImage alt='Logo' src='/images/logo.png' width={180} height={54}/>
          <NextImage alt='HAmburger' src='/images/hamburger.svg' width={32} height={16} className='cursor-pointer' onClick={toggleSidebar}/>
        </div>
      </div>
    </main>
  );
}
