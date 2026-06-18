"use client"

import { Text, clx } from "@modules/common/components/ui"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import React from "react"

type AccordionItemProps = AccordionPrimitive.AccordionItemProps & {
  title: string
  subtitle?: string
  description?: string
  required?: boolean
  tooltip?: string
  forceMountContent?: true
  headingSize?: "small" | "medium" | "large"
  customTrigger?: React.ReactNode
  complete?: boolean
  active?: boolean
  triggerable?: boolean
  children: React.ReactNode
}

type AccordionProps =
  | (AccordionPrimitive.AccordionSingleProps &
      React.RefAttributes<HTMLDivElement>)
  | (AccordionPrimitive.AccordionMultipleProps &
      React.RefAttributes<HTMLDivElement>)

const Accordion: React.FC<AccordionProps> & {
  Item: React.FC<AccordionItemProps>
} = ({ children, ...props }) => {
  return (
    <AccordionPrimitive.Root {...props}>{children}</AccordionPrimitive.Root>
  )
}

const Item: React.FC<AccordionItemProps> = ({
  title,
  subtitle,
  description,
  children,
  className,
  headingSize: _headingSize = "large",
  customTrigger = undefined,
  forceMountContent = undefined,
  triggerable: _triggerable,
  ...props
}) => {
  return (
    <AccordionPrimitive.Item
      {...props}
      className={clx(
        "border-pink-100/40 border-t last:mb-0 last:border-b",
        "py-1.5",
        className
      )}
    >
      <AccordionPrimitive.Header className="w-full">
        {/* 👑 CRITICAL TRIGGER WRAPOVERRE: Employs the full width line as hot-zone */}
        <AccordionPrimitive.Trigger className="w-full flex flex-col pt-3 pb-3 text-left group outline-none focus:outline-none cursor-pointer">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Premium HaveHer Style Typography Sync */}
              <span className="text-xs md:text-sm font-semibold tracking-widest uppercase text-[#3A1A2A] group-hover:text-[#D45C88] transition-colors duration-200 font-sans">
                {title}
              </span>
            </div>

            {/* Action Icon representation */}
            <div className="shrink-0 text-[#D45C88]">
              {customTrigger || <MorphingTrigger />}
            </div>
          </div>

          {subtitle && (
            <Text
              as="span"
              className="mt-1 text-xs text-gray-400 font-sans font-normal"
            >
              {subtitle}
            </Text>
          )}
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>

      <AccordionPrimitive.Content
        forceMount={forceMountContent}
        className={clx(
          "radix-state-closed:animate-accordion-close radix-state-open:animate-accordion-open radix-state-closed:pointer-events-none"
        )}
      >
        <div className="w-full pb-4 px-0.5">
          {description && (
            <Text className="mb-2 text-gray-500">{description}</Text>
          )}
          <div className="w-full">{children}</div>
        </div>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  )
}

Accordion.Item = Item

/* =========================================================================
   🌸 PREMIUM MORPHING INTERACTIVE INDICATOR (+ / - Cross)
   ========================================================================= */
const MorphingTrigger = () => {
  return (
    <div className="bg-transparent rounded-full group-hover:bg-[#FDF1F6] p-1.5 duration-200">
      <div className="h-4 w-4 relative flex items-center justify-center">
        {/* Vertical Vector Bone */}
        <span className="bg-[#D45C88] rounded-full absolute h-3 w-[1.5px] duration-300 transform group-radix-state-open:rotate-90 group-radix-state-open:opacity-0" />
        {/* Horizontal Vector Bone */}
        <span className="bg-[#D45C88] rounded-full absolute w-3 h-[1.5px] duration-300 transform group-radix-state-open:rotate-180" />
      </div>
    </div>
  )
}

export default Accordion
