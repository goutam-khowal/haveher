"use client"

import React, { useState } from "react"

const GiftingOption = () => {
  const [isGift, setIsGift] = useState(false)
  const [giftMessage, setGiftMessage] = useState("")

  return (
    <div className="w-full bg-[#FDF1F6]/50 border border-[#F0C4D8]/30 rounded-2xl p-5 shadow-3xs mt-6 text-left">
      <label className="flex items-start gap-x-3.5 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={isGift}
          onChange={(e) => setIsGift(e.target.checked)}
          className="w-4 h-4 rounded border-gray-300 text-[#D45C88] focus:ring-[#D45C88] mt-0.5 accent-[#D45C88] cursor-pointer"
        />
        <div className="flex flex-col min-w-0 cursor-pointer">
          <span className="font-serif italic text-base font-medium text-[#3A1A2A] tracking-wide flex items-center gap-x-2">
            Sending love to someone special?{" "}
            <span className="text-xs font-sans not-italic font-bold text-[#D45C88] bg-white border border-[#F0C4D8]/40 px-2 py-1.5 rounded-full ">₹20
            </span>
          </span>
          <p className="text-xs text-gray-400 mt-0.5">
            Your gift will be beautifully packed and accompanied by a
            personalized note. Simply share your message with us below.
          </p>
        </div>
      </label>

      {/* EXPANDABLE MESSAGE AREA */}
      {isGift && (
        <div className="mt-4 pt-4 border-t border-dashed border-[#F0C4D8]/40 flex flex-col gap-y-2 animate-fadeIn">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Personalized Note Message *
          </label>
          <textarea
            value={giftMessage}
            onChange={(e) => setGiftMessage(e.target.value)}
            placeholder="Type your warm message here..."
            rows={3}
            maxLength={250}
            className="w-full p-3 bg-white border border-pink-100 rounded-xl text-sm focus:outline-none focus:border-[#D45C88] transition-all resize-none text-[#3A1A2A]"
          />
          <div className="flex justify-between items-center text-[10px] text-gray-400">
            <span>Pack charges will be automatically applied at summary</span>
            <span>{giftMessage.length}/250 chars</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default GiftingOption
