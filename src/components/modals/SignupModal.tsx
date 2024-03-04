'use client'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-hot-toast'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useLoginModal } from '@/hooks/useLoginModal'
import { useSignupModal } from '@/hooks/useSignupModal'
import { Modal } from '@/components/modals/Modal'
import { Input } from '@/components/input/Input'
import { Button } from '@/components/button/Button'
import axios from 'axios'
import * as z from 'zod'



const schema = z.object({
  name: z.string().min(2, { message: 'At least 2 characters must be entered'}),
  email: z.string() .email({ message: 'Not in the form of an email.' }),
  password: z.string() .min(6, { message: 'At least 2 characters must be entered'})
})


export const SignupModal = () => {
  const router = useRouter()
  const signupModal = useSignupModal()
  const loginModal = useLoginModal()
  const [loading, setLoading] = useState(false)


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: '', email: '', password: ''},
    resolver: zodResolver(schema),
  })

  const onToggle = useCallback(() => {
    console.log(signupModal.isOpen)
    signupModal.onClose()
    loginModal.onOpen()
  }, [signupModal, loginModal])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true)
    try {
      // signup
      const res = await axios.post('/api/signup', data)

      if (res.status === 200) {
        toast.success('created your account')

        // login
        await signIn('credentials', {
          ...data,
          redirect: false,
        })

        signupModal.onClose()
        router.refresh()
      }

    } catch (error) {
      toast.error("An error has occurred." + error)
    } finally {
      setLoading(false)
    }
  }

  // content of modal
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        id="name"
        label="name"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />

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
          login
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={loading}
      isOpen={signupModal.isOpen}
      title="signup"
      primaryLabel="signup"
      onClose={signupModal.onClose}
      onSubmit={handleSubmit(onSubmit)} // 原因はここかな
      body={bodyContent}
      footer={footerContent}
    />
  )
}