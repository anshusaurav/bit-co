'use client';

import Head from 'next/head';
import Link from 'next/link'
import * as React from 'react';
import '@/lib/env';
// import { PopupWidget } from "react-calendly";
import {RiArrowRightLine, RiCloseLine} from "react-icons/ri";
import { RiArrowRightUpLine } from "react-icons/ri";
import '@/styles/Home.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import {useEffect, useState} from 'react';
import {db} from '@/lib/firebase'
import {collection, getDocs, addDoc, doc, updateDoc, deleteDoc} from "firebase/firestore";
// import Background from '~/images/background-light.png';

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
    title: 'Clients',
    cta: {
      title: 'Join our community',
      action: {
        type: 'NAVIGATION',
        data: {
          uri: 'https://calendly.com/anshu-saurav/15min'
        }
      }
    },
    countString: '100+'
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
    title: 'Terms & Conditions',
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
    title: 'Opportunity',
    image_data: {
      uri: '/images/bitcoin.svg',
      alt_text: 'Opportunity',
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
    title: 'Clients',
    image_data: {
      uri: '/images/client.svg',
      alt_text: 'Clients',
      width: 30,
      height: 30
    },
    uri: '#client-section'
  },
  {
    title: 'Book a call',
    image_data: {
      uri: '/images/features.svg',
      alt_text: 'Book a call',
      width: 30,
      height: 30
    },
    uri: '#feature-section'
  },
  // {
  //   title: 'Podcast',
  //   image_data: {
  //     uri: '/images/podcast.svg',
  //     alt_text: 'Podcast',
  //     width: 30,
  //     height: 30
  //   },
  //   uri: '#podcast-section'
  // }
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

  const emailsRef = collection(db, "emails")
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toggleSidebar = () => {setSidebarOpen(bool => !bool)}

  const addEmail = async () => {
    const dt = new Date();
    setIsLoading(true);
    const newDocRef = await addDoc(emailsRef, {email: email, createdOn: dt.toDateString()})
    setEmail('');
    // const data = await getDocs(emailsRef)
    setIsLoading(false);
    toast('🦄 Wow so easy!', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  useEffect(() => {
    const init = async() =>  {
      const data = await getDocs(emailsRef)
      console.log(data);
    }
    init();
  },[])
  return (
    <div className='container'>
    <main style={{backgroundImage: `url("/images/background-light.png")`}} className='bg-contain bg-center bg-repeat-y relative'>
      {/*<Head>*/}
      {/*  <title>Hi</title>*/}
      {/*</Head>*/}

      <section className='pt-16 md:pt-0 mx-auto'>
        <div className='mx-8'>
          <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center leading-loose px-5 md:px-auto'>
            <div className='flex flex-row lg:flex-row flex-wrap items-center justify-center md:justify-between w-full gap-4'>
              <div className='text-4xl mlg:text-[42px] mgl:text-5xl lxl:text-[56px] xl:text-7xl font-polysans font-medium text-yellow-900 drop-shadow-lg text-shadow leading-tight text-center md:text-left w-full md:w-auto' >Simplifying ownership of</div>
              <div style={{backgroundImage: `url("/images/Rectangle1.png")`}} className='bg-cover bg-center bg-no-repeat h-[90px] lg:h-[102px] w-[200px] md:w-[180px] lg:w-[220px] lxl:w-[240px] rounded-lg'>
              </div>
            </div>
            <div className='flex flex-row lg:flex-row flex-wrap items-center justify-center md:justify-between w-full mt-4 lg:mt-8 gap-4'>
              <div style={{backgroundImage: `url("/images/Rectangle2.png")`}} className='order-last md:order-first bg-cover bg-center bg-no-repeat h-[90px] lg:h-[102px] w-[200px] md:w-[180px] lg:w-[310px] lxl:w-[340px] rounded-lg'>
              </div>
              <div className='text-4xl mlg:text-[42px] mgl:text-5xl lxl:text-[56px] xl:text-7xl font-decor font-semibold italic text-slate-900 drop-shadow-md text-center md:text-right order-first md:order-last w-full md:w-auto'>best performing asset</div>
            </div>
            <div className='flex flex-row lg:flex-row flex-wrap items-center justify-center md:justify-between w-full mt-4 lg:mt-8 gap-4'>
              <div className='text-4xl mlg:text-[42px] mgl:text-5xl lxl:text-[56px] xl:text-7xl font-polysans font-medium text-yellow-900 drop-shadow-lg text-shadow leading-tight text-center md:text-left w-full md:w-auto'>of the 21st century</div>
              <div style={{backgroundImage: `url("/images/Rectangle3.png")`}} className='bg-cover bg-center bg-no-repeat h-[90px] lg:h-[102px] w-[200px] md:w-[180px] lg:w-[360px] lxl:w-[420px] rounded-lg'>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='font-content mx-auto bg-contain bg-center bg-repeat-y' id='about-section' style={{backgroundImage: `url("/images/background-dark.png")`}}>
        <div className='py-12 bg-black opacity-85'>
          <div className='flex flex-1 justify-center'>
            {/*<div className='max-w-auto md:min-w-[240px] lg:max-w-[480px]'></div>*/}
            <div className='bg-greyBg p-3 rounded-md text-white text-lg'>In the last 10 years</div>
            {/*<div className='max-w-auto md:max-w-[160px] lg:max-w-[324px]'></div>*/}
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
            <div className='absolute right-0 top-1/2 -translate-y-1/2 w-[180px] h-[240px] px-8 py-6 rounded-l-lg hidden md:flex flex-col justify-center bg-opacity-0' style={{background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(61, 61, 61, 0.29) 43%, rgba(141, 141, 141, 0.15) 100%)'}}>
              <div className='text-grabniteGrey'>
                {COMPARISON_DATA?.[selectedIndex]?.title } <span>{COMPARISON_DATA?.[selectedIndex]?.gain}%</span>
              </div>
              <div className='flex justify-start items-center mt-4 text-white'>
                <div >Know more</div>
                <RiArrowRightLine className='ml-2'/>
              </div>
            </div>
            <div className='flex items-center flex-col md:flex-row flex-wrap md:flex-nowrap justify-center w-full mt-4 gap-6'>
              {/*{*/}
              {/*  COMPARISON_DATA?.[selectedIndex]?.cards.map((card, index) => {*/}
              {/*    return (*/}
              {/*      <>*/}
                      <div className='flex-1 flex flex-col items-center max-w-[full] md:max-w-[240px] lg:max-w-[480px]'>
                        <div className='flex justify-center items-center self-center'>
                          <NextImage
                            className='h-10 w-10 rounded-md opacity-100'
                            alt={COMPARISON_DATA[selectedIndex]?.cards?.[0]?.icon?.alt_text}
                            src={COMPARISON_DATA[selectedIndex]?.cards?.[0]?.icon?.uri}
                            width={40}
                            height={40}/>
                          <div className='text-white font-semibold text-xl ml-5'>{COMPARISON_DATA[selectedIndex]?.cards?.[0]?.title}</div>
                        </div>
                        <NextImage
                          className='rounded-lg mt-6 hidden md:inline-block'
                          alt={COMPARISON_DATA[selectedIndex]?.cards?.[0]?.image_data?.alt_text}
                          src={COMPARISON_DATA[selectedIndex]?.cards?.[0]?.image_data?.uri}
                          width={480}
                          height={166}
                          />
                        <NextImage
                          className='rounded-lg mt-6 inline-block md:hidden'
                          alt={COMPARISON_DATA[selectedIndex]?.cards?.[0]?.image_data?.alt_text}
                          src={COMPARISON_DATA[selectedIndex]?.cards?.[0]?.image_data?.uri}
                          width={320}
                          height={82}
                        />
                      </div>
                      <div className='text-white text-2xl font-normal tracking-wide flex flex-col justify-between min-h-full'>vs</div>
                      <div className='flex-1 flex flex-col items-center max-w-[full] md:max-w-[160px] lg:max-w-[324px]'>
                        <div className='flex justify-center items-center self-center'>
                          <NextImage
                            className='h-10 w-10 rounded-md opacity-100'
                            alt={COMPARISON_DATA[selectedIndex]?.cards?.[1]?.icon?.alt_text}
                            src={COMPARISON_DATA[selectedIndex]?.cards?.[1]?.icon?.uri}
                            width={40}
                            height={40}/>
                          <div className='text-white font-semibold text-xl ml-5'>{COMPARISON_DATA[selectedIndex]?.cards?.[1]?.title}</div>
                        </div>
                        <NextImage
                          className='rounded-lg mt-6 hidden md:inline-block'
                          alt={COMPARISON_DATA[selectedIndex]?.cards?.[1]?.image_data?.alt_text}
                          src={COMPARISON_DATA[selectedIndex]?.cards?.[1]?.image_data?.uri}
                          width={324}
                          height={166}
                        />
                        <NextImage
                          className='rounded-lg mt-6 inline-block md:hidden'
                          alt={COMPARISON_DATA[selectedIndex]?.cards?.[0]?.image_data?.alt_text}
                          src={COMPARISON_DATA[selectedIndex]?.cards?.[0]?.image_data?.uri}
                          width={320}
                          height={82}
                        />
                      </div>
              {/*      </>*/}
              {/*    )*/}
              {/*  })*/}
              {/*}*/}
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
      <section className='bg-darkBg bg-opacity-99 font-content py-16 mx-auto' id='whyus-section'>

        {
          CAPTION_DATA?.map((card,index) => {
            return (
              <React.Fragment key={index}>
              <div className={clsx('flex flex-col md:flex-row justify-between items-center gap-6 pt-4 px-6 md:px-10')}>
                <div className={clsx('w-full md:w-1/2 order-last md:order-first px-0 md:px-8')}>
                  <div className='flex flex-wrap flex-col items-start justify-start'>
                    <div className='text-xl sm:text-2xl lg:text-4xl xl:text-[42px] font-normal text-white'>Your Bitcoin partner from</div>
                    <div className='text-xl sm:text-2xl lg:text-4xl xl:text-[42px] font-bold text-white mt-2'>Purchase, Custody & more</div>
                    {/*<div className='text-md md:text-lg lg:text-xl font-normal text-kobichaLight text-left max-w-full md:max-w-md mt-6 tracking-wide '>Become part of a growing community of individuals who invest in the markets to grow theirwealth over time.</div>*/}
                  </div>
                </div>
              </div>
              <div className='py-6 px-6 md:px-10' key={index}>
                <div className='flex flex-col md:flex-row justify-between items-center gap-6 lg:gap-12 mt-4'>
                  <div className={clsx('w-full md:w-1/2 order-last md:order-first')}>
                    <div className='flex flex-col'>
                      <div className='flex flex-1 p-4 justify-center items-center mt-6'>
                        <NextImage
                          className='flex-1 max-w-[240px] md:max-w-[400px]'
                          alt={card?.image_data?.alt_text}
                          src={card?.image_data?.uri}
                          width={400}
                          height={400}/>
                      </div>
                    </div>
                  </div>
                  <div className={clsx('w-full md:w-1/2 order-first md:order-last')}>
                    <div className='flex flex-wrap flex-col items-start justify-start'>
                      <div className='text-xl sm:text-2xl lg:text-4xl xl:text-[42px] font-normal text-white max-w-lg tracking-wide'>{card?.title}</div>
                      <div className='text-md md:text-xl lg:text-2xl font-normal text-grabniteGrey max-w-md mt-4'>{card?.description}</div>
                    </div>
                  </div>
                </div>
              </div>
              </React.Fragment>
            )
          })
        }
      </section>
      <section className='bg-white px-20 py-20 font-content mx-auto' id='client-section'>
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
                    {/*<div className='text-xs text-grabniteGrey font-light text-center mt-1'>{item?.description}</div>*/}
                  </div>
                )
              })
            }
          <div className='text-md text-kobicha font-normal'>and more...</div>
        </div>
      </section>
      <section className='font-content mx-auto'>
        <div className='px-6 md:px-10'>
          <div className='relative flex flex-col md:flex-row min-h-screen items-center justify-center py-12 text-center leading-loose gap-8'>
            <div className='flex flex-wrap flex-col md:flex-row items-center justify-center md:justify-between'>
              <div className='text-lg sm:xl md:text-2xl lg:text-4xl font-normal text-kobicha text-center md:text-left max-w-full md:max-w-md'>Be a part of our thriving</div>
              <div className='text-xl sm:text-2xl md:text-3xl lg:text-[42px] font-bold text-kobicha text-center md:text-left max-w-full md:max-w-md mt-2'>Bitcoiners community</div>
              <div className='text-md md:text-lg lg:text-xl font-normal text-kobichaLight text-left max-w-full md:max-w-md mt-6 tracking-wide '>Become part of a growing community of individuals who invest in the markets to grow theirwealth over time.</div>
            </div>
            <div className='flex flex-col flex-wrap items-center justify-between w-full px-0 md:px-6 gap-12'>
              {
                COMMUNITY_DATA?.map((item, index) => {
                  return (
                    <Link href={item?.cta?.action?.data?.uri} target="_blank" key={index} className='bg-kobicha rounded-2xl p-8 flex-1 w-full'>
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
      <section className='bg-black font-content mx-auto' id='feature-section'>
        <div className='py-16 flex flex-col md:flex-row items-center justify-between'>
          <div className='flex-1 flex items-center justify-center p-6'>
            <div>
              <div className='text-xl sm:text-2xl lg:text-4xl xl:text-[42px] leading-loose font-normal text-white max-w-lg tracking-wide'>To start preserving &
                multiplying your wealth
                now!</div>
              {/*<div className='text-md md:text-xl lg:text-2xl font-normal text-grabniteGrey max-w-md mt-4'>{card?.description}</div>*/}

              {/*<div className='text-white text-2xl md:text-4xl font-normal max-w-sm md:max-w-md tracking-wide leading-relaxed'>*/}
              {/*</div>*/}
              <div className='flex justify-start items-center mt-4'>
                <div className='inline-flex justify-start items-center gap-4 text-white rounded-3xl border border-white p-2 tracking-wider mt-4'>
                <div className='font-light text-md md:text-lg text-white '>
                  Contact us now
                </div>
                <div className='w-6 h-6 bg-white rounded-full flex items-center justify-center'>
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
      <section className='bg-white py-8 md:py-10 mx-auto'></section>
      <section className='bg-black font-content mx-auto' >
        <div className='px-6 md:px-10 py-10 '>
          <div className='flex gap-2 justify-start items-center'>
            <NextImage alt='Logo' src='/images/logo-dark.webp' width={48} height={48} className='rounded-md'/>
            <div className='font-trakya text-white font-light text-4xl tracking-wide'>BITCOINCIERGE</div>
          </div>
          <div className='w-full flex flex-col md:flex-row items-center justify-between mt-4'>
            <div className='w-full md:w-1/2 flex flex-col items-start justify-center'>
                {/*<NextImage alt={} src={}/>*/}
                <div className='text-white text-opacity-70 text-md md:text-lg font-normal max-w-sm md:max-w-md pr-12'>
                  Join the rank of Savy Investor who trust us for their Bitcoins needs.
                </div>
                <div className="relative mt-6 max-w-sm">
                  <div className="absolute top-4 left-3">
                    <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
                  </div>
                  <input
                    type="text"
                    className="block min-w-full pr-20 rounded-lg z-0 focus:shadow focus:outline-none bg-transparent text-white"
                    placeholder="Email"
                    value={email}
                    onChange={(evt) => setEmail(evt.target.value)}/>
                  <div className="absolute top-2 right-2">
                    <button
                      disabled={email?.trim().length === 0}
                      className="p-[6px] text-eerieBlack text-xs font-semibold rounded-lg bg-white disabled:cursor-not-allowed"
                      onClick={addEmail}
                    >Subscribe</button>
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
                        <Link className='text-white' key={index} href={item?.uri} target="_blank">{item?.title}</Link>
                      )
                    })
                  }
                </div>
                <div className='flex flex-col md:flex-row flex-nowrap md:flex-wrap justify-start items-center gap-4 mt-10'>
                  <div className='text-white text-opacity-60 text-sm tracking-wide'>Follow us on: </div>
                  <div className='flex justify-start items-center gap-4'>
                    {SOCIAL_MEDIA_DATA?.map((item, index) => {
                      return (
                        <Link key={index} href={item?.uri} target="_blank">
                          <NextImage
                          key={index}
                          alt={item?.image_data?.alt_text}
                          src={item?.image_data?.uri}
                          height={item?.image_data?.height}
                          width={item?.image_data?.width}/>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
              {/*</div>*/}
            </div>
          </div>
        </div>
      </section>
      <section className='bg-black border-t border-opacity-20 border-t-amber-50 py-6 font-content' id='podcast-section'>
        <div className='text-white font-normal text-sm tracking-wide flex justify-center items-center'>
          © 2024 Bitcoincierge. All rights reserved
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
                                     height={item?.image_data?.height} className='rounded-xl'/>
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
                          <Link key={index} href={item?.uri} target="_blank">
                            <NextImage className='cursor-pointer' key={index} alt={item?.image_data?.alt_text} src={item?.image_data?.uri} width={item?.image_data?.width} height={item?.image_data?.height}/>
                          </Link>
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
          <div className='flex gap-2 justify-start items-center'>
            <NextImage alt='Logo' src='/images/logo-dark.webp' width={48} height={48} className='rounded-md'/>
            <div className='font-trakya text-dark font-light text-4xl tracking-wide'>BITCOINCIERGE</div>
          </div>
          <NextImage alt='HAmburger' src='/images/hamburger.svg' width={32} height={16} className='cursor-pointer' onClick={toggleSidebar}/>
        </div>
      </div>
    </main>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
