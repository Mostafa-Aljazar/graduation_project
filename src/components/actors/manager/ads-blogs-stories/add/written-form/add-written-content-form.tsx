'use client';

import {
  Stack,
  Group,
  Button,
  LoadingOverlay,
  Text,
  Radio,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useEffect, useState } from 'react';
import { FileWithPath } from '@mantine/dropzone';
import { useMutation, useQuery } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { parseAsInteger, parseAsStringEnum, useQueryStates } from 'nuqs';
import { cn } from '@/utils/cn';
import {
  AddWrittenContentFormSchema,
  AddWrittenContentFormType,
} from '@/validation/actor/manager/ads-blogs-stories/add-written-content-form-schema';
import { getAdBlogStory } from '@/actions/actors/manager/blog-stories-ads/getAdBlogStory';
import {
  updateAdBlogStory,
  updateAdBlogStoryProps,
} from '@/actions/actors/manager/blog-stories-ads/updateAdBlogStory';
import {
  addAdBlogStory,
  addAdBlogStoryProps,
} from '@/actions/actors/manager/blog-stories-ads/addAdBlogStory';

import { modalActionResponse } from '@/@types/common/modal/commonActionResponse.type';
import useAuth from '@/hooks/useAuth';
import { MANAGER_ROUTES_fUNC } from '@/constants/routes';
import { handleUploadMedia } from '@/utils/uploadthing/handleUploadMedia';
import { useUploadThing } from '@/utils/uploadthing/uploadthing';
import {
  ACTION_ADD_EDIT_DISPLAY,
  TYPE_WRITTEN_CONTENT,
} from '@/@types/actors/common-types/index.type';
import { NotebookPen } from 'lucide-react';
import { AdBlogStoryResponse } from '@/@types/actors/manager/ads-blogs-stories/adsBlogsStoriesResponse.type';
import Rich_TextEditor_Wrapper from './rich-textEditor-wrapper';
import Image_Dropzone from './image-dropzone';

