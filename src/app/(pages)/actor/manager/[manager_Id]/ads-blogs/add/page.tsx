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
import { useForm } from '@mantine/form';
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
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { handleUploadMedia } from '@/utils/uploadthing/handleUploadMedia';
import { useUploadThing } from '@/utils/uploadthing/uploadthing';
import { addArticle } from '@/actions/actors/manager/blog-stories-ads/blog/addArticle';
import { parseAsStringEnum, useQueryState } from 'nuqs';
import { typeAdd } from '@/components/actors/manager/blogs-stories/content/blog-stories-content';
import { addAd } from '@/actions/actors/manager/blog-stories-ads/ad/addAd';
import { addSuccessStory } from '@/actions/actors/manager/blog-stories-ads/success-stories/addSuccessStory';
import { cn } from '@/utils/cn';

interface FormData {
  type: 'BLOG' | 'SUCCESS_STORIES' | 'ADS';
  title: string;
  brief?: string;
  content: string;
  files: FileWithPath[];
  imageUrls?: string[];
}

interface modalActionResponse {
  status: string;
  message: string;
  error?: string;
}

export default function Page() {
  const [addType, setAddType] = useQueryState(
    'type',
    parseAsStringEnum<typeAdd>(Object.values(typeAdd)) // pass a list of allowed values
      .withDefault(typeAdd.BLOG)
  );

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
    immediatelyRender: false, // Prevent rendering during SSR
  });

  const addMutation = useMutation<modalActionResponse, Error, FormData>({
    mutationFn: async (values) => {
      if (values.type === 'BLOG') {
        return await addArticle({
          title: values.title,
          content: values.content,
          brief: values.brief,
          imageUrls: values.imageUrls,
        });
      } else if (values.type === 'ADS') {
        return await addAd({
          title: values.title,
          content: values.content,
          brief: values.brief,
          imageUrls: values.imageUrls,
        });
      } else if (values.type === 'SUCCESS_STORIES') {
        return await addSuccessStory({
          title: values.title,
          content: values.content,
          brief: values.brief,
          imageUrls: values.imageUrls,
        });
      } else {
        throw new Error('نوع الإرسال لم يتم تنفيذه بعد');
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
    console.log('🚀 ~ handleSubmit ~ values:', values);
    if (selectedFiles.length < 1) {
      notifications.show({
        title: 'خطأ',
        message: 'يجب عليك رفع صورة واحدة على الأقل.',
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
        form.setFieldValue('imageUrls', imageUrls);
      } else {
        return;
      }
    }
    addMutation.mutate(values);
  });

  return (
    <form onSubmit={handleSubmit} className='relative'>
      <LoadingOverlay
        visible={addMutation.isPending || loadingImages}
        zIndex={49}
        overlayProps={{ radius: 'sm', blur: 0.3 }}
      />
      <Stack gap={24} p={20}>
        <Group justify='space-between' align='center'>
          <Group gap={8}>
            <NotebookPen size={24} className='text-primary' />
            <Text fz={24} fw={600} className='!text-primary'>
              إضافة
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
            value={addType}
            onChange={(value: string) => {
              const typedValue = value as typeAdd;
              setAddType(typedValue);
              form.setFieldValue('type', typedValue);
            }}
          >
            <Group
              w={{ base: '100%', md: '60%' }}
              gap={30}
              wrap='nowrap'
              align='center'
              justify='space-between'
            >
              <Radio
                value={typeAdd.BLOG}
                label={
                  <Text fw={500} fz={18}>
                    مقال
                  </Text>
                }
                size='sm'
              />

              <Radio
                value={typeAdd.ADS}
                label={
                  <Text fw={500} fz={18}>
                    إعلان
                  </Text>
                }
                size='sm'
              />
              <Radio
                value={typeAdd.SUCCESS_STORIES}
                label={
                  <Text fw={500} fz={18}>
                    قصة نجاح
                  </Text>
                }
                size='sm'
              />
            </Group>
          </Radio.Group>
        </Stack>

        <Stack gap={8}>
          <Dropzone
            onDrop={async (files) => {
              const totalFiles = selectedFiles.length + files.length;

              if (totalFiles < 1) {
                notifications.show({
                  title: 'Error',
                  message: 'يجب عليك رفع صورة واحدة على الأقل.',
                  color: 'red',
                  position: 'top-right',
                });
                return;
              }
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
                  يجب عليك رفع ما بين 1 إلى 4 صور، يجب ألا يتجاوز حجم كل ملف 4
                  ميجابايت
                </Text>
              </div>
            </Group>
          </Dropzone>

          {selectedFiles.length > 0 && (
            <Stack gap={8} mt='sm'>
              {selectedFiles.map((file, index) => (
                <Paper key={index} p='md' withBorder>
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
          </RichTextEditor>
        </Stack>

        <Group justify='center' mt={20}>
          <Button
            type='submit'
            size='md'
            px={40}
            className={cn(
              '!shadow-lg !text-white',
              !form.values.title.trim() || !form.values.content.trim()
                ? '!bg-primary/70'
                : '!bg-primary'
            )}
            disabled={
              addMutation.isPending ||
              !form.values.title.trim() ||
              !form.values.content.trim() ||
              !form.values.files.length ||
              !form.isValid()
            }
            loading={addMutation.isPending || loadingImages}
          >
            إضافة
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
