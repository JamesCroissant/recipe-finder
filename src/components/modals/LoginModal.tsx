'use client'

import { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { useSignupModal } from '@/hooks/useSignupModal'
import { useLoginModal } from '@/hooks/useLoginModal'
import { Modal } from '@/components/modals/Modal'
import { Input } from '@/components/input/Input'
import { Button } from '@/components/button/Button'
import * as z from 'zod'


const schema = z.object({
  email: z.string().email({ message: 'Not in the form of an email.' }),
  password: z.string().min(6, { message: 'At least 6 characters must be entered. ' }),
})


export const LoginModal = () => {
  const router = useRouter()
  const loginModal = useLoginModal()
  const signupModal = useSignupModal()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: '', password: ''},
    resolver: zodResolver(schema),
  })

  const onToggle = useCallback(() => {
    loginModal.onClose()
    signupModal.onOpen()
  }, [loginModal, signupModal])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true)

    try {
      // login
      const res = await signIn('credentials', {
        ...data,
        redirect: false,
      })

      if (res?.error) {
        toast.error('An error has occurred.' + res.error)
      }

      loginModal.onClose()
      toast.success("You are logged in")
      router.refresh()

    } catch (error) {
      toast.error("An error has occurred." + error)
    } finally {
      setLoading(false)
    }
  }

  // content of body
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        id="email"
        label="email"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="password"
        label="password"
        type="password"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  // content of footer
  const footerContent = (
    <div className= "mt-3 flex flex-col gap-4">
      <hr />
      {/* google login */}
      <Button outline label="Google login" icon={FcGoogle} onClick={() => signIn('google')} />

      {/* login link */}
      <div className="mt-4 text-center">
        <div onClick={onToggle} className="cursor-pointer text-sm text-neutral-500 hover:underline">
          Create an account
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={loading}
      isOpen={loginModal.isOpen}
      title="login"
      primaryLabel="login"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )

}