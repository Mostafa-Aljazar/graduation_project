export const UploadButton = () => null;
export const UploadDropzone = () => null;

export const useUploadThing = (endpoint?: string) => {
    return {
        startUpload: async (files: File[]) => {
            return files.map(f => ({ url: URL.createObjectURL(f), ufsUrl: URL.createObjectURL(f) }));
        },
        isUploading: false
    };
};

export const uploadFiles = async () => [];
