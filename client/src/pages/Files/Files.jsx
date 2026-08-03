import { useEffect, useState } from "react";
import {
    getFiles,
    uploadFile,
    deleteFile,
    renameFile,
} from "../../services/fileService";

import { getFolders } from "../../services/folderService";

export default function Files() {

    const [files, setFiles] = useState([]);
    const [folders, setFolders] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFolder, setSelectedFolder] = useState("");

    useEffect(() => {
        loadFiles();
        loadFolders();
    }, []);

    const loadFiles = async () => {
        try {
            const data = await getFiles();
            setFiles(data);
        } catch (error) {
            console.log(error);
        }
    };

    const loadFolders = async () => {
        try {
            const data = await getFolders();
            setFolders(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpload = async () => {

        if (!selectedFile) {
            alert("Please choose a file");
            return;
        }

        try {

            const formData = new FormData();

            formData.append("file", selectedFile);

            if (selectedFolder) {
                formData.append("folderId", selectedFolder);
            }

            await uploadFile(formData);

            alert("File Uploaded Successfully");

            setSelectedFile(null);
            setSelectedFolder("");

            loadFiles();

        } catch (error) {

            console.log(error);

        }
    };

    const handleDownload = (url) => {
        window.open(url, "_blank");
    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm("Delete this file?");

        if (!confirmDelete) return;

        try {

            await deleteFile(id);

            loadFiles();

        } catch (error) {

            console.log(error);

        }
    };

    const handleRename = async (file) => {

        const newName = prompt(
            "Enter new file name",
            file.fileName
        );

        if (!newName) return;

        try {

            await renameFile(file._id, newName);

            loadFiles();

        } catch (error) {

            console.log(error);

        }
    };

    return (

        <div className="files-page">

            <h1>Files</h1>

            <br />

            <input
                type="file"
                onChange={(e) =>
                    setSelectedFile(e.target.files[0])
                }
            />

            <br />
            <br />

            <select
                value={selectedFolder}
                onChange={(e) =>
                    setSelectedFolder(e.target.value)
                }
            >
                <option value="">No Folder</option>

                {folders.map((folder) => (
                    <option
                        key={folder._id}
                        value={folder._id}
                    >
                        {folder.name}
                    </option>
                ))}
            </select>

            <br />
            <br />

            <button onClick={handleUpload}>
                Upload
            </button>

            <br />
            <br />

            {files.length === 0 ? (

                <p>No Files Found</p>

            ) : (

                files.map((file) => (

                    <div
                        className="file-row"
                        key={file._id}
                    >

                        <div>

                            <strong>{file.fileName}</strong>

                            <br />

                            {(file.size / 1024).toFixed(2)} KB

                        </div>

                        <div className="file-actions">

                            <button
                                onClick={() =>
                                    handleDownload(file.url)
                                }
                            >
                                Download
                            </button>

                            <button
                                onClick={() =>
                                    handleRename(file)
                                }
                            >
                                Rename
                            </button>

                            <button
                                onClick={() =>
                                    handleDelete(file._id)
                                }
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                ))

            )}

        </div>

    );

}