import { HttpTypes } from "@medusajs/types"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (optionId: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions =
    option.values
      ?.map((v) => v.value)
      .filter((v): v is string => v !== undefined) || []

  return (
    <div className="flex flex-col gap-y-2.5 w-full font-sans text-left">
      {/* 🌸 Label title matched with luxury inputs look */}
      <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
        Select {title} <span className="text-[#D45C88]">*</span>
      </span>

      {/* 🌸 PILL CONTROLS GRID FRAMEWORK */}
      <div className="flex flex-wrap gap-2.5" data-testid={dataTestId}>
        {filteredOptions.map((v) => {
          const isSelected = v === current
          return (
            <button
              onClick={() => updateOption(option.id, v)}
              key={v}
              disabled={disabled}
              data-testid="option-button"
              type="button"
              className={`
                min-w-[54px] h-10 px-4 font-sans text-xs font-bold rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-center select-none disabled:opacity-40 disabled:cursor-not-allowed
                ${
                  isSelected
                    ? "bg-[#3A1A2A] border-[#3A1A2A] text-white shadow-3xs scale-[0.98]"
                    : "bg-white border-gray-200 text-[#3A1A2A] hover:border-[#D45C88] hover:bg-[#FDF1F6]/10"
                }
              `}
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
