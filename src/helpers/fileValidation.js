export const validateFile = (file, allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'], maxSizeInBytes = 5 * 1024 * 1024) => {
    if (!allowedTypes.includes(file.type)) {
        alert('Invalid file type. Only .jpeg, .jpg, and .png files are allowed.');
        return false;
    }

    if (file.size > maxSizeInBytes) {
        alert('File size exceeds the 5 MB limit.');
        return false;
    }

    return true;
};