import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { Button, Group, Paper, Stack, Text, Box } from '@mantine/core';
import { ImageIcon, Upload, X } from 'lucide-react';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';

interface Props {
  selectedFiles: FileWithPath[];
  imageUrls: string[];
  onFilesChange: (files: FileWithPath[]) => void;
  onRemoveUrl: (index: number) => void;
  onRemoveFile: (index: number) => void;
  action: string;
}

export default function Image_Dropzone({
  selectedFiles,
  imageUrls,
  onFilesChange,
  onRemoveUrl,
  onRemoveFile,
  action,
}: Props) {
  const handleDrop = (files: FileWithPath[]) => {
    const total = selectedFiles.length + files.length;
    if (total > 4) {
      notifications.show({
        title: 'Error',
        message: 'يمكنك رفع 4 صور كحد أقصى.',
        color: 'red',
        position: 'top-right',
      });
      return;
    }

    const updatedFiles = [...selectedFiles, ...files];
    onFilesChange(updatedFiles);
  };

  return (
    <Stack gap={8}>
      <Dropzone
        onDrop={handleDrop}
        onReject={(files) => console.log('Rejected files', files)}
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
              {action === 'edit'
                ? 'يمكنك رفع ما بين 0 إلى 4 صور، يجب ألا يتجاوز حجم كل ملف 4 ميجابيت'
                : 'يجب عليك رفع ما بين 1 إلى 4 صور، يجب ألا يتجاوز حجم كل ملف 4 ميجابيت'}
            </Text>
          </div>
        </Group>
      </Dropzone>

      {(imageUrls.length > 0 || selectedFiles.length > 0) && (
        <Stack gap={8} mt='sm'>
          {imageUrls.map((url, i) => (
            <Paper key={`existing-${i}`} p='md' withBorder>
              <Group justify='space-between' align='center'>
                <Group gap='sm'>
                  <ImageIcon size={20} className='text-green-500' />
                  <Text size='sm' fw={500}>
                    صورة موجودة {i + 1}
                  </Text>
                </Group>
                <Button
                  variant='subtle'
                  color='red'
                  size='xs'
                  onClick={() => onRemoveUrl(i)}
                >
                  إزالة
                </Button>
              </Group>
              <Box mt='sm'>
                <img
                  src={url}
                  alt={`Existing ${i}`}
                  style={{
                    maxWidth: '100%',
                    maxHeight: 200,
                    objectFit: 'contain',
                    borderRadius: 8,
                  }}
                />
              </Box>
            </Paper>
          ))}

          {selectedFiles.map((file, i) => (
            <Paper key={`new-${i}`} p='md' withBorder>
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
                  onClick={() => onRemoveFile(i)}
                >
                  إزالة
                </Button>
              </Group>
              {file.type.startsWith('image/') && (
                <Box mt='sm'>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${i}`}
                    style={{
                      maxWidth: '100%',
                      maxHeight: 200,
                      objectFit: 'contain',
                      borderRadius: 8,
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
  );
}
