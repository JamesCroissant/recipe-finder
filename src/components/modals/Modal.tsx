'use client'

import { useCallback } from "react"
import { IoMdClose } from "react-icons/io"

import { Button } from "@/components/button/Button"

type ModalProps = {
  isOpen?: Boolean
  onClose: () => void
  onSubmit: () => void
  title?: string
  body?: React.ReactElement
  footer?: React.ReactElement
  primaryLabel: string
  secondaryAction?: () => void
  secondaryLabel?: string
  disabled?: boolean
  del?: boolean
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  primaryLabel,
  secondaryAction,
  secondaryLabel,
  disabled,
  del = false,
}) => {
  const handleClose = useCallback(() => {
    if (disabled) {
      return
    }
    onClose()
  }, [onClose, disabled])

  // action of main button
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return
    }
    onSubmit()
  }, [onSubmit, disabled])

  // action of sub button
  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return
    }
    secondaryAction()
  }, [secondaryAction, disabled])

  // not displayed in case of not opening
  if (!isOpen) {
    return null
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-neutral-800/50">
        <div className="relative mx-auto h-full w-full md:h-auto md:max-w-screen-sm">
          <div className="translate h-full duration-75">
            <div className="h-full bg-white shadow-lg md:rounded-lg">
              
              {/* header */}
              <div className="relative flex items-center justify-center border-b p-4">
                
                {/* close */}
                <div 
                  className="absolute right-5 cursor-pointer rounded-full p-2 transition hover:bg-neutral-100"
                  onClick={handleClose}
                >
                  <IoMdClose size={20} />
                </div>

                {/* title */}
                <div className="text-lg font-bold">
                  {title}
                </div>
              </div>

              {/* content */}
              <div className="relative flex-auto py-6 px-10">
                {body}
              </div>

              <div className="flex flex-col gap-2 px-10 pb-6">

                {/* button */}
                <div className="flex w-full flex-row items-center py-2">
                  {/* subbutton */}
                  {secondaryAction && secondaryLabel && (
                    <Button
                      disabled={disabled}
                      label={secondaryLabel}
                      onClick={handleSecondaryAction}
                      outline
                    />
                  )}
                  {/* mainbutton */}

                  <Button
                    disabled={disabled}
                    label={primaryLabel}
                    onClick={handleSubmit}
                    del={del}
                  />
                  
                </div>

                {/* footer */}
                {footer}

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
