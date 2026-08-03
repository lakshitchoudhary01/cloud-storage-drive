import { useEffect, useState } from "react";
import {
    getFolders,
    createFolder,
    renameFolder,
    deleteFolder,
} from "../../services/folderService";

import { getFilesByFolder } from "../../services/fileService";

export default function Folders() {

    const [folders, setFolders] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        loadFolders();
    }, []);

    const loadFolders = async () => {
        try {

            const data = await getFolders();

            setFolders(data);

        } catch (error) {

            console.log(error);

        }
    };

    const handleCreate = async () => {

        const name = prompt("Folder Name");

        if (!name) return;

        try {

            await createFolder(name);

            loadFolders();

        } catch (error) {

            console.log(error);

        }

    };

    const handleRename = async (folder) => {

        const name = prompt(
            "Rename Folder",
            folder.name
        );

        if (!name) return;

        try {

            await renameFolder(folder._id, name);

            loadFolders();

        } catch (error) {

            console.log(error);

        }

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete Folder?")) return;

        try {

            await deleteFolder(id);

            loadFolders();

            // Clear selected folder if it was deleted
            if (selectedFolder?._id === id) {
                setSelectedFolder(null);
                setFiles([]);
            }

        } catch (error) {

            console.log(error);

        }

    };

    const openFolder = async (folder) => {

        try {

            setSelectedFolder(folder);

            const data = await getFilesByFolder(folder._id);

            setFiles(data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div>

            <h1>Folders</h1>

            <button onClick={handleCreate}>
                New Folder
            </button>

            <br />
            <br />

            {folders.length === 0 ? (

                <p>No Folders Found</p>

            ) : (

                folders.map((folder) => (

                    <div
                        key={folder._id}
                        className="file-row"
                    >

                        <span
                            style={{
                                cursor: "pointer",
                                fontWeight:
                                    selectedFolder?._id === folder._id
                                        ? "bold"
                                        : "normal",
                            }}
                            onClick={() => openFolder(folder)}
                        >
                            📁 {folder.name}
                        </span>

                        <div>

                            <button
                                onClick={() =>
                                    handleRename(folder)
                                }
                            >
                                Rename
                            </button>

                            <button
                                onClick={() =>
                                    handleDelete(folder._id)
                                }
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                ))

            )}

            <br />
            <hr />
            <br />

            {selectedFolder && (

                <div>

                    <h2>
                        Files in "{selectedFolder.name}"
                    </h2>

                    <br />

                    {files.length === 0 ? (

                        <p>No files inside this folder.</p>

                    ) : (

                        files.map((file) => (

                            <div
                                key={file._id}
                                className="file-row"
                            >
                                <span>{file.fileName}</span>

                                <span>
                                    {(file.size / 1024).toFixed(2)} KB
                                </span>
                            </div>

                        ))

                    )}

                </div>

            )}

        </div>

    );

}