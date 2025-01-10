'use client';

import Head from 'next/head';
import Link from 'next/link'
import * as React from 'react';
import '@/lib/env'; 
import { RiCloseLine} from "react-icons/ri";
import '@/styles/Home.module.css';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Slider from "react-slick";
import '../../styles/Mentors.module.css'
import {
  FaUsers,
  FaBitcoin,
  FaQuestionCircle,
  FaHeadphones,
  FaLinkedin,
  FaTwitter, FaFacebookF, FaYoutube
} from "react-icons/fa";
import { useRouter } from 'next/navigation';
// import {FaCaretDown, FaCaretUp} from "react-icons/fa6";

// import Logo from '~/svg/Logo.svg';
import NextImage from '@/components/NextImage';
// import Image from 'next/image';
import clsx from 'clsx';
import {useEffect, useState} from 'react';
import { set } from 'zod';
import { MENTORS_DATA } from '../constants/MentorsConstants';
// @ts-ignore firebase efficiently
// import {db} from '@/firebase'
// import {collection, getDocs, addDoc} from "firebase/firestore";
// const mentorData = {
//   cards: [
//     {
//       id: 1,
//       title: 'Influencer Collaboration',
//       description: 'Strategies and Insights for Success',
//       ratings: 5,
//       card: {
//         title: '45 min',
//         description: 'Video Meeting',
//         iconUrl: '/images/icon-sc-calendar.svg',
//         price: {
//           actual: 100,
//           maximum: 149
//         },
//       },
//       tags: ['Popular']
//     },
//     {
//       id: 2,
//       title: '30 mins call',
//       description: 'Elevate Your bitcoin investment journey, One Strategy at a Time',
//       ratings: 5,
//       card: {
//         title: '45 min',
//         description: 'Video Meeting',
//         iconUrl: '/images/icon-sc-calendar.svg',
//         price: {
//           actual: 100,
//           maximum: 149
//         },
//       },
//       tags: ['Best Deal', 'Popular']
//     },
//     {
//       id: 3,
//       title: 'Quick Introductory Call',
//       ratings: 4,
//       card: {
//         title: '45 min',
//         description: 'Video Meeting',
//         iconUrl: '/images/icon-sc-calendar.svg',
//         price: {
//           actual: 100,
//           maximum: 149
//         },
//       },
//     }
//   ],
//   reviews: {
//     averageRating: 5,
//     cards: [{
//       rating: 5,
//       content: "This info session was really great.  I loved the way she approached and helped me with my resume, and the job hints were really helpful.",
//       author: 'Shriya Padhi',
//       reviewDate: '29th May, 2023',
//     },
//     {
//       rating: 5,
//       content: "I found your advice on interview preparation, tips on networking, resume enhancement and upskilling were very much helpful. I appreciate your support and look forward to applying what I've learned!",
//       author: 'Subhranshu Ghosh',
//       reviewDate: '23rd Nov, 2024',
//     },
//     {
//       rating: 5,
//       content: "Had a great session. Very helpful in providing career insight. Thank you!!",
//       author: 'Shriya Padhi',
//       reviewDate: '5th Dec , 2024',
//     }]
//   }
// }

