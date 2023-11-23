import React from 'react';

export default function Announcement() {
  const text = (
    <>
        <p>Free 🌎 Shipping + Extra Savings At Checkout - Use Code '<strong>WELCOME10</strong>' 📣</p>
    </>
  )
  const list = []
  for (let index = 0; index < 5; index++) {
    list.push(<p key={index} className='inline-flex px-[100px] text-[#fff]'>${text}</p>)
  }
  return (
    <div className='section--announcement bg-dark-orange'>
        <div className='container flex items-center'>
            <marquee width="100%" behavior="scroll" scrollamount="10" loop className="h-[100%] py-[5px]">              
                {list}  
            </marquee>
        </div>
    </div>
  )
}

