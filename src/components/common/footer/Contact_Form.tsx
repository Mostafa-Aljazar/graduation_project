import { useForm } from '@mantine/form';
import { TextInput, Textarea, Button, Notification } from '@mantine/core';
import React from 'react';
import { IContactFormProps, IForm } from '@/@types/blog/blog.type';

const Contact_Form = ({ onSubmit, status, setStatus }: IContactFormProps) => {
  const form = useForm<IForm>({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      message: '',
    },
    validate: {
      name: (value) => (value.length < 2 ? 'الاسم قصير جدًا' : null),
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : 'بريد إلكتروني غير صالح',
      phone: (value) =>
        /^[0-9]{9,}$/.test(value) ? null : 'رقم الجوال غير صحيح',
      message: (value) => (value.length < 10 ? 'الرسالة قصيرة جدًا' : null),
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      await onSubmit(form.values);
      setStatus('Message sent successfully!');
      form.reset();
    } catch (error) {
      setStatus('Failed to send message.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex sm:flex-row flex-col gap-6 mb-4'>
        <TextInput
          label='الاسم'
          {...form.getInputProps('name')}
          required
          radius='md'
          size='md'
          styles={{ input: { backgroundColor: 'white' } }}
          className='w-full'
        />
        <TextInput
          label='رقم الجوال'
          {...form.getInputProps('phone')}
          required
          radius='md'
          size='md'
          styles={{ input: { backgroundColor: 'white' } }}
          className='w-full'
        />
      </div>
      <div className='flex sm:flex-row flex-col gap-4 mb-4'>
        <TextInput
          label='البريد الإلكتروني'
          {...form.getInputProps('email')}
          required
          radius='md'
          size='md'
          styles={{ input: { backgroundColor: 'white' } }}
          className='w-full'
        />
        <TextInput
          label='العنوان'
          {...form.getInputProps('address')}
          required
          radius='md'
          size='md'
          styles={{ input: { backgroundColor: 'white' } }}
          className='w-full'
        />
      </div>
      <Textarea
        label='الرسالة'
        {...form.getInputProps('message')}
        minRows={4}
        required
        radius='md'
        size='md'
        styles={{ input: { backgroundColor: 'white' } }}
        className='mb-4'
      />
      <Button
        loading={status === 'Sending...'}
        disabled={!form.isValid() || status === 'Sending...'}
        fullWidth
        radius='md'
        size='lg'
        color='#345E40'
        variant='filled'
        type='submit'
        className='hover:brightness-90 transition duration-300'
      >
        إرسال
      </Button>
      {status && (
        <Notification
          color={status === 'Message sent successfully!' ? 'teal' : 'red'}
          title={status === 'Message sent successfully!' ? 'نجاح' : 'خطأ'}
          mt='md'
          withCloseButton
          onClose={() => setStatus('')}
        >
          {status}
        </Notification>
      )}
    </form>
  );
};

export default Contact_Form;
