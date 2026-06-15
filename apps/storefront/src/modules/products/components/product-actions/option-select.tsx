// import { HttpTypes } from "@medusajs/types"
// import { clx } from "@modules/common/components/ui"
// import React from "react"

// type OptionSelectProps = {
//   option: HttpTypes.StoreProductOption
//   current: string | undefined
//   updateOption: (title: string, value: string) => void
//   title: string
//   disabled: boolean
//   "data-testid"?: string
// }

// const OptionSelect: React.FC<OptionSelectProps> = ({
//   option,
//   current,
//   updateOption,
//   title,
//   "data-testid": dataTestId,
//   disabled,
// }) => {
//   const filteredOptions = (option.values ?? []).map((v) => v.value)

//   return (
//     <div className="flex flex-col gap-y-3">
//       <span className="text-sm">Select {title}</span>
//       <div
//         className="flex flex-wrap justify-between gap-2"
//         data-testid={dataTestId}
//       >
//         {filteredOptions.map((v) => {
//           return (
//             <button
//               onClick={() => updateOption(option.id, v)}
//               key={v}
//               className={clx(
//                 "border-ui-border-base bg-ui-bg-subtle border text-small-regular h-10 rounded-rounded p-2 flex-1 ",
//                 {
//                   "border-ui-border-interactive": v === current,
//                   "hover:shadow-elevation-card-rest transition-shadow ease-in-out duration-150":
//                     v !== current,
//                 }
//               )}
//               disabled={disabled}
//               data-testid="option-button"
//             >
//               {v}
//             </button>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// export default OptionSelect
import { HttpTypes } from "@medusajs/types"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  // 1. Changed to expect optionId instead of title
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
    <div className="flex flex-col gap-y-3">
      <span className="font-sans text-sm font-medium text-berry-dark">
        Select {title}
      </span>
      <div className="flex flex-wrap gap-3" data-testid={dataTestId}>
        {filteredOptions.map((v) => {
          const isSelected = v === current
          return (
            <button
              // 2. CRITICAL FIX: Pass option.id here!
              onClick={() => updateOption(option.id, v)}
              key={v}
              className={`
                min-w-[3rem] px-4 py-2 font-sans text-sm font-medium rounded-full border transition-all duration-200
                ${
                  isSelected
                    ? "bg-berry-primary border-berry-primary text-white shadow-md shadow-berry-primary/30"
                    : "bg-white border-berry-light text-berry-dark hover:border-berry-primary hover:bg-berry-bg"
                }
              `}
              disabled={disabled}
              data-testid="option-button"
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