const SIDEBAR_DATA = [
  {
    title: 'Opportunity',
    image_data: {
      uri: <FaBitcoin className='text-3xl font-bold text-bone group-hover:text-pumpkin'/>,
      alt_text: 'Opportunity',
      width: 30,
      height: 30
    },
    uri: '/#about-section'
  },
  {
    title: 'Why Us',
    image_data: {
      uri: <FaQuestionCircle className='text-3xl font-bold text-bone group-hover:text-pumpkin'/>,
      alt_text: 'Why us',
      width: 30,
      height: 30
    },
    uri: '/#whyus-section'
  },
  {
    title: 'Clients',
    image_data: {
      uri: <FaUsers className='text-3xl font-bold text-bone group-hover:text-pumpkin'/>,
      alt_text: 'clients',
      width: 30,
      height: 30
    },
    uri: '/#client-section'
  },
  {
    title: 'Book a call',
    image_data: {
      uri: <FaHeadphones className='text-3xl font-bold text-bone group-hover:text-pumpkin'/>,
      alt_text: 'Book a call',
      width: 30,
      height: 30
    },
    uri: '/#mentor-section'
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
    uri: 'https://www.youtube.com/@Bitcoincierge/',
    image_data: {
      uri: <FaYoutube className='text-3xl font-bold text-bone hover:text-pumpkin'/>,
      alt_text: 'Youtube',
      width: 30,
      height: 30
    },
    identifier: 'youtube'
  },
  {
    uri: 'https://www.facebook.com/groups/Bitcoincierge/',
    image_data: {
      uri: <FaFacebookF className='text-3xl font-bold text-bone hover:text-pumpkin'/>,
      alt_text: 'Facebook',
      width: 30,
      height: 30
    },
    identifier: 'facebook'

  },
  {
    uri: 'https://www.linkedin.com/company/bitcoincierge/',
    image_data: {
      uri: <FaLinkedin className='text-3xl font-bold text-bone hover:text-pumpkin'/>,
      alt_text: 'Linkedin',
      width: 30,
      height: 30
    },
    identifier: 'linkedin'
  },
  {
    uri: 'https://www.x.com/bitcoinciergein/',
    image_data: {
      uri: <FaTwitter className='text-3xl font-bold text-bone hover:text-pumpkin'/>,
      alt_text: 'Twitter',
      width: 30,
      height: 30
    },
    identifier: 'twitter'
  },
]

