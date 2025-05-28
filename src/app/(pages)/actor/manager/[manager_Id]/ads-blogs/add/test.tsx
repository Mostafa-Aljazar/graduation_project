"use client"

import type React from "react"

import { Button, Checkbox, Group, Stack, Text, TextInput, Box, Paper } from "@mantine/core"
import { RichTextEditor, Link } from "@mantine/tiptap"
import { useEditor } from "@tiptap/react"
import Highlight from "@tiptap/extension-highlight"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import Superscript from "@tiptap/extension-superscript"
import SubScript from "@tiptap/extension-subscript"
import { useState } from "react"
import { Upload, Plus, X, ImageIcon } from "lucide-react"
import { useForm } from "@mantine/form"
import { Dropzone, IMAGE_MIME_TYPE, type FileWithPath } from "@mantine/dropzone"

interface FormData {
  title: string
  content: string
  status: {
    inProgress: boolean
    accepted: boolean
    required: boolean
  }
  file: FileWithPath | null
}

export default function AddContentForm() {
  const [selectedFile, setSelectedFile] = useState<FileWithPath | null>(null)

  const form = useForm<FormData>({
    initialValues: {
      title: "",
      content: "",
      status: {
        inProgress: false,
        accepted: false,
        required: false,
      },
      file: null,
    },
  })

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      form.setFieldValue("content", editor.getHTML())
    },
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      form.setFieldValue("file", file)
    }
  }

  const handleSubmit = (values: FormData) => {
    console.log("Form submitted:", values)
    // Handle form submission here
  }

  return (
    <Box p={20} maw={800} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap={24}>
          {/* Header */}
          <Group justify="space-between" align="center">
            <Group gap={8}>
              <Plus size={24} className="text-orange-500" />
              <Text size="xl" fw={600} className="text-gray-800">
                إضافة
              </Text>
            </Group>
          </Group>

          {/* Status Checkboxes */}
          <Group gap={32} justify="flex-end">
            <Checkbox
              label="قيد الإنجاز"
              size="sm"
              color="green"
              {...form.getInputProps("status.inProgress", { type: "checkbox" })}
            />
            <Checkbox
              label="مقبول"
              size="sm"
              color="green"
              {...form.getInputProps("status.accepted", { type: "checkbox" })}
            />
            <Checkbox
              label="مطلوب"
              size="sm"
              color="green"
              {...form.getInputProps("status.required", { type: "checkbox" })}
            />
          </Group>

          {/* File Upload with Dropzone */}
          <Stack gap={8}>
            <Dropzone
              onDrop={(files) => {
                if (files.length > 0) {
                  setSelectedFile(files[0])
                  form.setFieldValue("file", files[0])
                }
              }}
              onReject={(files) => console.log("rejected files", files)}
              maxSize={4 * 1024 * 1024} // 4MB
              accept={IMAGE_MIME_TYPE}
              multiple={false}
            >
              <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: "none" }}>
                <Dropzone.Accept>
                  <Upload size={52} className="text-blue-500" />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <X size={52} className="text-red-500" />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <ImageIcon size={52} className="text-gray-400" />
                </Dropzone.Idle>

                <div style={{ textAlign: "center" }}>
                  <Text size="xl" inline>
                    اسحب الصور هنا أو انقر لاختيار الملفات
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7}>
                    يمكنك إرفاق ملف واحد، يجب ألا يتجاوز حجم الملف 4 ميجابايت
                  </Text>
                </div>
              </Group>
            </Dropzone>

            {selectedFile && (
              <Paper p="md" withBorder mt="sm">
                <Group justify="space-between" align="center">
                  <Group gap="sm">
                    <ImageIcon size={20} className="text-green-500" />
                    <Text size="sm" fw={500}>
                      {selectedFile.name}
                    </Text>
                    <Text size="xs" c="dimmed">
                      ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </Text>
                  </Group>
                  <Button
                    variant="subtle"
                    color="red"
                    size="xs"
                    onClick={() => {
                      setSelectedFile(null)
                      form.setFieldValue("file", null)
                    }}
                  >
                    إزالة
                  </Button>
                </Group>
                {selectedFile.type.startsWith("image/") && (
                  <Box mt="sm">
                    <img
                      src={URL.createObjectURL(selectedFile) || "/placeholder.svg"}
                      alt="Preview"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "200px",
                        objectFit: "contain",
                        borderRadius: "8px",
                      }}
                      onLoad={() => URL.revokeObjectURL(URL.createObjectURL(selectedFile))}
                    />
                  </Box>
                )}
              </Paper>
            )}
          </Stack>

          {/* Title Input */}
          <Stack gap={8}>
            <Text size="lg" fw={500} ta="right">
              العنوان:
            </Text>
            <TextInput
              placeholder="أدخل العنوان..."
              size="md"
              {...form.getInputProps("title")}
              styles={{
                input: {
                  textAlign: "right",
                  direction: "rtl",
                },
              }}
            />
          </Stack>

          {/* Rich Text Editor */}
          <Stack gap={8}>
            <Text size="lg" fw={500} ta="right">
              النص:
            </Text>
            <RichTextEditor
              editor={editor}
              styles={{
                root: {
                  direction: "rtl",
                },
                content: {
                  minHeight: 200,
                  textAlign: "right",
                  direction: "rtl",
                },
              }}
            >
              <RichTextEditor.Toolbar sticky stickyOffset={60}>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Underline />
                  <RichTextEditor.Strikethrough />
                  <RichTextEditor.ClearFormatting />
                  <RichTextEditor.Highlight />
                  <RichTextEditor.Code />
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

          {/* Submit Button */}
          <Group justify="center" mt={20}>
            <Button
              type="submit"
              size="md"
              px={40}
              style={{
                backgroundColor: "#4A704A",
                color: "white",
              }}
              disabled={!form.values.title.trim() || !editor?.getText().trim()}
            >
              إضافة
            </Button>
          </Group>
        </Stack>
      </form>
    </Box>
  )
}
          </Stack>

          {/* Submit Button */}
          <Group justify='center' mt={20}>
            <Button
              type='submit'
              size='md'
              px={40}
              style={{
                backgroundColor: '#4A704A',
                color: 'white',
              }}
              disabled={!form.values.title.trim() || !editor?.getText().trim()}
            >
              إضافة
            </Button>
          </Group>
        </Stack>
      </form>
    </Box>
  );
}
