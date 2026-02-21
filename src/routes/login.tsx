import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema, type LoginFormValues } from '../lib/validation'
import { useLoginMutation } from '../hooks/useAuthMutations'
import { Link } from '@tanstack/react-router'

import Button from '../Components/Button'
import Input from '../Components/Input'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema)
  })

  const { mutate, isPending } = useLoginMutation()

  const onSubmit = (data: LoginFormValues) => {
    mutate(data, {
      onError: (error) => {
        setError('root', {
          type: 'manual',
          message: error.message || 'Failed to log in.'
        })
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col max-w-sm m-auto gap-3 p-6 rounded-2xl bg-theme-background shadow-xl shadow-black/5 w-100'>
      <h3 className='text-2xl font-bold text-theme-text-primary m-auto mb-3'>Log In</h3>
      <Input
        label='Email'
        type='email'
        placeholder='example@gmail.com'
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        label='Password'
        type='password'
        placeholder='At least 6 characters'
        error={errors.password?.message}
        {...register('password')}
      />
      <Button 
        type='submit' 
        color='accent' 
        className='text-white'
        loading={isPending}
      >
        Log In
      </Button>
      <Link to='/register' className='text-sm m-auto hover:underline text-theme-text-primary opacity-50'>Don't have an account yet? Register</Link>
      
      {errors.root && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded text-sm text-center">
          {errors.root.message}
        </div>
      )}
    </form>
  )
}