const MENTOR_SOCIAL_LINKS = [
  {
    identifier: 'youtube'
  },
  { 
    identifier: 'facebook'
  },
  {
    identifier: 'linkedin'
  },
  {
    identifier: 'twitter'
  },
]
export default function HomePage() {

  
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  
  const [moved, setMoved] = useState(false);
  // const [serviceFilter, setServiceFilter] = useState<string | null>('All');
  const [mentorData, setMentorData] = useState(null);
  const router = useRouter()
  const toggleSidebar = () => {
    setSidebarOpen(bool => !bool)
    // window.scrollBy( 0, -96 );
  }
  
  const listenScrollEvent = (event : any) => {
    if (window.scrollY < 1) {
      return setMoved(false)
    } else if (window.scrollY > 1) {
      return setMoved(true);
    }
  }

  useEffect(() => {

    window.addEventListener('scroll', listenScrollEvent);
    
    return () =>
      window.removeEventListener('scroll', listenScrollEvent);
  },[])
  
  useEffect(() => {
    console.log(router, window.location.pathname)
    setMentorData(MENTORS_DATA?.find((item) => item?.uri === window.location.pathname));
  },[])

  const renderServiceCard = (item: any) => {

    return (
      <div key={item?.id} onClick= {()=> {window.open(mentorData?.calenderUrl, '_blank');}}className='group rounded-[32px] bg-[hsla(0,0%,100%,.95)] mb-5 relative cursor-pointer grid items-start text-dark hover:shadow-[12px_12px_32px_0_rgba(0, 0, 0, .1)]' style={{transition: 'all .25s linear'}}>
        <div className='pt-5 pl-6 flex justify-between items-center'>
          <div className='flex gap-3 items-center flex-wrap'>
            <div className='rounded-[24px] font-bold text-sm h-8 px-2 inline-flex items-center justify-center border bg-[#f3f3f7]'>
              <svg viewBox="64 64 896 896" focusable="false" data-icon="star" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path></svg>
              <div className='ml-2 '>{item?.ratings}</div>
            </div>
            {
              item?.tags?.map((tag, index) => {
                return (
                  <div key={index} className='rounded-[24px] font-bold text-sm h-8 px-2 inline-flex items-center justify-center border bg-[#f3f3f7] ml-4'>
                    {tag}
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className='pt-4 flex flex-col items-stretch gap-2'>
          <h3 className='text-xl font-bold px-6 py-0'>{item?.title}</h3>
          <div className='text-md px-6 py-0 font-light text-[#5c5c5c]'>{item?.description}</div>
        </div>
        <div className='pt-4 flex flex-col items-stretch gap-2'>
          <div className='flex rounded-[24px] m-4 py-3 px-4 relative overflow-hidden justify-between items-center bg-[#efeff0] group-hover:bg-[#e2e2e4]'>
            <div className='flex gap-2 items-center'>
              <NextImage alt='HAmburger' src={item?.card?.iconUrl} width={32} height={32} />
              <div className='flex flex-col items-start '>
                <div className='flex flex-col item-stretch'>
                  <div className='text-sm font-bold'>
                    {item?.card?.title}
                  </div>
                  <div className='text-sm font-light' style={{color: '#ADADAF'}}>
                  {item?.card?.description}
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-start items-center'>
              <div className='flex justify-center items-center bg-tranparent group-hover:bg-dark px-3 py-0 text-md font-semibold h-10 border border-[#141414] rounded-[24px]'>
                <div className='flex justify-center items-center gap-1'>
                  {item?.card?.price?.actual !== 0 && <div className=' text-xs font-medium text-grey-600 line-through group-hover:text-white'>
                    ₹{item?.card?.price?.maximum}
                  </div>}
                  <div className=' text-sm font-medium text-grey-900 group-hover:text-white'>
                    {item?.card?.price?.actual === 0?'Free': `₹${item?.card?.price?.actual}`}
                  </div>
                </div>
                <svg stroke="currentColor" fill="white" className='hidden group-hover:block' strokeWidth="0" viewBox="0 0 448 512" fontSize="12" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{marginLeft: 8}}><path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path></svg>
              
                <svg stroke="currentColor" fill="black" className='block group-hover:hidden' strokeWidth="0" viewBox="0 0 448 512" fontSize="12" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={{marginLeft: 8}}><path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path></svg>
              </div>
              {/* {item?.card?.brokerage && <div className='flex justify-center items-center gap-1'>
                  {item?.card?.brokerage?.actual !== 0 && <div className=' text-xs font-medium text-grey-600 line-through group-hover:text-white'>
                    {item?.card?.brokerage?.maximum}% brokerage
                  </div>}
                  <div className=' text-sm font-medium text-grey-900 group-hover:text-white'>
                    {`${item?.card?.brokerage?.actual}% brokerage`}
                  </div>
                </div>} */}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderReviewCard = (item: any) => {

    return (
      <div className='rounded-[32px] bg-[hsla(0,0%,100%,.95)] mb-5 p-5 relative cursor-pointer grid items-start text-dark'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-3 items-center flex-wrap'>
            <div className='font-bold text-sm h-8 inline-flex items-center justify-center'>
              <svg viewBox="64 64 896 896" focusable="false" data-icon="star" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path></svg>
              <div className='ml-2 '>{item?.rating}/5</div>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-stretch gap-2'>
          <h3 className='text-lg font-light leading-7'>{item?.content}</h3>
        </div>
        <div className='mt-8 flex justify-between'>
          <div className=''>
          <div className='text-md font-semibold text-black'>{item?.author || 'Anonymous'}</div>
          <div className='text-xs font-normal text-[#797979]'>{item?.reviewDate}</div>
          </div>
        </div>
      </div>
    )
  }
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    nextArrow: <></>,
    prevArrow: <></>
  };
  return (
    <div className='container'>
      <main className='relative'>
        {/*<Head>*/}
        {/*  <title>Hi</title>*/}
        {/*</Head>*/}
        <div className='absolute w-full'>
         </div>
        <div className={`sticky top-0 inset-x-0 p-4 z-10 ${moved?'bg-black md:bg-opacity-[0.8]': 'bg-transparent'}`}>
          <div className='sticky top-0'>
            <div className='flex justify-between items-center '>
              <div className='flex gap-2 justify-start items-center bg-opacity-1' onClick={() => router.push('/')}>
                <NextImage alt='Logo' src={moved?'/images/logo-light.webp': '/images/logo-dark.webp'} width={54} height={54} className='rounded-md'/>
                {!moved && <div
                  className='font-trakya text-dark font-light text-xl md:text-4xl tracking-wide'>Bitcoincierge
                </div>}
              </div>
              <div className={`h-16 w-16 rounded-lg flex justify-center items-center ${moved?'bg-black':''} cursor-pointer`} onClick={toggleSidebar}>
                <NextImage alt='Hamburger' src='/images/hamburger.svg' width={32} height={16} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row bg-[#f5f5f5] min-h-[100vh]">
            <aside className="relative font-sm justify-stretch w-full md:w-1/3 " style={{backgroundImage: `url("/images/background-light.png")`}}>
                <div className='h-full -mt-1 -mb-1'>
                    <div className='sticky top-[120px] pb-[120px]  ml-[8%]'>
                      <div className='flex justify-center pt-[8%' style={{flex: '0 0 83.33333333333334%',maxWidth: '83.33333333333334%'}}>
                        <div className='flex flex-wrap pt-5 md:pt-0'>
                            <div className='block relative' style={{flex: '0 0 41.66666666666667%',maxWidth: '41.66666666666667%'}}>
                              <div className='relative inline-flex break-words'>
                                <NextImage alt={mentorData?.title} src={mentorData?.image_data?.uri} classNames={{image: 'rounded-[50%]'}} width={200} height={200}/>
                              </div>
                            </div>
                            <div className='block' style={{flex: '0 0 50%', maxWidth: '50%'}}>
                              {/* <div className='flex justify-end align-end mb-1'>
                                <div className="slider-container">
                                  <Slider {...settings}>
                                    <NextImage alt='' src='/images/slide-1.svg' width={74} height={74}/>
                                    <NextImage alt='' src='/images/slide-2.svg' width={74} height={74}/>
                                    <NextImage alt='' src='/images/slide-3.svg' width={74} height={74}/>
                                    </Slider>
                                </div>
                              </div> */}
                            </div>
                            <div className='mt-8' style={{flex: '0 0 91.66666666666666%',maxWidth: '91.66666666666666%'}}>
                              <h1 className='text-2xl font-extrabold mb-4'>
                                {mentorData?.title || ''}
                              </h1>
                              <p className='text-lg font-medium'>
                              {mentorData?.description}
                              </p>
                              <div className='flex flex-row flex-wrap gap-4 mt-4'>
                                {
                                  mentorData?.tags?.map((tag, index) => {
                                    return (
                                      <div key={index} className='rounded-[24px] font-bold text-sm h-8 px-2 inline-flex items-center justify-center border bg-[#f3f3f7]'>
                                        {tag}
                                      </div>
                                    )
                                  })
                                }
                              </div>
                            </div>
                        </div>
                      </div>
                    </div>
                </div>
            </aside>
            <div className='pt-8 pb-16 min-h-[100vh] flex flex-1 flex-column w-full md:w-2/3 ' style={{backgroundColor: '#efece3'}}>
              <div className='flex justify-center flex-wrap flex-1'>
                <div style={{flex: '0 0 82%', maxWidth: '82%'}}>
                  {/* <div className='overflow-auto' >
                    <div className='bg-[#efece3] z-1 overflow-hidden w-full'>
                      <div className='flex items-center gap-3 pt-3'>
                      <div className={`${serviceFilter === "All" ?"font-semibold rounded-[12px] flex h-[54px] py-4 px-6 text-lg cursor-pointer mb-3 bg-dark text-white flex jusyify-center items-center":"font-bold rounded-[12px] bg-transparent flex h-[54px] py-4 px-6 text-lg cursor-pointer mb-3 text-dark flex jusyify-center items-center"}`} style={{transition: 'all .25s ease-in-out', border: '1px solid #141414'}}>All</div>
                      <div className={`${serviceFilter === "1:1 Call" ?"font-semibold rounded-[12px] flex h-[54px] py-4 px-6 text-lg cursor-pointer mb-3 bg-dark text-white flex jusyify-center items-center":"font-bold rounded-[12px] bg-transparent flex h-[54px] py-4 px-6 text-lg cursor-pointer mb-3 text-dark flex jusyify-center items-center"}`} style={{transition: 'all .25s ease-in-out', border: '1px solid #141414'}}>1:1 Call</div>
                      <div className={`${serviceFilter === "Priority DM" ?"font-semibold rounded-[12px] flex h-[54px] py-4 px-6 text-lg cursor-pointer mb-3 bg-dark text-white flex jusyify-center items-center":"font-bold rounded-[12px] bg-transparent flex h-[54px] py-4 px-6 text-lg cursor-pointer mb-3 text-dark flex jusyify-center items-center"}`} style={{transition: 'all .25s ease-in-out', border: '1px solid #141414'}}>Priority DM</div>
                      <div className={`${serviceFilter === "Digital Product" ?"font-semibold rounded-[12px] flex h-[54px] py-4 px-6 text-lg cursor-pointer mb-3 bg-dark text-white flex jusyify-center items-center":"font-bold rounded-[12px] bg-transparent flex h-[54px] py-4 px-6 text-lg cursor-pointer mb-3 text-dark flex jusyify-center items-center"}`} style={{transition: 'all .25s ease-in-out', border: '1px solid #141414'}}>Digital Product</div>
                      <div className={`${serviceFilter === "Package" ?"font-semibold rounded-[12px] flex h-[54px] py-4 px-6 text-lg cursor-pointer mb-3 bg-dark text-white flex jusyify-center items-center":"font-bold rounded-[12px] bg-transparent flex h-[54px] py-4 px-6 text-lg cursor-pointer mb-3 text-dark flex jusyify-center items-center"}`} style={{transition: 'all .25s ease-in-out', border: '1px solid #141414'}}>Package</div>
                      </div>
                    </div>
                  </div> */}
                  <div className='grid grid-cols-1 lg:grid-cols-2 w-full gap-3 md:gap-5 mt-8'>
                    <div className='flex-1'>
                      {
                        mentorData?.cards?.filter((item, index) => index%2===0)?.map(item => {
                          return renderServiceCard(item);
                        })
                      } 
                    </div>
                    <div className='flex-1'>
                    {
                        mentorData?.cards?.filter((item, index) => index%2!==0)?.map(item => {
                          return renderServiceCard(item);
                        })
                      }
                    </div>
                  </div>
                   <div className='my-10 flex flex-col flex-wrap w-full'>
                    <div className='text-2xl font-bold'>
                      <div className='flex items-center justify-start'>
                        <h2 className='mb-2'>Ratings and feedback</h2>
                      </div>
                    </div>
                    <div className='flex row-wrap'>
                      <div className='pr-1 md:pr-3 w-1/3 lg:w-1/2'>
                        <div className='mt-4 border border-[#ebeaeb] rounded-[32px] h-[176px] flex justify-center items-center bg-[#fdfbf9]' style={{    boxShadow: '.5px .5px 4px rgba(0, 0, 0, .03), -.5px -.5px 4px rgba(0, 0, 0, .03)'}}>
                          <NextImage alt='reviews animation' src='/images/reviews_animation.gif' classNames={{image: 'rounded-[50%] aspect-square'}} width={160} height={160} />
                        </div>
                      </div>
                      <div className='px-1 md:px-3 w-1/3 lg:w-1/4'>
                        <div className='mt-4 border border-[#ebeaeb] rounded-[32px] h-[176px] flex flex-col justify-center items-center bg-[#fdfbf9] gap-3' style={{    boxShadow: '.5px .5px 4px rgba(0, 0, 0, .03), -.5px -.5px 4px rgba(0, 0, 0, .03)'}}>
                            <div className='text-xl lg:text-3xl tracking-wider font-bold'>5/5</div>
                            <div className='text-sm lg:text-md font-normal tracking-wide text-[#666b60] uppercase'>1 rating</div>
                        </div>
                      </div>
                      <div className='px-1 md:px-3 w-1/3 lg:w-1/4'>
                        <div className='mt-4 border border-[#ebeaeb] rounded-[32px] h-[176px] flex flex-col justify-center items-center bg-[#fdfbf9] gap-3' style={{    boxShadow: '.5px .5px 4px rgba(0, 0, 0, .03), -.5px -.5px 4px rgba(0, 0, 0, .03)'}}>
                            <div className='text-xl lg:text-3xl tracking-wider font-bold'>0</div>
                            <div className='text-sm lg:text-md font-normal tracking-wide text-[#666b60] uppercase'>Testimonial</div>
                        </div>
                      </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 w-full gap-5 mt-8'>
                      <div className='flex-1'>
                      {
                        mentorData?.reviews?.cards?.filter((item, index) => index%2===0).map(item => {
                          return renderReviewCard(item);
                        })
                      } 
                      </div>
                      <div className='flex-1'>
                      {
                        mentorData?.reviews?.cards?.filter((item, index) => index%2!==0).map(item => {
                          return renderReviewCard(item);
                        })
                      }
                      </div>
                    </div>
                    {/* <button className='py-3 px-5 rounded-[6px] h-12 inline-flex bg-[#fdfbf9] border border-[#ebeaeb] mx-auto mt-10' style={{boxShadow: '-.5px -.5px 4px rgba(0, 0, 0, .03), .5px .5px 4px rgba(0, 0, 0, .03)'}}>
                      <span>Show all reviews</span>
                    </button> */}
                  </div>
                  <div className='my-10 flex flex-wrap w-full'>
                    <div className='text-2xl font-bold'>
                      <div className='flex flex-col items-start justify-start'>
                        <h2 className='mb-2'>About me</h2>
                        <div className='flex gap-4 items-center flex-wrap mt-4'>
                          <div onClick={() => {
                                if(mentorData?.socialLinks?.linkedin) window.open(mentorData?.socialLinks?.linkedin, '_blank');
                                else 
                                toast('🚧  Whoops! This URL isn’t available right now.', {
                                      position: "bottom-center",
                                      autoClose: 5000,
                                      hideProgressBar: false,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                      theme: "light",
                                    });
                              }} className='box-border w-20 h-20 cursor-pointer'>
                            <div className='block rounded-[16px] p-5 box-border w-20 h-20 bg-[hsla(0,0%,100%,.95)] rounded-md' style={{boxShadow: '.5px .5px 4px rgba(0,0,0,.03),-.5px -.5px 4px rgba(0,0,0,.03)'}}>
                              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16"  height="40px" width="40px" xmlns="http://www.w3.org/2000/svg"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"></path></svg>
                            </div>
                          </div>
                          <div onClick={() => {
                                if(mentorData?.socialLinks?.twitter) window.open(mentorData?.socialLinks?.twitter, '_blank');
                                else 
                                toast('🚧  Whoops! This URL isn’t available right now.', {
                                      position: "bottom-center",
                                      autoClose: 5000,
                                      hideProgressBar: false,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                      theme: "light",
                                    });
                              }} className='box-border w-20 h-20 cursor-pointer'>
                            <div className='block rounded-[16px] p-5 box-border w-20 h-20 bg-[hsla(0,0%,100%,.95)] rounded-md' style={{boxShadow: '.5px .5px 4px rgba(0,0,0,.03),-.5px -.5px 4px rgba(0,0,0,.03)'}}>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16"  height="40px" width="40px" xmlns="http://www.w3.org/2000/svg"><path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518 3.3 3.3 0 0 0 1.447-1.817 6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218 3.2 3.2 0 0 1-.865.115 3 3 0 0 1-.614-.057 3.28 3.28 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.58a6 6 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15"></path></svg>  
                            </div>
                          </div>
                          <div onClick={() => {
                                if(mentorData?.socialLinks?.youtube) window.open(mentorData?.socialLinks?.youtube, '_blank');
                                else 
                                toast('🚧  Whoops! This URL isn’t available right now.', {
                                      position: "bottom-center",
                                      autoClose: 5000,
                                      hideProgressBar: false,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                      theme: "light",
                                    });
                              }}  className='box-border w-20 h-20 cursor-pointer'>
                            <div className='block rounded-[16px] p-5 box-border w-20 h-20 bg-[hsla(0,0%,100%,.95)] rounded-md' style={{boxShadow: '.5px .5px 4px rgba(0,0,0,.03),-.5px -.5px 4px rgba(0,0,0,.03)'}}>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="40px" width="40px" xmlns="http://www.w3.org/2000/svg"><path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z"></path></svg>
                            </div>
                          </div>
                          <div onClick={() => {
                                if(mentorData?.socialLinks?.instagram) window.open(mentorData?.socialLinks?.instagram, '_blank');
                                else 
                                toast('🚧 Whoops! This URL isn’t available right now.', {
                                      position: "bottom-center",
                                      autoClose: 5000,
                                      hideProgressBar: false,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                      theme: "light",
                                    });
                              }}  className='box-border w-20 h-20 cursor-pointer'>
                            <div className='block rounded-[16px] p-5 box-border w-20 h-20 bg-[hsla(0,0%,100%,.95)] rounded-md' style={{boxShadow: '.5px .5px 4px rgba(0,0,0,.03),-.5px -.5px 4px rgba(0,0,0,.03)'}}>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16"  height="40px" width="40px" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"></path></svg>
                          </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex row-wrap mt-8 text-lg'>
                      {mentorData?.longDescription}
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>          
        </div>
        {
          sidebarOpen && <div style={{backgroundImage: `url("/images/noise-bg.png")`}}
                              className='bg-contain bg-center bg-repeat-y fixed inset-0 w-full z-50 transition-all duration-300 ease-in-out delay-1000'>
            <div className='relative'>
              <div className='absolute inset-y-0 right-0 max-w-[465px] w-full min-h-screen bg-jet overflow-auto'>
                <div className='flex-1 flex-col'>
                  <div className='border-b border-b-bone border-opacity-20'>
                    <div className='flex justify-end px-8 py-6 text-bone hover:text-pumpkin cursor-pointer' onClick={toggleSidebar}>
                      <RiCloseLine size={48} className=''/>
                    </div>
                  </div>
                  <div className='flex flex-col flex-1 self-stretch'>
                    <div className='flex-1 px-10 pt-14 pb-10 '>
                      <div className='flex flex-col gap-6'>
                        {
                          SIDEBAR_DATA?.map((item, index) => {
                            return (
                              <Link key={index} href={item?.uri} className='group flex justify-start items-center gap-3 py-3 px-4 border border-transparent hover:border-pumpkin rounded-md'
                                    onClick={toggleSidebar}>
                                {item?.image_data?.uri}
                                <div className='text-4xl text-bone font-semibold group-hover:text-pumpkin'>{item?.title}</div>
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
                              <button key={index} onClick = {() => {
                                  window.open('www.yourdomain.com', '_blank')
                                }}>
                                {item?.image_data?.uri}
                              </button>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
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
