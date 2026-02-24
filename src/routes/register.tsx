import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterSchema, type RegisterFormValues } from '../lib/validation'
import { useRegisterMutation } from '../hooks/useAuthMutations'
import { Link } from '@tanstack/react-router'

import Button from '../Components/Buttons/Button'
import Input from '../Components/Input'

export const Route = createFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema)
  })

  const { mutate, isPending } = useRegisterMutation()

  const onSubmit = (data: RegisterFormValues) => {
      mutate(data, {
        onError: (error) => {
          setError('root', {
            type: 'manual',
            message: error.message || 'Registration failed.'
          })
        }
      })
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col max-w-sm m-auto gap-3 p-6 rounded-2xl bg-theme-background shadow-xl/5 w-100'>
      <h3 className='text-2xl font-bold text-theme-text-primary m-auto mb-3'>Register</h3>
      <Input
        label='Name'
        type='text'
        placeholder='Example'
        error={errors.name?.message}
        {...register('name')}
      />
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
      <Input
        label='Confirm password'
        type='password'
        placeholder='Confirm password'
        error={errors.passwordConfirm?.message}
        {...register('passwordConfirm')}
      />
      <Button 
        type='submit' 
        color='accent' 
        className='text-white'
        loading={isPending}
      >
        Register
      </Button>
      <Link to='/login' className='text-sm m-auto hover:underline text-theme-text-primary opacity-50'>Already have account? Log In</Link>
      {errors.root && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded text-sm text-center">
          {errors.root.message}
        </div>
      )}
    </form>
  )
}
