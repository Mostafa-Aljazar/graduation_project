'use client';
import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  Paper,
  Radio,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useForm, zodResolver } from '@mantine/form';
import { useEditor } from '@tiptap/react';
import { RichTextEditor, Link } from '@mantine/tiptap';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import { ImageIcon, NotebookPen, Upload, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { handleUploadMedia } from '@/utils/uploadthing/handleUploadMedia';
import { useUploadThing } from '@/utils/uploadthing/uploadthing';
import { addArticle } from '@/actions/actors/manager/blog-stories-ads/blog/addArticle';
import { parseAsString, parseAsStringEnum, useQueryState } from 'nuqs';
import { addAd } from '@/actions/actors/manager/blog-stories-ads/ad/addAd';
import { addSuccessStory } from '@/actions/actors/manager/blog-stories-ads/success-stories/addSuccessStory';
import { cn } from '@/utils/cn';
import { getArticle } from '@/actions/landing/blog/getArticle';
import { getAd } from '@/actions/actors/manager/blog-stories-ads/ad/getAd';
import { getSuccessStory } from '@/actions/actors/manager/blog-stories-ads/success-stories/getSuccessStory';
import { Article_SuccessStory_Ad_Response } from '@/@types/common/article-successStories-adsResponse.type';
import { modalActionResponse } from '@/@types/common/modal/modalActionResponse.type';
import { updateArticle } from '@/actions/actors/manager/blog-stories-ads/blog/updateArticle';
import { updateAd } from '@/actions/actors/manager/blog-stories-ads/ad/updateAd';
import { updateSuccessStory } from '@/actions/actors/manager/blog-stories-ads/success-stories/updateSuccessStory';
import { TYPE_CONTENT } from '@/content/actor/manager/ads-blogs-stories';
import { useRouter } from 'next/navigation';
import { MANAGER_ROUTES_fUNC } from '@/constants/routes';
import useAuth from '@/hooks/useAuth';
import { z } from 'zod';
import { ACTION_ADD_EDIT_DISPLAY } from '@/constants';

// Define the Zod schema for FormData
const formSchema = z.object({
  type: z.enum(
    [TYPE_CONTENT.BLOG, TYPE_CONTENT.SUCCESS_STORIES, TYPE_CONTENT.ADS],
    {
      required_error: 'يجب اختيار نوع المحتوى',
    }
  ),
  title: z
    .string()
    .min(1, { message: 'العنوان مطلوب' })
    .max(100, { message: 'العنوان يجب ألا يتجاوز 100 حرف' }),
  brief: z
    .string()
    .max(500, { message: 'النبذة يجب ألا تتجاوز 500 حرف' })
    .optional(),
  content: z
    .string()
    .min(5, { message: 'النص مطلوب' })
    .max(10000, { message: 'النص يجب ألا يتجاوز 10000 حرف' }),
  files: z.array(z.any()).optional(), // FileWithPath type isn't strictly typed by Zod
  imageUrls: z.array(z.string()).optional(),
});

interface FormData {
  type: TYPE_CONTENT;
  title: string;
  brief?: string;
  content: string;
  files: FileWithPath[];
  imageUrls: string[];
}

export default function Page() {
  const [action, setAction] = useQueryState(
    'action',
    parseAsStringEnum<ACTION_ADD_EDIT_DISPLAY>(
      Object.values(ACTION_ADD_EDIT_DISPLAY)
    ).withDefault(ACTION_ADD_EDIT_DISPLAY.ADD)
  );

  const [id] = useQueryState('id', parseAsString.withDefault(''));

  const [addType, setAddType] = useQueryState(
    'type',
    parseAsStringEnum<TYPE_CONTENT>(Object.values(TYPE_CONTENT)).withDefault(
      TYPE_CONTENT.BLOG
    )
  );

  const router = useRouter();
  const { user } = useAuth();

  // Fetch existing data only on initial load in edit mode
  const { data: existingData, isLoading: isFetching } = useQuery<
    Article_SuccessStory_Ad_Response | null,
    Error
  >({
    queryKey: ['editData', id, action],
    queryFn: async () => {
      if (action !== ACTION_ADD_EDIT_DISPLAY.EDIT || !id) return null;
      const initialType = addType;
      if (initialType === TYPE_CONTENT.SUCCESS_STORIES) {
        return await getSuccessStory({ id: Number(id) });
      } else if (initialType === TYPE_CONTENT.ADS) {
        return await getAd({ id: Number(id) });
      } else {
        return await getArticle({ id: Number(id) });
      }
    },
    enabled: action === ACTION_ADD_EDIT_DISPLAY.EDIT && !!id,
    staleTime: Infinity,
  });

  const [selectedFiles, setSelectedFiles] = useState<FileWithPath[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const { startUpload } = useUploadThing('mediaUploader');

  const form = useForm<FormData>({
    initialValues: {
      type: addType,
      title: '',
      brief: '',
      content: '',
      files: [],
      imageUrls: [],
    },
    validate: zodResolver(formSchema), // Integrate Zod schema for validation
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      Subscript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      Color,
    ],
    content: form.values.content,
    onUpdate: ({ editor }) => {
      form.setFieldValue('content', editor.getHTML());
    },
  });

  // Set initial form values only once when existingData is first fetched
  useEffect(() => {
    if (
      existingData &&
      existingData.article_successStory_ad &&
      !form.values.title
    ) {
      const data = existingData.article_successStory_ad;
      form.setValues({
        type: addType,
        title: data.title || '',
        brief: data.brief || '',
        content: data.content || '',
        files: [],
        imageUrls:
          data.imgs?.map((img) => (typeof img === 'string' ? img : img.src)) ||
          [],
      });
      if (editor && data.content) {
        editor.commands.setContent(data.content);
      }
    }
  }, [existingData, editor]);

  const updateMutation = useMutation<modalActionResponse, Error, FormData>({
    mutationFn: async (values) => {
      try {
        if (values.type === TYPE_CONTENT.BLOG) {
          return await updateArticle({
            id: Number(id),
            title: values.title,
            content: values.content,
            brief: values.brief,
            imageUrls: values.imageUrls,
          });
        } else if (values.type === TYPE_CONTENT.ADS) {
          return await updateAd({
            id,
            title: values.title,
            content: values.content,
            brief: values.brief,
            imageUrls: values.imageUrls,
          });
        } else if (values.type === TYPE_CONTENT.SUCCESS_STORIES) {
          return await updateSuccessStory({
            id: Number(id),
            title: values.title,
            content: values.content,
            brief: values.brief,
            imageUrls: values.imageUrls,
          });
        }
        throw new Error('نوع الإرسال غير معرف');
      } catch (error) {
        return {
          status: '400',
          error: error instanceof Error ? error.message : 'فشل التحديث',
        } as modalActionResponse;
      }
    },
    onSuccess: (data) => {
      if (data.status === '200') {
        notifications.show({
          title: 'نجاح',
          message:
            data.message ||
            (action == ACTION_ADD_EDIT_DISPLAY.EDIT
              ? 'تم تحديث المحتوى بنجاح'
              : 'تم إرسال المحتوى بنجاح'),
          color: 'green',
          position: 'top-right',
        });
        form.reset();
        setSelectedFiles([]);
        router.push(
          `${MANAGER_ROUTES_fUNC(user?.id as number).ADS_BLOGS}?tab=${addType}`
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
        message: error.message || 'Failed to submit content',
        color: 'red',
        position: 'top-right',
      });
    },
  });

  const addMutation = useMutation<modalActionResponse, Error, FormData>({
    mutationFn: async (values) => {
      try {
        if (values.type === TYPE_CONTENT.BLOG) {
          return await addArticle({
            title: values.title,
            content: values.content,
            brief: values.brief,
            imageUrls: values.imageUrls,
          });
        } else if (values.type === TYPE_CONTENT.ADS) {
          return await addAd({
            title: values.title,
            content: values.content,
            brief: values.brief,
            imageUrls: values.imageUrls,
          });
        } else if (values.type === TYPE_CONTENT.SUCCESS_STORIES) {
          return await addSuccessStory({
            title: values.title,
            content: values.content,
            brief: values.brief,
            imageUrls: values.imageUrls,
          });
        }
        throw new Error('نوع الإرسال لم يتم تنفيذه بعد');
      } catch (error) {
        return {
          status: '400',
          error: error instanceof Error ? error.message : 'فشل الإضافة',
        } as modalActionResponse;
      }
    },
    onSuccess: (data) => {
      if (data.status === '200') {
        notifications.show({
          title: 'نجاح',
          message: data.message || 'تم إرسال المحتوى بنجاح',
          color: 'green',
          position: 'top-right',
        });
        form.reset();
        setSelectedFiles([]);
        router.push(
          `${MANAGER_ROUTES_fUNC(user?.id as number).ADS_BLOGS}?tab=${addType}`
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
        message: error.message || 'Failed to submit content',
        color: 'red',
        position: 'top-right',
      });
    },
  });

  const handleImageUpload = async (
    files: FileWithPath[]
  ): Promise<string[] | null> => {
    try {
      const uploadPromises = files.map((file) =>
        handleUploadMedia(file, startUpload)
      );
      const mediaUrls = await Promise.all(uploadPromises);
      const validUrls = mediaUrls.filter((url): url is string => url !== null);
      if (validUrls.length === 0) {
        throw new Error('فشل تحميل الصور. حاول مرة أخرى.');
      }
      return validUrls;
    } catch (error) {
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
    // In add mode, require at least one image
    if (action === ACTION_ADD_EDIT_DISPLAY.ADD && selectedFiles.length === 0) {
      notifications.show({
        title: 'خطأ',
        message: 'يجب عليك رفع صورة واحدة على الأقل في وضع الإضافة.',
        color: 'red',
        position: 'top-right',
      });
      return;
    }

    // In update mode, ensure there is at least one image (either existing or new)
    if (
      action === ACTION_ADD_EDIT_DISPLAY.EDIT &&
      selectedFiles.length === 0 &&
      form.values.imageUrls.length === 0
    ) {
      notifications.show({
        title: 'خطأ',
        message: 'يجب أن يحتوي المحتوى على صورة واحدة على الأقل.',
        color: 'red',
        position: 'top-right',
      });
      return;
    }

    if (selectedFiles.length > 0) {
      setLoadingImages(true);
      const imageUrls = await handleImageUpload(selectedFiles);
      setLoadingImages(false);
      if (imageUrls) {
        form.setFieldValue('imageUrls', [
          ...form.values.imageUrls,
          ...imageUrls,
        ]);
        values.imageUrls = [...form.values.imageUrls, ...imageUrls]; // Ensure values reflect the updated imageUrls
      } else {
        return;
      }
    }

    if (action === ACTION_ADD_EDIT_DISPLAY.EDIT && id) {
      updateMutation.mutate(values);
    } else {
      addMutation.mutate(values);
    }
  });

  return (
    <form onSubmit={handleSubmit} className='relative'>
      <LoadingOverlay
        visible={
          addMutation.isPending ||
          updateMutation.isPending ||
          loadingImages ||
          isFetching
        }
        zIndex={49}
        overlayProps={{ radius: 'sm', blur: 0.3 }}
      />
      <Stack gap={24} p={20}>
        <Group justify='space-between' align='center'>
          <Group gap={8}>
            <NotebookPen size={24} className='text-primary' />
            <Text fz={24} fw={600} className='!text-primary'>
              {action === ACTION_ADD_EDIT_DISPLAY.EDIT ? 'تعديل' : 'إضافة'}
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
            defaultValue={addType}
            onChange={(value: string) => {
              const typedValue = value as TYPE_CONTENT;
              form.setFieldValue('type', typedValue);
              setAddType(typedValue);
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
                value={TYPE_CONTENT.BLOG}
                label={
                  <Text fw={500} fz={18}>
                    مقال
                  </Text>
                }
                size='sm'
                disabled={action === ACTION_ADD_EDIT_DISPLAY.EDIT}
              />
              <Radio
                value={TYPE_CONTENT.ADS}
                label={
                  <Text fw={500} fz={18}>
                    إعلان
                  </Text>
                }
                size='sm'
                disabled={action === ACTION_ADD_EDIT_DISPLAY.EDIT}
              />
              <Radio
                value={TYPE_CONTENT.SUCCESS_STORIES}
                label={
                  <Text fw={500} fz={18}>
                    قصة نجاح
                  </Text>
                }
                size='sm'
                disabled={action === ACTION_ADD_EDIT_DISPLAY.EDIT}
              />
            </Group>
          </Radio.Group>
        </Stack>

        <Stack gap={8}>
          <Dropzone
            onDrop={async (files) => {
              const totalFiles = selectedFiles.length + files.length;
              if (totalFiles > 4) {
                notifications.show({
                  title: 'Error',
                  message: 'يمكنك رفع 4 صور كحد أقصى.',
                  color: 'red',
                  position: 'top-right',
                });
                return;
              }
              const updatedFiles = [...selectedFiles, ...files];
              setSelectedFiles(updatedFiles);
              form.setFieldValue('files', updatedFiles);
            }}
            onReject={(files) => console.log('rejected files', files)}
            maxSize={4 * 1024 * 1024}
            accept={IMAGE_MIME_TYPE}
            multiple={true}
          >
            <Group
              justify='center'
              gap='xl'
              mih={220}
              style={{ pointerEvents: 'none' }}
            >
              <Dropzone.Accept>
                <Upload size={52} className='text-blue-500' />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <X size={52} className='text-red-500' />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <ImageIcon size={52} className='text-gray-400' />
              </Dropzone.Idle>
              <div style={{ textAlign: 'center' }}>
                <Text size='xl' inline>
                  اسحب الصور هنا أو انقر لاختيار الملفات
                </Text>
                <Text size='sm' c='dimmed' inline mt={7}>
                  {action === ACTION_ADD_EDIT_DISPLAY.EDIT
                    ? 'يمكنك رفع ما بين 0 إلى 4 صور، يجب ألا يتجاوز حجم كل ملف 4 ميجابيت'
                    : 'يجب عليك رفع ما بين 1 إلى 4 صور، يجب ألا يتجاوز حجم كل ملف 4 ميجابيت'}
                </Text>
              </div>
            </Group>
          </Dropzone>

          {(selectedFiles.length > 0 || form.values.imageUrls.length > 0) && (
            <Stack gap={8} mt='sm'>
              {form.values.imageUrls.map((url, index) => (
                <Paper key={`existing-${index}`} p='md' withBorder>
                  <Group justify='space-between' align='center'>
                    <Group gap='sm'>
                      <ImageIcon size={20} className='text-green-500' />
                      <Text size='sm' fw={500}>
                        صورة موجودة {index + 1}
                      </Text>
                    </Group>
                    <Button
                      variant='subtle'
                      color='red'
                      size='xs'
                      onClick={() => {
                        const updatedUrls = form.values.imageUrls.filter(
                          (_, i) => i !== index
                        );
                        form.setFieldValue('imageUrls', updatedUrls);
                      }}
                    >
                      إزالة
                    </Button>
                  </Group>
                  <Box mt='sm'>
                    <img
                      src={url}
                      alt={`Existing ${index}`}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '200px',
                        objectFit: 'contain',
                        borderRadius: '8px',
                      }}
                    />
                  </Box>
                </Paper>
              ))}
              {selectedFiles.map((file, index) => (
                <Paper key={`new-${index}`} p='md' withBorder>
                  <Group justify='space-between' align='center'>
                    <Group gap='sm'>
                      <ImageIcon size={20} className='text-green-500' />
                      <Text size='sm' fw={500}>
                        {file.name}
                      </Text>
                      <Text size='xs' c='dimmed'>
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </Text>
                    </Group>
                    <Button
                      variant='subtle'
                      color='red'
                      size='xs'
                      onClick={() => {
                        const updatedFiles = selectedFiles.filter(
                          (_, i) => i !== index
                        );
                        setSelectedFiles(updatedFiles);
                        form.setFieldValue('files', updatedFiles);
                      }}
                    >
                      إزالة
                    </Button>
                  </Group>
                  {file.type.startsWith('image/') && (
                    <Box mt='sm'>
                      <img
                        src={URL.createObjectURL(file) || '/placeholder.svg'}
                        alt={`Preview ${index}`}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '200px',
                          objectFit: 'contain',
                          borderRadius: '8px',
                        }}
                        onLoad={() =>
                          URL.revokeObjectURL(URL.createObjectURL(file))
                        }
                      />
                    </Box>
                  )}
                </Paper>
              ))}
            </Stack>
          )}
        </Stack>

        <Stack gap={8}>
          <Text fz={18} fw={500} className='!text-primary'>
            العنوان :
          </Text>
          <TextInput
            placeholder='أدخل العنوان...'
            size='md'
            {...form.getInputProps('title')}
            error={form.errors.title} // Display Zod validation error
            styles={{
              input: {
                textAlign: 'right',
                direction: 'rtl',
              },
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
            styles={{
              input: {
                textAlign: 'right',
                direction: 'rtl',
              },
            }}
          />
        </Stack>

        <Stack gap={8}>
          <Text size='lg' fw={500} ta='right'>
            النص:
          </Text>
          <RichTextEditor
            editor={editor}
            styles={{
              root: {
                direction: 'rtl',
              },
              content: {
                minHeight: 200,
                textAlign: 'right',
                direction: 'rtl',
              },
            }}
            pos={'relative'}
          >
            <LoadingOverlay
              visible={!editor}
              zIndex={49}
              overlayProps={{ radius: 'sm', blur: 0.3 }}
            />
            <RichTextEditor.Toolbar sticky stickyOffset={60}>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Underline />
                <RichTextEditor.Strikethrough />
                <RichTextEditor.ClearFormatting />
                <RichTextEditor.Highlight />
                <RichTextEditor.Code />
                <RichTextEditor.ColorPicker
                  colors={[
                    '#25262b',
                    '#868e96',
                    '#fa5252',
                    '#e64980',
                    '#be4bdb',
                    '#7950f2',
                    '#4c6ef5',
                    '#228be6',
                    '#15aabf',
                    '#12b886',
                    '#40c057',
                    '#82c91e',
                    '#fab005',
                    '#fd7e14',
                  ]}
                />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
                <RichTextEditor.H3 />
                <RichTextEditor.H4 />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Blockquote />
                <RichTextEditor.Hr />
                <RichTextEditor.BulletList />
                <RichTextEditor.OrderedList />
                <RichTextEditor.Subscript />
                <RichTextEditor.Superscript />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Link />
                <RichTextEditor.Unlink />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.AlignLeft />
                <RichTextEditor.AlignCenter />
                <RichTextEditor.AlignJustify />
                <RichTextEditor.AlignRight />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Undo />
                <RichTextEditor.Redo />
              </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content />
            {form.errors.content && (
              <Text c='red' size='sm' mt={4}>
                {form.errors.content}
              </Text>
            )}
          </RichTextEditor>
        </Stack>

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
              (action === ACTION_ADD_EDIT_DISPLAY.EDIT
                ? updateMutation.isPending
                : addMutation.isPending) || !form.isValid()
            }
            loading={
              (action === ACTION_ADD_EDIT_DISPLAY.EDIT
                ? updateMutation.isPending
                : addMutation.isPending) || loadingImages
            }
          >
            {action === ACTION_ADD_EDIT_DISPLAY.EDIT ? 'تحديث' : 'إضافة'}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