export default function Add_Written_Content_Form() {
  const [query, setQuery] = useQueryStates(
    {
      action: parseAsStringEnum<ACTION_ADD_EDIT_DISPLAY>(
        Object.values(ACTION_ADD_EDIT_DISPLAY)
      ).withDefault(ACTION_ADD_EDIT_DISPLAY.ADD),
      'written-tab': parseAsStringEnum<TYPE_WRITTEN_CONTENT>(
        Object.values(TYPE_WRITTEN_CONTENT)
      ).withDefault(TYPE_WRITTEN_CONTENT.ADS),
      id: parseAsInteger.withDefault(0),
    },
    { shallow: true }
  );

  const router = useRouter();
  const { user } = useAuth();

  const { data: existingData, isLoading: isFetching } = useQuery<AdBlogStoryResponse, Error>({
    queryKey: ['edit-data', query],
    queryFn: async () => {
      return await getAdBlogStory({ id: query.id, type: query['written-tab'] });
    },
    enabled: query.action === ACTION_ADD_EDIT_DISPLAY.EDIT && !!Number(query.id),
  });

  const [selectedFiles, setSelectedFiles] = useState<FileWithPath[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const { startUpload } = useUploadThing('mediaUploader');

  const form = useForm<AddWrittenContentFormType>({
    initialValues: {
      type: query['written-tab'],
      title: '',
      brief: '',
      content: '',
      files: [],
      image_urls: [],
    },
    validate: zodResolver(AddWrittenContentFormSchema),
  });

  // Fill form from existing data once
  useEffect(() => {
    if (existingData && existingData.ad_blog_story && !form.values.title) {
      const data = existingData.ad_blog_story;
      form.setValues({
        type: query['written-tab'],
        title: data.title || '',
        brief: data.brief || '',
        content: data.content || '',
        files: [],
        image_urls:
          data.imgs?.map((img: string | { src: string }) =>
            typeof img === 'string' ? img : img?.src
          ) || [],
      });
    }
  }, [existingData]);

  const updateMutation = useMutation<modalActionResponse, Error, updateAdBlogStoryProps>({
    mutationFn: updateAdBlogStory,
    onSuccess: (data) => {
      if (data.status === 200) {
        notifications.show({
          title: 'نجاح',
          message: data.message || 'تم تحديث المحتوى بنجاح',
          color: 'green',
          position: 'top-right',
        });
        form.reset();
        setSelectedFiles([]);
        router.push(
          `${
            MANAGER_ROUTES_fUNC({ manager_Id: user?.id as number }).ADS_BLOGS_STORIES
          }?written-tab=${query['written-tab']}`
        );
      } else {
        notifications.show({
          title: 'خطأ',
          message: data.error || 'فشل إرسال المحتوى',
          color: 'red',
          position: 'top-right',
        });
      }
    },
    onError: (error) => {
      notifications.show({
        title: 'خطأ',
        message: error.message || 'فشل إرسال المحتوى',
        color: 'red',
        position: 'top-right',
      });
    },
  });

  const addMutation = useMutation<modalActionResponse, Error, addAdBlogStoryProps>({
    mutationFn: addAdBlogStory,
    onSuccess: (data) => {
      if (data.status === 200) {
        notifications.show({
          title: 'نجاح',
          message: data.message || 'تم إرسال المحتوى بنجاح',
          color: 'green',
          position: 'top-right',
        });
        form.reset();
        setSelectedFiles([]);
        router.push(
          `${
            MANAGER_ROUTES_fUNC({ manager_Id: user?.id as number }).ADS_BLOGS_STORIES
          }?written-tab=${query['written-tab']}`
        );
      } else {
        notifications.show({
          title: 'خطأ',
          message: data.error || 'فشل إرسال المحتوى',
          color: 'red',
          position: 'top-right',
        });
      }
    },
    onError: (error) => {
      notifications.show({
        title: 'خطأ',
        message: error.message || 'فشل إرسال المحتوى',
        color: 'red',
        position: 'top-right',
      });
    },
  });

  const handleImageUpload = async (files: FileWithPath[]): Promise<string[] | null> => {
    try {
      const uploads = files.map((file) => handleUploadMedia(file, startUpload));
      const urls = await Promise.all(uploads);
      const validUrls = urls.filter((u): u is string => u !== null);
      if (validUrls.length === 0) throw new Error('فشل تحميل الصور.');
      return validUrls;
    } catch {
      notifications.show({
        title: 'فشل التحميل',
        message: 'فشل تحميل الصور. حاول مرة أخرى.',
        color: 'red',
        position: 'top-right',
      });
      return null;
    }
  };

  const handleSubmit = form.onSubmit(async (values) => {
    if (query.action === ACTION_ADD_EDIT_DISPLAY.ADD && selectedFiles.length === 0) {
      notifications.show({
        title: 'خطأ',
        message: 'يجب عليك رفع صورة واحدة على الأقل في وضع الإضافة.',
        color: 'red',
        position: 'top-right',
      });
      return;
    }

    if (
      query.action === ACTION_ADD_EDIT_DISPLAY.EDIT &&
      selectedFiles.length === 0 &&
      (!form.values.image_urls || form.values.image_urls.length === 0)
    ) {
      notifications.show({
        title: 'خطأ',
        message: 'يجب أن يحتوي المحتوى على صورة واحدة على الأقل.',
        color: 'red',
        position: 'top-right',
      });
      return;
    }

    let image_urls = form.values.image_urls ?? [];

    if (selectedFiles.length > 0) {
      setLoadingImages(true);
      const uploadedUrls = await handleImageUpload(selectedFiles);
      setLoadingImages(false);
      if (!uploadedUrls) return;
      image_urls = [...image_urls, ...uploadedUrls];
      form.setFieldValue('image_urls', image_urls);
      values.image_urls = image_urls;
    }

    if (query.action === ACTION_ADD_EDIT_DISPLAY.EDIT && query.id) {
      updateMutation.mutate({
        id: query.id,
        title: values.title,
        content: values.content,
        brief: values.brief,
        image_urls: values.image_urls,
      });
    } else {
      addMutation.mutate(values);
    }
  });

  const isLoading =
    addMutation.isPending || updateMutation.isPending || loadingImages || isFetching;

  return (
    <form onSubmit={handleSubmit} className='relative'>
      <LoadingOverlay visible={isLoading} zIndex={49} overlayProps={{ radius: 'sm', blur: 0.3 }} />

      <Stack gap={24} p={20}>
        <Group justify='space-between' align='center'>
          <Group gap={8}>
            <NotebookPen size={24} className='text-primary' />
            <Text fz={24} fw={600} className='!text-primary'>
              {query.action === ACTION_ADD_EDIT_DISPLAY.EDIT ? 'تعديل' : 'إضافة'}
            </Text>
          </Group>
        </Group>

        <Stack gap={20} align='flex-start'>
          <Text fz={18} fw={500} className='!text-primary'>
            النوع :
          </Text>
          <Radio.Group
            name='type'
            withAsterisk
            w={'100%'}
            defaultValue={query['written-tab']}
            onChange={(value: string) => {
              const typedValue = value as TYPE_WRITTEN_CONTENT;
              form.setFieldValue('type', typedValue);
              setQuery({ 'written-tab': typedValue });
            }}
            error={form.errors.type} // Display Zod validation error
          >
            <Group
              w={{ base: '100%', md: '60%' }}
              gap={30}
              wrap='nowrap'
              align='center'
              justify='space-between'
            >
              <Radio
                value={TYPE_WRITTEN_CONTENT.BLOG}
                label={
                  <Text fw={500} fz={18}>
                    مقال
                  </Text>
                }
                size='sm'
                disabled={query.action === ACTION_ADD_EDIT_DISPLAY.EDIT}
              />
              <Radio
                value={TYPE_WRITTEN_CONTENT.ADS}
                label={
                  <Text fw={500} fz={18}>
                    إعلان
                  </Text>
                }
                size='sm'
                disabled={query.action === ACTION_ADD_EDIT_DISPLAY.EDIT}
              />
              <Radio
                value={TYPE_WRITTEN_CONTENT.SUCCESS_STORIES}
                label={
                  <Text fw={500} fz={18}>
                    قصة نجاح
                  </Text>
                }
                size='sm'
                disabled={query.action === ACTION_ADD_EDIT_DISPLAY.EDIT}
              />
            </Group>
          </Radio.Group>
        </Stack>

        <Image_Dropzone
          selectedFiles={selectedFiles}
          imageUrls={form.values.image_urls ?? []}
          onFilesChange={(files) => {
            setSelectedFiles(files);
            form.setFieldValue('files', files);
          }}
          onRemoveUrl={(index) => {
            const newUrls = (form.values.image_urls || []).filter((_, i) => i !== index);
            form.setFieldValue('image_urls', newUrls);
          }}
          onRemoveFile={(index) => {
            const newFiles = selectedFiles.filter((_, i) => i !== index);
            setSelectedFiles(newFiles);
            form.setFieldValue('files', newFiles);
          }}
          action={query.action === ACTION_ADD_EDIT_DISPLAY.EDIT ? 'edit' : 'add'}
        />

        <>
          <Stack gap={8}>
            <Text fz={18} fw={500} className='!text-primary'>
              العنوان :
            </Text>
            <TextInput
              placeholder='أدخل العنوان...'
              size='md'
              {...form.getInputProps('title')}
              error={form.errors.title} // Display Zod validation error
              // styles={{
              //   input: {
              //     textAlign: 'right',
              //     direction: 'rtl',
              //   },
              // }}
              classNames={{
                input: 'placeholder:!text-sm !text-primary !font-normal',
              }}
            />
          </Stack>
          <Stack gap={8}>
            <Text fz={18} fw={500} className='!text-primary'>
              نبذة :
            </Text>
            <Textarea
              placeholder='أدخل نبذة...'
              size='md'
              {...form.getInputProps('brief')}
              error={form.errors.brief} // Display Zod validation error
              // styles={{
              //   input: {
              //     textAlign: 'right',
              //     direction: 'rtl',
              //   },
              // }}
              classNames={{
                input: 'placeholder:!text-sm !text-primary !font-normal',
              }}
            />
          </Stack>
        </>

        <Rich_TextEditor_Wrapper
          initContent={existingData?.ad_blog_story.content as string}
          content={form.values.content}
          onChange={(v) => form.setFieldValue('content', v)}
          error={form.errors.content as string}
        />

        <Group justify='center' mt={20}>
          <Button
            type='submit'
            size='md'
            px={40}
            className={cn(
              '!shadow-lg !text-white',
              !form.isValid() ? '!bg-primary/70' : '!bg-primary'
            )}
            disabled={
              (query.action === ACTION_ADD_EDIT_DISPLAY.EDIT
                ? updateMutation.isPending
                : addMutation.isPending) || !form.isValid()
            }
            loading={isLoading}
          >
            {query.action === ACTION_ADD_EDIT_DISPLAY.EDIT ? 'تحديث' : 'إضافة'}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
