import axios from 'axios';
const API_URL = 'http://localhost:3000/api';

export const uploadFile = async (file, documentType, endpoint) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);

    try {
        const response = await axios.post(`${API_URL}/${endpoint}/submit`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzZiNDdkMjFlYWJjNTNkMmZlMzMyOCIsInJvbGUiOiJzdHVkZW50IiwibmFtZSI6IkFkb25pIiwiaWF0IjoxNzM3OTI3NDg3LCJleHAiOjE3Mzc5MzEwODd9.P9voJ73rx10qQ61rgZUZDrnCQGE0ZbpKkP8udLHuhRQ`
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};

export const uploadNotesFile = (file, documentType) => uploadFile(file, documentType, 'notes');
export const uploadDissertationFile = (file, documentType) => uploadFile(file, documentType, 'dissertations');
export const uploadPublicationFile = (file, documentType) => uploadFile(file, documentType, 'publications');
export const uploadProposalFile = (file, documentType) => uploadFile(file, documentType, 'proposals');
export const uploadProgressFile = (file, documentType) => uploadFile(file, documentType, 'progresses');
export const uploadGradeFile = (file, documentType) => uploadFile(file, documentType, 'grades');