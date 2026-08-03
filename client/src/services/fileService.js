import api from "./api";

export const getFiles = async () => {
    const response = await api.get("/files");
    return response.data.files;
};

export const uploadFile = async (formData) => {
    const response = await api.post(
        "/files/upload",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data.file;
};

export const deleteFile = async (id) => {
    const response = await api.delete(`/files/${id}`);
    return response.data;
};

export const renameFile = async (id, fileName) => {
    const response = await api.patch(`/files/${id}`, {
        fileName,
    });

    return response.data.file;
};


export const getFilesByFolder = async (folderId) => {

    const response = await api.get(
        `/files/folder/${folderId}`
    );

    return response.data.files;

};